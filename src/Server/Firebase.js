import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyClsUl-bqpKBno0RhvMChuZxnZzTUxDaSE",
    authDomain: "groupchatapp-736b5.firebaseapp.com",
    projectId: "groupchatapp-736b5",
    storageBucket: "groupchatapp-736b5.appspot.com",
    messagingSenderId: "302303995788",
    appId: "1:302303995788:web:b1ab83c24ac193b50018a9",
    measurementId: "G-ENPDVYK2RY"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  
  export default firebase;