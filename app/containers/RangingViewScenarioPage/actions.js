/*
 *
 * RangingViewScenarioPage actions
 *
 */

import {
  DEFAULT_ACTION,SCENARIO_DATA_FETCH,SCENARIO_DATA_FETCH_SUCCESS,EDIT_SCENARIO,EDIT_SCENARIO_SUCCESS,REFRESH_SCENARIO,REFRESH_SCENARIO_SUCCESS,
  SEND_URL_PARAMS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


//--------------------Fetching default data on page load---------------------

export function fetchRangingScenarioData() {
  return {
    type: SCENARIO_DATA_FETCH,
  };
}
export function fetchRangingScenarioDataSuccess(data) {
  return {
    type: SCENARIO_DATA_FETCH_SUCCESS,
    data
  };
}

export function sendUrlParams(data) {
  return {
    type: SEND_URL_PARAMS,
    data
  };
}


