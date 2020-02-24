import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'



export function goToScreen (screenName) {
    Navigation.push("AppStack", {
      component: {
        name: screenName
      }
    })
  }
