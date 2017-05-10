/*
 *
 * RangingViewDelistScenarioPage actions
 *
 */

import {
  DEFAULT_ACTION,WATERFALL_VALUE, WATERFALL_VALUE_SUCCESS, URL_PARAMETERS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION
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

export function urlparameters(data) {
  console.log("urlparameters data ---------------------------", data);
  return {
    type: URL_PARAMETERS,
    data,
  };
}

