import axios from 'axios';
import React, { Component } from 'react';
import {goToScreen} from './../utils/navigation'
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
const {width,height}=Dimensions.get('window')


class signup extends Component{
    constructor() {
        super();
        this.state = {
            name:" ",
            email: " ",
            password: " ",
            phone:" ",
            confirmPassword:" "
        
        };
      }
      
      async signup(){
        try{
            console.log(this.state);
            const { email, password, name, phone,confirmPassword } = this.state;
            const data= {
                email:email,
                name:name,
                password: password,
                phone:phone,
                confirmPassword:confirmPassword,
                type:"CLIENT"
              }
            await axios.post('https://uber-2.herokuapp.com/user/usersignup',data, { headers: {
                'Content-Type': 'application/json',
                'Accept-Language': 'en'
              }}).then(async(data) => {
                // console.log(data);
                await AsyncStorage.setItem('User', JSON.stringify(data.data.user))
                await AsyncStorage.setItem('Token', JSON.stringify(data.data.token))
                console.log(await AsyncStorage.getItem('User'))
                goToScreen('WelcomeScreen')
              }).catch((error)=>{
                 console.log(error.response.data.errors);
                 alert(error.response.data.errors);
              });
              
            }
            catch(error){
                console.log(error)
            }
          
      }

render() {
        return(
            <View style={styles.container}>
                <Image style={styles.fixed} source={require('../imgs/taxi.jpg')}>

                </Image>
                <View style={{top:height*0.2}}>
                <TextInput style={styles.inputBox}
                onChange={(event) => {this.setState({name: event.nativeEvent.text})}}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Name"
                placeholderTextColor = "#fff"
                selectionColor="#fff"
                keyboardType="email-address"
                />
                <TextInput style={styles.inputBox}
                onChange={(event) => {this.setState({email: event.nativeEvent.text})}}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#fff"
                selectionColor="#fff"
                keyboardType="email-address"
                />

                <TextInput style={styles.inputBox}
                onChange={(event) => {this.setState({phone: event.nativeEvent.text})}}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Phone"
                placeholderTextColor = "#fff"
                selectionColor="#fff"
                keyboardType="numeric"
                />
                
                <TextInput style={styles.inputBox}
                onChange={(event) => {this.setState({password: event.nativeEvent.text})}}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#fff"
                ref={(input) => this.password = input}
                />
                <TextInput style={styles.inputBox}
                onChange={(event) => {this.setState({confirmPassword: event.nativeEvent.text})}}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Confirm Password"
                secureTextEntry={true}
                placeholderTextColor = "#fff"
                ref={(input) => this.confirmPassword = input}
                />
 
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={()=>this.signup()}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity > 
                    <Text style={{color:"white",alignSelf:"center"}} onPress={()=>goToScreen('Login')}>Login?</Text>
                </TouchableOpacity>
                </View>
            </View>
            
        )
}
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
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

export default signup