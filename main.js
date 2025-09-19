// main.js - Main entry point for the dashboard application
// This version works without ES modules

console.log('Main.js loaded');

// Initialize the dashboard when the DOM is fully loaded
if (document.readyState === 'loading') {
    // DOM is still loading, wait for it to complete
    document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing dashboard');
        if (typeof initDashboard !== 'undefined') {
            initDashboard();
            console.log('Dashboard initialization called');
        } else {
            console.error('initDashboard function not found');
        }
    });
} else {
    // DOM is already loaded, initialize immediately
    console.log('DOM already loaded, initializing dashboard');
    if (typeof initDashboard !== 'undefined') {
        initDashboard();
        console.log('Dashboard initialization called');
    } else {
        console.error('initDashboard function not found');
    }
}