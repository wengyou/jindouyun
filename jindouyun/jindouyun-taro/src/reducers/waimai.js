import {
    FETCH_BRAND_LIST,
    FETCH_BRAND_DETAIL,
    FETCH_BRAND_DETAIL_LIST
} from '../constants/actionTypes';

const defaultState = {
    listTotal: '',
    brandList: [],
    nowPage: '',
    maxPage: '',
    brandDetail: {},
    brandDetailList: []
}

export default function counter (state = defaultState, action) {
    switch (action.type) {
        case FETCH_BRAND_LIST:
            if(action.payload.page === 1){
                state.brandList = [];
            }
            const tempList = state.brandList.concat(action.payload.list);
            return {
                ...state,
                listTotal: action.payload.total,
                brandList: tempList,
                nowPage: action.payload.page,
                maxPage: action.payload.pages
            };
        case FETCH_BRAND_DETAIL:
            return {
                ...state,
                brandDetail: action.payload
            };
        case FETCH_BRAND_DETAIL_LIST:
            return {
                ...state,
                brandDetailList: action.payload.list
            }
        default:
            return state
    }
}
