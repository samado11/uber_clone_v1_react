import React, {useState,useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, SafeAreaView } from 'react-native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const Search = (props) => {
    const [fromText,setFromText] = useState( '');
    const [destinationText,setDestinationText] = useState( '');
    useEffect ( ()=>{
        
     if(fromText && destinationText){
         console.warn("Redirect to results");
     }
    },[fromText,destinationText])
    return (
      <SafeAreaView>
        <View style={styles.container}>
        <GooglePlacesAutocomplete
      placeholder='from'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setFromText(data,details);
      }}
      styles={{
          textInput:styles.textInput
      }}
    //   fetchDetails={true}
      query={{
        key: 'AIzaSyDE0ssGm5Ff0IuEBp_zOR1lXQ9Vi0lgC1c',
        language: 'en',
      }}
      
    />
<GooglePlacesAutocomplete
      placeholder='where to?'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setDestinationText(data,details);
      }}
      styles={{
          textInput:styles.textInput
      }}
    //   fetchDetails={true}
      query={{
        key: 'AIzaSyDE0ssGm5Ff0IuEBp_zOR1lXQ9Vi0lgC1c',
        language: 'en',
      }}
      
    />
        </View>
      </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
    container: {
     padding:40,
     backgroundColor:'#eee',
     height:'100%'
    },
    TextInput:{
        height:50,
    backgroundColor:"#eee",
    marginVertical:5,
    
    },
 
 
 
    
 });
 

export default Search;
