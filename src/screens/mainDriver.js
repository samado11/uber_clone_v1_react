/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import io from "socket.io-client";
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
import { goToScreen } from './../utils/navigation'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import haversine from "haversine";
import geolocation from '@react-native-community/geolocation';


const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;
const LATITUDE = 26.8205528;
const LONGITUDE = 30.8024979;
let dummy_user = { "email": "NULL", "password": "NULL", "activated": true, "notification": true, "deleted": false, "name": "NULL", "phone": "NULL", "type": "NULL", "tokens": [], "createdAt": "2020-03-11T23:25:14.458Z", "updatedAt": "2020-03-11T23:25:14.458Z", "id": 21 }
let suser, token ,user
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
    // suser = this.props.user;
    // user = JSON.parse(suser['_55'])
    // console.log("lllllll ",user.id);
    
  }

  async  requestLocationPermission() {
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
    try {
      var socket = io("https://uber-2.herokuapp.com/", {
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


          const data = { "longitude": newCoordinate.longitude, "latitude": newCoordinate.latitude, "id": user.id }
          console.log("new " + data.id)
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
    catch (error) {
      console.log(error);

    }
  }


  render() {
    
    return (
      <View >
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.setItem('user', JSON.stringify(dummy_user));
          await AsyncStorage.setItem('token', JSON.stringify(dummy_user));
          goToScreen('Login')
        }} style={{ backgroundColor: "red", margin: 10 }}>
          <Text style={{ color: "white", alignSelf: "center" }} >logout</Text>
        </TouchableOpacity>
        <Text>Hello {user.name}</Text>
      </View>
    );
  }
}

const mapStateToProps = ({ user, token }) => ({
  user,
  token
});

// const mapDispatchToProps = {
//   getRepoDetail
// };

export default connect(mapStateToProps)(AnimatedMarkers);
