import axios from 'axios';
import React, { Component } from 'react';
import { Navigation } from 'react-native-navigation'
// import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions
} from 'react-native';
const {width,height}=Dimensions.get('window')



class login extends Component{

    async login(res) {
        try{
        console.log(this.state);
        const { email, password } = this.state;
        const data= {
            email:email,
            password: password,
            type:"CLIENT"
          }
        await axios.post('localhost/usersignin',data, { headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'ar'
          }}).then(async(data) => {
            console.log(data);
            await AsyncStorage.setItem('User', JSON.stringify(data.data.user))
            await AsyncStorage.setItem('Token', JSON.stringify(data.data.token))
            // console.log(await AsyncStorage.getItem('User'))
            this.goToScreen('Profile')
          }).catch((error)=>{
             console.log("Api call error");
             alert(error.response.data.errors);
          });
          
        }
        catch(error){
            console.log('There has been a problem with your fetch operation')
        }
    }

render() {
        return(
            <View style={styles.container}>
                <TextInput style={styles.inputBox}
                onChangeText={(email) => this.setState({email})}
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email"
                placeholderTextColor = "#002f6c"
                selectionColor="#fff"
                keyboardType="email-address"
                onSubmitEditing={()=> this.password.focus()}/>
                
                <TextInput style={styles.inputBox}
                onChangeText={(password) => this.setState({password})} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor = "#002f6c"
                ref={(input) => this.password = input}
                />
 
                <TouchableOpacity style={styles.button}> 
                    <Text style={styles.buttonText} onPress={this.saveData}>{this.props.type}</Text>
                </TouchableOpacity>
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
        backgroundColor: '#eeeeee', 
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#002f6c',
        marginVertical: 10
    },
    button: {
        width: 300,
        backgroundColor: '#4f83cc',
        borderRadius: 25,
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

export default login