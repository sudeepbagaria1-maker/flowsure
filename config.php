<?php
// Security check to prevent direct access
if (!defined('ALLOW_CONFIG')) {
    die('Direct access not permitted');
}

// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'flowsure_crm');
define('DB_USER', 'root');
define('DB_PASS', '');

// Session Configuration (secure settings)
define('SESSION_NAME', 'FlowsureCRM');
define('SESSION_LIFETIME', 3600); // 1 hour
define('SESSION_COOKIE_SECURE', true); // Only send cookie over HTTPS
define('SESSION_COOKIE_HTTPONLY', true); // Prevent client-side JavaScript access
define('SESSION_COOKIE_SAMESITE', 'Strict'); // CSRF protection

// File Upload Settings
define('MAX_FILE_SIZE', 5242880); // 5MB in bytes
define('ALLOWED_FILE_TYPES', [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'text/plain'
]);

// Error Reporting Settings (Development Mode)
define('ERROR_REPORTING', E_ALL);
define('DISPLAY_ERRORS', true);

// Security Constants
define('PASSWORD_SALT', 'your_unique_salt_here_12345');
define('CSRF_TOKEN_LENGTH', 32);
define('TOKEN_EXPIRY_TIME', 1800); // 30 minutes

// Input Validation Constants
define('MAX_USERNAME_LENGTH', 50);
define('MAX_EMAIL_LENGTH', 100);
define('MAX_TEXT_LENGTH', 5000);
define('MAX_PHONE_LENGTH', 20);
?>