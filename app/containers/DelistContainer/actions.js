/*
 *
 * DelistContainer actions
 *
 */

import {
  DEFAULT_ACTION,
  API_FETCH,
  API_FETCH_SUCCESS,
  DATA_URL_PARAMS,
  WEEK_URL,
  STORE_URL,
  TABLE_DATA_FETCH,
  TABLE_DATA_FETCH_SUCCESS,
  SUBSTITUTE_DATA_URL,
  SUBSTITUTE_DATA_LONG_DESC,
  SUBSTITUTE_DATA_URL_SUCCESS,
  SUPPLIER_IMPACT_TABLE_DATA_URL,
  GENERATE_TABLE,
  GENERATE_TABLE_SUCCESS,
  GENERATE_SIDE_FILTER,
  GENERATE_SIDE_FILTER_SUCCESS,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_FILTER_PARAMS_STRING,
  WATERFALL_VALUE,
  WATERFALL_VALUE_SUCCESS,
  WATERFALL_SPINNER_SUCCESS,
  SPINNER_STARTED,
  TEST_AJAX,
  TEST_AJAX_SUCCESS,
  SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS,
  // GENERATE_URL_PARAMS_DATA,
  APPLY_BTN_CLICK,
  SUPPLIER_PAGINATION_DATA,
  DELIST_PAGINATION_DATA,
  TABLE_TYPE,
  SUPPLIER_POPUP_PAGINATION_DATA,
  DELIST_POPUP_PAGINATION_DATA,
  DELIST_TABLE,
  DELIST_TABLE_SUCCESS,
  SEARCH_SUPPLIER_TABLE,
  SEARCH_DELIST_TABLE,
  WEEK_BREADCRUMB,
  STORE_BREADCRUMB,
  GENERATE_URL_PARAMS_DATA,
  URL_PARAMS,
  SIDE_FILTER_RESET,
  } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function apiFetch() {
  return {
    type: API_FETCH,
  };
}

//TABS - WEEK
export function WeekClick(data) {
  return {
    type: WEEK_URL,
    data,
  };
}
//BREADCRUMB - WEEK
export function WeekTabClick(data) {
  return {
    type: WEEK_BREADCRUMB,
    data,
  };
}
//BREADCRUMB - STORE
export function StoreTabClick(data) {
  return {
    type: STORE_BREADCRUMB,
    data,
  };
}

//TABS - STORE
export function StoreClick(data) {
  return {
    type: STORE_URL,
    data,
  };
}

//SEARCH - SUPPLIER TABLE
export function GenerateTextBoxQueryString(data) {
  return {
    type: SEARCH_SUPPLIER_TABLE,
    data,
  };
}

//SEARCH - DELIST TABLE
export function GenerateTextBoxQueryStringDelist(data) {
  return {
    type: SEARCH_DELIST_TABLE,
    data,
  };
}

//DELIST TABLE
export function delistTable() {
  return {
    type: DELIST_TABLE,
  };
}

export function delistTableSuccess(data) {
  return {
    type: DELIST_TABLE_SUCCESS,
    data,
  };
}

//URL PARAMS
export function UrlParams(data) {
  return {
    type: URL_PARAMS,
    data,
  };
}

export function TableDataFetch(data) {
  return {
    type: TABLE_DATA_FETCH,
    data,
  };
}

// DELIST POPUP TABLE
export function DelistPopupTableDataFetchSuccess(data) {
  return {
    type: DELIST_POPUP_TABLE_DATA_FETCH_SUCCESS,
    data,
  };
}

// SUPPLIER POPUP TABLE
export function SupplierPopupTableDataFetchSuccess(data) {
  return {
    type: SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS,
    data,
  };
}


export function apiFetchSuccess(data) {
  return {
    type: API_FETCH_SUCCESS,
    data,
  };
}

export function dataUrlParams(data) {
  return {
    type: DATA_URL_PARAMS,
    data,
  };
}

