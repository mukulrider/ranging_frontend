/*
 *
 * RangingNpdPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
  UNMATCHED_PROD_FETCH_SUCCESS,
  DEFAULT_ACTION,GENERATE_TEXTBOX_QUERY_STRING,
  OUT_PERFORMANCE_SUCCESS,PRICE_GRAVITY_SUCCESS,
  SKU_CHART_SUCCESS,
  SEND_URL_PARAMS,
  WEEK_SELECT, SAVE_WEEK_PARAM, SAVE_PAGE_PARAM,
  TABLE_PAGE_CHANGE,
  GENERATE_SIDE_FILTER_SUCCESS,CHECKBOX_CHANGE,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  UPDATE_BREADCRUMBS,SELECT_FILTER_INDICATOR,
} from './constants';

const initialState = fromJS({
  dataPageUrlParams: '',
  dataWeekUrlParams: 'week_flag=Latest 13 Weeks',
  urlParamsString: '',
  filter_selection:'',
  textBoxQueryString:'',
  showSelectFilterIndicator:true,
  breadCrumbs:'',
  // price_gravity_data: {
  //   price_bucket:["6.51 - 7.63","7.63 - 19.00", "3.04 - 5.27", "5.27 - 6.07","6.07 - 6.51"],
  //   data:[
  //     {
  //       "id": "Asda",
  //       "sku_gravity": 11,
  //       "price_gravity": "6.51 - 7.63"
  //     },
  //     {
  //       "id": "Asda",
  //       "sku_gravity": 8,
  //       "price_gravity": "7.63 - 19.00"
  //     },
  //     {
  //       "id": "Asda",
  //       "sku_gravity": 20,
  //       "price_gravity": "3.04 - 5.27"
  //     },
  //     {
  //       "id": "Asda",
  //       "sku_gravity": 13,
  //       "price_gravity": "5.27 - 6.07"
  //     },
  //     {
  //       "id": "Asda",
  //       "sku_gravity": 6,
  //       "price_gravity": "6.07 - 6.51"
  //     },
  //     {
  //       "id": "JS",
  //       "sku_gravity": 7,
  //       "price_gravity": "6.51 - 7.63"
  //     },
  //     {
  //       "id": "JS",
  //       "sku_gravity": 7,
  //       "price_gravity": "7.63 - 19.00"
  //     },
  //     {
  //       "id": "JS",
  //       "sku_gravity": 9,
  //       "price_gravity": "3.04 - 5.27"
  //     },
  //     {
  //       "id": "JS",
  //       "sku_gravity": 2,
  //       "price_gravity": "5.27 - 6.07"
  //     },
  //
  //     {
  //       "id": "JS",
  //       "sku_gravity": 8,
  //       "price_gravity": "6.07 - 6.51"
  //     },
  //     {
  //       "id": "Coop",
  //       "sku_gravity": 10,
  //       "price_gravity": "6.51 - 7.63"
  //     },
  //     {
  //       "id": "Coop",
  //       "sku_gravity": 8,
  //       "price_gravity": "7.63 - 19.00"
  //     },
  //     {
  //       "id": "Coop",
  //       "sku_gravity": 6,
  //       "price_gravity": "3.04 - 5.27"
  //     },
  //     {
  //       "id": "Coop",
  //       "sku_gravity": 4,
  //       "price_gravity": "5.27 - 6.07"
  //     },
  //
  //     {
  //       "id": "Coop",
  //       "sku_gravity": 2,
  //       "price_gravity": "6.07 - 6.51"
  //     }
  //   ],
  //   colors:["#B2B2B2","#7FB256",
  //     "#0931F6",
  //     "#C288D6",
  //     "#896219",
  //     "#F60909",
  //     "#E5F213"]
  // }
});


function rangingNpdPageReducer(state = initialState, action) {
  switch (action.type) {
    case UNMATCHED_PROD_FETCH_SUCCESS:
      // console.log(UNMATCHED_PROD_FETCH_SUCCESS, 'reducer', action);
      return state.set('data', action.data);
    case SKU_CHART_SUCCESS:
      // console.log(SKU_CHART_SUCCESS, 'reducer', action);
      return state.set('multiBarChartData', action.data);
    case OUT_PERFORMANCE_SUCCESS:
       return state.set('multiHoriBarChartData', action.data);
    case PRICE_GRAVITY_SUCCESS:
      // console.log(PRICE_GRAVITY_SUCCESS, 'reducer', action);
       return state.set('price_gravity_data', action.data);

      case SEND_URL_PARAMS:
      // console.log("2.Updated the state in Reducer", action.data);
      return state.set('dataUrlParms', action.data);
    case SAVE_WEEK_PARAM:
      // console.log("Updated the week state in Reducer", action.data);
      return state.set('dataWeekUrlParams', action.data);
    case SAVE_PAGE_PARAM:
      // console.log("Updated the PAGE state in Reducer", action.data);
      return state.set('dataPageUrlParams', action.data);

      case GENERATE_SIDE_FILTER_SUCCESS :
      // console.log('******************************************************');
      return state.set('sideFilter', action.data);
    case CHECKBOX_CHANGE:
      // console.log(CHECKBOX_CHANGE, 'reducer', action);
      return state.set('filter_selection', action.data);

      case GENERATE_URL_PARAMS:
        return state.set('urlParams', action.data);
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);


    case UPDATE_BREADCRUMBS:
      // console.log(UPDATE_BREADCRUMBS, 'reducer', action);
      return state.set('breadCrumbs', action.data);
    case SELECT_FILTER_INDICATOR:
      return state.set('showSelectFilterIndicator', action.data);


    case GENERATE_TEXTBOX_QUERY_STRING:
      return state.set('textBoxQueryString', action.data);
    default:
      return state;
  }
}

export default rangingNpdPageReducer;
