/*
 *
 * RangingScenarioTrackerPage actions
 *
 */

import {
  DEFAULT_ACTION, ALL_SCENARIO_TABLE_FETCH, ALL_SCENARIO_TABLE_SUCCESS, TAB_CHANGE, DELETE_SCENARIO,
  LOADING_INDICATION, LOADING_INDICATION_TEXT, ALL_PRICING_TABLE_FETCH, ALL_PRICING_TABLE_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}


//--------------------Fetching default data on page load---------------------

export function fetchRangingAllScenarioData() {
  return {
    type: ALL_SCENARIO_TABLE_FETCH,
  };
}

export function fetchRangingAllScenarioDataSuccess(data) {
  return {
    type: ALL_SCENARIO_TABLE_SUCCESS,
    data
  };
}


//--------------------Fetching default data on page load---------------------

export function fetchPricingAllScenarioData() {
  // alert()
  return {
    type: ALL_PRICING_TABLE_FETCH,
  };
}

export function fetchPricingAllScenarioDataSuccess(data) {
  return {
    type: ALL_PRICING_TABLE_SUCCESS,
    data
  };
}


//--------------------On tab change---------------------

export function tabChange(data) {
  return {
    type: TAB_CHANGE,
    data
  };
}


//--------------------Delete scenario---------------------

export function deleteScenario(data) {
  return {
    type: DELETE_SCENARIO,
    data
  };
}


//--------------------Loading page---------------------

export function updateLoadingIndicationStatus(flag) {
  return {
    type: LOADING_INDICATION,
    flag
  }
}

export function updateLoadingIndicationText(data) {
  return {
    type: LOADING_INDICATION_TEXT,
    data
  }
}
