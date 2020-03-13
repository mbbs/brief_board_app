import firebase from "firebase";
import {Analytics, PageHit, Event} from 'expo-analytics';

 const firebaseConfig = {
    apiKey: "AIzaSyBNm0glmh4INLffNae_uySkSpJlL7ZF9Fc",
    authDomain: "vidbrief.firebaseapp.com",
    databaseURL: "https://vidbrief.firebaseio.com",
    projectId: "vidbrief",
    storageBucket: "vidbrief.appspot.com",
    messagingSenderId: "652130215638",
    appId: "1:652130215638:web:488b6fce9b0a22b9dacb77",
    measurementId: "G-D2SW731QT3"
  };

if (!firebase.apps.length) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

const analytics = new Analytics('UA-43476145-2');

export const trackHit = (source, videoName) => {
    analytics.event(new Event('video_link_open', source, videoName, 1))
        .then(() => console.log("success"))
        .catch(e => console.log(e.message));
};

const track = (screenName) =>  {
    analytics.hit(new PageHit(screenName))
        .then(() => console.log("success"))
        .catch(e => console.log(e.message));
    return "";
};

setInterval(() => (
    track("vid_brief")
), 60000);
