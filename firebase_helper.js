import firebase from "firebase";

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