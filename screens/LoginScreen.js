import * as Google from 'expo-google-app-auth';
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import firebase from "firebase";
import {AsyncStorage} from "react-native";
import * as AppleAuthentication from 'expo-apple-authentication';
import { FontAwesome } from '@expo/vector-icons';
import * as Crypto from "expo-crypto";

const config = {
    iosClientId: '689009111160-0empa8quf6m2bm0s0006v5v6mcg431a6.apps.googleusercontent.com',
    iosStandaloneAppClientId: '652130215638-gnb5uoci5bkuntdr1m0e1nap659pal48.apps.googleusercontent.com',
    scopes: ["profile", "email"]
};

const userNameKey = '@VidBrief:userName';
const photoUrlKey = '@VidBrief:photoUrl';
const appleProvider = new firebase.auth.OAuthProvider('apple.com');

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignedIn: false,
            name: undefined,
            photoUrl: undefined
        };
    }

    componentDidMount() {
        this.loadUser();
    }

    loadUser = async () => {
        const userName = await AsyncStorage.getItem(userNameKey);
        const photoUrl = await AsyncStorage.getItem(photoUrlKey);
        if (userName) {
            this.stateSetHelper(userName, photoUrl);
        }
    };

    signOut = async () => {
        await firebase.auth().signOut();
        await AsyncStorage.removeItem('@VidBrief:userName');
        await AsyncStorage.removeItem('@VidBrief:photoUrl');
        await this.setState({
            isSignedIn: false,
            name: undefined,
            photoUrl: undefined
        });
    };

    stateSetHelper = async (name, photoUrl) => {
        try {
            await AsyncStorage.setItem(userNameKey, name);
            if (photoUrl) {
                await AsyncStorage.setItem(photoUrlKey, photoUrl);
            }
            await this.setState({
                isSignedIn: true,
                name: name,
                photoUrl: photoUrl
            });
        } catch (error) {
            console.log(error)
            // Error saving data
        }
    };

    onSignIn = (googleUser) => {
        console.log('Google Auth Response', googleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const that = this;
        const unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!that.isUserEqual(googleUser, firebaseUser, firebase.auth.GoogleAuthProvider.PROVIDER_ID, googleUser.user.id)) {
                // Build Firebase credential with the Google ID token.
                const credential = firebase.auth.GoogleAuthProvider.credential(googleUser.idToken);

                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(credential)
                    .then(() => that.stateSetHelper(googleUser.user.name, googleUser.user.photoUrl))
                    .catch(function (error) {
                        console.error(error);
                    });
            } else {
                that.stateSetHelper(googleUser.user.name, googleUser.user.photoUrl);
                console.log('User already signed-in Firebase.');
            }
        });
    };


    onSignInApple = (appleUser) => {
        console.log('Apple Auth Response', appleUser);
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const that = this;
        const unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!that.isUserEqual(appleUser, firebaseUser, "apple.com", appleUser.user)) {
                const authCredential = appleProvider.credential({
                    idToken: appleUser.identityToken
                });
                
                // Sign in with credential from the Google user.
                firebase.auth().signInWithCredential(authCredential)
                    .then(() => that.stateSetHelper(appleUser.fullName.givenName +  " " + appleUser.fullName.familyName,undefined))
                    .catch(function (error) {
                        console.error(error);
                    });
            } else {
                that.stateSetHelper(appleUser.fullName.givenName +  " " + appleUser.fullName.familyName, undefined);
                console.log('User already signed-in Firebase.');
            }
        });
    };

    isUserEqual = (user, firebaseUser, providerId, userId) => {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === providerId && 
                    providerData[i].uid === userId) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    };

    signIn = async () => {
        try {
            const result = await Google.logInAsync(config);
            this.onSignIn(result);
        } catch (e) {
            return {error: true};
        }
    };

    signInApple = async () => {
        try {
            const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          this.onSignInApple(credential);
        } catch (e) {
            return {error: true};
        }
    };

    render() {
        if (this.state.isSignedIn) {
            return <View style={styles.container}>
                <View style={styles.imageView}>
                   {  
                        this.state.photoUrl && <Image
                            style={{width: 200, height: 200, borderRadius: 100}}
                            source={{uri: this.state.photoUrl}}
                        /> 
                    }
                    {  
                        !this.state.photoUrl && <FontAwesome name={"user-circle-o"} size={150} />
                    }
                </View>
                <View style={styles.welcomeTextView}>
                    <Text style={styles.welcomeText}>
                        <Text>Hi, </Text>
                        <Text style={styles.welcomeTextName}>{this.state.name}</Text>
                    </Text>
                    <Text style={styles.welcomeText}>Welcome to VidBrief!</Text>
                </View>
                <TouchableOpacity style={styles.signOutButton} onPress={this.signOut}>
                    <Text style={styles.signOutButtonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        } else {
        
           return <View style={styles.signInView}>
 
                <Text style={styles.signInWithHeading}>Sign In</Text>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: '#000',
                        width: "80%",
                        margin: 20,
                    }}
                />
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                    cornerRadius={5}
                    style={{ width: "80%", height: 60, marginBottom: 15 }}
                    onPress={this.signInApple}/>
                <TouchableOpacity onPress={this.signIn} style={styles.googlePlusStyle}>
                    <Image style={{width: 60, height: 60}} source={require('../assets/images/google-signin.png')}/>
                    <Text style={styles.signInButtonText}>Sign In with Google</Text>
                </TouchableOpacity>
            </View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        fontSize: 15,
        fontFamily: 'System',
    },
    imageView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '50%'
    },
    welcomeTextView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 12
    },
    welcomeText: {
        fontSize: 35,
        paddingBottom: 10
    },
    welcomeTextName: {
        fontWeight: 'bold'
    },
    signOutButton: {
        marginTop: 25,
        backgroundColor: '#f5f5f5',
        borderColor: '#f5f5f5',
        borderWidth: 15,
        fontSize: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signOutButtonText: {
        fontSize: 25,
        color: "#FF0000"
    },
    signInView: {
        flex: 1,
        backgroundColor: '#fff',
        fontSize: 15,
        fontFamily: 'System',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googlePlusStyle: {
        flexDirection: 'row',
        borderWidth: 2,
        backgroundColor: '#4c8bf5',
        borderColor: '#f5f5f5',
        height: 60,
        fontSize: 35,
        width: "80%",
        alignItems: 'center'
    },
    signInButtonText: {
        fontSize: 20,
        color: '#fff',
        paddingLeft: 20
    },
    signInWithHeading: {
        fontSize: 25
    }
});
