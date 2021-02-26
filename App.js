import { Navigation } from "react-native-navigation";
import {Provider} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {store} from './src/reducers/index';
import App from "./App";
import Signup from "./src/screens/signup";
import Client from "./src/screens/mainClient";
import Captin from "./src/screens/mainDriver";
import Login from "./src/screens/login";
import UserTypes from "./src/screens/userType";


export const startApp= function(){



  Navigation.registerComponentWithRedux(`WelcomeScreen`, () => App, Provider, store);
  Navigation.registerComponentWithRedux(`Signup`, () => Signup, Provider, store);
  Navigation.registerComponentWithRedux(`Client`, () => Client, Provider, store);
  Navigation.registerComponentWithRedux(`Captin`, () => Captin, Provider, store);
  Navigation.registerComponentWithRedux(`Login`, () => Login, Provider, store);
  Navigation.registerComponentWithRedux(`UserTypes`, () => UserTypes, Provider, store);

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
let ScreenName = 'UserTypes'
if(!parse_user){
   ScreenName='UserTypes'
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
   ScreenName='UserTypes'
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
