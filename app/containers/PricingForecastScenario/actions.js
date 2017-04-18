/*
 *
 * PricingForecastScenario actions
 *
 */

import {
  DEFAULT_ACTION, FETCH_FORECAST_SCENARIO_DATA,
  FORECAST_SCENARIO_DATA_SUCCESS, UPDATE_SCENARIO_ID, UPDATE_EVENT_ID,
  FETCH_FORECAST_EVENT_DATA, FORECAST_EVENT_DATA_SUCCESS,
  UPDATE_SCENARIO_DATA,UPDATE_SCENARIO_DATA_SUCCESS,
  GENERATE_PRICE_GRAVITY_CHART, GENERATE_PRICE_GRAVITY_CHART_SUCCESS
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function FetchForecastScenarioData() {
  return {
    type: FETCH_FORECAST_SCENARIO_DATA
  };
}

export function ForecastScenarioDataSuccess(data) {
  return {
    type: FORECAST_SCENARIO_DATA_SUCCESS,
    data
  };
}

export function fetchForecastEventData() {
  return {
    type: FETCH_FORECAST_EVENT_DATA
  };
}

export function forecastEventDataSuccess(data) {
  console.log('forecastEventDataSuccess');
  return {
    type: FORECAST_EVENT_DATA_SUCCESS,
    data
  };
}


export function updateEventId(data) {
  console.log(data);
  return {
    type: UPDATE_EVENT_ID,
    data
  };
}


export function updateScenarioId(data) {
  console.log(data);
  return {
    type: UPDATE_SCENARIO_ID,
    data
  };
}

export function updateScenarioData() {
  return {
    type: UPDATE_SCENARIO_DATA,
  };
}

export function updateScenarioDataSuccess(data) {
  console.log(data);
  return {
    type: UPDATE_SCENARIO_DATA_SUCCESS,
    data
  };
}


export function generatePriceGravityChart() {
  return {
    type: GENERATE_PRICE_GRAVITY_CHART,
  };
}


export function generatePriceGravityChartSuccess(data) {
  // console.log(data);
  return {
    type: GENERATE_PRICE_GRAVITY_CHART_SUCCESS,
    data
  };
}

