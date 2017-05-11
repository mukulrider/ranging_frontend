/*
 *
 * RangingScenarioTrackerPage actions
 *
 */

import {
  DEFAULT_ACTION,ALL_SCENARIO_TABLE_FETCH,ALL_SCENARIO_TABLE_SUCCESS,TAB_CHANGE,DELETE_SCENARIO
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

