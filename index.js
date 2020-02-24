import { Navigation } from "react-native-navigation";

import App from "./App";
import Signup from "./src/screens/signup";
import Client from "./src/screens/mainClient";
import Captin from "./src/screens/main";


Navigation.registerComponent(`WelcomeScreen`, () => App);
Navigation.registerComponent(`Signup`, () => Signup);
Navigation.registerComponent(`Client`, () => Client);
Navigation.registerComponent(`Captin`, () => Captin);


Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      backgroundColor: '#fff',
      style: 'dark'
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
  Navigation.setRoot({
    root: {
      stack: {
        id:'AppStack',
        children:[
          {
            component:{
              name: "WelcomeScreen"
            }
          }
        ]
       
      }
    }
  });
});