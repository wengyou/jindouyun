import {
  FETCH_GOODS_DETAIL,
  CLEAR_PRODUCTS_LIST

} from "../constants/actionTypes";

const defaultState = {
  goodsDetail: {},
  goodsGallery: [],
  goodsInfo: {},
  productsList: [],
  specificationList: []
}

export default function detail (state = defaultState, action) {
  switch (action.type) {
    case CLEAR_PRODUCTS_LIST:
      return {
        ...state,
        productsList: [],
        goodsGallery: []
      };
    case FETCH_GOODS_DETAIL:
      return {
        ...state,
        goodsDetail: action.payload,
        goodsInfo: action.payload.info,
        goodsGallery: action.payload.info.gallery,
        productsList: action.payload.productList,
        specificationList: action.payload.specificationList
      }
    default:
      return state
  }
}
