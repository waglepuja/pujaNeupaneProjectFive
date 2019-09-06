import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCLr6SnNGkGmMI08dMY_yMhS1zUDUba46s",
    authDomain: "shopping-app-6690e.firebaseapp.com",
    databaseURL: "https://shopping-app-6690e.firebaseio.com",
    projectId: "shopping-app-6690e",
    storageBucket: "",
    messagingSenderId: "903348305193",
    appId: "1:903348305193:web:169ac9ee8bc06b60268b38"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;