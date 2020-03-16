import axios from 'axios';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
import {goToScreen} from './../utils/navigation'
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import {store} from '../reducers/index';
const {width,height}=Dimensions.get('window')
let token
let user


class login extends Component{

    constructor(props){
        super(props);
        


         
    }
    async login() {
        try{
        console.log(this.state);
        const { email, password } = this.state;
        const data= {
            email:email,
            password: password
          }
        await axios.post('https://uber-2.herokuapp.com/user/usersignin',data, { headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar'
          }}).then(async(data) => {
            // console.log(data);
            user=data.data.user
            token=data.data.token
            await AsyncStorage.setItem('user', JSON.stringify(data.data.user))
            await AsyncStorage.setItem('token', JSON.stringify(data.data.token))
            let x = await AsyncStorage.getItem('user');
            console.log("kkkkk ",x);
            
            store.dispatch({type: 'LOGGED_IN', payload:{token:data.data.token,user:data.data.user}})
            // console.log(await AsyncStorage.getItem('User'))
            console.log(data.data.user.type);
            if(data.data.user.type=="DRIVER"){
                goToScreen('Captin')
            }
            else{
                goToScreen('Client') 
            }
            
          }).catch((error)=>{
             console.log(error);
             alert(error.response.data);
          });
          
        }
        catch(error){
            console.log('There has been a problem with your fetch operation')
        }
    }

render() {
        return(
            <View style={styles.container}>
                <Image style={styles.fixed} source={require('../imgs/taxi.jpg')}>

                </Image>
                <View style={{top:height*0.2}}>
                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#fff"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#fff"
                ref={(input) => this.password = input}
                />
 
                <TouchableOpacity onPress={()=>this.login()} style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity > 
                    <Text style={{color:"white",alignSelf:"center"}}  onPress={()=>goToScreen('Signup')}>Signup?</Text>
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



  const mapStateToProps = state => ({
    user: user,
    token: token
})

export default connect(mapStateToProps)(login)