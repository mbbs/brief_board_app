import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

export default class FeedbackScreen extends Component {
    render() {
        return <WebView source={{uri: "https://forms.gle/hxpWFVzZMijQkGQ58"}}/>
    }
}
