import React, {Component} from 'react';
import {WebView} from 'react-native-webview';
import { AppLoading, SplashScreen } from 'expo';
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';

export default class FeedbackScreen extends Component {
	
	constructor(props) {
		super(props);
		this.state
	}

	componentDidMount() {
    	SplashScreen.preventAutoHide();
    }

    indicator() {
		return (<View style={styles.indicator}>
			<ActivityIndicator size="large" color="#000" />
			</View>);
	}


    render() {
        return <WebView source={{uri: "https://forms.gle/hxpWFVzZMijQkGQ58"}}
        startInLoadingState={true}
        style={styles.webview}
        renderLoading={this.indicator} 
        />
    }
}

const styles = StyleSheet.create({
  indicator: {
  	flex: 1
  },
  webview: {
		flex: 1,
	},
});