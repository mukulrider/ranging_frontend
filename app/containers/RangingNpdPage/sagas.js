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
  priceGravitySuccess
} from 'containers/RangingNpdPage/actions';
import {
  selectRangingNpdPageDomain, makeUrlParamsString
} from 'containers/RangingNpdPage/selectors';



// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}

const host_url="http://172.20.244.219:8000"
//const host_url="http://172.20.244.219:8000"
// All sagas to be loaded

//------------------------------- Unmatched products table Page Load ------------------------------------------
export function* generateUnmatchedTableFetch() {
    //console.log('generateUnmatchedTableFetch saga');
    let urlName=yield select(selectRangingNpdPageDomain());
    let urlParams = urlName.get('dataUrlParms');
    let searchParams =urlName.get('textBoxQueryString');

    let paramString='';
    Object.keys(urlParams).map(obj => {
      //console.log(obj,urlParams[obj]);
      paramString += `&${obj}=${urlParams[obj]}`
    });
    paramString=paramString.replace('&','');

  console.log('searchParams',searchParams);
  if(searchParams!=='' && paramString!==''){
    console.log('searchParams inside if ',searchParams);
    searchParams="&search="+searchParams;
  } else if(searchParams!=='') {
    searchParams="search=" +searchParams;

  }


  try {
  console.log('---------------------http://172.20.244.219:8000/api/npd/unmatchedprod?'+paramString+searchParams);
      // Table data
        const data = yield call(request,
          `${host_url}/api/npd/unmatchedprod?`+paramString+searchParams);
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

    let paramString='';
    Object.keys(urlParams).map(obj => {
      paramString += `&${obj}=${urlParams[obj]}`
    });
    paramString=paramString.replace('&','');

try {


  console.log('---------------------http://172.20.244.219:8000/api/npd/psgskudistribution?'+paramString);

   // Sku chart data
      const sku_chart = yield call(request,
        `${host_url}/api/npd/psgskudistribution?`+paramString);
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
    let urlParams = urlName.get('dataUrlParms');

    let paramString='';
    Object.keys(urlParams).map(obj => {
      //console.log(obj,urlParams[obj]);
      paramString += `&${obj}=${urlParams[obj]}`
    });

    paramString=paramString.replace('&','');

  console.log('---------------------http://172.20.244.219:8000/api/npd/outperformance?'+paramString);


  try {

      // Out performance data
      const out_performance= yield call(request,`${host_url}/api/npd/outperformance?`+paramString);

      yield put(outPerformanceChartSuccess(out_performance));

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
    let urlParams = urlName.get('dataUrlParms');


    let paramString='';
    Object.keys(urlParams).map(obj => {
      //console.log(obj,urlParams[obj]);
      paramString += `&${obj}=${urlParams[obj]}`
    });
    paramString=paramString.replace('&','');


try {

  console.log('---------------------http://172.20.244.219:8000/api/npd/pricebucket?'+paramString);

      // Price gravity chart data
      const price_gravity = yield call(request,`${host_url}/api/npd/pricebucket?`+paramString);
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
    // todo: update url

    let urlName=yield select(selectRangingNpdPageDomain());
    let urlParams = urlName.get('filter_selection');
    console.log(`http://172.20.244.219:8000/api/npd_view1/filter_data?` + urlParams);

    const data = yield call(request,`${host_url}/api/npd_view1/filter_data?` + urlParams);
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
