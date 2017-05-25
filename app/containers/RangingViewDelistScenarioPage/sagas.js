// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';

import {
  WATERFALL_VALUE, URL_PARAMETERS
} from './constants';

import {
  selectRangingViewDelistScenarioPageDomain, makeUrlParamsString
} from 'containers/RangingViewDelistScenarioPage/selectors';

import {
  WaterfallValueChartSuccess
} from 'containers/RangingViewDelistScenarioPage/actions';

// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

let host_url = "http://172.20.181.16:8000"

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


// WATERFALL CHART - VALIUE
export function* generateWaterfallValueFetch() {

  let urlName = yield select(selectRangingViewDelistScenarioPageDomain());

  let urlParams = "";

  let urlparameters = "";
  if (!(urlName.get('urlparameters') == "")) {
    urlparameters = urlName.get('urlparameters');
  }

  if (!(urlparameters == "")) {
    urlParams = urlparameters;
  } else {

  }

  // let store_type = "";
  // if (!(urlName.get('storeType') == "")) {
  //   store_type = urlName.get('storeType');
  // }
  //
  // if (!(store_type == "")) {
  //   urlParams = urlParams + "&" + store_type;
  // } else {
  //   // alert("empty");
  // }
  //
  // let filterParamsString = "";
  // if (!(urlName.get('filterParamsString') == "")) {
  //   filterParamsString = urlName.get('filterParamsString');
  //   console.log("filterParamsString", filterParamsString);
  // }
  //
  // if (!(typeof(filterParamsString) == "undefined") && !(filterParamsString == "")) {
  //   urlParams = urlParams + "&" + filterParamsString;
  //
  // } else {
  //   // alert("empty");
  // }
  //
  // let urlparamsDelist = "";
  // if (!(urlName.get('urlparamsDelist') == "")) {
  //   urlparamsDelist = urlName.get('urlparamsDelist').replace('?', '');
  // }
  //
  // if (!(urlparamsDelist == "")) {
  //   urlParams = urlParams + "&" + urlparamsDelist;
  // } else {
  //
  // }
  //
  // if (!(urlParams == "")) {
  //   urlParams = "?" + urlParams;
  // }

  let API_params = "";
  let cookie_params = gettingUserDetails();
  console.log('cookie_params',cookie_params);
  console.log('urlParams11',urlParams);

  if (!(typeof(cookie_params) == "undefined") && !(cookie_params == "")) {
    API_params = API_params + "&" + cookie_params;
  }

  if (!(typeof(urlParams) == "undefined") && !(urlParams == "")) {
    API_params = API_params + urlParams.replace('?', '');
    console.log('API_params url aa',API_params);
  }

  if (!(typeof(API_params) == "undefined") && !(API_params == "")) {
    API_params = API_params.replace('&', '');
    console.log('api cookie',API_params);

  }

  try {
    // const data = yield call(request, host_url + `/api/display_delist_scenario?user_id=tan1&scenario_name=test3`);
    const data = yield call(request, host_url + `/api/display_delist_scenario?` + API_params);
    // const data = yield call(request, host_url + `/api/display_delist_scenario` + urlParams);


    let spinnerCheck = 1;
    yield put(WaterfallValueChartSuccess(data));
    // yield put(WaterfallSpinnerSuccess(spinnerCheck));
    // yield put(WaterfallProfitSpinnerSuccess(spinnerCheck));

  } catch (err) {
    // console.log(err);
    let spinnerCheck = 2;
    // yield put(WaterfallSpinnerSuccess(spinnerCheck));
    // yield put(WaterfallProfitSpinnerSuccess(spinnerCheck));
  }
}

export function* doWaterfallChartValueFetch() {
  const watcher = yield takeLatest(WATERFALL_VALUE, generateWaterfallValueFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  defaultSaga,
  doWaterfallChartValueFetch
];
