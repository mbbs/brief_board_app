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
import Colors from "../constants/Colors";
import {MaterialIcons} from "@expo/vector-icons";

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

    async handlePressButtonAsync(url) {
        await WebBrowser.dismissBrowser();
        await WebBrowser.openBrowserAsync(url);
    };

    onRefresh = () => {
        this.setState({
            data: this.state.data,
            refreshing: false
        });
        fetch("https://v6bliogsci.execute-api.us-east-1.amazonaws.com/default/brief_board_backend")
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

        this.state.data.map((d, index) => {
            payments.push(<TouchableOpacity style={styles.newsContainer}
                                            key={index}
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
                    <MaterialIcons
                        name="play-circle-filled"
                        size={60}
                        style={styles.playButton}
                    />
                </View>
            </TouchableOpacity>)
        });
        return (
            <View style={styles.container}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>vidBrief</Text>
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
        fontSize: 35,
        fontFamily: 'System',
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FED321',
        paddingTop: 15,
        paddingBottom: 15
    },
    heading: {
        fontSize: 35,
        color: '#171824',
        fontFamily: 'Verdana'
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
    },
    contentContainer: {},
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
    },
    playButton: {
        position: "absolute",
        top: "45%",
        left: "40%",
        color: "white"
    }
});
