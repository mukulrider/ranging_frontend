``// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
// Individual exports for testing
import {
  API_FETCH,
  WEEK_URL,
  TABLE_DATA_FETCH,
  SUBSTITUTE_DATA_URL,
  SUPPLIER_IMPACT_TABLE_DATA_URL,
  GENERATE_TABLE,
  GENERATE_SIDE_FILTER,
  WATERFALL_VALUE,
  SUBSTITUTE_DATA_URL_SUCCESS,
  SUPPLIER_IMPACT_TABLE_DATA_URL_SUCCESS,
  TEST_AJAX,
  APPLY_BTN_CLICK,
  DELIST_TABLE,
  GENERATE_URL_PARAMS_STRING,
  SIDE_FILTER_RESET,
  SAVE_SCENARIO,
} from './constants';

import {
  selectDelistContainerDomain, makeUrlParams, makeUrlParamsString,
} from 'containers/DelistContainer/selectors';

import {
  apiFetch,
  delistTable,
  apiFetchSuccess,
  SupplierImpactTableSpinnerSuccess,
  DelistProductTableSpinnerSuccess,
  ModalTableDataFetchSuccess,
  generateTableSuccess,
  generateSideFilterSuccess,
  WaterfallValueChartSuccess,
  WaterfallSpinnerSuccess,
  WaterfallProfitSpinnerSuccess,
  SubstitutesClickSuccess,
  DelistPopupTableSpinnerSuccess,
  ajaxFetchSuccess,
  DelistPopupTableDataFetchSuccess,
  SupplierPopupTableDataFetchSuccess,
  SupplierPopupTableSpinnerSuccess,
  delistTableSuccess,
  updateSaveScenarioResponse,
  showNoDataErrorMessage,
  onDelistDefaultView

} from 'containers/DelistContainer/actions';
import {browserHistory} from 'react-router';

export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

//getting user info from cookies
let gettingUserDetails = () => {
  let getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }
  const user_id = getCookie('token');
  const user_name = getCookie('user');
  const designation = getCookie('designation');
  const sessionID = getCookie('login_timestamp')
  const buying_controller = getCookie('buying_controller');
  let cookie_params = "user_id=" + user_id + "&user_name=" + user_name + "&designation=" + designation + "&session_id=" + sessionID + "&buying_controller_header=" + buying_controller;

  if (designation === 'Buyer' || designation === 'buyer') {
    const buyer = getCookie('buyer');
    cookie_params = cookie_params + "&buyer_header=" + buyer;
  }

  return (cookie_params);
}

// let host_url = "http://172.20.181.13:8000"
let host_url = "http://172.20.181.16:8000"

// All sagas to be loaded

