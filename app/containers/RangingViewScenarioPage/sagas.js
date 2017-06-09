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


let gettingUserDetails = () =>{
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
  let cookie_params="user_id="+user_id+"&user_name="+user_name+"&designation="+designation+"&session_id="+sessionID+"&buying_controller_header="+buying_controller;

  if(designation==='Buyer' || designation==='buyer'){
    const buyer = getCookie('buyer');
    cookie_params=cookie_params+"&buyer_header="+buyer;
  }

  return(cookie_params);

}

const host_url="http://172.20.181.16:8000";
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

  let API_params='';
  if(paramString!==''){
    API_params=API_params+"&"+paramString;
  }


  let cookie_params=gettingUserDetails();
  API_params  =API_params +"&"+cookie_params;
  API_params = API_params.replace('&', '');


  try {


    // Scenario data
    const scenario_data = yield call(request,host_url+`/api/npd_impact_view_scenario?`+API_params);
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
