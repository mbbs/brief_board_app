import React, {Component} from 'react';
import {
    StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator,
    Alert,
    Switch, ScrollView
} from 'react-native';
import {AsyncStorage} from "react-native";

const sourceList = ["Bloomberg", "CNN", "CNBC", "The Street", "Reuters"];
export const sourceListStr = "sourceListStr1";

export async function getSources() {
    const sourceListJson = await AsyncStorage.getItem(sourceListStr);
    return sourceListJson ? JSON.parse(sourceListJson) : [];
}

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sources: []
        };
    }

    removeSource = async (source) => {
        const sources = this.state.sources.filter(x => x !== source);
        await AsyncStorage.setItem(sourceListStr, JSON.stringify(sources.filter(x => x !== source)));
        await this.setState({
            sources: await getSources()
        });
    };

    addSource = async (source) => {
        const sources = [...this.state.sources, source];
        await AsyncStorage.setItem(sourceListStr, JSON.stringify(sources));
        await this.setState({
            sources: await getSources()
        });
    };


    toggle = async (source) => {
        if (this.state.sources.includes(source)) {
            await this.removeSource(source);
        } else {
            await this.addSource(source);
        }
    };

    render() {
        const sourceSettingsView = sourceList.map(source =>
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>

                    <View style={{flex: .5}}>
                        <Text style={styles.newsTitle}>{source}</Text>
                    </View>
                    <View style={{flex: .5}}>
                        <Switch
                            style={styles.toggle}
                            onValueChange={() => this.toggle(source)}
                            value={this.state.sources.includes(source)}/>
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
        paddingTop: 15,
        paddingBottom: 15
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
        fontSize: 30,
        textAlign: 'left',
        flexWrap: 'wrap',
        fontFamily: 'System'
    },
    toggle: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        marginRight: 20,
        transform: [{scaleX: 1.2}, {scaleY: 1.2}]
    }
});
