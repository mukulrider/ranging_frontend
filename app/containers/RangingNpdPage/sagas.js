// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
    UNMATCHED_PROD_FETCH,SKU_CHART_FETCH,OUT_PERFORMANCE_FETCH,PRICE_GRAVITY_FETCH,
  WEEK_SELECT, GENERATE_SIDE_FILTER, GENERATE_TABLE,TABLE_PAGE_CHANGE,
} from './constants';
import {
  unmatchedProdTableSuccess, generateSideFilterSuccess, generateTableSuccess,skuChartSuccess,outPerformanceChartSuccess,
  priceGravitySuccess,pageLoadSelectFilterIndicator
} from 'containers/RangingNpdPage/actions';
import {
  selectRangingNpdPageDomain, makeUrlParamsString
} from 'containers/RangingNpdPage/selectors';



// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

const host_url="http://172.20.181.16:8000"

//getting user details from cookies
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

//------------------------------- Unmatched products table Page Load ------------------------------------------
export function* generateUnmatchedTableFetch() {
    //console.log('generateUnmatchedTableFetch saga');
    let urlName=yield select(selectRangingNpdPageDomain());
    let urlParams = urlName.get('dataUrlParms');
    let urlParamsString = urlName.get('urlParamsString');
  let dataWeekUrlParams =urlName.get('dataWeekUrlParams');
    let searchParams =urlName.get('textBoxQueryString');


    let paramString='';
    Object.keys(urlParams).map(obj => {
      //console.log(obj,urlParams[obj]);
      paramString += `&${obj}=${urlParams[obj]}`
    });
    paramString=paramString.replace('&','');

    let AJAX_args=''

    // if(paramString!==''){
    //   AJAX_args= AJAX_args + '&' + paramString
    // }
    if(urlParamsString!==''){
      AJAX_args= AJAX_args + '&' + urlParamsString
    }
    if(searchParams!==''){
      AJAX_args= AJAX_args + '&search=' + searchParams
    }
    if(dataWeekUrlParams!==''){
      AJAX_args= AJAX_args + '&' + dataWeekUrlParams
    }


  //Adding the user information
  let cookie_params=gettingUserDetails();
  AJAX_args =AJAX_args +"&"+cookie_params;
  AJAX_args = AJAX_args.replace('&', '');

  try {
  console.log('---------------------http://dvcmpapp00002uk.dev.global.tesco.org/api/npd/unmatchedprod?'+AJAX_args);
      // Table data
        const data = yield call(request,
          `${host_url}/api/npd/unmatchedprod?`+AJAX_args);
        yield put(unmatchedProdTableSuccess(data));

} catch (err) {
        //console.log(err);
    }
}

