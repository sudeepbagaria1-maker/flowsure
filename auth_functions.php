<?php
/**
 * Authentication Functions for Flowsure CRM
 * Provides secure user registration, login, logout, and session management
 */

// Include configuration and database connection
if (!defined('ALLOW_CONFIG')) {
    define('ALLOW_CONFIG', true);
}
require_once 'config.php';
require_once 'db_connect.php';

/**
 * Register a new user
 * 
 * @param string $name User's full name
 * @param string $email User's email address
 * @param string $password User's password
 * @return array Success (user_id) or error message
 */
function registerUser($name, $email, $password) {
    global $pdo;
    
    // Input validation and sanitization
    $name = trim(htmlspecialchars($name, ENT_QUOTES, 'UTF-8'));
    $email = trim(filter_var($email, FILTER_SANITIZE_EMAIL));
    $password = trim($password);
    
    // Validate inputs
    if (empty($name) || strlen($name) > MAX_USERNAME_LENGTH) {
        return ['error' => 'Invalid name. Must be between 1 and ' . MAX_USERNAME_LENGTH . ' characters.'];
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > MAX_EMAIL_LENGTH) {
        return ['error' => 'Invalid email address.'];
    }
    
    if (empty($password) || strlen($password) < 8) {
        return ['error' => 'Password must be at least 8 characters long.'];
    }
    
    try {
        // Check if user already exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->fetch()) {
            return ['error' => 'Email address already registered.'];
        }
        
        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        
        // Insert the new user
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)");
        $result = $stmt->execute([$name, $email, $hashedPassword]);
        
        if ($result) {
            // Log successful registration
            error_log("User registered successfully: " . $email);
            return ['user_id' => $pdo->lastInsertId()];
        } else {
            // Log failed registration
            error_log("User registration failed for: " . $email);
            return ['error' => 'Registration failed. Please try again.'];
        }
    } catch (PDOException $e) {
        // Log database error without exposing details
        error_log("Database error during registration: " . $e->getMessage());
        return ['error' => 'Registration failed due to a database error.'];
    }
}

/**
 * Login user with email and password
 * 
 * @param string $email User's email address
 * @param string $password User's password
 * @return array Success (true) or error message
 */
function loginUser($email, $password) {
    global $pdo;
    
    // Input validation and sanitization
    $email = trim(filter_var($email, FILTER_SANITIZE_EMAIL));
    $password = trim($password);
    
    // Validate inputs
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return ['error' => 'Invalid email address.'];
    }
    
    if (empty($password)) {
        return ['error' => 'Password is required.'];
    }
    
    try {
        // Fetch user data
        $stmt = $pdo->prepare("SELECT id, name, email, password_hash FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        // Verify user exists and password is correct
        if ($user && password_verify($password, $user['password_hash'])) {
            // Prevent session fixation attacks
            session_regenerate_id(true);
            
            // Set session timeout
            $_SESSION['last_activity'] = time();
            
            // Store user data in session
            $_SESSION['user'] = [
                'id' => $user['id'],
                'email' => $user['email'],
                'name' => $user['name'],
                'roles' => [] // Will be populated by getUserRoles
            ];
            
            // Populate user roles
            $roles = getUserRoles($user['id']);
            $_SESSION['user']['roles'] = $roles;
            
            // Log successful login
            error_log("User login successful: " . $email);
            return ['success' => true];
        } else {
            // Log failed login attempt
            error_log("User login failed: " . $email);
            return ['error' => 'Invalid email or password.'];
        }
    } catch (PDOException $e) {
        // Log database error without exposing details
        error_log("Database error during login: " . $e->getMessage());
        return ['error' => 'Login failed due to a database error.'];
    }
}

/**
 * Logout user and destroy session
 * 
 * @return void
 */
function logoutUser() {
    // Unset all session variables
    $_SESSION = array();
    
    // Delete session cookie
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }
    
    // Destroy session
    session_destroy();
    
    // Log successful logout
    if (isset($_SESSION['user']['email'])) {
        error_log("User logout successful: " . $_SESSION['user']['email']);
    }
}

/**
 * Check if user is logged in
 * 
 * @return bool True if user is logged in, false otherwise
 */
function isLoggedIn() {
    // Check if user session exists
    if (!isset($_SESSION['user']) || empty($_SESSION['user'])) {
        return false;
    }
    
    // Check session timeout
    if (isset($_SESSION['last_activity']) && 
        (time() - $_SESSION['last_activity'] > SESSION_LIFETIME)) {
        // Session expired, logout user
        logoutUser();
        return false;
    }
    
    // Update last activity time
    $_SESSION['last_activity'] = time();
    
    return true;
}

/**
 * Require login - redirect to login page if not logged in
 * 
 * @param string $redirect Optional page to redirect back to after login
 * @return void
 */
function requireLogin($redirect = '') {
    if (!isLoggedIn()) {
        // Store the requested page for redirect after login
        if (!empty($redirect)) {
            $_SESSION['redirect_after_login'] = $redirect;
        } elseif (!empty($_SERVER['REQUEST_URI'])) {
            $_SESSION['redirect_after_login'] = $_SERVER['REQUEST_URI'];
        }
        
        // Redirect to login page
        header('Location: login.php');
        exit;
    }
}

/**
 * Get current user data from session
 * 
 * @return array|null User data or null if not logged in
 */
function getCurrentUser() {
    if (isLoggedIn()) {
        return $_SESSION['user'];
    }
    return null;
}

/**
 * Get user's roles
 * 
 * @param int $user_id User ID
 * @return array List of role names
 */
function getUserRoles($user_id) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT r.name 
            FROM roles r
            JOIN user_roles ur ON r.id = ur.role_id
            WHERE ur.user_id = ?
        ");
        $stmt->execute([$user_id]);
        
        $roles = [];
        while ($row = $stmt->fetch()) {
            $roles[] = $row['name'];
        }
        
        return $roles;
    } catch (PDOException $e) {
        // Log error and return empty array
        error_log("Error fetching user roles: " . $e->getMessage());
        return [];
    }
}

/**
 * Get user's primary role
 * 
 * @param int $user_id User ID
 * @return string|null Role name or null if no roles
 */
function getUserRole($user_id) {
    $roles = getUserRoles($user_id);
    
    if (!empty($roles)) {
        // Return the first role as primary
        return $roles[0];
    }
    
    return null;
}

/**
 * Check if user has a specific role
 * 
 * @param string $role Role name to check
 * @return bool True if user has role, false otherwise
 */
function hasRole($role) {
    $user = getCurrentUser();
    
    if ($user && isset($user['roles'])) {
        return in_array($role, $user['roles']);
    }
    
    return false;
}

/**
 * Check if user has any of the specified roles
 * 
 * @param array $roles Array of role names to check
 * @return bool True if user has any of the roles, false otherwise
 */
function hasAnyRole($roles) {
    $user = getCurrentUser();
    
    if ($user && isset($user['roles'])) {
        foreach ($roles as $role) {
            if (in_array($role, $user['roles'])) {
                return true;
            }
        }
    }
    
    return false;
}

/**
 * Generate CSRF token for form protection
 * 
 * @return string CSRF token
 */
function generateCSRFToken() {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(CSRF_TOKEN_LENGTH/2));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Validate CSRF token
 * 
 * @param string $token Token to validate
 * @return bool True if valid, false otherwise
 */
function validateCSRFToken($token) {
    return !empty($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

?>