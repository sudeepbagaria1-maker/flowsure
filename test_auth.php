<?php
require_once 'init.php'; // This should include db_connect.php and start session

// Test registration
echo "Testing user registration...\n";
$result = registerUser('Test User', 'test@example.com', 'password123');
if (isset($result['user_id'])) {
    echo "User registered with ID: " . $result['user_id'] . "\n";
} else {
    echo "Registration failed: " . $result['error'] . "\n";
}

// Test login
echo "Testing user login...\n";
$loginResult = loginUser('test@example.com', 'password123');
if (isset($loginResult['success'])) {
    echo "Login successful!\n";
    $user = getCurrentUser();
    if ($user) {
        echo "Current user: " . $user['name'] . "\n";
    }
} else {
    echo "Login failed: " . $loginResult['error'] . "\n";
}

// Test logout
echo "Testing user logout...\n";
logoutUser();
echo "Logged out\n";
?>
