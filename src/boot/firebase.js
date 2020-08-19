// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/database");

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDSV6QarvP5f2hg-kctQ3FwP-nykrUq9nc",
  authDomain: "opp-chat-1c8fc.firebaseapp.com",
  databaseURL: "https://opp-chat-1c8fc.firebaseio.com",
  projectId: "opp-chat-1c8fc",
  storageBucket: "opp-chat-1c8fc.appspot.com",
  messagingSenderId: "464107108687",
  appId: "1:464107108687:web:4835415eacc63a7706ad3a"
};
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
