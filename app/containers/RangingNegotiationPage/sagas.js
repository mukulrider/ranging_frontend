// import { take, call, put, select } from 'redux-saga/effects';

import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
  ajaxRequest, ajaxRequestSuccess, ajaxRequestError,
  generateTableSuccess, generateSideFilterSuccess,
  fetchDataSuccess, fetchGraphSuccess, fetchPerformanceFilterSuccess
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


let nego_host_url="http://172.20.244.220:8000";

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}



//------------------------------- Bubble Chart TableLoad ------------------------------------------
//const host_url='http://172.20.244.220:8000'
const host_url='http://172.20.244.220:8000'
export function* generateWeekFetch() {

  let urlName = yield select(selectRangingNegotiationPageDomain());
  let urlParams = urlName.get('weekNumber');
  let paramString = '';

  Object.keys(urlParams).map(obj => {
    // console.log(obj, urlParams[obj]);
    paramString += `&${obj}=${urlParams[obj]}`
  });
  paramString = paramString.replace('&', '');

  console.log(nego_host_url+`/api/nego_chart?` + paramString);
  try {
    const data = yield call(request, nego_host_url+`/api/nego_chart?` + paramString);
    yield put(fetchDataSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}


export function* doWeekFetch() {
  const watcher = yield takeLatest(WEEK_FETCH, generateWeekFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

//------------------------------- Bubble Table------------------------------------------

export function* generateTable() {

  let urlName = yield select(selectRangingNegotiationPageDomain());

  let urlParams = urlName.get('urlParamsString');
  let weekParams = urlName.get('dataWeekUrlParams');
  let storeParams = urlName.get('dataStoreUrlParams');
  let performanceParams = urlName.get('dataPerformanceUrlParams');
  let bubbleParams = urlName.get('prodArrayTable')

  let treated_bubble_params = bubbleParams.replace(/[^=,\w\s]/gi, '');
  let treated_bubble_params2 =treated_bubble_params.replace(/,/g , "&");

  let pageParams = urlName.get('dataPageUrlParams');
  let searchParams =urlName.get('textBoxQueryString');
  let resetParams = urlName.get('resetUrlParams');

  if (resetParams !== '') {
    bubbleParams='';
    performanceParams='';
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

  //This appends quartile filters, right now commented as functionality not yet figured out
  if (performanceParams !== '') {
    SelectionState = SelectionState + '&' + performanceParams
  }
  if (treated_bubble_params2 !== '') {
    SelectionState = SelectionState + '&' + treated_bubble_params2
  }
  if (pageParams !== '') {
    SelectionState = SelectionState + '&' + pageParams
  }
  if (searchParams!== '') {
    SelectionState = SelectionState + '&' + "search="+searchParams
  }

  //Removing "&"
  let ajaxSelection = SelectionState.replace('&', '');
  const data = yield call(request, nego_host_url+`/api/nego_table?` + ajaxSelection);
  yield put(generateTableSuccess(data));

  //
  // if (ajaxSelection != '') {
  //   const data = yield call(request, nego_host_url+`/api/nego_table?` + ajaxSelection+"&"+urlParams);
  //   yield put(generateTableSuccess(data));
  // }
  // else {
  //   const data = yield call(request, nego_host_url+`/api/nego_table?`+urlParams);
  //   yield put(generateTableSuccess(data));
  // }

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
  let bubbleParams = urlName.get('dataBubbleUrlParams');

  let treated_bubble_params = bubbleParams.replace(/[^=,\w\s]/gi, '');
  let treated_bubble_params2 =treated_bubble_params.replace(/,/g , "&");


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

  if (treated_bubble_params2 !== '') {
    SelectionState = SelectionState + '&' + treated_bubble_params2
  }

  //Removing "&"
  let ajaxSelection = SelectionState.replace('&', '');
  console.log(nego_host_url+`/api/nego_chart?` +ajaxSelection);
  const data = yield call(request, nego_host_url+`/api/nego_chart?`+ajaxSelection);
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

  try {

    let filterData = yield call(request, nego_host_url+`/api/nego/filter_data?` + urlParams);
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
  doWeekFetch,
  doGenerateSideFilter,
  doGenerateTable,
  doGenerateGraph
];
