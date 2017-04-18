/*
 *
 * RangingNpdImpactPage reducer
 *
 */

import {fromJS} from 'immutable';
import {
  DEFAULT_ACTION, BUBBLE_CHART_TABLE_SUCCESS, BUBBLE_CHART_DATA_SUCCESS, CANNIBALIZED_PROD_TABLE_DATA_SUCCESS,WATERFALL_CHART_DATA_SUCCESS,
  GENERATE_SIDE_FILTER_SUCCESS, GENERATE_URL_PARAMS, GENERATE_URL_PARAMS_STRING,CHECKBOX_CHANGE,
  SEND_URL_PARAMS, SAVE_WEEK_PARAM, SAVE_T1_PAGE_PARAM,SAVE_T2_PAGE_PARAM,FROM_NPD_FIRST,SAVE_SEARCH_TABLE2,SAVE_SEARCH_TABLE1,
  SAVE_ASP,SAVE_ACP,SAVE_SIZE,SAVE_FILTER_SELECTIONS_TILL_NOW,
} from './constants';

const initialState = fromJS({
  dataTable1PageUrlParams: '',
  dataTable2PageUrlParams: '',
  dataWeekUrlParams: '',
  urlParamsString: '',
  filter_selection:'',
  npdFirstHalfSelections:'',
  searchTable1:'',
  searchTable2:'',
  ASP_field_entry:'',
  ACP_field_entry:'',
  Size_field_entry:'',
  filterSelectionsTillNow:'',
  // waterFallChartData: {
  //   "impact": {"perc_impact_psg": '--', "Cannibilization_perc": '--'}
  //   // "data": [{"name": "NPD_Volume", "value": 140}, {"name": "Cannibilization_perc", "value": -40}]
  // }
  // npd_bubble_table_data: [
  //   {
  //     "base_product_number": 73940233,
  //     "long_description": "TAITTINGER      COMTES DE       CHAMPAGNE 75CL",
  //     "pps": "-44.11",
  //     "cps": "0.00",
  //     "store_count": 65,
  //     "rate_of_sale": "-10.85"
  //   },
  //   {
  //     "base_product_number": 77688427,
  //     "long_description": "CHATEAU MOUTON  ROTHSCHILD      2010 75CL",
  //     "pps": "-7549.08",
  //     "cps": "0.00",
  //     "store_count": 1,
  //     "rate_of_sale": "42000.00"
  //   }
  // ],
  // npd_bubble_chart_data:[
  //   {
  //     "rate_of_sale": 4200,
  //     "pps_quartile": 0.25,
  //     "performance_quartile": "Low CPS/Low Profit",
  //     "long_description": "CHATEAU MOUTON  ROTHSCHILD      2010 75CL",
  //     "cps_quartile": 0.2
  //   },
  //   {
  //     "rate_of_sale": 3632.84,
  //     "pps_quartile": 0.85,
  //     "performance_quartile": "Low CPS/Low Profit",
  //     "long_description": "KRUG            GRAND CUVEE     75CL",
  //     "cps_quartile": 0.1
  //   },
  //   {
  //     "rate_of_sale": 3372.64,
  //     "pps_quartile": 0.43,
  //     "performance_quartile": "Low CPS/Low Profit",
  //     "long_description": "BOLLINGER GRANDEANNEE VINTAGE   CHAMPAGNE 75CL",
  //     "cps_quartile": 0.5
  //   }
  //   ],
  // canniProdTableData:{
  //   "df": [
  //     {
  //       "brand_name": "HARDYS          ",
  //       "sales_volume": "568386.00",
  //       "brand_indicator": "Brand",
  //       "long_description": "HARDY'S STAMP   ROSE 75CL",
  //       "sales_value": "2902566.17"
  //     },{
  //       "brand_name": "BAROSSA         ",
  //       "sales_volume": "14.00",
  //       "brand_indicator": "Brand",
  //       "long_description": "BAROSSA DRIVE   SHIRAZ",
  //       "sales_value": "71.54"
  //     }]
  // }
});

function rangingNpdImpactPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

    case BUBBLE_CHART_TABLE_SUCCESS :
      // console.log(BUBBLE_CHART_TABLE_SUCCESS , 'reducer', action);
      return state.set('npd_bubble_table_data', action.data);
    case BUBBLE_CHART_DATA_SUCCESS :
      // console.log(BUBBLE_CHART_DATA_SUCCESS , 'reducer', action);
      return state.set('npd_bubble_chart_data', action.data);
    case CANNIBALIZED_PROD_TABLE_DATA_SUCCESS :
      // console.log(CANNIBALIZED_PROD_TABLE_DATA_SUCCESS, 'reducer', action);
      return state.set('canniProdTableData', action.data);
    case WATERFALL_CHART_DATA_SUCCESS :
      // console.log(WATERFALL_CHART_DATA_SUCCESS, 'reducer', action);
      return state.set('waterFallChartData', action.data);


    case SEND_URL_PARAMS:
      return state.set('dataUrlParms', action.data);
    case SAVE_WEEK_PARAM:
      return state.set('dataWeekUrlParams', action.data);
    case SAVE_T1_PAGE_PARAM:
      return state.set('dataTable1PageUrlParams', action.data);
    case SAVE_T2_PAGE_PARAM:
      return state.set('dataTable2PageUrlParams', action.data);
    case SAVE_SEARCH_TABLE1:
      return state.set('searchTable1', action.data);
    case SAVE_SEARCH_TABLE2:
      return state.set('searchTable2', action.data);

    case GENERATE_SIDE_FILTER_SUCCESS :
      return state.set('sideFilter', action.data);
    case CHECKBOX_CHANGE:
      console.log(CHECKBOX_CHANGE, 'reducer', action);
      return state.set('filter_selection', action.data);
   case SAVE_ASP:
        console.log(SAVE_ASP, 'reducer', action);
        return state.set('ASP_field_entry', action.data);
   case SAVE_ACP:
        console.log(SAVE_ACP, 'reducer', action);
        return state.set('ACP_field_entry', action.data);
   case SAVE_SIZE:
        console.log(SAVE_SIZE, 'reducer', action);
        return state.set('Size_field_entry', action.data);
   case SAVE_FILTER_SELECTIONS_TILL_NOW:
        console.log(SAVE_FILTER_SELECTIONS_TILL_NOW, 'reducer', action);
        return state.set('filterSelectionsTillNow', action.data);


    case GENERATE_URL_PARAMS:
      return state.set('urlParams', action.data);
    case GENERATE_URL_PARAMS_STRING:
      return state.set('urlParamsString', action.data);

    case FROM_NPD_FIRST:
      return state.set('npdFirstHalfSelections', action.data);

    default:
      return state;
  }
}

export default rangingNpdImpactPageReducer;
