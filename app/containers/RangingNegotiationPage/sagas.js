// import { take, call, put, select } from 'redux-saga/effects';

import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';

import {
  FETCH_DATA, WEEK_FETCH, GRAPH_FETCH, FILTER_FETCH
} from './constants';
import {
  fetchDataSuccess, fetchGraphSuccess, fetchPerformanceFilterSuccess
} from 'containers/RangingNegotiationPage/actions';
// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}
import {selectRangingNegotiationPageDomain} from 'containers/RangingNegotiationPage/selectors';

import {
  ajaxRequest, ajaxRequestSuccess, ajaxRequestError,
  generateTableSuccess, generateSideFilterSuccess
} from 'containers/RangingNegotiationPage/actions';
import {
  makeUrlParams, makeUrlParamsString, makeTextBoxQueryString,
  makeNewScenarioString, makeNewScenarioWeek, makeNewScenarioStoreFormat
} from 'containers/RangingNegotiationPage/selectors';
import {
  //AJAX_REQUEST, AJAX_REQUEST_SUCCESS, AJAX_REQUEST_ERROR,
  GENERATE_FILE, GENERATE_TABLE,
  GENERATE_SIDE_FILTER_SUCCESS, GENERATE_SIDE_FILTER, URL_PARAM, SAVE_WEEK_PARAM, SAVE_STORE_PARAM,SAVE_SIDE_FILTER_PARAM
} from './constants';


export function* generateWeekFetch() {

  let urlParamsString = yield select(selectRangingNegotiationPageDomain());

  let urlName = yield select(selectRangingNegotiationPageDomain());

  let urlParams = urlName.get('weekNumber');


  let paramString = '';
  Object.keys(urlParams).map(obj => {
    console.log(obj, urlParams[obj]);
    paramString += `&${obj}=${urlParams[obj]}`
  })

  //paramString = paramString + '&week=' + urlParams;
  paramString = paramString.replace('&', '');

  try {
    // const data = yield call(request, `http:// 172.20.244.223:8000/ranging/default_data_for_nego_charts?` + paramString);
    const data = yield call(request, `http://172.20.244.223:8000/api/nego_chart?` + paramString);
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


/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  let urlName = yield select(selectRangingNegotiationPageDomain());

  let urlParams = urlName.get('urlParamsString');
  try {
    // todo: update url
    let data = '';
    if (urlParams){
      data = yield call(request, `http://172.20.244.223:8000/api/nego/filter_data?` + urlParams);

    }else{

      data = yield call(request, `http://172.20.244.223:8000/api/nego/filter_data`);
    }
    yield put(generateSideFilterSuccess(data));
  } catch (err) {

  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_SIDE_FILTER, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

/* GENERATE TABLE */
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
  let ajaxSelection = '';

  ajaxSelection = SelectionState.replace('&', '');

  if (ajaxSelection != '') {
    // const data = yield call(request, `http:// 172.20.244.223:8000/ranging/nego_bubble_table?` + ajaxSelection+"&"+urlParams);
    const data = yield call(request, `http://172.20.244.223:8000/api/nego_table?` + ajaxSelection+"&"+urlParams);
    yield put(generateTableSuccess(data));
  }
  else {
    // const data = yield call(request, `http:// 172.20.244.223:8000/ranging/nego_bubble_table?`+urlParams);
    const data = yield call(request, `http://172.20.244.223:8000/api/nego_table?`+urlParams);
    yield put(generateTableSuccess(data));
  }
}

export function* doGenerateTable() {
  const watcher = yield takeLatest(GENERATE_TABLE, generateTable);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}
/* GENERATE GRAPH */

export function* generateGraph() {

  let urlName = yield select(selectRangingNegotiationPageDomain());
//  Getting the url parameters for filters
  let urlParams = urlName.get('urlParamsString');


  let weekParams = urlName.get('dataWeekUrlParams');

  let storeParams = urlName.get('dataStoreUrlParams');

  let performanceParams = urlName.get('dataPerformanceUrlParams');

  let bubbleParams = urlName.get('dataBubbleUrlParams');

  var treated_bubble_params = bubbleParams.replace(/[^=,\w\s]/gi, '');
  var treated_bubble_params2 =treated_bubble_params.replace(/,/g , "&");


  let SelectionState = '';

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
  let ajaxSelection = '';
  ajaxSelection = SelectionState.replace('&', '');
  console.log(`http://172.20.244.223:8000/api/nego_chart?` + urlParams +"&"+ ajaxSelection);
  if (ajaxSelection != '') {
    const data = yield call(request, `http://172.20.244.223:8000/api/nego_chart?` + urlParams +"&"+ ajaxSelection);
    yield put(fetchGraphSuccess(data));
  }
  else {
    // const data = yield call(request, `http:// 172.20.244.223:8000/ranging/nego_bubble_chart?`+urlParams );
    const data = yield call(request, `http://172.20.244.223:8000/api/nego_chart?`+urlParams );
    yield put(fetchGraphSuccess(data));
  }
}

export function* doGenerateGraph() {
  const watcher = yield takeLatest(GRAPH_FETCH, generateGraph);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


// All sagas to be loaded
export default [
  defaultSaga,
  doWeekFetch,
  doGenerateSideFilter,
  doGenerateTable,
  doGenerateGraph
];
