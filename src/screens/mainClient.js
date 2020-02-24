import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import io  from "socket.io-client"
import Geolocation from '@react-native-community/geolocation';

const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;

class AnimatedMarkers extends React.Component {
   _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      loc_lat:LATITUDE,
      loc_long:LONGITUDE
    };
    
    
  }
  componentDidMount() {
    this._isMounted = true;
    var socket = io("https://uber-2.herokuapp.com/");
    var latitude, longitude
    Geolocation.getCurrentPosition(info =>{
      this.setState({
        loc_lat:info.coords.latitude,
        loc_long:info.coords.longitude,
      });
      console.log("hahahahahah "+info.coords.latitude);
      

    } 

      
    );
        socket.on('location',  (msg) => {
            latitude=parseFloat(msg.latitude);
            longitude=parseFloat(msg.longitude);
            if (this._isMounted) {
             this.setState({
              latitude,
              longitude,
            });
          }
            console.log("lat "+this.state.latitude);
          console.log("long "+this.state.longitude);
          });

          

  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    return (

      <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      region={{
      latitude: this.state.loc_lat,
      longitude: this.state.loc_long,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421}}
   >
     <Marker
            coordinate={{latitude: this.state.latitude,
              longitude: this.state.longitude}}
            title={"title"}
            description={"description"}
            image={require('../../car.png')}
         />
     </MapView>

    );
  }
}

export default AnimatedMarkers;