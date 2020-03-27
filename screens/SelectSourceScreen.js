import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {connect} from "react-redux";
import SettigsScreen from "../components/SourcesSelect";

class SelectSourceScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {newsArticles} = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.headingView}>
                    <Text style={styles.heading}>VIDBRIEF</Text>
                </View>
                <View style={styles.scrollContainer}>
                    <Text style={styles.selectSourcesHeading}>Select Sources</Text>
                    <SettigsScreen/>
                    <TouchableOpacity
                        disabled={newsArticles.length === 0}
                        style={newsArticles.length === 0 ? styles.sourceSelectButtonWhenNotSelected : styles.sourceSelectButton}
                        onPress={() => this.props.navigation.navigate('Main')}
                        underlayColor='#fff'>
                        <Text
                            style={newsArticles.length === 0 ? styles.sourceSelectButtonTextWhenNotSelected : styles.sourceSelectButtonText}>Select
                            1 to continue</Text>
                    </TouchableOpacity>
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
        paddingTop: 20
    },
    sourceSelectButton: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 40,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#FED321',
    },
    sourceSelectButtonText: {
        color: '#171824',
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 20

    },
    sourceSelectButtonWhenNotSelected: {
        marginRight: 20,
        marginLeft: 20,
        marginTop: 10,
        marginBottom: 40,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'rgba(201,201,201,0.76)',
    },
    sourceSelectButtonTextWhenNotSelected: {
        color: '#6c6c6c',
        textAlign: 'center',
        fontFamily: 'System',
        fontSize: 20

    }
});

const mapStateToProps = state => {
    const {reducer} = state;
    const {newsArticles} = reducer || {
        newsArticles: []
    };

    return {
        newsArticles
    };
};

export default connect(mapStateToProps)(SelectSourceScreen);
