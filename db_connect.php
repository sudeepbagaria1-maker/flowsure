<?php
// Include the configuration file
define('ALLOW_CONFIG', true);
require_once 'config.php';

try {
    // Create PDO connection
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_PERSISTENT => false,
        PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
    ];
    
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    
    // Test the connection
    $pdo->query("SELECT 1");
    
} catch (PDOException $e) {
    // Log the error and show a generic message
    error_log("Database connection failed: " . $e->getMessage());
    die("Connection failed. Please try again later.");
}

// Configure secure session settings
session_name(SESSION_NAME);
session_set_cookie_params([
    'lifetime' => SESSION_LIFETIME,
    'path' => '/',
    'domain' => '',
    'secure' => SESSION_COOKIE_SECURE,
    'httponly' => SESSION_COOKIE_HTTPONLY,
    'samesite' => SESSION_COOKIE_SAMESITE
]);

// Start the session
session_start();

// Function to get PDO connection for reuse in other files
function getDBConnection() {
    global $pdo;
    return $pdo;
}

// Function to create a prepared statement (placeholder for SQL injection protection)
function prepareStatement($sql) {
    global $pdo;
    return $pdo->prepare($sql);
}

echo "Database connection successful!";
?>