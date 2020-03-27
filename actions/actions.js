import {AsyncStorage} from "react-native";
import api from "../api/api";

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_END = "FETCH_DATA_END";
export const UPDATE_SOURCE_LIST = "UPDATE_SOURCE_LIST";

const sourceListStr = "sourceListStr1";

const updateAsyncStorage = async (sourcesList) => {
    await AsyncStorage.setItem(sourceListStr, JSON.stringify(sourcesList));
};

export const fetchData = (dispatch) => {
    dispatch({
        type: FETCH_DATA_START
    });

    api.getNews().then(newsArticles =>
        dispatch({
            type: FETCH_DATA_END,
            newsArticles: newsArticles
        })
    )
};

export const sourceDispatch = (dispatch, sourcesList) => {
    return updateAsyncStorage(sourcesList).then(() => {
        dispatch({
            type: UPDATE_SOURCE_LIST,
            sourcesList: sourcesList
        });

        fetchData(dispatch);
    });
};
