import {
    GET_BANNER,
    GET_ITEMS,
    FETCH_FIRST_CATEGORY,
    FETCH_SECOND_CATEGORY,
    FETCH_GOODS_LIST,
    CLEAR_SECOND_CATEGORY,
    HOT_RECOMMEND
} from "../constants/actionTypes";

const defaultState = {
    banners: [],
    items: [],

    firstCategory: [],
    secondCategory: [],
    tablist: [],

    goodsList: [],
    maxPage: '',
    nowPage: '',

    recommendList: [],
    recommendMaxPage: '',
    recommendNowPage: '',
}

export default function counter (state = defaultState, action) {
    switch (action.type) {
        case GET_BANNER:
            return {
                ...state,
                banners: action.payload
            }
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload
            };
        case FETCH_FIRST_CATEGORY:
            return {
                ...state,
                firstCategory: action.payload
            }
        case FETCH_SECOND_CATEGORY:
            const secondCategoryArr = action.payload.map((e) => {
                return { title: e.name }
            });
            return {
                ...state,
                secondCategory: action.payload,
                tablist: secondCategoryArr
            }
        case FETCH_GOODS_LIST:
            let tempList = [];
            if(action.payload.page === 0) {
                tempList = [];
            } else {
                tempList = state.goodsList.concat(action.payload.list);
            }
            return {
                ...state,
                goodsList: tempList,
                nowPage: action.payload.page,
                maxPage: action.payload.pages
            };
        case CLEAR_SECOND_CATEGORY:
            return {
                ...state,
                tablist: [],
                goodsList: []
            }
        case HOT_RECOMMEND:
            if(action.payload.page === 1){
                state.recommendList = [];
            }
            const tempRecList = state.recommendList.concat(action.payload.list);
            return {
                ...state,
                recommendList: tempRecList,
                recommendMaxPage: action.payload.pages,
                recommendNowPage: action.payload.page
            }
        default:
            return state
    }
}
