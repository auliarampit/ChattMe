import firebase from 'firebase'
import { AsyncStorage } from 'react-native'

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: "AIzaSyBE4PVlSzXvgD73G6hKHk-Jx_X3aC40yys",
            authDomain: "chattme-d326f.firebaseapp.com",
            databaseURL: "https://chattme-d326f.firebaseio.com",
            projectId: "chattme-d326f",
            storageBucket: "chattme-d326f.appspot.com",
            messagingSenderId: "683428159693",
            appId: "1:683428159693:web:0d5af438ed5f39a6"
        }); 
    }      
  }
}

const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;