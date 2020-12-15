import firebase from 'firebase/app'

import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9GonqQhJyB5xUh1k9eBx6olkBbwuHFhg",
    authDomain: "react-upload-f7be2.firebaseapp.com",
    projectId: "react-upload-f7be2",
    storageBucket: "react-upload-f7be2.appspot.com",
    messagingSenderId: "600364654260",
    appId: "1:600364654260:web:4188da690c946d6c7281e1",
    measurementId: "G-JB40NZ3MW0"
  };


firebase.initializeApp(firebaseConfig)

const storage = firebase.storage();

export { storage, firebase as default };