import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator,
    Alert,
    Switch, ScrollView
} from 'react-native';

import {connect} from "react-redux";
import {sourceDispatch} from "../actions/actions";
import api from "../api/api";

export const sourceListStr = "sourceListStr1";

export async function getSources() {
    const sourceListJson = await AsyncStorage.getItem(sourceListStr);
    return sourceListJson ? JSON.parse(sourceListJson) : [];
}

class SourcesSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staticSourceList: [],
            sourceListLoaded: false
        };
        this.bootstrap();
    }

    bootstrap = async () => {
        const newSources = await api.getNewsSources();
        this.setState({
            staticSourceList: newSources,
            sourceListLoaded: true
        });
    };

    toggle = (sourcesList, source) => {
        const {dispatch} = this.props;
        if (sourcesList.includes(source)) {
            sourceDispatch(dispatch, sourcesList.filter(x => x !== source));
        } else {
            sourceDispatch(dispatch, [...sourcesList, source]);
        }
    };

    render() {
        const {sourcesList} = this.props;
        const sourceSettingsView = this.state.staticSourceList.map((source, index) =>
            <View key={index}>
                <View style={{flex: 1, flexDirection: 'row'}}>

                    <View style={{flex: .5}}>
                        <Text style={styles.newsTitle}>{source}</Text>
                    </View>
                    <View style={{flex: .5}}>
                        <Switch
                            style={styles.toggle}
                            onValueChange={() => this.toggle(sourcesList, source)}
                            value={sourcesList.includes(source)}/>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        borderColor: '#ededed',
                        width: "100%",
                        marginTop: 25,
                        marginBottom: 25

                    }}
                />
            </View>);
        return <View style={styles.container}>
            {
                !this.state.sourceListLoaded &&
                <View style={styles.scrollContainer}>
                    <ActivityIndicator size="large" color="#000"/>
                    <Text style={styles.loadingText}>Loading</Text>
                </View>
            }
            {
                this.state.sourceListLoaded &&
                <ScrollView
                    style={styles.scrollContainer}>{sourceSettingsView}</ScrollView>

            }
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
    },
    newsTitle: {
        width: "80%",
        fontSize: 28,
        textAlign: 'left',
        flexWrap: 'wrap',
        fontFamily: 'System',
        marginLeft: 10
    },
    toggle: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 20,
        transform: [{scaleX: 1.1}, {scaleY: 1.1}]
    },
});

const mapStateToProps = state => {
    const {reducer} = state;
    const {sourcesList} = reducer || {
        sourcesList: []
    };

    return {
        sourcesList
    };
};

export default connect(mapStateToProps)(SourcesSelect);
