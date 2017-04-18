// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
  DATA_FETCH_ON_PAGE_LOAD, BUBBLE_CHART_DATA_FETCH, CANNIBALIZED_PROD_TABLE_DATA_FETCH, WATERFALL_CHART_DATA_FETCH,
  GENERATE_SIDE_FILTER
} from './constants';
import {
  dataFetchOnBubbleTableSuccess, dataFetchOnBubbleDataSuccess, generateSideFilterSuccess,
  dataFetchCanniProdTableSuccess, dataFetchOnWaterFallChartSuccess
} from 'containers/RangingNpdImpactPage/actions';
import {
  selectRangingNpdImpactPageDomain, makeUrlParamsString
} from 'containers/RangingNpdImpactPage/selectors';


// Individual exports for testing
export function* defaultSaga() {
  // See example in containers/HomePage/sagas.js
}


//------------------------------- Bubble Chart TableLoad ------------------------------------------
export function* generateDataFetch() {
  // console.log('generateDataFetch saga');

  let urlName = yield select(selectRangingNpdImpactPageDomain());
  let urlParams = urlName.get('dataUrlParms');
  let npdFirstHalfSelections = urlName.get('npdFirstHalfSelections');
  let searchParams = urlName.get('searchTable2');
  // let paramString = 'buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&package_type=BOX&product_sub_group_description=FROZEN%20COATED%20POULTRY&measure_type=G&asp=1.967819549&acp=0.5&Size=300&brand_name=TESCO&till_roll_description=S/FRIED%20STRI&merchandise_group_code_description=FROZEN%20FISH&range_space_break_code=P&parent_supplier=1190. - MARITIME - JDM PRODUCE LIMITED&week_flag=Latest%2013%20Weeks';
  let paramString = 'parent_supplier=1190.%20-%20MARITIME%20-%20JDM%20PRODUCE%20LIMITED&buying_controller=Meat%20Fish%20and%20Veg'
    // let paramString = '';
  // Object.keys(urlParams).map(obj => {
  //   //console.log(obj,urlParams[obj]);
  //   paramString += `&${obj}=${urlParams[obj]}`
  // });
  // paramString = paramString.replace('&', '');
  //
  // console.log('searchParams', searchParams);
  // if (searchParams !== '' && paramString !== '') {
  //   console.log('searchParams inside if ', searchParams);
  //   searchParams = "&search1=" + searchParams;
  // } else if (searchParams !== '') {
  //   searchParams = "search1=" + searchParams;
  //
  // }

  console.log('Getting data from http://172.20.246.139:8000/ranging_new/npd_impact_view_bubble_table' + paramString + searchParams);
  try {

    // Table data
    const bubble_table = yield call(request,
      `http://172.20.246.139:8000/ranging_new/npd_impact_view_bubble_table?` + paramString + searchParams);
    yield put(dataFetchOnBubbleTableSuccess(bubble_table));

  } catch (err) {
    //console.log(err);
  }
}

