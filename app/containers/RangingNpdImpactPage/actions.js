/*
 *
 * RangingNpdImpactPage actions
 *
 */

import {
  DEFAULT_ACTION,
  DATA_FETCH_ON_PAGE_LOAD,BUBBLE_CHART_TABLE_SUCCESS,
  BUBBLE_CHART_DATA_SUCCESS,BUBBLE_CHART_DATA_FETCH,
  GENERATE_SIDE_FILTER,GENERATE_SIDE_FILTER_SUCCESS,CHECKBOX_CHANGE,
  GENERATE_URL_PARAMS,GENERATE_URL_PARAMS_STRING,
  SEND_URL_PARAMS,SAVE_WEEK_PARAM,
  SAVE_T1_PAGE_PARAM,SAVE_T2_PAGE_PARAM,SAVE_SEARCH_TABLE2,SAVE_SEARCH_TABLE1,
  WATERFALL_CHART_DATA_FETCH,WATERFALL_CHART_DATA_SUCCESS,
  CANNIBALIZED_PROD_TABLE_DATA_FETCH,CANNIBALIZED_PROD_TABLE_DATA_SUCCESS,
  SELECT_FILTER_INDICATOR,UPDATE_BREADCRUMBS,
  SAVE_ASP,SAVE_ACP,SAVE_SIZE,SAVE_FILTER_SELECTIONS_TILL_NOW,


} from './constants';

//--------------------- DEFAULT ACTIONS -------------------------------

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

//--------------------- DATA FETCH BUBBLE CHART TABLE -------------------------------

export function dataFetchOnPageLoad() {
  // console.log('dataFetchOnPageLoad action');
  return {
    type: DATA_FETCH_ON_PAGE_LOAD,
  };
}


export function dataFetchOnBubbleTableSuccess(data) {
  // console.log('dataFetchOnPageLoadSuccess action', data);
  return {
    type: BUBBLE_CHART_TABLE_SUCCESS ,
    data
  };
}

//--------------------- DATA FOR BUBBLE CHART -------------------------------

export function dataFetchOnBubbleData() {
  // console.log('dataFetchOnBubbleData action');
  return {
    type: BUBBLE_CHART_DATA_FETCH,
  };
}

export function dataFetchOnBubbleDataSuccess(data) {
  // console.log('dataFetchOnBubbleDataSuccess action', data);
  return {
    type: BUBBLE_CHART_DATA_SUCCESS ,
    data
  };
}

//--------------------- DATA FOR WATERFALL CHART & IMPACT NUMBERS -------------------------------

export function dataFetchOnWaterFallChart() {
  // console.log('dataFetchOnWaterFallChart action');
  return {
    type: WATERFALL_CHART_DATA_FETCH,
  };
}

export function dataFetchOnWaterFallChartSuccess(data) {
  // console.log('dataFetchOnBubbleDataSuccess action', data);
  return {
    type: WATERFALL_CHART_DATA_SUCCESS ,
    data
  };
}

//--------------------- DATA FOR CANNIBALIZATION TABLE -------------------------------

export function dataFetchCanniProdTable() {
  console.log('dataFetchCanniProdTable action');
  return {
    type: CANNIBALIZED_PROD_TABLE_DATA_FETCH,
  };
}

export function dataFetchCanniProdTableSuccess(data) {
  console.log('dataFetchCanniProdTableSuccess action', data);
  return {
    type: CANNIBALIZED_PROD_TABLE_DATA_SUCCESS,
    data
  };
}

//--------------------- DATA FOR FILTERS -------------------------------

export function generateSideFilter() {
  return {
    type: GENERATE_SIDE_FILTER
  }
}

export function generateSideFilterSuccess(data) {
  return {
    type: GENERATE_SIDE_FILTER_SUCCESS,
    data
  }
}

//--------------------- FOR FILTER SELECTIONS -------------------------------

export function saveAspFilterData(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_ASP,
    data
  };
}

export function saveAcpFilterData(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_ACP,
    data
  };
}

export function saveSizeFilterData(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_SIZE,
    data
  };
}

export function saveFilterSelectionsTillNow(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_FILTER_SELECTIONS_TILL_NOW,
    data
  };
}

export function checkboxChange(data) {
  // console.log("Selection in reducer" + data);
  return {

    type: CHECKBOX_CHANGE,
    data
  };
}

//--------------------- SAVING IN PARAMS IN REDUCER -------------------------------

export function generateUrlParams(data) {

  return {
    type: GENERATE_URL_PARAMS,
    data
  }
}

export function generateUrlParamsString(data) {

  return {
    type: GENERATE_URL_PARAMS_STRING,
    data
  }
}

export function sendUrlParams(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SEND_URL_PARAMS ,
    data
  };
}

export function saveWeekParam(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_WEEK_PARAM ,
    data
  };
}

//--------------------Pagination

export function saveTable1PageParam(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_T1_PAGE_PARAM ,
    data
  };
}

export function saveTable2PageParam(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_T2_PAGE_PARAM ,
    data
  };
}

//----------------------Search

export function saveTable1SearchParam(data) {
  // console.log("Search in action for "+data);
  return {
    type: SAVE_SEARCH_TABLE1,
    data
  }
}


export function saveTable2SearchParam(data) {
  // console.log("Search in action for "+ data);
  return {
    type: SAVE_SEARCH_TABLE2,
    data
  }
}



//--------------------- WHEN PAGE IS LOADED -------------------------------

export function pageLoadSelectFilterIndicator(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SELECT_FILTER_INDICATOR,
    data

  };
}
//--------------------- BREADCRUMBS -------------------------------

export function updateBreadCrumbs(data) {
  // console.log('Saving url params in action',data);
  return {
    type: UPDATE_BREADCRUMBS ,
    data
  };
};

