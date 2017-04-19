// import { take, call, put, select } from 'redux-saga/effects';
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
  apiFetchSuccess,
  ModalTableDataFetchSuccess,
  generateTableSuccess,
  generateSideFilterSuccess,
  WaterfallValueChartSuccess,
  SubstitutesClickSuccess,
  ajaxFetchSuccess,
  DelistPopupTableDataFetchSuccess,
  SupplierPopupTableDataFetchSuccess,
  delistTableSuccess,

} from 'containers/DelistContainer/actions';
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export function* generateApiFetch() {

  let urlName = yield select(selectDelistContainerDomain());
  // let urlParams = urlName.get("dataUrlparams");
  let urlParams = "";
  console.log("type 1",urlParams);

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

    // console.log("pagination_data", pagination_data);
  }
  // let substitutesData = urlName.get(substitutesData);

  if (!(pagination_data == "")) {
    // alert("non empty");
    // console.log("inside if --- urlParams",urlParams);
    urlParams = urlParams + "&" + pagination_data;
    // console.log("inside if --- urlParams",urlParams);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }
  console.log("type 2",urlParams);

  let search_data = "";
  if (!(urlName.get('searchSupplierTable') == "")) {

    search_data = urlName.get('searchSupplierTable');

    // console.log("search_data", search_data);
  }


  if (!(search_data == "")) {
    // alert("non empty");
    // console.log("inside if --- search_data",search_data);
    urlParams = urlParams + "&" + "supplier_search=" + search_data;
    // console.log("inside if --- search_data",search_data);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }
  console.log("type 3",urlParams);

  let week_no_data = "";
  if (!(urlName.get('weekNumber') == "")) {

    week_no_data = urlName.get('weekNumber');

    console.log("week_no_data", week_no_data);
  }

  if (!(week_no_data == "")) {
    // alert("non empty");
    // console.log("inside if --- week_no_data",week_no_data);
    urlParams = urlParams + "&" + week_no_data;
    // console.log("inside if --- week_no_data",week_no_data);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }
  console.log("type 4",urlParams);

  let store_type = "";
  if (!(urlName.get('storeType') == "")) {

    store_type = urlName.get('storeType');

    console.log("store_type", store_type);
  }

  if (!(store_type == "")) {
    // alert("non empty");
    // console.log("inside if --- store_type",store_type);
    urlParams = urlParams + "&" + store_type;
    // console.log("inside if --- store_type",store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

  console.log("type 5",urlParams);

  let urlParamsString = "";
  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
  // if (!(urlName.get('urlParamsString') == "")) {

    urlParamsString = urlName.get('urlParamsString');

    console.log("urlParamsString", urlParamsString);
  }

  if (!(urlParamsString == "")) {
    // alert("non empty");
    // console.log("inside if --- store_type",store_type);
    urlParams = urlParams + "&" + urlParamsString;
    // console.log("inside if --- store_type",store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }
  console.log("type 6",urlParams);

  if (!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }

  console.log("type 7",urlParams);

  // let tableType = urlName.get("tableType");
  // let tableTypeStateName = '';
  // if( tableType=="supplier"){
  //   tableTypeStateName = "supplierTablePagination";
  // } else if( tableType=="supplier_popup"){
  //   tableTypeStateName = "supplierPopupTablePagination";
  // } else if( tableType=="delist") {
  //   tableTypeStateName = "delistTablePagination";
  // } else if( tableType=="delist_popup") {
  //   tableTypeStateName = "delistPopupTablePagination";
  // }
  // alert(tableTypeStateName);
  // let pagination_data = urlName.get(tableTypeStateName);
  // alert(pagination_data);
  //
  // let paramstring = '';
  // if (!(isEmpty(urlParams))) {
  //   // console.log("generateApiFetch");
  //   Object.keys(urlParams).map(obj => {
  //     paramstring += `&${obj}=${urlParams[obj]}`;
  //   })
  //   paramstring = paramstring + '&id=' + urlParams;
  //   paramstring = +'/?' + paramstring.replace('&', '') + '&' + tableType + '_page=' + pagination_data;
  // } else if(pagination_data != undefined){
  //   // console.log("else if of sagas");
  //   paramstring = '?' + pagination_data;
  //   alert(paramstring);
  // } else {
  //
  // }


  try {
    const data = yield call(request,
      // `http://172.20.246.146:8000/ranging/product_impact_table/`);
      // `http://172.20.246.146:8000/ranging/product_impact_supplier_table${urlParams}`);
      `http://dvempapp00001uk.dev.global.tesco.org/api/product_impact_supplier_table${urlParams}`);
      // `http://172.20.246.146:8000/ranging/product_impact_supplier_table${urlParams}`);
      // `http://172.20.246.146:8000/ranging/product_impact_supplier_table${urlParams}`);
    // `http://172.20.246.146:8000/ranging/product_impact_table${paramstring}`);
    // `http://172.20.246.146:8000/ranging/product_impact_table/?store_type=Main%20Estate&time_period=13_weeks&${paramstring}`);


    yield put(apiFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doApiFetch() {
  // console.log("inside sagas");
  const watcher = yield takeLatest(API_FETCH, generateApiFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// export function* generateWeekFetch() {
//   // const urlName = yield select(selectDelistContainerDomain());
//   // const urlParams = urlName.get('weekNumber');
//   // let paramstring = '';
//
//   // Object.keys(urlParams).map(obj => {
//   //   console.log('obj-> ', obj);
//   //   paramstring += `&${obj}=${urlParams[obj]}`;
//   // });
//
//   // paramstring = `${paramstring}&time_period=${urlParams}`;
//   // paramstring = paramstring.replace('&', '');
//   try {
//     const data = yield call(request,
//       `http://172.20.246.140:8000/ranging/product_impact_chart`);
//     // `http://172.20.246.140:8000/ranging/product_impact_chart/?${paramstring}`);
//     yield put(apiFetchSuccess(data));
//   } catch (err) {
//     // console.log(err);
//   }
// }

// export function* doWeekFetch() {
//   const watcher = yield takeLatest(WEEK_URL, generateWeekFetch);
//   yield take(LOCATION_CHANGE);
//   yield cancel(watcher);
// }

// export function* generateTableFetch() {
//   console.log('generateTableFetch>>>>>>>>>>>>>>>>>')
//   let urlName = yield select(selectDelistContainerDomain());
//   let urlParams = urlName.get("tableDataFetch");
//   console.log(urlParams);
//
//   let paramstring = '';
//   Object.keys(urlParams).map(obj => {
//     paramstring += `&${obj}=${urlParams[obj]}`;
//   })
//   paramstring = paramstring + '&id=' + urlParams;
//   paramstring = paramstring.replace('&', '')
//   try {
//     const data = yield call(request,
//       `http://172.20.246.140:8000/ranging/product_impact_table/?` + paramstring);
//     yield put(ModalTableDataFetchSuccess(data));
//   } catch (err) {
//     // console.log(err);
//   }
// }
//
// export function* doTableFetch() {
//   const watcher = yield takeLatest(GENERATE_TABLE, generateTableFetch);
//   yield take(LOCATION_CHANGE);
//   yield cancel(watcher);
// }

export function* generateSubstitutesFetch() {
  const urlName = yield select(selectDelistContainerDomain());
  let urlParams = urlName.get('substitutesData');
  console.log("a1",urlParams);


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

  console.log("a2",urlParams);

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
    const data = yield call(request,
      // `http://172.20.246.146:8000/ranging/delist_table_popup?delist_product=${urlParams}`);
      `http://dvempapp00001uk.dev.global.tesco.org/api/delist_table_popup?delist_product=${urlParams}`);
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

//   let paramstring = '';
//   if (!(isEmpty(urlParams))) {
//     Object.keys(urlParams).map(obj => {
//       paramstring += `&${obj}=${urlParams[obj]}`;
//     })
//     paramstring = paramstring + '&id=' + urlParams;
//     paramstring = +'/?' + paramstring.replace('&', '') + '&' + pagination_data;
//   } else if(pagination_data != ""){
//     console.log("else if of sagas");
//     paramstring = '?' + pagination_data;
//     alert(paramstring);
//   } else {
//     paramstring = urlParams;
//   }
// alert("paramstring");
// alert(paramstring);

  if (!(pagination_data == "")) {
    urlParams = urlParams + "&" + pagination_data;
  } else {
    // alert("empty");
  }

  try {
    const data = yield call(request,
      // `http://172.20.246.146:8000/ranging/supplier_table_popup?supplier=${urlParams}`);
      `http://dvempapp00001uk.dev.global.tesco.org/api/supplier_table_popup?supplier=${urlParams}`);
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

  console.log('t 1',urlParams);

  let pagination_data = "";
  if (!(urlName.get('delistTablePagination') == "")) {
    pagination_data = urlName.get('delistTablePagination');
  }

  if (!(pagination_data == "")) {
    urlParams = urlParams + "&" + pagination_data;
  } else {
    // alert("empty");
  }

  console.log('t 2',urlParams);

  let search_data = "";
  if (!(urlName.get('searchDelistTable') == "")) {
    search_data = urlName.get('searchDelistTable');
  }


  if (!(search_data == "")) {
    urlParams = urlParams + "&" + "delist_search=" + search_data;
  } else {
    // alert("empty");
  }

  console.log('t 3',urlParams);

  let week_no_data = "";
  if (!(urlName.get('weekNumber') == "")) {
    week_no_data = urlName.get('weekNumber');
    console.log("delist week_no_data", week_no_data);
  }

  if (!(week_no_data == "")) {
    urlParams = urlParams + "&" + week_no_data;
  } else {
    // alert("empty");
  }

  console.log('t 4',urlParams);

  let store_type = "";
  if (!(urlName.get('storeType') == "")) {

    store_type = urlName.get('storeType');

    console.log("store_type", store_type);
  }

  if (!(store_type == "")) {
    // alert("non empty");
    console.log("delist inside if --- store_type", store_type);
    urlParams = urlParams + "&" + store_type;
    console.log("delist inside if --- store_type", store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

  console.log('t 5',urlParams);

  let urlParamsString = "";
  // if (!(urlName.get('urlParamsString') == "")) {

    if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {

    urlParamsString = urlName.get('urlParamsString');

    console.log("urlParamsString", urlParamsString);
  }

  if (!(urlParamsString == "")) {
    // alert("non empty");
    console.log("delist inside if --- store_type", urlParamsString);
    urlParams = urlParams + "&" + urlParamsString;
    console.log("delist inside if --- store_type", urlParamsString);

  } else {
    // alert("empty");
  }

  console.log('t 6',urlParams);

  if (!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }
  console.log("urlParams delist", urlParams);

  console.log('t 7',urlParams);

  try {
    console.log("urlParams2", urlParams);
    // let data = yield call(request, `http://172.20.246.146:8000/ranging/product_impact_delist_table` + urlParams);
    let data = yield call(request, `http://dvempapp00001uk.dev.global.tesco.org/api/product_impact_delist_table` + urlParams);
    console.log("delist data", data);
    yield put(delistTableSuccess(data));
  } catch (err) {
    console.log(err);
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
  console.log("urlName", urlName);
  let urlParams = "";

  console.log('final 1', urlParams);

  // console.log('urlParams for waterfall chart - value', urlParams);
  //
  // let paramstring = '';
  // Object.keys(urlParams).map(obj => {
  //   paramstring += `&${obj}=${urlParams[obj]}`;
  // })
  // paramstring = paramstring + '&id=' + urlParams;
  // paramstring = paramstring.replace('&', '')

  let week_no_data = "";
  if (!(urlName.get('weekNumber') == "")) {
    week_no_data = urlName.get('weekNumber');
    console.log("week_no_data", week_no_data);
  }

  if (!(week_no_data == "")) {
    console.log("inside if --- week_no_data", week_no_data);
    urlParams = urlParams + "&" + week_no_data;
  } else {
    // alert("empty");
  }

  console.log('final 2', urlParams);

  let store_type = "";
  if (!(urlName.get('storeType') == "")) {
    store_type = urlName.get('storeType');
    console.log("store_type", store_type);
  }

  if (!(store_type == "")) {
    urlParams = urlParams + "&" + store_type;
    console.log("inside if --- store_type", store_type);

  } else {
    // alert("empty");
  }

  console.log('final 3', urlParams);
  //
  // let urlParamsString = "";
  // if(!((urlName.get('urlParamsString') == "") || (typeof(urlParamsString) == "undefined"))) {
  //
  //   urlParamsString = urlName.get('urlParamsString');
  //
  //   console.log("urlParamsString nt", urlParamsString);
  // }
  //

  let urlParamsString = "";
  if (!(urlName.get('urlParamsString') == "")) {
    urlParamsString = urlName.get('urlParamsString');
    console.log("urlParamsString", urlParamsString);
  }

  if (!(typeof(urlParamsString) == "undefined") && !(urlParamsString == "")) {
    // alert("non empty");
    // alert(urlParamsString);
    console.log("inside if for params", urlParamsString);
    urlParams = urlParams + "&" + urlParamsString;
    console.log("inside if 2 for params", urlParams);

  } else {
    // alert("empty");
  }
  //
  console.log('final 4', urlParams);

  let urlparamsDelist = "";
  if (!(urlName.get('urlparamsDelist') == "")) {

    urlparamsDelist = urlName.get('urlparamsDelist').replace('?', '');
    // alert(urlparamsDelist);

    console.log("urlparamsDelist nt", urlparamsDelist);
  }

  if (!(urlparamsDelist == "")) {
    urlParams = urlParams + "&" + urlparamsDelist;
    // alert(urlParams);
  } else {
    // alert("empty");
  }

  console.log('final params1', urlParams);

  if (!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }

  console.log('final 4', urlParams);

  try {
    console.log("inside try");
    const data = yield call(request,
      `http://dvempapp00001uk.dev.global.tesco.org/api/product_impact_chart${urlParams}`);
      // `http://172.20.246.146:8000/ranging/product_impact_chart${urlParams}`);

    yield put(WaterfallValueChartSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doWaterfallChartValueFetch() {
  console.log("INSIDE SMALL FUNCTION");
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

    const data = yield call(request, `http://172.20.246.146:8000/ranging/product_impact_table/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.246.146:8000/ranging/product_impact_table/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.246.140:8000/ranging/product_impact_table/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.78.87:8080/ranging/product_impact/filter_data&${urlParamsString}`);
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
  console.log("filter saga bigger fn");
  let urlName = yield select(selectDelistContainerDomain());
  console.log(urlName);
  let urlParamsString = urlName.get('urlParamsString');

  if (typeof(urlParamsString) == "undefined") {
    urlParamsString = "";
  }
  console.log("urlParams", urlParamsString);
  // alert(urlParamsString);
  try {
    // todo: update url
    // const data = yield call(request, 'http://172.20.247.17:8000/ranging/product_impact/filter_data');
    // const data = yield call(request, `http://172.20.246.146:8000/ranging/product_impact/filter_data/?${urlParamsString}`);
    const data = yield call(request, `http://dvempapp00001uk.dev.global.tesco.org/api/product_impact/filter_data/?${urlParamsString}`);

    yield put(generateSideFilterSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateSideFilter() {
  console.log("filter saga");
  const watcher = yield takeLatest(GENERATE_URL_PARAMS_STRING, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


/* SIDE FILTER RESET*/
export function* generateSideFilterReset() {
  console.log("inside filter reset");
  try {
    // todo: update url
    // const data = yield call(request, 'http://172.20.247.17:8000/ranging/product_impact/filter_data');
    // const data = yield call(request, `http://172.20.246.146:8000/ranging/product_impact/filter_data/`);
    const data = yield call(request, `http://dvempapp00001uk.dev.global.tesco.org/api/product_impact/filter_data/`);

    yield put(generateSideFilterSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}


export function* doSideFilterReset() {
  console.log("filter saga");
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
    const data = yield call(request,
      // `http://172.20.246.140:8000/ranging/product_impact_table?${paramstring}`);
      `http://172.20.246.146:8000/ranging/product_impact_table?${paramstring}`);
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
  // console.log("url data", urlParams)
  let paramstring = '';
  Object.keys(urlParams).map((obj) => {
    paramstring += `&${obj}=${urlParams[obj]}`;
  });
  paramstring = paramstring.replace('&', '');
  try {
    const data = yield call(request,
      // `http://172.20.246.140:8000/ranging/product_impact_table?${paramstring}`);
      `http://172.20.246.146:8000/ranging/product_impact_table`);
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
