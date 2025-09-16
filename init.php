<?php
/**
 * Initialization file for Flowsure CRM
 * Includes necessary files and starts session
 */

// Define ALLOW_CONFIG to allow access to config.php
define('ALLOW_CONFIG', true);

// Include configuration and database connection
require_once 'config.php';
require_once 'db_connect.php';
require_once 'auth_functions.php';

// Error reporting based on configuration
error_reporting(ERROR_REPORTING);
if (DISPLAY_ERRORS) {
    ini_set('display_errors', 1);
} else {
    ini_set('display_errors', 0);
}

?>