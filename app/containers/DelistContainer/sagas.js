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
  ajaxFetchSuccess,
  DelistPopupTableDataFetchSuccess,
  SupplierPopupTableDataFetchSuccess,
  delistTableSuccess,

} from 'containers/DelistContainer/actions';
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

let host_url = "http://172.20.244.238:8000"

// All sagas to be loaded
export function* generateApiFetch() {

  let urlName = yield select(selectDelistContainerDomain());
  // let urlParams = urlName.get("dataUrlparams");
  let urlParams = "";

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  let pagination_data = "";
  if (!(urlName.get('supplierTablePagination') == "")) {
    pagination_data = urlName.get('supplierTablePagination');

  }

  if (!(pagination_data == "")) {
    urlParams = urlParams + "&" + pagination_data;
  } else {
    // alert("empty");
  }

  let search_data = "";
  if (!(urlName.get('searchSupplierTable') == "")) {
    search_data = urlName.get('searchSupplierTable');
  }


  if (!(search_data == "")) {
    urlParams = urlParams + "&" + "supplier_search=" + search_data;
  } else {
    // alert("empty");
  }

  let week_no_data = "";
  if (!(urlName.get('weekNumber') == "")) {
    week_no_data = urlName.get('weekNumber');
  }

  if (!(week_no_data == "")) {
    urlParams = urlParams + "&" + week_no_data;
  } else {
    // alert("empty");
  }

  let store_type = "";
  if (!(urlName.get('storeType') == "")) {
    store_type = urlName.get('storeType');
  }

  if (!(store_type == "")) {
    urlParams = urlParams + "&" + store_type;

  } else {
    // alert("empty");
  }


  let urlParamsString = "";
  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    // if (!(urlName.get('urlParamsString') == "")) {

    urlParamsString = urlName.get('urlParamsString');
  }

  if (!(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
  } else {
    // alert("empty");
  }

  if (!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }



  // let paramstring = '';
  // if (!(isEmpty(urlParams))) {
  //   // console.log("generateApiFetch");
  //   Object.keys(urlParams).map(obj => {
  //     paramstring += `&${obj}=${urlParams[obj]}`;
  //   })


  try {
    const data = yield call(request, host_url +
      `/api/product_impact_supplier_table${urlParams}`);
      // `http://172.20.247.16:8000/api/product_impact_supplier_table${urlParams}`);
    let spinnerCheck = 1;

    // `http://172.20.246.146:8000/ranging/product_impact_table/?store_type=Main%20Estate&time_period=13_weeks&${paramstring}`);
    yield put(apiFetchSuccess(data));
    yield put(SupplierImpactTableSpinnerSuccess(spinnerCheck));
  } catch (err) {
    // console.log(err);
    let spinnerCheck = 2;
    yield put(SupplierImpactTableSpinnerSuccess(spinnerCheck));
  }
}


