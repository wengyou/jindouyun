import {
    SEARCH_ITEMS,
    DELETE_HISTORY_SEARCH,
    FETCH_HISTORY_SEARCH, CLEAR_SEARCH
} from "../constants/actionTypes";

const defaultState = {
    searchList: [],
    historyList: [],
    listTotal: '',
    nowPage: '',
    maxPage: ''
}

export default function counter (state = defaultState, action) {
    switch (action.type) {
        case SEARCH_ITEMS:
            if(action.payload.page === 1){
                state.searchList = [];
            }
            const tempList = state.searchList.concat(action.payload.list);
            return {
                ...state,
                listTotal: action.payload.total,
                searchList: tempList,
                nowPage: action.payload.page,
                maxPage: action.payload.pages
            };
        case DELETE_HISTORY_SEARCH:
            return {
                ...state,
                historyList: []
            };
        case FETCH_HISTORY_SEARCH:
            return {
                ...state,
                historyList: action.payload
            };
        case CLEAR_SEARCH:
            return {
                ...state,
                searchList: []
            }
        default:
            return state
    }
}
