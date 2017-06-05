// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';

import {
  ALL_SCENARIO_TABLE_FETCH, ALL_PRICING_TABLE_FETCH
} from './constants';

import {
  fetchRangingAllScenarioDataSuccess,updateLoadingIndicationStatus,
} from 'containers/RangingScenarioTrackerPage/actions';

import {
  makeUrlParamsString, selectRangingScenarioTrackerPageDomain,
} from 'containers/RangingScenarioTrackerPage/selectors';
import {fetchPricingAllScenarioDataSuccess} from "./actions";


// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

let host_url_rangingScenario = `http://172.20.181.16:8000`


let gettingUserDetails = () => {
  let getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  };

  const user_id = getCookie('token');
  const user_name = getCookie('user');
  const designation = getCookie('designation');
  const sessionID = getCookie('login_timestamp')
  const buying_controller = getCookie('buying_controller');
  let cookie_params = "user_id=" + user_id + "&user_name=" + user_name + "&designation=" + designation + "&session_id=" + sessionID + "&buying_controller_header=" + buying_controller;

  if (designation === 'Buyer' || designation === 'buyer') {
    const buyer = getCookie('buyer');
    cookie_params = cookie_params + "&buyer_header=" + buyer;
  }

  return (cookie_params);

}


//------------------------------- Scenario List ------------------------------------------
export function* generateAllScenarioList() {


  let urlName = yield select(selectRangingScenarioTrackerPageDomain());
  let selectedTab = urlName.get('selectedTab');
  let deletedScenario = urlName.get('deletedScenario');
  // let user_id = "user_id=nita";

  let API_params = '';

  if (deletedScenario !== '') {
    API_params = API_params + "&" + deletedScenario;
  }


  let cookie_params = gettingUserDetails();
  API_params = API_params + "&" + cookie_params;
  API_params = API_params.replace('&', '');

  try {
    // Table data

    if (selectedTab === "npd") {
      const scenario_list = yield call(request, host_url_rangingScenario + `/api/npd_impact_list_scenario?` + API_params);
      yield put(fetchRangingAllScenarioDataSuccess(scenario_list));
    } else {
      const scenario_list = yield call(request, host_url_rangingScenario + `/api/delist_list_scenario?` + API_params);
      yield put(fetchRangingAllScenarioDataSuccess(scenario_list));
    }


    yield put(updateLoadingIndicationStatus(false));

  } catch (err) {

  }
}

export function* doAllScenarioList() {
  const watcher = yield takeLatest(ALL_SCENARIO_TABLE_FETCH, generateAllScenarioList);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
//

export function* generateAllPricingScenarioList() {

// alert()
//   let urlName = yield select(selectRangingScenarioTrackerPageDomain());
//   let selectedTab = urlName.get('selectedTab');
//   let deletedScenario = urlName.get('deletedScenario');
//   // let user_id = "user_id=nita";
//
//   let API_params = '';
//
//   if (deletedScenario !== '') {
//     API_params = API_params + "&" + deletedScenario;
//   }
//
//
//   let cookie_params = gettingUserDetails();
//   API_params = API_params + "&" + cookie_params;
//   API_params = API_params.replace('&', '');

  try {
    // Table data

    // if(selectedTab==="npd"){
    //   const scenario_list= yield call(request,host_url_rangingScenario+`/api/npd_impact_list_scenario?`+API_params);
    //   yield put(fetchRangingAllScenarioDataSuccess(scenario_list));
    // }else{
    //   const scenario_list= yield call(request,host_url_rangingScenario+`/api/delist_list_scenario?`+API_params);
    //   yield put(fetchRangingAllScenarioDataSuccess(scenario_list));
    // }

    console.log('fetcing pricng')
    const scenario_list = yield call(request, 'http://10.1.181.10:8000/api/pricing/scenario2/');
    console.log('scneairo_ata', scenario_list)

    yield put(fetchPricingAllScenarioDataSuccess(scenario_list));


  } catch (err) {

  }
}

export function* doAllPricingScenarioList() {
  const watcher = yield takeLatest(ALL_PRICING_TABLE_FETCH, generateAllPricingScenarioList);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  defaultSaga, doAllScenarioList, doAllPricingScenarioList
];
