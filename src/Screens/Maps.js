import React, { Component } from 'react';
import { Dimensions, StyleSheet, View, AsyncStorage, Text, Image, ScrollView, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import MapView, {  Marker } from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import firebase from 'firebase';
import { withNavigation } from 'react-navigation'
import FirebaseSvc from '../firebase/firebase'

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: null,
      lastLong: null,
      users: []
    }
    // this.bind(this.Logout)
  }

  Logout = async () => {
    

};
static navigationOptions = ({ navigation }) => {
  return {
  headerRight: (
    <TouchableOpacity onPress={async() => {
      const userToken = await AsyncStorage.getItem('uid');
    firebase.database().ref('/user/' + userToken).update({ status: "offline" })
    let keys = ['uid', 'name', 'image']
    await AsyncStorage.multiRemove(keys, (error) => {
        navigation.navigate('MainTabView')
    });
    }} >
      <Text>logout</Text>
    </TouchableOpacity>
  ),
  headerLeft: (
    <TouchableOpacity>
    <Image source={{uri: 'https://png.pngtree.com/png-clipart/20190630/original/pngtree-vector-chat-icon-png-image_4144513.jpg'}} style={styles.img} />
  </TouchableOpacity>
  )
}
}

  async componentDidMount() {
    await this.user()
    this.watchID = geolocation.getCurrentPosition((position) => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: 0.00922 * 1.5,
        longitudeDelta: 0.00421 * 1.5
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error) => console.log(error));
  }
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // // If there are no new values set the current ones
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }

  user = () => {
    firebase.database().ref('user/').once('value', (result) => {
      let data = result.val();
      if (data !== null) {
        let users = Object.values(data);
        this.setState({
          users
        })
      }
    });
  }
  render() {    
    // console.warn(this.state.users);
    
    return (
      <View style={styles.con}>
        <MapView
          style={styles.map}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
          zoomControlEnabled={true}
          showsCompass={true}
          minZoomLevel={0}
          maxZoomLevel={20}
        >
          {this.state.users.map((item, index) =>
            <Marker onPress={()=> this.props.navigation.navigate('Chat',
            {uid: item.id, image: item.image, name: item.name, status: item.status})}
              key={index}
              coordinate={{
                latitude: item.latitude || 0,
                longitude: item.longitude || 0
              }}>
              <View style={styles.mapCoor}>
                {/* <Text style={styles.name}>{item.name}</Text> */}
                <Image
                  source={{ uri: item.image}}
                  style={styles.image} />
              </View>
              <Text style={styles.name}>{item.name}</Text>
            </Marker>)}
        </MapView>
      </View>
    );
  }
}
export default withNavigation(Maps)
const styles = StyleSheet.create({
  con: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  map: {
    width: '100%',
    height: '100%'
  },
  mapCoor: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 50,
    justifyContent: 'center'
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  name: {
    fontSize: 10,
    textAlign: 'center',
    marginBottom: '2%'
  },
  img: {
    height: 30,
    width: 30,

  }
})