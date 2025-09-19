// firebase-config.js - Firebase configuration for Flowsure CRM
// This file contains the Firebase configuration and initialization code

// Firebase configuration - replace with your actual Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get Firestore instance
const db = firebase.firestore();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { db };
} else {
  window.db = db;
}