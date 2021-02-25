

import { startApp } from './App';
import firebase from 'firebase';

console.disableYellowBox = true;
const firebaseConfig = {
  apiKey: "AIzaSyCMloITaUWho1BSwLwSMEe70cVAztMkh9c",
  authDomain: "uber-ii.firebaseapp.com",
  projectId: "uber-ii",
  storageBucket: "uber-ii.appspot.com",
  messagingSenderId: "229176029737",
  appId: "1:229176029737:web:3164fdc146f2803ae6e238",
  measurementId: "G-THDXK9TRNQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  startApp();




