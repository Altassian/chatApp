import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

  var config = {
    apiKey: "AIzaSyDKg8wkqS_Jgxlcu6DlDfnS1tpEK5RXYeg",
    authDomain: "devicyl.firebaseapp.com",
    databaseURL: "https://devicyl.firebaseio.com",
    projectId: "devicyl",
    storageBucket: "devicyl.appspot.com",
    messagingSenderId: "1084652541341"
  };
  firebase.initializeApp(config); 
  
  export default firebase;