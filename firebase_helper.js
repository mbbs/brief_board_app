import firebase from "firebase";
import {Analytics, PageHit} from 'expo-analytics';

const firebaseConfig = {
    apiKey: "AIzaSyCopduK8cTcaM5e9iM5nz9qwZBA7LsV9Tc",
    authDomain: "fresh-sanctuary-241303.firebaseapp.com",
    databaseURL: "https://fresh-sanctuary-241303.firebaseio.com",
    projectId: "fresh-sanctuary-241303",
    storageBucket: "fresh-sanctuary-241303.appspot.com",
    messagingSenderId: "689009111160",
    appId: "1:689009111160:web:b7bb1cd917b29d60c03d8d",
    measurementId: "G-P3DV4ER3P4"
};

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const analytics = new Analytics('UA-119056144-2');

export const screenTrack = (screenName) =>  analytics.hit(new PageHit(screenName))
    .then(() => console.log("success"))
    .catch(e => console.log(e.message));
