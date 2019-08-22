import React, { Component } from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native'

export default class Profile extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image source={{uri: ''}} style={styles.img} />
                </View>
                <View style={styles.info}>
                    <Text>Name</Text>
                    <Text>Email</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
    },
    img: {
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height
    },
    info: {
        flex: 1.5,
    }
})
