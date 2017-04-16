import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {OVERVIEW_FETCH, GENERATE_URL_PARAMS_DATA} from './constants';
import {overviewFetchSuccess, generateUrlParamsDataSuccess} from 'containers/PricingScenarioOverviewPage/actions';
import {selectPricingScenarioOverviewPageDomain
} from 'containers/PricingScenarioOverviewPage/selectors';
// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

/* GENERATE NEW SCENARIO2 */
export function* generateOverviewFetch() {
  try {
    // todo: update url
    let urlParams = yield select(selectPricingScenarioOverviewPageDomain());
    console.log(urlParams);
    urlParams = '?buying_controller=Frozen Impulse&buyer=Frozen Pizza And Bread';
    // let newScenarioWeek = yield select(makeNewScenarioWeek());
    // let newScenarioStoreFormat = yield select(makeNewScenarioStoreFormat());
    // let newScenarioStartDate = yield select(makeNewScenarioStartDate());
    // console.log(newScenarioStartDate);
    // const data = yield call(request, `http://10.1.246.156:8000/ranging/npd_view1/filter_data` + urlParams);
    // yield put(overviewFetchSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateOverviewFetch() {
  const watcher = yield takeLatest(OVERVIEW_FETCH, generateOverviewFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/* GENERATE NEW SCENARIO2 */
export function* generateUrlParamsData() {
  try {
    console.log('generateUrlParamsData 222222222222')
    let urlParams = yield select(selectPricingScenarioOverviewPageDomain());
    console.log('urlParams',urlParams.get('urlParamsString'));
    urlParams = urlParams.get('urlParamsString');
    // let newScenarioWeek = yield select(makeNewScenarioWeek());
    // let newScenarioStoreFormat = yield select(makeNewScenarioStoreFormat());
    // let newScenarioStartDate = yield select(makeNewScenarioStartDate());
    // console.log(newScenarioStartDate);
    const data = yield call(request, `http://localhost:8090/api/inputpage2/?` + urlParams);
    yield put(generateUrlParamsDataSuccess(data));
  } catch (err) {
    // console.log(err);
  }
}

export function* doGenerateUrlParamsData() {
  const watcher = yield takeLatest(GENERATE_URL_PARAMS_DATA, generateUrlParamsData);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}
// All sagas to be loaded
export default [
  defaultSaga,
  doGenerateOverviewFetch,
  doGenerateUrlParamsData
];
