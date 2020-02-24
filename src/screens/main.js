/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import io  from "socket.io-client";
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
import geolocation from '@react-native-community/geolocation';


const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;
const LATITUDE = 26.8205528;
const LONGITUDE = 30.8024979;


class AnimatedMarkers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    };
  }

  async  requestLocationPermission(){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Uber App',
          'message': 'Uber App access to your location '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        // alert("You can use the location");
      } else {
        console.log("location permission denied")
        alert("Location permission denied");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async componentDidMount() {
    try{
      var socket = io("https://uber-2.herokuapp.com/",{
        jsonp: false,
        transports: ['websocket'],
    });

    await this.requestLocationPermission()
    const { coordinate } = this.state;

    this.watchID = await geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };
        
      
        const data={"longitude":newCoordinate.longitude,"latitude":newCoordinate.latitude}
        console.log("new "+data.longitude)
        socket.emit('location', data);
        

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 5
      }
    );
  }
  catch(error){
    console.log(error);
    
  }
  }


  render() {
    return (
      <View >
        <Text>Hello Captin</Text>
      </View>
    );
  }
}

export default AnimatedMarkers;
