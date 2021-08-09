/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js")

console.log(firebase)

firebase.initializeApp({
    apiKey: "AIzaSyD_kMbDUkvZadepqCL0ovSNgBv5njaeZL4",
    authDomain: "chatastrophe-60f0c.firebaseapp.com",
    projectId: "chatastrophe-60f0c",
    storageBucket: "chatastrophe-60f0c.appspot.com",
    messagingSenderId: "748920034679",
    appId: "1:748920034679:web:02a15eb20fcd70f3b27d72",
    measurementId: "G-B9EPEG26J5"
  });

  console.log(firebase.messaging());
  
/* eslint-disable no-restricted-globals */
self.addEventListener('install' , () =>{
    console.log('Installed')
})

self.addEventListener('activate' , () =>{
    console.log('Activate')
})

self.addEventListener('fetch' , event =>{
    console.log('Request', event.request)
})
console.log('change')

