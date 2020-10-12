import request from '../utils/request';
import { showLoading } from "../utils/common";
import {
    FETCH_GOODS_DETAIL,
    CLEAR_PRODUCTS_LIST
} from "../constants/actionTypes";

export const fetchGoodsDetail = (args) => {
    const { id } = args;
    return async dispatch => {
        const res = await request('get', `wx/goods/detail?id=${id}`);
        showLoading(false);
        if(res.errno === 0){
            dispatch({
                type: CLEAR_PRODUCTS_LIST
            });
            dispatch({
                type: FETCH_GOODS_DETAIL,
                payload: res.data
            });
        }
    }
}

