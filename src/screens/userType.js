import React,{useEffect, useContext,  useState } from 'react';
import { Image,View, Text ,Dimensions,Button } from 'react-native';
import styles from './styles'
import firebase from 'firebase';
import {Context } from '../../utils/store'
import {goToScreen} from '../../utils/navigation'

const {width,height}=Dimensions.get('window')

const UserTypes = (props) => {

    const writeUserData=(id,lang,lat)=>{
        firebase.database().ref('Locs/').set({
            id,
            lang,
            lat
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })
    }
          


    const {state, dispatch} = useContext(Context);
  return (
    
    <View style={styles.container}>
      <Image style={styles.fixed} source={require('../../assets/images/taxi.jpg')}>

      </Image>
      <View style={{top:height*0.2}}>
    <Button
      
      title="Driver"
      onPress={() =>
        {
          
          dispatch({type: 'SET_TYPE', payload: 'DRIVER'});
          goToScreen('Login')
      }}
    />
    <Button
      title="Client"
      onPress={() =>  {
          dispatch({type: 'SET_TYPE', payload: 'CLIENT'});
          goToScreen('Login')
        
        }}
    />
    </View>
    </View>

  );
};



export default UserTypes;