//SUPPLIER PAGINATION TABLE
export function supplierPagination(data) {
  return {
    type: SUPPLIER_PAGINATION_DATA,
    data,
  };
}

//SUPPLIER POPUP PAGINATION TABLE
export function supplierPopupPagination(data) {
  return {
    type: SUPPLIER_POPUP_PAGINATION_DATA,
    data,
  };
}

//DELIST PAGINATION TABLE
export function delistPagination(data) {
  return {
    type: DELIST_PAGINATION_DATA,
    data,
  };

}

//DELIST POPUP PAGINATION TABLE
export function delistPopupPagination(data) {
  return {
    type: DELIST_POPUP_PAGINATION_DATA,
    data,
  };

}

// TABLE TYPE FOR PAGINATION
export function tableType(data) {
  return {
    type: TABLE_TYPE,
    data,
  };
}


// DELIST POPUP TABLE
export function SubstitutesClick(data) {
  return {
    type: SUBSTITUTE_DATA_URL,
    data,
  };
}

export function SubstitutesClickSendLongDesc(data) {
  return {
    type: SUBSTITUTE_DATA_LONG_DESC,
    data,
  };
}

export function SupplierImpactTableClick(data) {
  return {
    type: SUPPLIER_IMPACT_TABLE_DATA_URL,
    data,
  };
}

export function SubstitutesClickSuccess(data) {
  return {
    type: SUBSTITUTE_DATA_URL_SUCCESS,
    data,
  };
}

// WATERFALL CHART - VALUE
export function WaterfallValueChart() {
  console.log('calling waterfall-----------------------');
  return {
    type: WATERFALL_VALUE,
  };
}

export function WaterfallValueChartSuccess(data) {
  console.log("waterfall data ---------------------------", data);
  return {
    type: WATERFALL_VALUE_SUCCESS,
    data,
  };
}

// // WATERFALL SPINNER STARTED
// export function waterfallSpinner(data) {
//   console.log("spinner started",data)
//   return {
//     type: SPINNER_STARTED,
//     data
//   };
// }


export function WaterfallSpinnerSuccess(spinnerCheck) {
  console.log("waterfall data ---------------------------", spinnerCheck);
  return {
    type: WATERFALL_SPINNER_SUCCESS,
    spinnerCheck,
  };
}

// FILTERS

export function generateTable() {
  return {
    type: GENERATE_TABLE,
  };
}

export function generateTableSuccess(data) {
  return {
    type: GENERATE_TABLE_SUCCESS,
    data,
  };
}
export function generateSideFilter() {
  return {
    type: GENERATE_SIDE_FILTER,
  };
}

//FILTER RESET
export function generateSideFilterReset() {
  return {
    type: SIDE_FILTER_RESET,
  };
}

export function generateSideFilterSuccess(data) {
  return {
    type: GENERATE_SIDE_FILTER_SUCCESS,
    data,
  };
}

export function generateUrlParams(data) {
  return {
    type: GENERATE_URL_PARAMS,
    data,
  };
}
export function generateUrlParamsString(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data,
  };
}

export function generateFilterParamsString(data) {
  return {
    type: GENERATE_FILTER_PARAMS_STRING,
    data,
  };
}

// TESTING AJAX CALL

export function ajaxClick() {
  return {
    type: TEST_AJAX,
  };
}

export function ajaxFetchSuccess(data) {
  return {
    type: TEST_AJAX_SUCCESS,
    data,
  };
}

//CASCADING FILTERS

export function checkboxChange() {
  return {
    type: CHECKBOX_CHANGE,
  };
}

export function urlParamsData(data) {
  return {
    type: URL_PARAMS_DATA,
    data
  };
}

export function generateUrlParamsData() {
  return {
    type: GENERATE_SIDE_FILTER,
  };
}

export function ApplyClick() {
  return {
    type: APPLY_BTN_CLICK,
  };
}
