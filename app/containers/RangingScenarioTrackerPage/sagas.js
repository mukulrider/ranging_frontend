// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';

import {
  ALL_SCENARIO_TABLE_FETCH,
} from './constants';

import {
  fetchRangingAllScenarioDataSuccess,
} from 'containers/RangingScenarioTrackerPage/actions';

import {
  makeUrlParamsString,selectRangingScenarioTrackerPageDomain,
} from 'containers/RangingScenarioTrackerPage/selectors';



// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

let host_url_rangingScenario=`http://172.20.244.230:8000`

//------------------------------- Scenario List ------------------------------------------
export function* generateAllScenarioList() {


  let urlName = yield select(selectRangingScenarioTrackerPageDomain());
  let selectedTab = urlName.get('selectedTab');
  let deletedScenario = urlName.get('deletedScenario');
  let user_id = "user_id=vrushali123";

  let API_params='';

  if(user_id!==''){
    API_params=API_params+"&"+user_id;
  }

  if(deletedScenario!==''){
    API_params=API_params+"&"+deletedScenario;
  }

  API_params = API_params.replace('&', '');

  try {
    // Table data

    if(selectedTab==="npd"){
      const scenario_list= yield call(request,host_url_rangingScenario+`/api/npd_impact_list_scenario?`+API_params);
      yield put(fetchRangingAllScenarioDataSuccess(scenario_list));
    }else{
      const scenario_list= yield call(request,host_url_rangingScenario+`/api/delist_list_scenario?user_id=bc`);
      yield put(fetchRangingAllScenarioDataSuccess(scenario_list));
    }




  } catch (err) {

  }
}

export function* doAllScenarioList() {
  const watcher = yield takeLatest(ALL_SCENARIO_TABLE_FETCH, generateAllScenarioList);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}




// All sagas to be loaded
export default [
  defaultSaga,doAllScenarioList,
];
