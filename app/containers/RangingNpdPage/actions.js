/*
 *
 * RangingNpdPage actions
 *
 */

import {
  DEFAULT_ACTION,
  UNMATCHED_PROD_FETCH,UNMATCHED_PROD_FETCH_SUCCESS,
  SKU_CHART_FETCH,SKU_CHART_SUCCESS,
  OUT_PERFORMANCE_FETCH,OUT_PERFORMANCE_SUCCESS,
  PRICE_GRAVITY_FETCH,PRICE_GRAVITY_SUCCESS,
  SEND_URL_PARAMS,SAVE_WEEK_PARAM,SAVE_PAGE_PARAM,
  UPDATE_DATA,CHECKBOX_CHANGE,GENERATE_TEXTBOX_QUERY_STRING,
  GENERATE_SIDE_FILTER,GENERATE_SIDE_FILTER_SUCCESS ,
  GENERATE_URL_PARAMS,GENERATE_URL_PARAMS_STRING,
  GENERATE_TABLE,GENERATE_TABLE_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

//--------------------- UNMATCHED PRODUCTS DATA -------------------------------

export function unmatchedProdTable() {
    // console.log('unmatchedProdTable action');
    return {
        type: UNMATCHED_PROD_FETCH,
    };
}

export function unmatchedProdTableSuccess(data) {
    // console.log('unmatchedProdTableSuccess action', data);
    return {
        type: UNMATCHED_PROD_FETCH_SUCCESS,
        data
    };
}

//--------------------- SKU CHART -------------------------------

export function skuChartFetch() {
  //console.log('skuChartFetch action');
  return {
    type: SKU_CHART_FETCH,
  };
}

export function skuChartSuccess(data) {
  //console.log('skuChartSuccess action', data);
  return {
    type: SKU_CHART_SUCCESS,
    data
  };
}


//--------------------- OUT_PERFORMANCE_FETCH -------------------------------

export function outPerformanceChartFetch() {
  //console.log('skuChartFetch action');
  return {
    type: OUT_PERFORMANCE_FETCH,
  };
}

export function outPerformanceChartSuccess(data) {
  // console.log('outPerfromanceChartSuccess action', data);
  return {
    type: OUT_PERFORMANCE_SUCCESS,
    data
  };
}

//--------------------- Price gravity chart data -------------------------------

export function priceGravityFetch() {
  //console.log('skuChartFetch action');
  return {
    type: PRICE_GRAVITY_FETCH,
  };
}

export function priceGravitySuccess(data) {
  // console.log('priceGravitySuccess action', data);
  return {
    type: PRICE_GRAVITY_SUCCESS,
    data
  };
}

//--------------------- FILTER DATA -------------------------------
export function generateSideFilter() {
  // console.log("Refeshing the side filter")
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

export function checkboxChange(data) {
  // console.log("Selection in reducer" + data);
  return {

    type: CHECKBOX_CHANGE,
    data
  };
}


//--------------------- Storing the param in reducer -------------------------------

export function sendUrlParams(data) {
  // console.log('1.Send url param - action',data);

  return {
    type: SEND_URL_PARAMS ,
    data
  };
}


export function generateUrlParams(data) {
  // //console.log(data);
  return {
    type: GENERATE_URL_PARAMS,
    data
  }
}

export function generateUrlParamsString(data) {
  // //console.log(data);
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data
  }
}

//---------------------------------------------------------------------------------------

export function saveWeekParam(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_WEEK_PARAM ,
    data
  };
}

export function savePageParam(data) {
  // console.log('Saving url params in action',data);
  return {
    type: SAVE_PAGE_PARAM ,
    data
  };
}

//----------------------pagination

export function generateTextBoxQueryString(data) {
  console.log("Search in action for "+data);
  return {
    type: GENERATE_TEXTBOX_QUERY_STRING,
    data
  }
}
