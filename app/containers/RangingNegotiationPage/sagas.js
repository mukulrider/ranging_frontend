// import { take, call, put, select } from 'redux-saga/effects';

import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
  ajaxRequest, ajaxRequestSuccess, ajaxRequestError,
  generateTableSuccess, generateSideFilterSuccess,
  fetchDataSuccess, fetchGraphSuccess, fetchPerformanceFilterSuccess,
  updateLoadingIndicationStatus
} from 'containers/RangingNegotiationPage/actions';
import {
  makeUrlParams, makeUrlParamsString, makeTextBoxQueryString,selectRangingNegotiationPageDomain,
  makeNewScenarioString, makeNewScenarioWeek, makeNewScenarioStoreFormat
} from 'containers/RangingNegotiationPage/selectors';
import {
  //AJAX_REQUEST, AJAX_REQUEST_SUCCESS, AJAX_REQUEST_ERROR,
  GENERATE_FILE, GENERATE_TABLE,  FETCH_DATA, WEEK_FETCH, GRAPH_FETCH, FILTER_FETCH,
  GENERATE_SIDE_FILTER_SUCCESS, GENERATE_SIDE_FILTER, URL_PARAM, SAVE_WEEK_PARAM, SAVE_STORE_PARAM,SAVE_SIDE_FILTER_PARAM
} from './constants';


let nego_host_url="http://dvcmpapp00002uk.dev.global.tesco.org";
// let nego_host_url="http://dvcmpapp00002uk.dev.global.tesco.org";

let gettingUserDetails = () =>{
  let getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  };

  const user_id = getCookie('token');
  const user_name = getCookie('user');
  const designation = getCookie('designation');
  const sessionID = getCookie('login_timestamp')
  const buying_controller = getCookie('buying_controller');
  const buyer = getCookie('buyer');

  let cookie_params="user_id="+user_id+"&user_name="+user_name+"&designation="+designation+"&session_id="+sessionID+"&buying_controller_header="+buying_controller+"&buyer_header="+buyer;
  // let cookie_params="user_id="+user_id+"&user_name="+user_name+"&designation="+designation+"&session_id="+sessionID+"&buying_controller_header="+buying_controller;

  return(cookie_params);

}


// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}


//------------------------------- Bubble Table------------------------------------------

export function* generateTable() {

  let urlName = yield select(selectRangingNegotiationPageDomain());

  let urlParams = urlName.get('urlParamsString');
  let weekParams = urlName.get('dataWeekUrlParams');
  let storeParams = urlName.get('dataStoreUrlParams');
  let performanceParams = urlName.get('dataPerformanceUrlParams');

  let pageParams = urlName.get('dataPageUrlParams');
  let searchParams =urlName.get('textBoxQueryString');
  let resetParams = urlName.get('resetUrlParams');

  let prodArrayOpacity= urlName.get('prodArrayOpacity');



  if (resetParams !== '') {

  }


  let SelectionState = '';

  if (weekParams !== '') {
    SelectionState = SelectionState + '&' + weekParams
  }
  if (urlParams !== '') {
    SelectionState = SelectionState + '&' + urlParams
  }
  if (storeParams !== '') {
    SelectionState = SelectionState + '&' + storeParams
  }
 if (prodArrayOpacity !== '[]') {

    let productSelections  = JSON.parse(prodArrayOpacity);
    // console.log("=-=--=-= saga selection array " +productSelections)

   for(let i=0;i<productSelections.length;i++){

    SelectionState = SelectionState + '&base_product_number=' + productSelections[i]

  }

  }

  if (performanceParams !== '') {
    SelectionState = SelectionState + '&' + performanceParams
  }
  if (pageParams !== '') {
    SelectionState = SelectionState + '&' + pageParams
  }
  if (searchParams!== '') {
    SelectionState = SelectionState + '&' + "search="+searchParams
  }

  //Removing "&"
  let AJAX_args=SelectionState;
  let cookie_params=gettingUserDetails();
  AJAX_args =AJAX_args +"&"+cookie_params;
  AJAX_args = AJAX_args.replace('&', '');


  console.log(nego_host_url+`/api/nego_table?` + AJAX_args)
  const data = yield call(request, nego_host_url+`/api/nego_table?` + AJAX_args);
  yield put(generateTableSuccess(data));


  yield put(updateLoadingIndicationStatus(false));

}

export function* doGenerateTable() {
  const watcher = yield takeLatest(GENERATE_TABLE, generateTable);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

//------------------------------- Bubble Chart------------------------------------------

export function* generateGraph() {

  let urlName = yield select(selectRangingNegotiationPageDomain());

  //  Getting the url parameters for filters
  let urlParams = urlName.get('urlParamsString');
  let weekParams = urlName.get('dataWeekUrlParams');
  let storeParams = urlName.get('dataStoreUrlParams');
  let performanceParams = urlName.get('dataPerformanceUrlParams');

  let SelectionState = '';

  if (urlParams !== '') {
    SelectionState = SelectionState + '&' + urlParams
  }
  if (weekParams !== '') {
    SelectionState = SelectionState + '&' + weekParams
  }
  if (storeParams !== '') {
    SelectionState = SelectionState + '&' + storeParams
  }
  if (performanceParams !== '') {
    SelectionState = SelectionState + '&' + performanceParams
  }

  //Removing "&"
  let AJAX_args=SelectionState;
  let cookie_params=gettingUserDetails();
  AJAX_args =AJAX_args +"&"+cookie_params;
  AJAX_args = AJAX_args.replace('&', '');



  console.log(nego_host_url+`/api/nego_chart?` +AJAX_args);
  const data = yield call(request, nego_host_url+`/api/nego_chart?`+AJAX_args );
  yield put(fetchGraphSuccess(data));


}

export function* doGenerateGraph() {
  const watcher = yield takeLatest(GRAPH_FETCH, generateGraph);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


//------------------------------- Side Filter ------------------------------------------
export function* generateSideFilter() {
  let urlName = yield select(selectRangingNegotiationPageDomain());
  let urlParams = urlName.get('urlParamsString');

  let AJAX_args='';
  if(urlParams!==''){
    AJAX_args=AJAX_args+"&"+urlParams;
  }

  let cookie_params=gettingUserDetails();
  AJAX_args =AJAX_args +"&"+cookie_params;
  AJAX_args = AJAX_args.replace('&', '');


  try {

    let filterData = yield call(request, nego_host_url+`/api/nego/filter_data?` + AJAX_args);
    yield put(generateSideFilterSuccess(filterData));

  } catch (err) {

  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_SIDE_FILTER, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


//----------------------------------------------------------------------------------------
// All sagas to be loaded
export default [
  defaultSaga,
  doGenerateSideFilter,
  doGenerateTable,
  doGenerateGraph
];
