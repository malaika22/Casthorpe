import firebase from 'firebase/app';
// import 'firebase/firestore';
import 'firebase/auth'
  
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: window.apiKey,
    authDomain: "chatastrophe-60f0c.firebaseapp.com",
    projectId: "chatastrophe-60f0c",
    storageBucket: "chatastrophe-60f0c.appspot.com",
    messagingSenderId: window.messagingSenderId,
    appId: "1:748920034679:web:02a15eb20fcd70f3b27d72",
    measurementId: "G-B9EPEG26J5"
  };
  // Initialize Firebase
  window.firebase = firebase;
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

  export default firebase;