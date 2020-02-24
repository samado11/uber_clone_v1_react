import React,{Component} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  Button,
  PermissionsAndroid
} from "react-native";
import {goToScreen} from './src/utils/navigation'


class App extends Component {
 

  render() {
    return (
      <View >
                <TouchableOpacity style={styles.button} onPress={()=>goToScreen('Client')}> 
                    <Text style={styles.buttonText} >Client</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>goToScreen('Captin')}> 
                    <Text style={styles.buttonText} >Captin</Text>
                </TouchableOpacity>
      </View>
    );
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

export default App;
