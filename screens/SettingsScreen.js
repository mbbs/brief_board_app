import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator,
    Alert,
    Switch, ScrollView
} from 'react-native';

import {connect} from "react-redux";
import SourcesSelect from "../components/SourcesSelect";

// export async function getSources() {
//     const sourceListJson = await AsyncStorage.getItem(sourceListStr);
//     return sourceListJson ? JSON.parse(sourceListJson) : [];
// }

export default class Setting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <View style={styles.container}>
            <View style={styles.headingView}>
                <Text style={styles.heading}>SETTINGS</Text>
            </View>
            <View style={styles.sourceHeadingView}>
                <Text style={styles.sourceHeading}>Sources</Text>
            </View>
            <SourcesSelect/>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FED321',
        paddingTop: 30
    },
    headingView: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 65,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: 'space-mono',
        backgroundColor: '#FED321',
        paddingTop: 10,
        paddingBottom: 10
    },
    heading: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#171824',
        fontFamily: 'space-mono',
    },
    sourceHeadingView: {
        backgroundColor: '#fff',
    },
    sourceHeading: {
        fontSize: 40,
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: 'System',
        margin: 20
    }
});
