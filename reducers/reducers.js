import {combineReducers} from 'redux';
import {AsyncStorage} from "react-native";
import {FETCH_DATA_END, FETCH_DATA_START, UPDATE_SOURCE_LIST} from "../actions/actions";

const reducer = (state = {refreshingData: false, newsArticles: [], sourcesList: []}, action) => {
    switch (action.type) {
        case UPDATE_SOURCE_LIST:
            return {
                ...state,
                sourcesList: action.sourcesList
            };
        case FETCH_DATA_START:
            return {
                ...state,
                refreshingData: true
            };
        case FETCH_DATA_END:
            return {
                ...state,
                refreshingData: false,
                newsArticles: action.newsArticles.filter(x => state.sourcesList.includes(x.source))
            };
        default:
            return state;
    }
};

export const sourceHandler = async (source) => {
    const sources = [...this.state.sources, source];
    await AsyncStorage.setItem(sourceListStr, JSON.stringify(sources));
    await this.setState({
        sources: await getSources()
    });
};

const rootReducer = combineReducers({
    reducer
});

export default rootReducer;
