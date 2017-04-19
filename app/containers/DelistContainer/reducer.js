/*
 *
 * DelistContainer reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION,
  API_FETCH_SUCCESS,
  DATA_URL_PARAMS,
  WEEK_URL,
  STORE_URL,
  TABLE_DATA_FETCH,
  TABLE_DATA_FETCH_SUCCESS,
  SUBSTITUTE_DATA_URL,
  SUBSTITUTE_DATA_LONG_DESC,
  SUPPLIER_IMPACT_TABLE_DATA_URL,
  GENERATE_SIDE_FILTER,
  GENERATE_URL_PARAMS,
  GENERATE_URL_PARAMS_STRING,
  GENERATE_FILTER_PARAMS_STRING,
  GENERATE_SIDE_FILTER_SUCCESS,
  GENERATE_TABLE_SUCCESS,
  WATERFALL_VALUE,
  WATERFALL_VALUE_SUCCESS,
  WATERFALL_SPINNER_SUCCESS,
  TEST_AJAX_SUCCESS,
  DELIST_POPUP_TABLE_DATA_FETCH_SUCCESS,
  SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS,
  SUBSTITUTE_DATA_URL_SUCCESS,
  SUPPLIER_PAGINATION_DATA,
  DELIST_PAGINATION_DATA,
  TABLE_TYPE,
  SUPPLIER_POPUP_PAGINATION_DATA,
  DELIST_POPUP_PAGINATION_DATA,
  DELIST_TABLE_SUCCESS,
  SEARCH_SUPPLIER_TABLE,
  SEARCH_DELIST_TABLE,
  WEEK_BREADCRUMB,
  STORE_BREADCRUMB,
  URL_PARAMS,
} from './constants';

const initialState = fromJS(
  {
    urlParamsString: "",
    barChart2Data: [{letter: 'A', frequency: 100}, {letter: 'B', frequency: 200}],
    dataUrlparams: "",
    supplierPopupTablePagination: "",
    weekNumber: "",
    storeType: "",
    supplierTablePagination: "",
    delistTablePagination: "",
    searchSupplierTable: "",
    searchDelistTable: "",
    weekBreadcrumb: "",
    storeBreadcrumb: "",
    waterFallChart2Data_1: [{name: ' Product Revenue ', value: 420000},
      {name: ' Services Revenue ', value: 210000},
      {name: ' Employee Revenue ', value: 190000},
      {name: ' Fixed Costs ', value: -170000},
      {name: ' Variable Costs ', value: -140000}],
    waterFallChart2Data_2: [{name: ' Product Revenue ', value: 420000},
      {name: ' Services Revenue ', value: 210000},
      {name: ' Employee Revenue ', value: 190000},
      {name: ' Fixed Costs ', value: -170000},
      {name: ' Variable Costs ', value: -140000}],
    waterFallChart2Data_3: [{name: ' Product Revenue ', value: 420000},
      {name: ' Services Revenue ', value: 210000},
      {name: ' Employee Revenue ', value: 190000},
      {name: ' Fixed Costs ', value: -170000},
      {name: ' Variable Costs ', value: -140000}],
    waterFallChart2Data_4: [{name: ' Product Revenue ', value: 420000},
      {name: ' Services Revenue ', value: 210000},
      {name: ' Employee Revenue ', value: 190000},
      {name: ' Fixed Costs ', value: -170000},
      {name: ' Variable Costs ', value: -140000}],

  });

function delistContainerReducer(state = initialState, action) {
  switch (action.type) {
    case WEEK_URL:
      return state.set('weekNumber', action.data);

    case STORE_URL:
      return state.set('storeType', action.data);

    case API_FETCH_SUCCESS:
      return state.set('data', action.data);

    case DATA_URL_PARAMS:
      return state.set('dataUrlparams', action.data);

    case TABLE_DATA_FETCH:
      return state.set('tableDataFetch', action.data);

    case TABLE_DATA_FETCH_SUCCESS:
      return state.set('tableModalData', action.data);

    //DELIST TABLE
    case DELIST_TABLE_SUCCESS:
      return state.set('delisttableData', action.data);

    //SEARCH SUPPLIER TABLE
    case SEARCH_SUPPLIER_TABLE:
      return state.set('searchSupplierTable', action.data);

    //SEARCH DELIST TABLE
    case SEARCH_DELIST_TABLE:
      return state.set('searchDelistTable', action.data);

//PAGINATIONN FOR SUPPLIER TABLE
    case SUPPLIER_PAGINATION_DATA:
      return state.set('supplierTablePagination', action.data);

    //PAGINATIONN FOR SUPPLIER POPUP TABLE
    case SUPPLIER_POPUP_PAGINATION_DATA:
      return state.set('supplierPopupTablePagination', action.data);

    //PAGINATIONN FOR DELIST TABLE
    case DELIST_PAGINATION_DATA:
      return state.set('delistTablePagination', action.data);

    //PAGINATIONN FOR DELIST POPUP TABLE
    case DELIST_POPUP_PAGINATION_DATA:
      return state.set('delistPopupTablePagination', action.data);

    //TABLE TYPE
    case TABLE_TYPE:
      return state.set('tableType', action.data);

    // DELIST POPUP TABLE
    case DELIST_POPUP_TABLE_DATA_FETCH_SUCCESS:
      return state.set('delisrPopuptableData', action.data);

    case SUBSTITUTE_DATA_URL:
      return state.set('substitutesData', action.data);
    case SUBSTITUTE_DATA_LONG_DESC:
      return state.set('substitutesDataLongDesc', action.data);
    case SUBSTITUTE_DATA_URL_SUCCESS:
      return state.set('substitutesTableData', action.data);

    // FOR SUPPLIER POPUP DATA
    case SUPPLIER_IMPACT_TABLE_DATA_URL:
      return state.set('supplierPopupTableData', action.data);

    case SUPPLIER_POPUP_TABLE_DATA_FETCH_SUCCESS:
      return state.set('supplierPopuptableDataSuccess', action.data);

    //BREADCRUMB - WEEK
    case WEEK_BREADCRUMB:
      return state.set('weekBreadcrumb', action.data);

    //BREADCRUMB - STORE
    case STORE_BREADCRUMB:
      return state.set('storeBreadcrumb', action.data);


    // WATERFALL CHART - VALUE
    case WATERFALL_VALUE_SUCCESS:
      console.log('water fall');
      return state.set('waterfallValue', action.data);

      // WATERFALL CHART - VALUE - SPINNER SUCCESS
    case WATERFALL_SPINNER_SUCCESS:
      console.log('water fall spinner');
      return state.set('waterfallSpinner', action.spinnerCheck);

    // URL PARAMS
    case URL_PARAMS:
      return state.set('urlparamsDelist', action.data);

    // FILTERS
    case GENERATE_SIDE_FILTER_SUCCESS:
      return state.set('sideFilter', action.data);
    case GENERATE_URL_PARAMS:
      return state.set('urlParams', action.data);
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);

    case GENERATE_FILTER_PARAMS_STRING:
      return state.set('filterParamsString', action.data);

    // AJAX TEST
    case TEST_AJAX_SUCCESS:
      return state.set('testAjax', action.data);

    default:
      return state;
  }
}

export default delistContainerReducer;
