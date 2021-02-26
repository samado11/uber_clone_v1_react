import React,{useEffect, useContext,  useState } from 'react';
import { Image,View, Text ,Dimensions,Button ,StyleSheet,TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import {goToScreen} from '../utils/navigation'
import { connect } from 'react-redux';
import {store} from '../reducers/index';


let token
let user,typ

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
          

  return (
    
    <View style={styles.container}>
      <Image style={styles.fixed} source={require('../imgs/taxi.jpg')}>

      </Image>
      <View >

    <TouchableOpacity
      style={styles.button}

      onPress={() =>
        {
          
          store.dispatch({type: 'SET_TYPE', payload:{typ:'DRIVER'} });
          goToScreen('Login')
      }}
    >
<Text style = {styles.buttonText}>
       Driver
   </Text>
</TouchableOpacity >

    <TouchableOpacity
       style={styles.button}
      onPress={() =>  {
        store.dispatch({type: 'SET_TYPE',payload:{typ:'CLIENT'} });
          goToScreen('Login')
        
        }}
    >
<Text style = {styles.buttonText}>
       Client
   </Text>
      </TouchableOpacity >
    </View>
    </View>

  );
};


const styles = StyleSheet.create({
  
  container: {
      justifyContent: 'center',
      alignItems: 'center',
  },
  fixed:{
      width: Dimensions.get("window").width,
  height: Dimensions.get("window").height, 
      zIndex: -1,
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0
  },
  button:{
    borderRadius:15,
    backgroundColor:'#fd8c04',
    padding:8,
    width:width*0.5,
    marginTop:height*0.2,
    
  },
  buttonText:{
    color:"white",
    alignSelf:"center",
    fontSize:16
  }

 
});


const mapStateToProps = state => ({
  user: user,
  token: token,
  typ:typ
})

export default connect(mapStateToProps)(UserTypes)


