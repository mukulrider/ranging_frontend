// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
  DEFAULT_ACTION, FETCH_FORECAST_SCENARIO_DATA,
  FORECAST_SCENARIO_DATA_SUCCESS, FETCH_FORECAST_EVENT_DATA, UPDATE_SCENARIO_DATA,
  GENERATE_PRICE_GRAVITY_CHART
} from './constants';
import {
  ForecastScenarioDataSuccess, forecastEventDataSuccess, updateScenarioDataSuccess,
  generatePriceGravityChartSuccess
}
  from 'containers/PricingForecastScenario/actions';

import {
  makeSelectPricingForecastScenarioScenarioId, makeSelectPricingForecastEventIdDetails,
  makeSelectPricingForecastScenarioEventId
}
  from 'containers/PricingForecastScenario/selectors';


// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

/* GENERATE SIDE FILTER*/
export function* generateForecastScenarioData() {
  // console.log('sagas', window.location);
  let scenario_id = yield select(makeSelectPricingForecastScenarioScenarioId());
  console.log(scenario_id);
  scenario_id = scenario_id.split('-');
  scenario_id.pop();
  try {
    const data = yield call(request,
      `http://172.20.244.220:8000/api/pricing/scenario2-result-overview/?scenario_id=${scenario_id.join('-')}`);
    yield put(ForecastScenarioDataSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateForecastScenarioData() {
  const watcher = yield takeLatest(FETCH_FORECAST_SCENARIO_DATA, generateForecastScenarioData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


/* GENERATE SIDE FILTER*/
export function* generateForecastEventData() {
  console.log('sagas -> generateForecastEventData');
  const event_id = yield select(makeSelectPricingForecastScenarioEventId());
  console.log(event_id);

  try {
    const data = yield call(request,
      `http://172.20.244.220:8000/api/pricing/event2/?id=${event_id.split('-').pop()}`);
    yield put(forecastEventDataSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateForecastEventData() {
  const watcher = yield takeLatest(FETCH_FORECAST_EVENT_DATA, generateForecastEventData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


/* GENERATE SIDE FILTER*/
export function* generateScenarioData() {
  console.log('sagas -> generateForecastEventData');
  const event_id = yield select(makeSelectPricingForecastScenarioScenarioId());
  console.log(event_id);

  try {
    const data = yield call(request,
      `http://172.20.244.220:8000/api/pricing/scenario2-obj/?id=${event_id.split('-').pop()}`);
    yield put(updateScenarioDataSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateScenarioData() {
  const watcher = yield takeLatest(UPDATE_SCENARIO_DATA, generateScenarioData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

/* GENERATE SIDE FILTER*/
export function* generatePriceGravityChart() {
  try {
    const data = yield call(request, `http://172.20.244.220:8000/api/xxx/`);
    yield put(generatePriceGravityChartSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGeneratePriceGravityChart() {
  const watcher = yield takeLatest(GENERATE_PRICE_GRAVITY_CHART, generatePriceGravityChart);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}

// All sagas to be loaded
export default [
  defaultSaga,
  doGenerateForecastScenarioData,
  doGenerateForecastEventData,
  doGenerateScenarioData,
  doGeneratePriceGravityChart
];