export function* doDataFetch() {
  const watcher = yield takeLatest(DATA_FETCH_ON_PAGE_LOAD, generateDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//------------------------------- Bubble chart data Load ------------------------------------------
export function* generateBubbleChartDataFetch() {
  // console.log('generateBubbleChartDataFetch saga');

  let urlName = yield select(selectRangingNpdImpactPageDomain());
  let urlParams = urlName.get('dataUrlParms');
  console.log("bubble chart url params");
  console.log(urlParams);
  let npdFirstHalfSelections = urlName.get('npdFirstHalfSelections');
  let paramString = 'parent_supplier=1190.%20-%20MARITIME%20-%20JDM%20PRODUCE%20LIMITED&buying_controller=Meat%20Fish%20and%20Veg'


  //
  // let paramString = '';
  // Object.keys(urlParams).map(obj => {
  //   //console.log(obj,urlParams[obj]);
  //   paramString += `&${obj}=${urlParams[obj]}`
  // });
  // paramString = paramString.replace('&', '');
  // console.log("logging_bubble_url");
  // console.log('http://172.20.246.139:8000/ranging_new/npd_impact_view_bubble_chart?' + paramString);
  try {

    // Bubble chart data
    const bubble_chart = yield call(request,
      `http://172.20.246.139:8000/ranging_new/npd_impact_view_bubble_chart?`+ paramString);
    yield put(dataFetchOnBubbleDataSuccess(bubble_chart));

  } catch (err) {
    //console.log(err);
  }
}

export function* doBubbleChartDataFetch() {
  const watcher = yield takeLatest(BUBBLE_CHART_DATA_FETCH, generateBubbleChartDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//------------------------------- Product Cannibalization Table data Load ------------------------------------------
export function* generateProdCanniTableDataFetch() {
  // console.log('generateProdCanniTableDataFetch saga');

  let urlName = yield select(selectRangingNpdImpactPageDomain());
  let urlParams = urlName.get('dataUrlParms');
  // let npdFirstHalfSelections = urlName.get('npdFirstHalfSelections');
  let searchParams = urlName.get('searchTable1');

  let paramString = 'buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&package_type=BOX&product_sub_group_description=FROZEN%20COATED%20POULTRY&measure_type=G&asp=1.967819549&acp=0.5&Size=300&brand_name=TESCO&till_roll_description=S/FRIED%20STRI&merchandise_group_code_description=FROZEN%20FISH&range_space_break_code=P&parent_supplier=1190. - MARITIME - JDM PRODUCE LIMITED&week_flag=Latest%2013%20Weeks';
  // let paramString = '';
  // Object.keys(urlParams).map(obj => {
  //   //console.log(obj,urlParams[obj]);
  //   paramString += `&${obj}=${urlParams[obj]}`
  // });
  // paramString = paramString.replace('&', '');


  if (searchParams !== '' && paramString !== '') {
    console.log('searchParams inside if ', searchParams);
    searchParams = "&search=" + searchParams;
  } else if (searchParams !== '') {
    searchParams = "search=" + searchParams;

  }


  console.log('http://172.20.246.139:8000/ranging_new/npd_impact_view_table?' + paramString + searchParams);
  try {

    // Cannibalization table data
    const canni_table = yield call(request,
      `http://172.20.246.139:8000/ranging_new/npd_impact_view_forecast?` + paramString + searchParams);
    yield put(dataFetchCanniProdTableSuccess(canni_table));


  } catch (err) {
    //console.log(err);
  }
}

export function* doProdCanniTableDataFetch() {
  const watcher = yield takeLatest(CANNIBALIZED_PROD_TABLE_DATA_FETCH, generateProdCanniTableDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

//------------------------------- Waterfall chart data Load ------------------------------------------
export function* generateWaterFallChartDataFetch() {
  // console.log('generateWaterFallChartDataFetch saga');

  let urlName = yield select(selectRangingNpdImpactPageDomain());
  let urlParams = urlName.get('dataUrlParms');
  let npdFirstHalfSelections = urlName.get('npdFirstHalfSelections');

  let paramString = 'buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&package_type=BOX&product_sub_group_description=FROZEN%20COATED%20POULTRY&measure_type=G&asp=1.967819549&acp=0.5&Size=300&brand_name=TESCO&till_roll_description=S/FRIED%20STRI&merchandise_group_code_description=FROZEN%20FISH&range_space_break_code=P&parent_supplier=1190. - MARITIME - JDM PRODUCE LIMITED&week_flag=Latest%2013%20Weeks';


  // let paramString = '';
  // Object.keys(urlParams).map(obj => {
  //   //console.log(obj,urlParams[obj]);
  //   paramString += `&${obj}=${urlParams[obj]}`
  // });
  // paramString = paramString.replace('&', '');
  // console.log('http://172.20.246.139:8000/ranging_new/npd_impact_view_waterfall?' + paramString);
  try {

    // Waterfall chart table data
    const waterfallchart = yield call(request,
      `http://172.20.246.139:8000/ranging_new/npd_impact_view_forecast?` + paramString);
    yield put(dataFetchOnWaterFallChartSuccess(waterfallchart));


  } catch (err) {
    //console.log(err);
  }
}

export function* doWaterFallChartDataFetch() {
  const watcher = yield takeLatest(WATERFALL_CHART_DATA_FETCH, generateWaterFallChartDataFetch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


//------------------------------- Side Filters - Data Fetch------------------------------------------
/* GENERATE SIDE FILTER*/
export function* generateSideFilter() {
  try {
    // todo: update url
    // const data = yield call(request, `http://localhost:8090/wash/?format=json`);
    // const data = yield call(request, `http://172.20.246.139:8000/ranging_new/npd_impact_view/filter_data`);

    let urlName = yield select(selectRangingNpdImpactPageDomain());
    // let urlParams = urlName.get('filter_selection');
    let urlParams = urlName.get('filterSelectionsTillNow');

    console.log('http://172.20.246.139:8000/ranging_new/npd_impact_view/filter_data?' + urlParams);
    let data = '';
    if (urlParams) {
      data = yield call(request, `http://172.20.246.139:8000/ranging_new/npd_impact_view/filter_data?` + urlParams);
    } else {
      data = yield call(request, `http://172.20.246.139:8000/ranging_new/npd_impact_view/filter_data`);
    }

    yield put(generateSideFilterSuccess(data));

  } catch (err) {
    //console.log(err);
  }
}

export function* doGenerateSideFilter() {
  const watcher = yield takeLatest(GENERATE_SIDE_FILTER, generateSideFilter);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


// All sagas to be loaded
export default [
  defaultSaga, doDataFetch, doBubbleChartDataFetch, doProdCanniTableDataFetch, doGenerateSideFilter, doWaterFallChartDataFetch
];
