import * as WebBrowser from 'expo-web-browser';
import React, {Component} from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';
import {MaterialIcons} from "@expo/vector-icons";
import {trackHit} from "../firebase_helper";
import {getSources} from "./SettingsScreen";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: true
        };
    }

    componentDidMount() {
        this.onRefresh();
    }

    async handlePressButtonAsync(source, url) {
        trackHit(source, url);
        await WebBrowser.dismissBrowser();
        await WebBrowser.openBrowserAsync(url);
    };

    onRefresh = () => {
        this.setState({
            data: this.state.data,
            refreshing: false
        });
        fetch("https://data.apiv1.vidbrief.com/brief_board_backend")
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return Promise.resolve([]);
                }
            })
            .then(data => this.setState({
                data: data,
                refreshing: false
            }));
    };

    render() {
        const payments = [];

        this.state.data
            .map((d, index) => {
                payments.push(
                    <TouchableOpacity style={styles.newsContainer}
                                      key={index}
                                      onPress={() => this.handlePressButtonAsync(d.source, d.video_link)}>
                        <Text style={styles.newsTitle}>{d.title}</Text>
                        <View style={{flex: 1, flexDirection: 'column', paddingTop: 20}}>
                            <Image
                                style={styles.imageStyle}
                                source={{uri: d.image_url}}
                            />
                            <MaterialIcons
                                name="play-circle-filled"
                                size={60}
                                style={styles.playButton}
                            />
                        </View>
                        <View
                            style={{
                                borderWidth: 1,
                                borderColor: '#ededed',
                                width: "100%",
                                marginTop: 20

                            }}
                        />
                    </TouchableOpacity>
                )
            });
        return (
            <View style={styles.container}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>VIDBRIEF</Text>
                </View>
                <ScrollView
                    style={styles.scrollContainer}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing}
                                                    onRefresh={this.onRefresh}/>}>
                    {payments}
                </ScrollView>
            </View>
        );
    }
}
HomeScreen.navigationOptions = {
    header: null,
};

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
    headingView: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 65,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'space-mono',
        backgroundColor: '#FED321',
        paddingTop: 15,
        paddingBottom: 15
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#171824',
        fontFamily: 'space-mono',
    },
    container: {
        flex: 1,
        backgroundColor: '#FED321',
        paddingTop: 30
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        fontFamily: 'space-mono',
    },
    contentContainer: {},
    imageStyle: {
        height: 250,
        width: null
    },
    newsSource: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'left',
        flexWrap: 'wrap',
        paddingBottom: 10,
        fontFamily: 'space-mono'
    },
    newsTitle: {
        fontSize: 20,
        textAlign: 'left',
        flexWrap: 'wrap',
        fontFamily: 'System'
    },
    newsContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 20
    },
    playButton: {
        position: "absolute",
        top: "45%",
        left: "40%",
        color: "white"
    }
});