//------------------------------- Supplier Table------------------------------------------
export function* generateApiFetch() {

  let urlName = yield select(selectDelistContainerDomain());
  let urlParams = "";
  let week_no_data = urlName.get('weekNumber');
  let store_type = urlName.get('storeType');
  let urlParamsString = urlName.get('urlParamsString');


  if (!(week_no_data == "")) {
    urlParams = urlParams + "&" + week_no_data;
  }

  if (!(store_type == "")) {
    urlParams = urlParams + "&" + store_type;
  }

  if (!(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
  }


  //Adding the user information
  let cookie_params=gettingUserDetails();
  urlParams =urlParams +"&"+cookie_params;
  urlParams = urlParams.replace('&', '');



  try {
    const data = yield call(request, host_url +
      `/api/product_impact_supplier_table?${urlParams}`);
      // `http://172.20.247.16:8000/api/product_impact_supplier_table${urlParams}`);
    let spinnerCheck = 1;

    // `http://172.20.246.146:8000/ranging/product_impact_table/?store_type=Main%20Estate&time_period=13_weeks&${paramstring}`);
    yield put(apiFetchSuccess(data));
    yield put(SupplierImpactTableSpinnerSuccess(spinnerCheck));
  } catch (err) {
    let spinnerCheck = 2;
    yield put(SupplierImpactTableSpinnerSuccess(spinnerCheck));
  }
}

export function* doApiFetch() {
  const watcher = yield takeLatest(API_FETCH, generateApiFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

//------------------------------- Substitute product pop up Table------------------------------------------
export function* generateSubstitutesFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  let urlParams = urlName.get('substitutesData');

  //Adding the user information
  let cookie_params=gettingUserDetails();
  urlParams =urlParams +"&"+cookie_params;



  try {
    const data = yield call(request,host_url +
      `/api/delist_table_popup?delist_product=${urlParams}`);
    let spinnerCheck = 1;
    yield put(SubstitutesClickSuccess(data));
    yield put(DelistPopupTableSpinnerSuccess(spinnerCheck));
  } catch (err) {
    // console.log(err);
    let spinnerCheck = 1;
    yield put(DelistPopupTableSpinnerSuccess(spinnerCheck));
  }
}

export function* doSubstitutesFetch() {
  const watcher = yield takeLatest(SUBSTITUTE_DATA_URL, generateSubstitutesFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

//------------------------------- Supplier Table pop up------------------------------------------
export function* generateSupplierPopupTableFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  let urlParams = urlName.get('supplierPopupTableData');

  //Adding the user information
  let cookie_params=gettingUserDetails();
  urlParams =urlParams +"&"+cookie_params;



  try {
    const data = yield call(request,host_url +
      // `http://172.20.246.143:8000/api/supplier_table_popup?supplier=${urlParams}`);
      `/api/supplier_table_popup?supplier=${urlParams}`);

    let spinnerCheck = 1;
    yield put(SupplierPopupTableDataFetchSuccess(data));
    yield put(SupplierPopupTableSpinnerSuccess(spinnerCheck));

  } catch (err) {
    // console.log(err);
    let spinnerCheck = 2;
    yield put(SupplierPopupTableSpinnerSuccess(spinnerCheck));
  }
}

export function* doSupplierPopupTableFetch() {
  const watcher = yield takeLatest(SUPPLIER_IMPACT_TABLE_DATA_URL, generateSupplierPopupTableFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//------------------------------- Delist Table pop up------------------------------------------

export function* generateDelistTableFetch() {
  let urlName = yield select(selectDelistContainerDomain());
  let urlParams = "";

  let week_no_data = urlName.get('weekNumber');
  let store_type = urlName.get('storeType');
  let urlParamsString = urlName.get('urlParamsString');


  if (!(week_no_data == "")) {
    urlParams = urlParams + "&" + week_no_data;
  }

  if (!(store_type == "")) {
    urlParams = urlParams + "&" + store_type;
  }

  if (!(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
  }


  //Adding the user information
  let cookie_params=gettingUserDetails();
  urlParams =urlParams +"&"+cookie_params;
  urlParams = urlParams.replace('&', '');



  try {

    let data = yield call(request, host_url + `/api/product_impact_delist_table?` + urlParams);
    console.log("delist table",data)
    let spinnerCheck = 1;
    yield put(delistTableSuccess(data));
    yield put(DelistProductTableSpinnerSuccess(spinnerCheck));

  } catch (err) {
    // console.log(err);
    let spinnerCheck = 2;
    yield put(DelistProductTableSpinnerSuccess(spinnerCheck));
  }
}

export function* doDelistTableFetch() {

  const watcher = yield takeLatest(DELIST_TABLE, generateDelistTableFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//------------------------------- Waterfall charts------------------------------------------
export function* generateWaterfallValueFetch() {

  let urlName = yield select(selectDelistContainerDomain());
  let urlParams = "";


  let week_no_data = urlName.get('weekNumber');
  let store_type = urlName.get('storeType');
  let urlParamsString = urlName.get('urlParamsString');


  if (!(week_no_data == "")) {
    urlParams = urlParams + "&" + week_no_data;
  }

  if (!(store_type == "")) {
    urlParams = urlParams + "&" + store_type;
  }

  if (!(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
  }

  // let urlparamsDelist = "";
  // if (!(urlName.get('urlparamsDelist') == "")) {
  //   urlparamsDelist = urlName.get('urlparamsDelist').replace('?', '');
  //   urlParams = urlParams + "&" + urlparamsDelist;
  // }

  //Adding the user information
  let cookie_params=gettingUserDetails();
  urlParams =urlParams +"&"+cookie_params;
  urlParams = urlParams.replace('&', '');


  try {
    const data = yield call(request,host_url +

      // `http://172.20.244.238:8000/api/product_impact_chart${urlParams}`);
      `/api/product_impact_chart?${urlParams}`);

    let spinnerCheck = 1;
    yield put(WaterfallSpinnerSuccess(spinnerCheck));
    yield put(WaterfallProfitSpinnerSuccess(spinnerCheck));

    if(data.message){
      yield put(onDelistDefaultView(0));
      yield put(showNoDataErrorMessage(true));
      yield put(WaterfallValueChartSuccess(data));
    }else{
      yield put(WaterfallValueChartSuccess(data));
      yield put(apiFetch());
      yield put(delistTable());
  }





  } catch (err) {

    let spinnerCheck = 2;
    yield put(WaterfallSpinnerSuccess(spinnerCheck));
    yield put(WaterfallProfitSpinnerSuccess(spinnerCheck));
  }
}

export function* doWaterfallChartValueFetch() {
  const watcher = yield takeLatest(WATERFALL_VALUE, generateWaterfallValueFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

//------------------------------- Product Impact table ------------------------------------------

export function* generateTable() {
  let urlParamsString = yield select(makeUrlParamsString());
  urlParamsString = urlParamsString.urlParamsString;
  try {
    urlParamsString = urlParamsString.replace('commercial_director', 'commerical_director');
    const data = yield call(request, host_url + `/ranging/product_impact_table/?${urlParamsString}`);

    yield put(generateTableSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateTable() {
  const watcher = yield takeLatest(GENERATE_TABLE, generateTable);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

//------------------------------- Side Filter ------------------------------------------
export function* generateSideFilter() {
  let urlName = yield select(selectDelistContainerDomain());
  let urlParamsString = urlName.get('urlParamsString');
  let urlParams=""


  if (urlParamsString !== "" && typeof(urlParamsString)!=="undefined") {
    urlParams = urlParams + "&" + urlParamsString;
  }

  //Adding the user information
  let cookie_params=gettingUserDetails();
  urlParams =urlParams +"&"+cookie_params;
  urlParams = urlParams.replace('&', '');

  try {
    console.log(host_url + `/api/product_impact/filter_new?${urlParams}`)
    const data = yield call(request, host_url + `/api/product_impact/filter_new?${urlParams}`);
  yield put(generateSideFilterSuccess(data));

  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_URL_PARAMS_STRING, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/* ---- SIDE FILTER RESET*/
export function* generateSideFilterReset() {
  try {

    const data = yield call(request, host_url + `/api/product_impact/filter_data/`);

    yield put(generateSideFilterSuccess(data));

  } catch (err) {
    // console.log(err);
  }
}

export function* doSideFilterReset() {
  const watcher = yield takeLatest(SIDE_FILTER_RESET, generateSideFilterReset);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//FILTERS - APPLY BUTTON CLICK

export function* generateRefreshedData() {
  const urlName = yield select(selectDelistContainerDomain());
  const urlParams = urlName.get('dataUrlparams');
  let paramstring = '';

  Object.keys(urlParams).map((obj) => {
    paramstring += `&${obj}=${urlParams[obj]}`;
  });
  paramstring = paramstring.replace('&', '');

  try {
    const data = yield call(request,host_url +
      `/ranging/product_impact_table?${paramstring}`);
      // `http://172.20.246.146:8000/ranging/product_impact_table`);
    yield put(ajaxFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doAjaxApplyBtn() {
  const watcher = yield takeLatest(APPLY_BTN_CLICK, generateRefreshedData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//------------------------------- Saving scenario ------------------------------------------
/* GENERATE SIDE FILTER*/
export function* generateSaveScenario() {
  try {
    console.log("Trying to save scenario")
    let urlName = yield select(selectDelistContainerDomain());
    let urlParamsString = urlName.get('urlParamsString');
    let scenarioName = urlName.get('scenarioName');
    let tagName = urlName.get('tagName');
    let cookie_params=gettingUserDetails();
    let editScenarioOverWrite = urlName.get('editScenarioOverWrite');


    let AJAX_args =urlParamsString+"&scenario_name="+scenarioName+"&"+cookie_params+"&"+editScenarioOverWrite;


    //Adding the user information

    console.log(host_url+'/api/npd_impact_save_scenario?' + AJAX_args);
    let data = yield call(request, host_url+'/api/delist_scenario?' + AJAX_args);
    yield put(updateSaveScenarioResponse(data));

  } catch (err) {
    //console.log(err);
  }
}

export function* doSaveScenario() {
  const watcher = yield takeLatest(SAVE_SCENARIO, generateSaveScenario);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}



// All sagas to be loaded
export default [
  defaultSaga,
  doApiFetch,
  doSaveScenario,
  // doWeekFetch,
  // doTableFetch,
  doWaterfallChartValueFetch,
  doSubstitutesFetch, doGenerateSideFilter, doGenerateTable,

  doSupplierPopupTableFetch,
  doAjaxApplyBtn,
  doDelistTableFetch,
  doSideFilterReset,
];
