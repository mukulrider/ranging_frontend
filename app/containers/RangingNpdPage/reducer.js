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
  GENERATE_URL_PARAMS_STRING
} from './constants';

const initialState = fromJS({
  dataPageUrlParams: '',
  dataWeekUrlParams: '',
  urlParamsString: '',
  filter_selection:'',
  textBoxQueryString:'',
  // data: [{competitor_product_desc: "Prod1", retailer: "ret1", asp: 1},
  //   {
  //     competitor_product_desc: "Prod2", retailer: "ret2", asp: 2
  //   }, {
  //     competitor_product_desc: "Prod3", retailer: "ret3", asp: 3
  //   }, {
  //     competitor_product_desc: "Prod3", retailer: "ret3", asp: 3
  //   }, {
  //     competitor_product_desc: "Prod3", retailer: "ret3", asp: 3
  //   }, {
  //     competitor_product_desc: "Prod3", retailer: "ret3", asp: 3
  //   }, {
  //     competitor_product_desc: "Prod3", retailer: "ret3", asp: 3
  //   }, {
  //     competitor_product_desc: "Prod3", retailer: "ret3", asp: 3
  //   }],
  // multiBarChartData: {
  //   data: [{
  //     "psg": "OTHER FORTIFIED WINES",
  //     "Asda": 7.0,
  //     "JS": 5.0,
  //     "Tesco": 11.0,
  //     "Morrisons": 7.0,
  //     "Aldi": 2.0
  //   },
  //     {
  //       "psg": "SEAS ALCOHOL GIFT PACKS",
  //       "Asda": 7.0,
  //       "Tesco": 9.0,
  //       "JS": 5.0,
  //       "Aldi": 20.0,
  //       "Morrisons": 7.0
  //     },
  //     {
  //       "psg": "WHITE WINE AUSTRALIAN",
  //       "Asda": 51.0,
  //       "JS": 10,
  //       "Tesco": 89.0,
  //       "Morrisons": 10,
  //       "Aldi": 10.0,
  //
  //     }, {
  //       "psg": "LIGHT & FRUIT PERRY",
  //       "Asda": 19.0,
  //       "JS": 25.0,
  //       "Tesco": 44.0,
  //       "Morrisons": 32.0,
  //       "Aldi": 11.0,
  //     }],
  //   labels: ["Aldi", "Asda", "JS", "Tesco", "Morrisons"]
  // },
  // multiHoriBarChartData: {
  //   labels: [
  //     'Series1', 'Series2', 'Series3'
  //   ],
  //   series: [
  //     {
  //       label: 'Outperformance (%)',
  //       values: [4, 8, 12]
  //     },
  //     {
  //       label: 'Outperformance Unit(%)',
  //       values: [12, 43, 28]
  //     }]
  // },
  price_gravity_data: {
    price_bucket:["6.51 - 7.63","7.63 - 19.00", "3.04 - 5.27", "5.27 - 6.07","6.07 - 6.51"],
    data:[
      {
        "id": "Asda",
        "sku_gravity": 11,
        "price_gravity": "6.51 - 7.63"
      },
      {
        "id": "Asda",
        "sku_gravity": 8,
        "price_gravity": "7.63 - 19.00"
      },
      {
        "id": "Asda",
        "sku_gravity": 20,
        "price_gravity": "3.04 - 5.27"
      },
      {
        "id": "Asda",
        "sku_gravity": 13,
        "price_gravity": "5.27 - 6.07"
      },
      {
        "id": "Asda",
        "sku_gravity": 6,
        "price_gravity": "6.07 - 6.51"
      },
      {
        "id": "JS",
        "sku_gravity": 7,
        "price_gravity": "6.51 - 7.63"
      },
      {
        "id": "JS",
        "sku_gravity": 7,
        "price_gravity": "7.63 - 19.00"
      },
      {
        "id": "JS",
        "sku_gravity": 9,
        "price_gravity": "3.04 - 5.27"
      },
      {
        "id": "JS",
        "sku_gravity": 2,
        "price_gravity": "5.27 - 6.07"
      },

      {
        "id": "JS",
        "sku_gravity": 8,
        "price_gravity": "6.07 - 6.51"
      },
      {
        "id": "Coop",
        "sku_gravity": 10,
        "price_gravity": "6.51 - 7.63"
      },
      {
        "id": "Coop",
        "sku_gravity": 8,
        "price_gravity": "7.63 - 19.00"
      },
      {
        "id": "Coop",
        "sku_gravity": 6,
        "price_gravity": "3.04 - 5.27"
      },
      {
        "id": "Coop",
        "sku_gravity": 4,
        "price_gravity": "5.27 - 6.07"
      },

      {
        "id": "Coop",
        "sku_gravity": 2,
        "price_gravity": "6.07 - 6.51"
      }
    ],
    colors:["#B2B2B2","#7FB256",
      "#0931F6",
      "#C288D6",
      "#896219",
      "#F60909",
      "#E5F213"]
  }
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

      case GENERATE_TEXTBOX_QUERY_STRING:
      return state.set('textBoxQueryString', action.data);
    default:
      return state;
  }
}

export default rangingNpdPageReducer;
