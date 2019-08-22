import React, { Component } from 'react'
import { 
    Dimensions, 
    TextInput, 
    TouchableOpacity, 
    Text, 
    View, 
    StyleSheet, 
    Image, 
    Alert, 
    AsyncStorage, 
    KeyboardAvoidingView, 
    StatusBar 
} from 'react-native'

import firebase from 'firebase'
import FirebaseSvc from '../firebase/firebase'
import { withNavigation } from 'react-navigation';
import Geolocation from '@react-native-community/geolocation'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }
    onPressLogin = async () => {
        await this.getLocation()
        await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(async (result) => {
                await firebase.database().ref('/user/' + result.user.uid).update({ status: 'online', latitude: this.state.latitude, longitude: this.state.longitude }).catch((error) => {
                    console.warn('gghdhdx',error);
                    
                })
                // console.log('resulttttt', result)
                AsyncStorage.setItem('uid', result.user.uid);
                AsyncStorage.setItem('name', result.user.displayName);
                AsyncStorage.setItem('image', result.user.image);
                AsyncStorage.getItem('uid', (error, result) => {
                    if (result) {
                        this.setState({
                            email: '',
                            password: ''
                        })
                        Alert.alert(
                            'Login',
                            'Login Success',
                            [
                                { text: 'OK', onPress: () => this.props.navigation.navigate('Maps') },
                            ],
                        );
                    }
                })
            })
    }

    getLocation = async () => {
        Geolocation.getCurrentPosition(info => {
          this.setState({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
          })
        });
      }
      updateLocation = async () => {
        AsyncStorage.getItem('uid', (error, result) => {
          if (result) {
            if (this.state.latitude) {
              firebase.database().ref('user/' + result).update({
                latitude: this.state.latitude,
                longitude: this.state.longitude
              })
            }
          }
        });
      }

    render() {
        this.updateLocation()
        return (
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputField}
                        placeholder={'email'}
                        returnKeyType='next'
                        onSubmitEditing={() => this.passwordInput.focus()}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        autoCorrect={false} />

                    <TextInput
                        style={styles.inputField}
                        placeholder={'password'}
                        returnKeyType='go'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password} 
                        ref={(input) => this.passwordInput = input}/>

                    <TouchableOpacity style={styles.loginButton} onPress={this.onPressLogin}>
                        <Text style={styles.buttonText}>Sign In</Text>
                    </TouchableOpacity>
 
                </View>
        )
    }
}
export default withNavigation(Login);
const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '90%',
        marginBottom: 10,
        borderRadius: 10,

    },
    loginButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        marginBottom: 10,
        borderRadius: 10,
        backgroundColor: '#3498db'
    },
    buttonText:{
        textAlign:'center',
        color:'#FFFFFF',
        fontWeight:'700'
    },

})