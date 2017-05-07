/*
 *
 * RangingScenarioTrackerPage actions
 *
 */

import {
  DEFAULT_ACTION,ALL_SCENARIO_TABLE_FETCH,ALL_SCENARIO_TABLE_SUCCESS,TAB_CHANGE
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

export function tabChange(data) {
  return {
    type: TAB_CHANGE,
    data
  };
}
