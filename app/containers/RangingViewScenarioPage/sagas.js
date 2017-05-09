// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';

import {
  SCENARIO_DATA_FETCH,
} from './constants';

import {
  fetchRangingScenarioDataSuccess,
} from 'containers/RangingViewScenarioPage/actions';
import {
  selectRangingViewScenarioPageDomain, makeUrlParamsString
} from 'containers/RangingViewScenarioPage/selectors';


// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}


//------------------------------- Scenario Data Fetch Page Load ------------------------------------------
export function* generateDefaultScenarioData() {
  //console.log('generateUnmatchedTableFetch saga');
  let urlName=yield select(selectRangingViewScenarioPageDomain());
  let urlParams = urlName.get('dataUrlParms');

  let paramString='';
  Object.keys(urlParams).map(obj => {
    paramString += `&${obj}=${urlParams[obj]}`
  });
  paramString=paramString.replace('&','');
  console.log("para",paramString);

  try {


    // console.log('---------------------http://172.20.244.223:8000/api/npd/psgskudistribution?'+paramString);

    // Scenario data
    const scenario_data = yield call(request,`http://172.20.244.219:8000/api/npd_impact_view_scenario?`+paramString);
    yield put(fetchRangingScenarioDataSuccess(scenario_data));


  } catch (err) {
    //console.log(err);
  }
}

export function* doDefaultScenarioData() {
  const watcher = yield takeLatest(SCENARIO_DATA_FETCH, generateDefaultScenarioData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  defaultSaga,doDefaultScenarioData,
];
