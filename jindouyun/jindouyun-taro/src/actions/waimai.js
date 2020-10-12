import request from '../utils/request';
import { showLoading } from "../utils/common";
import {
    FETCH_BRAND_LIST,
    FETCH_BRAND_DETAIL,
    FETCH_BRAND_DETAIL_LIST
} from "../constants/actionTypes";

export const handleFetchBrandList = args => {
    const {page, sort, callback} = args;
    return async dispatch => {
        const res = await request('get', `wx/brand/list?page=${page}&sort=${sort}&limit=10&order=desc`);
        showLoading(false);
        callback(false);
        res.errno === 0 &&
        dispatch({
            type: FETCH_BRAND_LIST,
            payload: res.data
        });
    }
};

export const handleFetchBrandDetail = args => {
    const { id } = args;
    return async dispatch => {
        const res = await request('get', `wx/brand/detail?id=${id}`);
        showLoading(false);
        res.errno === 0 &&
        dispatch({
            type: FETCH_BRAND_DETAIL,
            payload: res.data
        });
    }
};

export const handleFetchBrandDetailList = args => {
    const { brandId } = args;
    return async dispatch => {
        const res = await request('get', `wx/goods/list?brandId=${brandId}`);
        res.errno === 0 &&
        dispatch({
            type: FETCH_BRAND_DETAIL_LIST,
            payload: res.data
        });
    }
}
