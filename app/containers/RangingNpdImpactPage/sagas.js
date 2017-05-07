// import { take, call, put, select } from 'redux-saga/effects';
import {take, call, put, select, cancel, takeLatest} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'react-router-redux';
import request from 'utils/request';
import {
  DATA_FETCH_ON_PAGE_LOAD, BUBBLE_CHART_DATA_FETCH, CANNIBALIZED_PROD_TABLE_DATA_FETCH, WATERFALL_CHART_DATA_FETCH,
  GENERATE_SIDE_FILTER,SAVE_SCENARIO
} from './constants';
import {
  dataFetchOnBubbleTableSuccess, dataFetchOnBubbleDataSuccess, generateSideFilterSuccess,
  dataFetchCanniProdTableSuccess, dataFetchOnWaterFallChartSuccess,
  showPageContentAfterLoading,showApplyButtonLoadingIndication,showTabChangeLoadingIndication,
  updateSaveScenarioResponse,
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
  console.log('generateDataFetch saga');

  let urlName = yield select(selectRangingNpdImpactPageDomain());
  let urlParams = urlName.get('dataUrlParms');

  let weekParams = urlName.get('dataWeekUrlParams');
  let searchParams = urlName.get('searchTable2');
  let pageParams = urlName.get('dataTable2PageUrlParams');
  let editForecastAPI = urlName.get('editForecastApi');


  let AJAX_args = '';

  if (urlParams !== '') {
    AJAX_args= AJAX_args + '&' + urlParams
  }
  if (weekParams !== '') {
    AJAX_args= AJAX_args + '&' + weekParams
  }
  if (searchParams !== '') {
    AJAX_args= AJAX_args + '&search1=' + searchParams
  }
  if (pageParams !== '') {
    AJAX_args= AJAX_args + '&' + pageParams
  }

  AJAX_args=AJAX_args+"&"+editForecastAPI;
  AJAX_args = AJAX_args.replace('&', '');
  console.log('Getting data from http://172.20.246.140:8000/api/npd_impact_view_bubble_table?'+AJAX_args);


  try {
    // Table data
    const bubble_table = yield call(request,`http://172.20.246.140:8000/api/npd_impact_view_bubble_table?` + AJAX_args);
    // const bubble_table = yield call(request,`http://172.20.246.140:8000/api/npd_impact_view_bubble_table?buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&product_sub_group_description=FROZEN%20COATED%20POULTRY&parent_supplier=1247.%20-%20LOCKWOODS%20LTD&brand_name=TESCO&package_type=BOX&measure_type=G&till_roll_description=KIEVS&merchandise_group_code_description=FROZEN%20POULTRY%20PRODUCTS&range_space_break_code=F&asp=1.98&acp=1.45&size=500&week_flag=Latest%2013%20Weeks`);

    yield put(dataFetchOnBubbleTableSuccess(bubble_table));

  } catch (err) {

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
  let weekParams = urlName.get('dataWeekUrlParams');
  let editForecastAPI = urlName.get('editForecastApi');

  let AJAX_args = '';

  if (urlParams !== '') {
    AJAX_args= AJAX_args + '&' + urlParams
  }
  if (weekParams !== '') {
    AJAX_args= AJAX_args + '&' + weekParams
  }

  AJAX_args=AJAX_args+"&"+editForecastAPI;
  AJAX_args = AJAX_args.replace('&', '');
  console.log(`http://172.20.246.140:8000/api/npd_impact_view_bubble_chart?`+AJAX_args);

  try {

    // Bubble chart data
    const bubble_chart = yield call(request,
      `http://172.20.246.140:8000/api/npd_impact_view_bubble_chart?`+AJAX_args);
    // const bubble_chart = yield call(request,
    //   `http://172.20.246.140:8000/api/npd_impact_view_bubble_chart?buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&product_sub_group_description=FROZEN%20COATED%20POULTRY&parent_supplier=1247.%20-%20LOCKWOODS%20LTD&brand_name=TESCO&package_type=BOX&measure_type=G&till_roll_description=KIEVS&merchandise_group_code_description=FROZEN%20POULTRY%20PRODUCTS&range_space_break_code=F&asp=1.98&acp=1.45&size=500&week_flag=Latest%2013%20Weeks`);
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
  let weekParams = urlName.get('dataWeekUrlParams');
  let searchParams = urlName.get('searchTable1');
  let pageParams = urlName.get('dataTable1PageUrlParams');
  let checkingApplyButtonClick = urlName.get('showApplyButtonLoading');
  let editForecastAPI = urlName.get('editForecastApi');

  let AJAX_args = '';

  if (typeof (urlParams)==="string" && urlParams !== '') {
    AJAX_args= AJAX_args + '&' + urlParams;
  }
  if (weekParams !== '') {
    AJAX_args= AJAX_args + '&' + weekParams
  }
  if (searchParams !== '') {
    AJAX_args= AJAX_args + '&search=' + searchParams
  }
  if (pageParams !== '') {
    AJAX_args= AJAX_args + '&' + pageParams
  }

  AJAX_args=AJAX_args+"&"+editForecastAPI;
  AJAX_args = AJAX_args.replace('&', '');
  console.log('http://172.20.246.140:8000/api/npd_impact_view_forecast?'+AJAX_args);

  try {



      let canni_table = yield call(request, `http://172.20.246.140:8000/api/npd_impact_view_forecast?` + AJAX_args);
      // let canni_table = yield call(request, `http://172.20.246.140:8000/api/npd_impact_view_forecast?buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&product_sub_group_description=FROZEN%20COATED%20POULTRY&parent_supplier=1247.%20-%20LOCKWOODS%20LTD&brand_name=TESCO&package_type=BOX&measure_type=G&till_roll_description=KIEVS&merchandise_group_code_description=FROZEN%20POULTRY%20PRODUCTS&range_space_break_code=F&asp=1.98&acp=1.45&size=500&`+ AJAX_args);
      yield put(dataFetchCanniProdTableSuccess(canni_table));


      //Checking
      if(checkingApplyButtonClick){
        yield put(showApplyButtonLoadingIndication(false));
        yield put(showPageContentAfterLoading(true));
      }else{
        yield put(showTabChangeLoadingIndication(false));
      }






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
  let weekParams = urlName.get('dataWeekUrlParams');


  let AJAX_args = '';

  if (urlParams !== '') {
    AJAX_args= AJAX_args + '&' + urlParams
  }
  if (weekParams !== '') {
    AJAX_args= AJAX_args + '&' + weekParams
  }

  AJAX_args = AJAX_args.replace('&', '');
  console.log('http://172.20.246.140:8000/api/npd_impact_view_waterfall?'+AJAX_args);

  //


  try {

    // Waterfall chart table data
    // const waterfallchart = yield call(request,
    //   `http://172.20.246.140:8000/api/npd_impact_view_forecast?` + AJAX_args);
    // const waterfallchart = yield call(request,
    //   `http://172.20.246.140:8000/api/npd_impact_view_forecast?buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&product_sub_group_description=FROZEN%20COATED%20POULTRY&parent_supplier=1247.%20-%20LOCKWOODS%20LTD&brand_name=TESCO&package_type=BOX&measure_type=G&till_roll_description=KIEVS&merchandise_group_code_description=FROZEN%20POULTRY%20PRODUCTS&range_space_break_code=F&asp=1.98&acp=1.45&size=500&week_flag=Latest%2013%20Weeks`);
    // yield put(dataFetchOnWaterFallChartSuccess(waterfallchart));


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

    let urlName = yield select(selectRangingNpdImpactPageDomain());
    let urlParams = urlName.get('filterSelectionsTillNow');



    console.log('http://172.20.246.140:8000/api/npd_impact_view/filter_data?' + urlParams);
    let data = '';

      // data = yield call(request, `http://172.20.246.140:8000/api/npd_impact_view/filter_data?` + urlParams);
    data = yield call(request, `http://172.20.246.140:8000/api/npd_impact_view/filter_data?buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&product_sub_group_description=FROZEN%20COATED%20POULTRY&parent_supplier=1247.%20-%20LOCKWOODS%20LTD&brand_name=TESCO&package_type=BOX&measure_type=G&till_roll_description=KIEVS&merchandise_group_code_description=FROZEN%20POULTRY%20PRODUCTS&range_space_break_code=F&week_flag=Latest%2013%20Weeks`);

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

//------------------------------- Saving scenario ------------------------------------------
/* GENERATE SIDE FILTER*/
export function* generateSaveScenario() {
  try {
    // todo: update url
    console.log("Trying to save scenario")
    let urlName = yield select(selectRangingNpdImpactPageDomain());
    let urlParams = urlName.get('dataUrlParms');
    // let urlParams = "buying_controller=Meat%20Fish%20and%20Veg&buyer=Meat%20and%20Poultry&junior_buyer=Coated%20Poultry&product_sub_group_description=FROZEN%20COATED%20POULTRY&parent_supplier=1247.%20-%20LOCKWOODS%20LTD&brand_name=TESCO&package_type=BOX&measure_type=G&till_roll_description=KIEVS&merchandise_group_code_description=FROZEN%20POULTRY%20PRODUCTS&range_space_break_code=F&asp=1.98&acp=1.45&size=500&week_flag=Latest%2013%20Weeks&user_id=123aeiou";
    // let modified = "modified_flag=0";
    let user_id = "user_id=sachin123";
    // let eventName= urlName.get('eventName');
    let scenarioName= urlName.get('scenarioName');
    let sessionID= "session_id=user_1234";
    let editForecastAPI = urlName.get('editForecastApi');
    let weekParams = urlName.get('dataWeekUrlParams');


    let AJAX_args =urlParams+"&scenario_name="+scenarioName+"&"+user_id+"&"+editForecastAPI+"&"+sessionID+"&"+weekParams  ;
    // let AJAX_args =urlParams+'&event_name='+eventName+"&scenario_name="+scenarioName+"&"+user_id+"&"+modified+"&"+sessionID ;

    console.log('http://172.20.246.140:8000/api/npd_impact_save_scenario?' + AJAX_args);
    let data = yield call(request, 'http://172.20.246.140:8000/api/npd_impact_save_scenario?' + AJAX_args);
    yield put(updateSaveScenarioResponse(data));

  } catch (err) {
    //console.log(err);
  }
}

export function* doSaveScenario() {
  const watcher = yield takeLatest(SAVE_SCENARIO, generateSaveScenario);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher)
}


// All sagas to be loaded
export default [
  defaultSaga, doDataFetch, doBubbleChartDataFetch, doGenerateSideFilter, doWaterFallChartDataFetch, doProdCanniTableDataFetch,doSaveScenario
];
