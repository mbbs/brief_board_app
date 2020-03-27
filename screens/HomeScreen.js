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
import {connect} from "react-redux";
import {fetchData} from "../actions/actions";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.onRefresh();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.newsArticles.length === 0) {
            this.props.navigation.navigate("SelectSource");
        }
    }

    onRefresh = () => {
        const {dispatch} = this.props;
        fetchData(dispatch);
    };

    async handlePressButtonAsync(source, url) {
        trackHit(source, url);
        await WebBrowser.dismissBrowser();
        await WebBrowser.openBrowserAsync(url);
    };

    render() {
        const {refreshingData, newsArticles} = this.props;
        const payments = [];
        newsArticles
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
                    refreshControl={<RefreshControl refreshing={refreshingData}
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
    selectSourcesHeading: {
        fontSize: 35,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#171824',
        fontFamily: 'System',
        marginBottom: 10
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
    },
    emptySourcesText: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        flexWrap: 'wrap',
        fontFamily: 'System'
    },
});

const mapStateToProps = state => {
    const {reducer} = state;
    const {refreshingData, newsArticles, sourcesList} = reducer || {
        refreshingData: false,
        newsArticles: []
    };

    return {
        refreshingData,
        newsArticles
    };
};

export default connect(mapStateToProps)(HomeScreen);
