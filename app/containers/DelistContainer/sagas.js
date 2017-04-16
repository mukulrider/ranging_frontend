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
  // console.log("urlParams",urlParams);

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  let pagination_data = "";
  if(!(urlName.get('supplierTablePagination') == "")) {

    pagination_data = urlName.get('supplierTablePagination');

    // console.log("pagination_data", pagination_data);
  }
  // let substitutesData = urlName.get(substitutesData);

  if(!(pagination_data == "")){
    // alert("non empty");
    // console.log("inside if --- urlParams",urlParams);
    urlParams = urlParams + "&" + pagination_data;
    // console.log("inside if --- urlParams",urlParams);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }

  let search_data = "";
  if(!(urlName.get('searchSupplierTable') == "")) {

    search_data = urlName.get('searchSupplierTable');

    // console.log("search_data", search_data);
  }


  if(!(search_data == "")){
    // alert("non empty");
    // console.log("inside if --- search_data",search_data);
    urlParams = urlParams + "&" + "supplier_search=" + search_data;
    // console.log("inside if --- search_data",search_data);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }

  let week_no_data = "";
  if(!(urlName.get('weekNumber') == "")) {

    week_no_data = urlName.get('weekNumber');

    console.log("week_no_data", week_no_data);
  }

  if(!(week_no_data == "")){
    // alert("non empty");
    // console.log("inside if --- week_no_data",week_no_data);
    urlParams = urlParams + "&" + week_no_data;
    // console.log("inside if --- week_no_data",week_no_data);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }

  let store_type = "";
  if(!(urlName.get('storeType') == "")) {

    store_type = urlName.get('storeType');

    console.log("store_type", store_type);
  }

  if(!(store_type == "")){
    // alert("non empty");
    // console.log("inside if --- store_type",store_type);
    urlParams = urlParams + "&" + store_type;
    // console.log("inside if --- store_type",store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

  let urlParamsString = "";
  if(!(urlName.get('urlParamsString') == "")) {

    urlParamsString = urlName.get('urlParamsString');

    console.log("urlParamsString", urlParamsString);
  }

  if(!(urlParamsString == "")){
    // alert("non empty");
    // console.log("inside if --- store_type",store_type);
    urlParams = urlParams + "&" + urlParamsString;
    // console.log("inside if --- store_type",store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

  if(!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }

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
      // `http://172.20.78.87:8000/ranging/product_impact_table/`);
    `http://172.20.78.87:8000/ranging/product_impact_supplier_table${urlParams}`);
    // `http://172.20.78.87:8000/ranging/product_impact_table${paramstring}`);
    // `http://172.20.78.87:8000/ranging/product_impact_table/?store_type=Main%20Estate&time_period=13_weeks&${paramstring}`);


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


  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  let pagination_data = "";
  if(!(urlName.get('delistPopupTablePagination') == "")) {

    pagination_data = urlName.get('delistPopupTablePagination');

    // console.log("pagination_data", pagination_data);
  }
  // let substitutesData = urlName.get(substitutesData);

  if(!(pagination_data == "")){
    // alert("non empty");
    // console.log("inside if --- urlParams",urlParams);
    urlParams = urlParams + "&" + pagination_data;
    // console.log("inside if --- urlParams",urlParams);
    // alert("urlParams");
    // alert(urlParams);
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
    const data = yield call(request,
      // `http://172.20.246.140:8000/ranging/product_impact_chart/`);
      `http://172.20.78.87:8000/ranging/delist_table_popup?delist_product=${urlParams}`);
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
  // console.log("sagas",urlParams);

  function isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  // let tableType = urlName.get("tableType");
  // let tableTypeStateName = '';
  // if( tableType=="supplier_popup"){
  //   tableTypeStateName = "supplierPopupTablePagination";
  // } else if( tableType=="delist_popup") {
  //   tableTypeStateName = "delistPopupTablePagination";
  // }
  // alert(tableTypeStateName);
  //
  let pagination_data = "";
  if(!(urlName.get('supplierPopupTablePagination') == "")) {

    pagination_data = urlName.get('supplierPopupTablePagination');

    // console.log("pagination_data", pagination_data);
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

if(!(pagination_data == "")){
    // alert("non empty");
    // console.log("inside if --- urlParams",urlParams);
  urlParams = urlParams + "&" + pagination_data;
  // console.log("inside if --- urlParams",urlParams);
  // alert("urlParams");
  // alert(urlParams);
} else {
  // alert("empty");
}



  try {
    const data = yield call(request,
      // `http://172.20.246.140:8000/ranging/product_impact_chart/`);
      `http://172.20.78.87:8000/ranging/supplier_table_popup?supplier=${urlParams}`);
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
  console.log("inside bigger delist fn");
  let urlName = yield select(selectDelistContainerDomain());
  console.log("inside urlName fn",urlName);
  // let urlParams = urlName.get("waterfallValue");
  let urlParams = "";
  console.log("urlParams delist empty",urlParams);

  let pagination_data = "";
  if(!(urlName.get('delistTablePagination') == "")) {

    pagination_data = urlName.get('delistTablePagination');

    console.log("delist pagination_data", pagination_data);
  }
  // let substitutesData = urlName.get(substitutesData);

  if(!(pagination_data == "")){
    // alert("non empty");
    console.log("delist inside if --- urlParams",urlParams);
    urlParams = urlParams + "&" + pagination_data;
    console.log("delist inside if --- urlParams",urlParams);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }

  let search_data = "";
  if(!(urlName.get('searchDelistTable') == "")) {

    search_data = urlName.get('searchDelistTable');

    // console.log("search_data", search_data);
  }


  if(!(search_data == "")){
    // alert("non empty");
    // console.log("inside if --- search_data",search_data);
    urlParams = urlParams + "&" + "delist_search=" + search_data;
    // console.log("inside if --- search_data",search_data);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }


  let week_no_data = "";
  if(!(urlName.get('weekNumber') == "")) {

    week_no_data = urlName.get('weekNumber');

    console.log("delist week_no_data", week_no_data);
  }

  if(!(week_no_data == "")){
    // alert("non empty");
    // console.log("delist inside if --- week_no_data",week_no_data);
    urlParams = urlParams + "&" + week_no_data;
    // console.log("delist inside if --- week_no_data",week_no_data);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }

  let store_type = "";
  if(!(urlName.get('storeType') == "")) {

    store_type = urlName.get('storeType');

    console.log("store_type", store_type);
  }

  if(!(store_type == "")){
    // alert("non empty");
    console.log("delist inside if --- store_type",store_type);
    urlParams = urlParams + "&" + store_type;
    console.log("delist inside if --- store_type",store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

let urlParamsString = "";
  if(!(urlName.get('urlParamsString') == "")) {

    urlParamsString = urlName.get('urlParamsString');

    console.log("urlParamsString", urlParamsString);
  }

  if(!(urlParamsString == "")){
    // alert("non empty");
    console.log("delist inside if --- store_type",urlParamsString);
    urlParams = urlParams + "&" + urlParamsString;
    console.log("delist inside if --- store_type",urlParamsString);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

  if(!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }
  console.log("urlParams delist", urlParams);

  try {
    console.log("urlParams2", urlParams);
    let data = yield call(request,`http://172.20.78.87:8000/ranging/product_impact_delist_table`+ urlParams);
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
  console.log("urlName",urlName);
  // let urlParams = urlName.get("waterfallValue");
  let urlParams = "";
  // console.log('urlParams for waterfall chart - value', urlParams);
  //
  // let paramstring = '';
  // Object.keys(urlParams).map(obj => {
  //   paramstring += `&${obj}=${urlParams[obj]}`;
  // })
  // paramstring = paramstring + '&id=' + urlParams;
  // paramstring = paramstring.replace('&', '')

  let week_no_data = "";
  if(!(urlName.get('weekNumber') == "")) {

    week_no_data = urlName.get('weekNumber');

    console.log("week_no_data", week_no_data);
  }

  if(!(week_no_data == "")){
    // alert("non empty");
    // console.log("inside if --- week_no_data",week_no_data);
    urlParams = urlParams + "&" + week_no_data;
    // console.log("inside if --- week_no_data",week_no_data);
    // alert("urlParams");
    // alert(urlParams);
  } else {
    // alert("empty");
  }

  let store_type = "";
  if(!(urlName.get('storeType') == "")) {

    store_type = urlName.get('storeType');

    console.log("store_type", store_type);
  }

  if(!(store_type == "")){
    // alert("non empty");
    // console.log("inside if --- store_type",store_type);
    urlParams = urlParams + "&" + store_type;
    // console.log("inside if --- store_type",store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

  let urlParamsString = "";
  if(!(urlName.get('urlParamsString') == "")) {

    urlParamsString = urlName.get('urlParamsString');

    console.log("urlParamsString nt", urlParamsString);
  }

  if(!(urlParamsString == "")){
    // alert("non empty");
    // console.log("inside if --- store_type",store_type);
    urlParams = urlParams + "&" + urlParamsString;
    // console.log("inside if --- store_type",store_type);
    // alert("store_type");
    // alert(store_type);
  } else {
    // alert("empty");
  }

  if(!(urlParams == "")) {
    urlParams = "?" + urlParams.replace('&', '');
  }

  try {
    const data = yield call(request,
      // `http://localhost:8090/pricing/generate-scenario/?` + paramstring);
      // 'http://172.20.246.140:8000/ranging/product_impact_chart/');
      `http://172.20.78.87:8000/ranging/product_impact_chart${urlParams}`);
    yield put(WaterfallValueChartSuccess(data));
  } catch (err) {
    // console.log(err);
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

    const data = yield call(request, `http://172.20.78.87:8000/ranging/product_impact_table/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.246.140:8000/ranging/product_impact_table/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.78.87:8080/ranging/product_impact/filter_data&${urlParamsString}`);
    yield put(generateTableSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}
// buyingc, parent supplier, buyer, jr bu, pd sub, brand ind, products
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
  console.log("urlParams",urlParamsString);
  // alert(urlParamsString);
  try {
    // todo: update url
    // const data = yield call(request, 'http://172.20.246.141:8000/ranging/product_impact/filter_data');
    // const data = yield call(request, 'http://172.20.247.17:8000/ranging/product_impact/filter_data');
    const data = yield call(request, `http://172.20.78.87:8000/ranging/product_impact/filter_data/?${urlParamsString}`);
    // const data = yield call(request, `http://172.20.78.87:8000/ranging/product_impact/filter_data/?"buying_controller=Wines"`);
    // const data = yield call(request, 'http://172.20.78.87:8000/ranging/product_impact/filter_logic');
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
      `http://172.20.78.87:8000/ranging/product_impact_table?${paramstring}`);
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
      `http://172.20.78.87:8000/ranging/product_impact_table`);
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
];
