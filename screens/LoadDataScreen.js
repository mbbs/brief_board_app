import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';
import {sourceDispatch} from "../actions/actions";
import {AsyncStorage} from "react-native";
import {sourceListStr} from "../components/SourcesSelect";
import {connect} from "react-redux";


class LoadDataScreen extends Component {
    constructor(props) {
        super(props);
        this.bootstrap();
    }

    bootstrap = async () => {
        const sourceList = await AsyncStorage.getItem(sourceListStr);
        if (sourceList && sourceList.length > 1) {
            await sourceDispatch(this.props.dispatch, JSON.parse(sourceList));
            this.props.navigation.navigate('Main');
        } else {
            this.props.navigation.navigate('SelectSource');
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>VIDBRIEF</Text>
                </View>
                <View style={styles.scrollContainer}>
                    <ActivityIndicator size="large" color="#000"/>
                    <Text style={styles.loadingText}>Loading</Text>
                </View>
            </View>
        );
    }
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
        paddingTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 20,
        paddingTop: 10
    }
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

export default connect(mapStateToProps)(LoadDataScreen);