export function* doUnmatchedTableFetch() {
    const watcher = yield takeLatest(UNMATCHED_PROD_FETCH, generateUnmatchedTableFetch);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

//------------------------------- SKU chart Page Load ------------------------------------------
export function* generateSkuChartDataFetch() {
    //console.log('generateUnmatchedTableFetch saga');
    let urlName=yield select(selectRangingNpdPageDomain());
    let urlParams = urlName.get('dataUrlParms');
    let urlParamsString = urlName.get('urlParamsString');
    let dataWeekUrlParams =urlName.get('dataWeekUrlParams');


  let AJAX_args=''

  if(urlParamsString!==''){
    AJAX_args= AJAX_args + '&' + urlParamsString
  }

  if(dataWeekUrlParams!==''){
    AJAX_args= AJAX_args + '&' + dataWeekUrlParams
  }

  //Adding the user information
  let cookie_params=gettingUserDetails();
  AJAX_args =AJAX_args +"&"+cookie_params;
  AJAX_args = AJAX_args.replace('&', '');

  try {

    console.log('---------------------http://dvcmpapp00002uk.dev.global.tesco.org/api/npd/psgskudistribution?'+AJAX_args);
   // Sku chart data
      const sku_chart = yield call(request,`${host_url}/api/npd/psgskudistribution?`+AJAX_args);
      yield put(skuChartSuccess(sku_chart));


} catch (err) {
        //console.log(err);
    }
}

export function* doSkuChartDataFetch() {
    const watcher = yield takeLatest(SKU_CHART_FETCH, generateSkuChartDataFetch);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

//------------------------------- out Performance Chart------------------------------------------
export function* generateOutPerformanceChartFetch() {
    //console.log('generateUnmatchedTableFetch saga');
    let urlName=yield select(selectRangingNpdPageDomain());
    let urlParamsString = urlName.get('urlParamsString');
    let dataWeekUrlParams =urlName.get('dataWeekUrlParams');

    let AJAX_args=''

    if(urlParamsString!==''){
      AJAX_args= AJAX_args + '&' + urlParamsString
    }

    if(dataWeekUrlParams!==''){
      AJAX_args= AJAX_args + '&' + dataWeekUrlParams
    }


  //Adding the user information
    let cookie_params=gettingUserDetails();
    AJAX_args =AJAX_args +"&"+cookie_params;
    AJAX_args = AJAX_args.replace('&', '');



  console.log('---------------------http://dvcmpapp00002uk.dev.global.tesco.org/api/npd/outperformance?'+AJAX_args);


  try {

      // Out performance data
      const out_performance= yield call(request,`${host_url}/api/npd/outperformance?`+AJAX_args);

      yield put(outPerformanceChartSuccess(out_performance));

    yield put(pageLoadSelectFilterIndicator(false));

} catch (err) {
        //console.log(err);
    }
}

export function* doOutPerformanceChartFetch() {
    const watcher = yield takeLatest(OUT_PERFORMANCE_FETCH, generateOutPerformanceChartFetch);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

//------------------------------- Unmatched products table Page Load ------------------------------------------
export function* generatePriceGravityFetch() {
    //console.log('generateUnmatchedTableFetch saga');
    let urlName=yield select(selectRangingNpdPageDomain());
    let urlParamsString = urlName.get('urlParamsString');
    let dataWeekUrlParams =urlName.get('dataWeekUrlParams');

    let AJAX_args=''

    if(urlParamsString!==''){
      AJAX_args= AJAX_args + '&' + urlParamsString
    }

    if(dataWeekUrlParams!==''){
      AJAX_args= AJAX_args + '&' + dataWeekUrlParams
    }

  //Adding the user information
    let cookie_params=gettingUserDetails();
    AJAX_args =AJAX_args +"&"+cookie_params;
    AJAX_args = AJAX_args.replace('&', '');


  try {

  console.log('---------------------http://dvcmpapp00002uk.dev.global.tesco.org/api/npd/pricebucket?'+AJAX_args);

      // Price gravity chart data
      const price_gravity = yield call(request,`${host_url}/api/npd/pricebucket?`+AJAX_args);
      yield put(priceGravitySuccess(price_gravity));


} catch (err) {
        //console.log(err);
    }
}


export function* doPriceGravityFetch() {
    const watcher = yield takeLatest(PRICE_GRAVITY_FETCH, generatePriceGravityFetch);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

//------------------------------- Side Filters - Data Fetch------------------------------------------
/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  try {

    let urlName=yield select(selectRangingNpdPageDomain());
    let urlParams = urlName.get('filter_selection');

    let AJAX_args=''

    if(urlParams!==''){
      AJAX_args= AJAX_args + '&' + urlParams
    }

    //Adding the user information
    let cookie_params=gettingUserDetails();
    AJAX_args =AJAX_args +"&"+cookie_params;
    AJAX_args = AJAX_args.replace('&', '');

     console.log(`http://dvcmpapp00002uk.dev.global.tesco.org/api/npd_view1/filter_data?` + AJAX_args);

    const data = yield call(request,`${host_url}/api/npd_view1/filter_data?` + AJAX_args);
    yield put(generateSideFilterSuccess(data));

  } catch (err) {
    // //console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_SIDE_FILTER, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


//----------------------------------------------------------------------------------------------

export default [
  doUnmatchedTableFetch,
  doSkuChartDataFetch,
  doOutPerformanceChartFetch,
  doPriceGravityFetch,
  doGenerateSideFilter,

];
