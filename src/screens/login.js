import axios from 'axios';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
import {goToScreen} from './../utils/navigation'
import AsyncStorage from '@react-native-community/async-storage';
import { SocialIcon } from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import {store} from '../reducers/index';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
const {width,height}=Dimensions.get('window')

async function onFacebookButtonPress() {
  try{
  // Attempt login with permissions
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
catch(error){
    console.log(error)
}
}

class login extends Component{

    constructor(props){
        super(props);         
    }

    // async login() {
    //     try{
    //     console.log(this.state);
    //     const { email, password } = this.state;
    //     const data= {
    //         email:email,
    //         password: password
    //       }
    //     await axios.post('https://uber-2.herokuapp.com/user/usersignin',data, { headers: {
    //         'Content-Type': 'application/json',
    //         'Accept-Language': 'ar'
    //       }}).then(async(data) => {
    //         // console.log(data);
    //         user=data.data.user
    //         token=data.data.token
    //         await AsyncStorage.setItem('user', JSON.stringify(data.data.user))
    //         await AsyncStorage.setItem('token', JSON.stringify(data.data.token))
    //         let x = await AsyncStorage.getItem('user');
    //         console.log("kkkkk ",x);
            
    //         store.dispatch({type: 'LOGGED_IN', payload:{token:data.data.token,user:data.data.user}})
    //         // console.log(await AsyncStorage.getItem('User'))
    //         console.log(data.data.user.type);
    //         if(data.data.user.type=="DRIVER"){
    //             goToScreen('Captin')
    //         }
    //         else{
    //             goToScreen('Client') 
    //         }
            
    //       }).catch((error)=>{
    //          console.log(error);
    //          alert(error.response.data);
    //       });
          
    //     }
    //     catch(error){
    //         console.log('There has been a problem with your fetch operation')
    //     }
    // }


render() {
  const { user, token,typ } = this.props;
    return (
        
        <View style={styles.container}>
          <Image style={styles.fixed} source={require('../imgs/taxi.jpg')}>
    
          </Image>
          <View style={{top:height*0.2}}>
          <View style={{ flexDirection: 'column' }}>
		<SocialIcon
      style={{paddingHorizontal:15}}
		  title="Sign In with facebook"
      button
      type="facebook"
      onPress={ () => onFacebookButtonPress().then((d) =>{ 
        console.log(typ);
        if(typ=="CLIENT")
          {goToScreen('Client')}
        else
        {goToScreen('Captin')}
        })}
    
		/>
	  </View>
 
    <View style={{ width: '100%'}}>
            <SocialIcon
              style={{paddingHorizontal:15}}
              title="Sign In Google Plus"
              button
              type="google-plus-official"
              onPress={() => {
                alert('google');
              }}
            />
          </View>
          <View style={{ width: '100%'}}>
            <SocialIcon
            style={{paddingHorizontal:15}}
              title="Sign In with Twitter"
              button
              type="twitter"
              onPress={() => {
                alert('twitter');
              }}
            />
          </View>
          <View style={{ width: '100%' }}>
            <SocialIcon
            style={{paddingHorizontal:15}}
              title="Sign In with GitHub"
              button
              type="github"
              onPress={() => {
                alert('github');
              }}
            />
          </View>
        </View>
        </View>
    
      );
}
}

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
    inputBox: {
        width: 300,
        backgroundColor: 'transparent', 
        borderRadius: 0,
        // paddingHorizontal: 16,
        fontSize: 16,
        color: '#fff',
        marginVertical: 10,
        borderBottomWidth:2,
        borderBottomColor:"#ffc64d"
    },
    button: {
        width: 300,
        backgroundColor: '#253746',
        borderRadius: 5,
        marginVertical: 10,
        paddingVertical: 12
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});


const mapStateToProps = ({ user, token,typ }) => ({
  user: user,
  token: token,
  typ:typ
});
export default connect(mapStateToProps)(login)