export function* doApiFetch() {
  const watcher = yield takeLatest(API_FETCH, generateApiFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* generateSubstitutesFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  let urlParams = urlName.get('substitutesData');

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  let pagination_data = "";
  if (!(urlName.get('delistPopupTablePagination') == "")) {
    pagination_data = urlName.get('delistPopupTablePagination');
  }

  if (!(pagination_data == "")) {
    urlParams = urlParams + "&" + pagination_data;
  } else {
    // alert("empty");
  }

  // let paramstring = '';
  // if (!(isEmpty(urlParams))) {
  //   console.log("generateApiFetch");
  //   Object.keys(urlParams).map(obj => {
  //     paramstring += `&${obj}=${urlParams[obj]}`;
  //   })
  //   paramstring = paramstring + '&id=' + urlParams;
  //   paramstring = +'/?' + paramstring.replace('&', '') + 'delist_product=' + substitutesData + '&' + 'delist_popup_page=' + pagination_data;
  // } else if(pagination_data != undefined){
  //   console.log("else if of sagas");
  //   paramstring = '/?' + paramstring.replace('&', '') + 'delist_product=' + substitutesData + '&' + 'delist_popup_page=' + pagination_data;
  //   // paramstring = '?' + pagination_data;
  //   alert(paramstring);
  // } else {
  //
  // }

  try {
    const data = yield call(request,host_url +
      // `http://172.20.246.143:8000/api/delist_table_popup?delist_product=${urlParams}`);
      `/api/delist_table_popup?delist_product=${urlParams}`);

    yield put(SubstitutesClickSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doSubstitutesFetch() {
  const watcher = yield takeLatest(SUBSTITUTE_DATA_URL, generateSubstitutesFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// FOR SUPPLIER POPUP TABLE
export function* generateSupplierPopupTableFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  let urlParams = urlName.get('supplierPopupTableData');

  function isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  let pagination_data = "";
  if (!(urlName.get('supplierPopupTablePagination') == "")) {
    pagination_data = urlName.get('supplierPopupTablePagination');
  }

  if (!(pagination_data == "")) {
    urlParams = urlParams + "&" + pagination_data;
  } else {
    // alert("empty");
  }


  try {
    const data = yield call(request,host_url +
      // `http://172.20.246.143:8000/api/supplier_table_popup?supplier=${urlParams}`);
      `/api/supplier_table_popup?supplier=${urlParams}`);

    yield put(SupplierPopupTableDataFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

// FOR SUPPLIER POPUP TABLE
export function* doSupplierPopupTableFetch() {
  const watcher = yield takeLatest(SUPPLIER_IMPACT_TABLE_DATA_URL, generateSupplierPopupTableFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// DELIST TABLE

export function* generateDelistTableFetch() {
  let urlName = yield select(selectDelistContainerDomain());
  let urlParams = "";

  let pagination_data = "";
  if (!(urlName.get('delistTablePagination') == "")) {
    pagination_data = urlName.get('delistTablePagination');
  }

  if (!(pagination_data == "")) {
    urlParams = urlParams + "&" + pagination_data;
  } else {
    // alert("empty");
  }

  let search_data = "";
  if (!(urlName.get('searchDelistTable') == "")) {
    search_data = urlName.get('searchDelistTable');
  }


  if (!(search_data == "")) {
    urlParams = urlParams + "&" + "delist_search=" + search_data;
  } else {
    // alert("empty");
  }

  let week_no_data = "";
  if (!(urlName.get('weekNumber') == "")) {
    week_no_data = urlName.get('weekNumber');
  }

  if (!(week_no_data == "")) {
    urlParams = urlParams + "&" + week_no_data;
  } else {
    // alert("empty");
  }

  let store_type = "";
  if (!(urlName.get('storeType') == "")) {
    store_type = urlName.get('storeType');
  }

  if (!(store_type == "")) {
    urlParams = urlParams + "&" + store_type;
  } else {
    // alert("empty");
  }

  let urlParamsString = "";
  // if (!(urlName.get('urlParamsString') == "")) {

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    urlParamsString = urlName.get('urlParamsString');
  }

  if (!(urlParamsString == "")) {
    urlParams = urlParams + "&" + urlParamsString;
  } else {
    // alert("empty");
  }

  if (!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }

  try {

    let data = yield call(request, host_url + `/api/product_impact_delist_table` + urlParams);
    // let data = yield call(request, `http://172.20.247.16:8000/api/product_impact_delist_table` + urlParams);
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
  console.log("inside delist sagas");
  const watcher = yield takeLatest(DELIST_TABLE, generateDelistTableFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// WATERFALL CHART - VALIUE
export function* generateWaterfallValueFetch() {

  let urlName = yield select(selectDelistContainerDomain());

  let urlParams = "";

  let week_no_data = "";
  if (!(urlName.get('weekNumber') == "")) {
    week_no_data = urlName.get('weekNumber');
  }

  if (!(week_no_data == "")) {
    urlParams = urlParams + "&" + week_no_data;
  } else {
    // alert("empty");
  }

  let store_type = "";
  if (!(urlName.get('storeType') == "")) {
    store_type = urlName.get('storeType');
  }

  if (!(store_type == "")) {
    urlParams = urlParams + "&" + store_type;
  } else {
    // alert("empty");
  }

let filterParamsString = "";
  if (!(urlName.get('filterParamsString') == "")) {
    filterParamsString = urlName.get('filterParamsString');
    console.log("filterParamsString", filterParamsString);
  }

  if (!(typeof(filterParamsString) == "undefined") && !(filterParamsString == "")) {
    urlParams = urlParams + "&" + filterParamsString;

  } else {
    // alert("empty");
  }

  let urlparamsDelist = "";
  if (!(urlName.get('urlparamsDelist') == "")) {
    urlparamsDelist = urlName.get('urlparamsDelist').replace('?', '');
  }

  if (!(urlparamsDelist == "")) {
    urlParams = urlParams + "&" + urlparamsDelist;
  } else {

  }

  if (!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }


  try {
    const data = yield call(request,host_url +

      // `http://172.20.244.238:8000/api/product_impact_chart${urlParams}`);
      `/api/product_impact_chart${urlParams}`);

    let spinnerCheck = 1;
    yield put(WaterfallValueChartSuccess(data));
    yield put(WaterfallSpinnerSuccess(spinnerCheck));
    yield put(WaterfallProfitSpinnerSuccess(spinnerCheck));
    yield put(apiFetch());
    yield put(delistTable());
  } catch (err) {
    // console.log(err);
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

// FILTERS
/* GENERATE TABLE */
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

/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  let urlName = yield select(selectDelistContainerDomain());
  let urlParamsString = urlName.get('urlParamsString');

  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  }
  // alert(urlParamsString);
  try {
    // todo: update url

    const data = yield call(request, host_url + `/api/product_impact/filter_data/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.247.16:8000/api/product_impact/filter_data/?${urlParamsString}`);


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


/* SIDE FILTER RESET*/
export function* generateSideFilterReset() {
  try {
    // todo: update url

    // const data = yield call(request, `http://172.20.244.141:8000/api/product_impact/filter_data/`);
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

// TESTING AJAX

export function* generateAjaxFetch() {
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
      // `http://172.20.246.146:8000/ranging/product_impact_table?${paramstring}`);
    yield put(ajaxFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doAjaxFetch() {
  const watcher = yield takeLatest(TEST_AJAX, generateAjaxFetch);
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


// All sagas to be loaded
export default [
  defaultSaga,
  doApiFetch,
  // doWeekFetch,
  // doTableFetch,
  doWaterfallChartValueFetch,
  doSubstitutesFetch, doGenerateSideFilter, doGenerateTable,
  doAjaxFetch,
  doSupplierPopupTableFetch,
  doAjaxApplyBtn,
  doDelistTableFetch,
  doSideFilterReset,
];
