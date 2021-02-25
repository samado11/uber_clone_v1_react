import { Navigation } from "react-native-navigation";
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from './src/reducers/index';
import App from "./App";
import Signup from "./src/screens/signup";
import Client from "./src/screens/mainClient";
import Captin from "./src/screens/mainDriver";
import Login from "./src/screens/login";
import firebase from 'firebase';

export const startApp= function(){

  var firebaseConfig = {
    apiKey: "AIzaSyBEBnY-mLtXbzEJP1326qIJoQcaxdSxOPg",
    authDomain: "uber-e1d9c.firebaseapp.com",
    databaseURL: "https://uber-e1d9c-default-rtdb.firebaseio.com",
    projectId: "uber-e1d9c",
    storageBucket: "uber-e1d9c.appspot.com",
    messagingSenderId: "948683507610",
    appId: "1:948683507610:web:07974658b8c001a86a1c23",
    measurementId: "G-S5W7QKG20K"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  Navigation.registerComponentWithRedux(`WelcomeScreen`, () => App, Provider, store);
  Navigation.registerComponentWithRedux(`Signup`, () => Signup, Provider, store);
  Navigation.registerComponentWithRedux(`Client`, () => Client, Provider, store);
  Navigation.registerComponentWithRedux(`Captin`, () => Captin, Provider, store);
  Navigation.registerComponentWithRedux(`Login`, () => Login, Provider, store);

// console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",root);



 Navigation.events().registerAppLaunchedListener(async() => {
 Navigation.setDefaultOptions({
  statusBar: {
    visible: true,
    backgroundColor: '#061114',
    style: 'white'
  },
  topBar: {
    drawBehind: true,
    visible: false,
    animate: false,
  },
  layout: {
    backgroundColor: 'white',
    orientation: ['portrait'],
  },
  animations: {
    push: {
      waitForRender: true,
    },
    showModal: {
      waitForRender: true,
    },
  },
});

let user=await AsyncStorage.getItem('user')
let parse_user =JSON.parse(user)
let ScreenName = 'Login'
if(!parse_user){
   ScreenName='Login'
}
else{
if(parse_user.type=='CLIENT')
  {
    ScreenName='Client'
  }
  else if(parse_user.type=='DRIVER'){
    ScreenName='Captin'
  }
  else{
   ScreenName='Login'
  }
 }

 Navigation.setRoot({
  root: {
    stack: {
      id:'AppStack',
      children:[
        {
          component:{
            name: ScreenName
          }
        }
      ]
     
    }
  }
});

 
});
console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

}
