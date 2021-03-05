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
import { connect } from 'react-redux';
import haversine from "haversine";
import io from "socket.io-client"
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
let dummy_user = { "email": "NULL", "password": "NULL", "activated": true, "notification": true, "deleted": false, "name": "NULL", "phone": "NULL", "type": "NULL", "tokens": [], "createdAt": "2020-03-11T23:25:14.458Z", "updatedAt": "2020-03-11T23:25:14.458Z", "id": 21 }
// let locs = [
//   { id: 1, latitude: LATITUDE, longitude: LONGITUDE }
// ]

class AnimatedMarkers extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    let user
    AsyncStorage.getItem('user').then((async_user => {
      user = JSON.parse(async_user)
      console.log(user.type);
    }))
    this.state = {
      loc_lat: LATITUDE,
      loc_long: LONGITUDE,
      locs : [
        { id: 1, latitude: LATITUDE, longitude: LONGITUDE }
      ]
    };


  }

  componentDidMount() {

    this._isMounted = true;
    var socket = io("https://uber-2.herokuapp.com/");
    var latitude, longitude
    Geolocation.getCurrentPosition(info => {
      this.setState({
        loc_lat: info.coords.latitude,
        loc_long: info.coords.longitude,
      });
      console.log("hahahahahah " + this.state.locs[0].latitude);

    }


    );
    socket.on('location', (msg) => {
      latitude = parseFloat(msg.latitude);
      longitude = parseFloat(msg.longitude);
      id = parseFloat(msg.id);
      if (this._isMounted) {
        let count = -1
        let match = this.state.locs.find((element) => { count++; return element.id === msg.id; })
        if (match) {
          // this.state.locs[count].latitude = msg.latitude
          // this.state.locs[count].longitude = msg.longitude

          let locs = [...this.state.locs];     // create the copy of state array
          locs[count] = msg;                  //new value
          this.setState({ locs }); 
        }
        else {
          // this.state.locs.push(msg)
          this.setState({
            locs: [...this.state.locs, msg]
          })
        }
      }
      console.log("lat " + this.state.locs.length);
      
    });



  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    const { user, token } = this.props;
    return (

      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={async () => {
          await AsyncStorage.setItem('user', JSON.stringify(dummy_user));
          await AsyncStorage.setItem('token', JSON.stringify(dummy_user));
          goToScreen('UserTypes')
        }} style={{ backgroundColor: "red", margin: 10 }}>
          <Text style={{ color: "white", alignSelf: "center" }} >logout</Text>
        </TouchableOpacity>

        <MapView
          style={{flex:1}}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          region={{
            latitude: this.state.loc_lat,
            longitude: this.state.loc_long,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          }}
        >
          {this.state.locs.map(marker => (
            <Marker
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={marker.title}
              description={marker.description}
              image={require('../../taxi1.png')}
            />
          ))}
        </MapView>
        <View >
        <View style={styles.inputBox}>
          
        <TouchableOpacity onPress={()=>goToScreen('Search')}>
            <Text style={styles.inputText}>Where to?</Text>
            </TouchableOpacity>
             <View style={styles.timeContainer}>
             <AntDesign name={"clockcircle"} size={16} color={'#535353'}/>
             <Text>Now</Text>
             <MaterialIcons name={'keyboard-arrow-down'} size={16} />
             </View>
        </View>
        <View style={styles.row}>
            <View style={styles.iconContainer}>
            <AntDesign name={"clockcircle"} size={13} color={'#ffffff'}/>

            </View>
            <Text style={styles.destinationText}>Spin Nightclub</Text>
        </View>
        <View style={styles.row}>
            <View style={[styles.iconContainer,{backgroundColor:'#218cff'}]}>
            <Entypo name={"home"} size={13} color={'#ffffff'}/>
            </View>
            <Text style={styles.destinationText}>Home</Text>
        </View>
    </View>
      </View>
    );
  }
}

const mapStateToProps = ({ user, token }) => ({
  user: user,
  token: token
});


const styles = StyleSheet.create({
  inputBox: {
   backgroundColor:'#e7e7e7',
   padding:10,
   margin:10,
   flexDirection:'row',
   justifyContent:'space-between',
   alignItems:'center'
  },
  inputText:{
  color:'#434343',
  fontSize:15,
  fontWeight:'600'
  },
  timeContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      width:100,
      backgroundColor:'#fff',
      padding:10,
      borderRadius:20

  },
  row:{
      flexDirection:'row',
      alignItems:'center',
      padding:15,
      borderBottomWidth:1,
      borderColor:"#b3b3b3"
  },
  iconContainer:{
      backgroundColor:"#b3b3b3",
      padding:5,
      borderRadius:25
  },
  destinationText:{
    marginLeft:10,
    fontWeight:"500",
    fontSize:13
  }

  
});

export default connect(mapStateToProps)(AnimatedMarkers);