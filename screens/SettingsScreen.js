import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator,
    Alert,
    Switch, ScrollView
} from 'react-native';

import {connect} from "react-redux";
import {sourceDispatch} from "../actions/actions";

const staticSourceList = ["Bloomberg", "CNN", "CNBC", "The Street", "Reuters"];
export const sourceListStr = "sourceListStr1";

export async function getSources() {
    const sourceListJson = await AsyncStorage.getItem(sourceListStr);
    return sourceListJson ? JSON.parse(sourceListJson) : [];
}

class Setting extends Component {
    constructor(props) {
        super(props);
    }

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
        const sourceSettingsView = staticSourceList.map(source =>
            <View>
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
            <View style={styles.headingView}>
                <Text style={styles.heading}>SETTINGS</Text>
            </View>
            <View style={styles.sourceHeadingView}>
                <Text style={styles.sourceHeading}>Sources</Text>
            </View>
            <ScrollView
                style={styles.scrollContainer}>{sourceSettingsView}</ScrollView>
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
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20
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
    }
});

const mapStateToProps = state => {
    const {reducer} = state;
    const {refreshingData, newsArticles, sourcesList} = reducer || {
        sourcesList: []
    };

    return {
        sourcesList
    };
};

export default connect(mapStateToProps)(Setting);
