import firebase from 'firebase/app' 
import 'firebase/storage';
import 'firebase/firestore';
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCQuo6fb1FqpJWz4JlsYD20n3LYJ5GFmmc",
    authDomain: "plat-centro-neurosensorial.firebaseapp.com",
    projectId: "plat-centro-neurosensorial",
    storageBucket: "plat-centro-neurosensorial.appspot.com",
    messagingSenderId: "633300491352",
    appId: "1:633300491352:web:fe6a3f1d1adaaddb533e2d",
    measurementId: "G-PXK3KK3HHL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  

  const projectStorage = firebase.storage();
  const projectFirestore = firebase.firestore(); 
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;


  export {projectStorage, projectFirestore , timestamp };