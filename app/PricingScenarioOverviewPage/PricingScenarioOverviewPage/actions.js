/*
 *
 * PricingScenarioOverviewPage actions
 *
 */

import {
  DEFAULT_ACTION,OVERVIEW_FETCH, OVERVIEW_FETCH_SUCCESS,
  CHECKBOX_CHANGE, URL_PARAMS_DATA, GENERATE_URL_PARAMS_STRING,
  GENERATE_URL_PARAMS_DATA_SUCCESS, GENERATE_URL_PARAMS_DATA
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

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

export function overviewFetch() {
  return {
    type: OVERVIEW_FETCH,
  };
}

export function overviewFetchSuccess(data) {
  return {
    type: OVERVIEW_FETCH_SUCCESS,
    data
  };
}


export function generateUrlParamsString(data) {
  return {
    type: GENERATE_URL_PARAMS_STRING,
    data
  };
}


export function generateUrlParamsData() {
  console.log('generateUrlParamsData>>>>>');
  return {
    type: GENERATE_URL_PARAMS_DATA,
  };
}

export function generateUrlParamsDataSuccess(data) {
  return {
    type: GENERATE_URL_PARAMS_DATA_SUCCESS,
    data
  };
}
