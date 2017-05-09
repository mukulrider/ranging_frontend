/*
 *
 * RangingNegotiationPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION,
  GENERATE_URL_PARAMS,
  FETCH_DATA_SUCCESS,
  URL_PARAM,
  WEEK_FETCH,
  GENERATE_SIDE_FILTER_SUCCESS,SAVE_BUBBLE_PARAM2,
  GENERATE_URL_PARAMS_STRING,
  GRAPH_FETCH_SUCCESS,
  FILTER_FETCH,
  FILTER_FETCH_SUCCESS, GENERATE_TABLE_SUCCESS,
  SAVE_PERF_PARAM,
  SAVE_STORE_PARAM,
  SAVE_WEEK_PARAM,
  SAVE_BUBBLE_PARAM,
  SAVE_SIDE_FILTER_PARAM,
  SAVE_PAGE_PARAM,
  GENERATE_TEXTBOX_QUERY_STRING,
  RESET_CLICKED,
  GENERATE_CHECKED_LIST,
  LOADING_INDICATION,
  RADIO_CHECK_PARAM,
  LOADING_INDICATION_TEXT

} from './constants';


const initialState = fromJS({


  chartData: [
    {
      x: 200,
      y: 100,
      ros: 20
    },
    {
      x: 160,
      y: 200,
      ros: 10
    },
    {
      x: 240,
      y: 250,
      ros: 20
    },
    {
      x: 320,
      y: 50,
      ros: 10
    },
    {
      x: 400,
      y: 70,
      ros: 10
    },
    {
      x: 430,
      y: 70,
      ros: 10
    }],
  urlParamsString: '',
  dataPerformanceUrlParams: '',
  dataStoreUrlParams: 'store_type=Main Estate',
  dataWeekUrlParams: '',
  dataBubbleUrlParams: '',
  dataPageUrlParams:'page=1',
  sideFilterParams:'',
  textBoxQueryString:'',
  resetUrlParams:'',
  checkedList: [],
  radioChecked: '',
  prodArrayTable: '[]',
  prodArrayOpacity: '[]',
  tableDeselectBub: '[]',
  showLoading:false,
  loadingText:"Please wait while your product is being added to the list"
});

function rangingNegotiationPageReducer(state = initialState, action) {
  switch (action.type) {

    //For table
    case GENERATE_TABLE_SUCCESS:
      return state.set('data', action.data);
    //For graph
    case GRAPH_FETCH_SUCCESS:
      return state.set('chartData', action.data);

    //For performance filters
    case FILTER_FETCH:
      return state.set('filterType', action.data);

    case FILTER_FETCH_SUCCESS:
      return state.set('filteredData', action.data);

    case SAVE_PERF_PARAM:
      return state.set('dataPerformanceUrlParams', action.data);
    case SAVE_STORE_PARAM:
      return state.set('dataStoreUrlParams', action.data);

    case SAVE_WEEK_PARAM:
      return state.set('dataWeekUrlParams', action.data);
    case SAVE_BUBBLE_PARAM:
      //console.log("Bubble array in reducer", action.data);
      return state.set('prodArrayTable', action.data);

    case SAVE_BUBBLE_PARAM2:
      //console.log("Bubble array in reducer2", action.data);
      return state.set('prodArrayOpacity', action.data);

    case SAVE_SIDE_FILTER_PARAM:
      return state.set('sideFilterParams', action.data);
    case SAVE_PAGE_PARAM:
      return state.set('dataPageUrlParams', action.data);
    case GENERATE_TEXTBOX_QUERY_STRING:
      return state.set('textBoxQueryString', action.data);

      case RESET_CLICKED:
      return state.set('resetUrlParams', action.data);

    case RADIO_CHECK_PARAM:
      //console.log("RADIO_CHECK_PARAM", action.data);
      return state.set('radioChecked', action.data);


//For side filters
    case URL_PARAM:
      return state.set('urldata', action.data);
    case WEEK_FETCH:
      return state.set('weekNumber', action.data);

    case GENERATE_SIDE_FILTER_SUCCESS:
      return state.set('sideFilter', action.data);
    case GENERATE_URL_PARAMS:
      return state.set('urlParams', action.data);
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);

    case LOADING_INDICATION:
          return state.set('showLoading', action.flag);
case LOADING_INDICATION_TEXT:
          return state.set('loadingText', action.data);


    case GENERATE_CHECKED_LIST:
      return state.set('checkedList', (()=>{
        // console.log(state.get('checkedList'));
        let entireChangedPrices = state.get('checkedList');
        const toDelete = new Set([action.base_product_number]);
        const newArray = entireChangedPrices.filter(obj => !toDelete.has(obj.productId));
        // console.log(newArray, action.checked, action.base_product_number);
        return [...newArray,
          {
            productId: action.base_product_number,
            checked: action.checked,
          }
        ]
      })());
    default:
      return state;
  }
}

export default rangingNegotiationPageReducer;
