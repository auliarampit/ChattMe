import React, { Component } from 'react'
import {TextInput, TouchableOpacity, Text, View, StyleSheet, Alert, } from 'react-native'
import firebase from 'firebase'

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            id_user: '',
            name: '',
        }
    };

    register = async () => {
        if (this.state.email.length < 4) {
            Alert.alert('Email Invalid')
        } else if (this.state.password.length < 1) {
            Alert.alert('please input password more than 2')
        } else if (this.state.name.length < 3) {
            Alert.alert('please input password more than 3')
        } else {
            await firebase.auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(({ user }) => {
                    var userf = firebase.auth().currentUser;
                    userf.updateProfile({ displayName: this.state.name, photoURL: this.state.image })
                    firebase.database().ref('user/' + user.uid).set({
                        name: this.state.name,
                        image: 'https://png.pngtree.com/png-clipart/20190516/original/pngtree-users-vector-icon-png-image_3725294.jpg',
                        id: user.uid
                    })
                })
            Alert.alert('Sign In', 'Silahkan Sign In', [{text: 'Ok', onPress : () => this.setState({
                name: '',
                email: '',
                password: ''
            })}])
        }
    }
    render() {
        return (
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Name'
                        style={styles.inputField}
                        returnKeyType='next'
                        onChangeText={(text) => this.setState({ name: text })}
                        value={this.state.name} />

                    <TextInput
                        placeholder='email'
                        style={styles.inputField}
                        returnKeyType='next'
                        maxLength={40}
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        autoCapitalize='none'
                        autoCorrect={false} />

                    <TextInput
                        placeholder='password'
                        style={styles.inputField}
                        returnKeyType='go'
                        secureTextEntry
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password} />


                    <TouchableOpacity style={styles.loginButton} onPress={this.register}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => { this.props.navigation.navigate('login') }}>
                        <Text style={{ color: 'white', marginTop: 5, textAlign:'left' }}>Login</Text>
                    </TouchableOpacity> */}
                </View>

        )
    }
}

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