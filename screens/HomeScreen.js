import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
    Image,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
    View,
    Alert,
    TextInput,
    ScrollView
} from 'react-native';
import {Linking} from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import {MonoText} from '../components/StyledText';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    componentDidMount() {
        fetch("https://v6bliogsci.execute-api.us-east-1.amazonaws.com/default/brief_board_backend")
            .then(res => res.json())
            .then(data => this.setState({
                data: data
            }))
    }

    async handlePressButtonAsync(url) {
        await WebBrowser.openBrowserAsync(url);
    };

    render() {
        const {statusBarStyle} = this.state;

        var payments = [];

        this.state.data.map(d => {
            payments.push(<TouchableOpacity style={styles.newsContainer}
                                            onPress={() => this.handlePressButtonAsync(d.video_link)}>
                <Text style={styles.newsSource}>CNN</Text>
                <Text style={styles.newsTitle}>{d.title}</Text>
                <View style={{flex: 1, flexDirection: 'column', paddingTop: 20}}>
                    <Image
                        style={styles.imageStyle}
                        source={{
                            uri:
                            d.image_link
                        }}
                    />
                </View>
            </TouchableOpacity>)
        });
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}>
                    {payments}
                </ScrollView>

            </View>
        );
    }
}
HomeScreen.navigationOptions = {
    header: null,
};

function DevelopmentModeNotice() {
    if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
                Development mode is enabled: your app will be slower but you can use
                useful development tools. {learnMoreButton}
            </Text>
        );
    } else {
        return (
            <Text style={styles.developmentModeText}>
                You are not in development mode: your app will run at full speed.
            </Text>
        );
    }
}

function handleLearnMorePress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/development-mode/'
    );
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    imageStyle: {
        height: 250,
        width: null
    },
    newsSource: {
        fontSize: 15,
        fontFamily: 'System',
        fontWeight: 'bold',
        textAlign: 'left',
        flexWrap: 'wrap',
        paddingBottom: 10

    },
    newsTitle: {
        fontSize: 18,
        fontFamily: 'System',
        textAlign: 'left',
        flexWrap: 'wrap'
    },
    newsContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 40,
    }
});
