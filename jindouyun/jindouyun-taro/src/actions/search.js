import request from '../utils/request';
import { showLoading } from "../utils/common";

import {
    SEARCH_ITEMS,
    DELETE_HISTORY_SEARCH,
    FETCH_HISTORY_SEARCH,
    CLEAR_SEARCH
} from '../constants/actionTypes';

//搜索
export const handleSearch = args => {
    const { page, callback, keyword } = args;
    return async dispatch => {
        const res = await request('get', `wx/search/list?page=${page}&keyword=${keyword}`);
        showLoading(false);
        callback(false);
        if(res.errno === 0){
            dispatch({
                type: SEARCH_ITEMS,
                payload: res.data
            });
            dispatch(handleFetchHistory())
        }
    }
};

//查看搜索历史
export const handleFetchHistory = () => {
    return async dispatch => {
        const res = await request('get', `wx/search/index`);
        res.errno === 0 &&
        dispatch({
            type: FETCH_HISTORY_SEARCH,
            payload: res.data.historyKeywordList
        });
    }
};

//清空搜索历史
export const handleDeleteHistory = () => {
    return async dispatch => {
        const res = await request('post', `wx/search/clearhistory`);
        res.errno === 0 &&
        dispatch({
            type: DELETE_HISTORY_SEARCH,
        });
    }
};

export const handleClearSearch = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_SEARCH
        })
    }
}
