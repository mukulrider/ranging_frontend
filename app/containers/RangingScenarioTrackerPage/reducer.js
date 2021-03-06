/*
 *
 * RangingScenarioTrackerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,ALL_SCENARIO_TABLE_SUCCESS,TAB_CHANGE,DELETE_SCENARIO,LOADING_INDICATION, LOADING_INDICATION_TEXT,
  ALL_PRICING_TABLE_SUCCESS
} from './constants';

const initialState = fromJS({scenarioName:'',selectedTab:'npd',deletedScenario:'',loadingText:"Loading saved scenarios from NPD..."});

function rangingScenarioTrackerPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
  case ALL_SCENARIO_TABLE_SUCCESS:
    return state.set('allScenarioList', action.data);
  case ALL_PRICING_TABLE_SUCCESS:
    return state.set('pricingScenarioStatus', action.data);
  case TAB_CHANGE:
    return state.set('selectedTab', action.data);
 case DELETE_SCENARIO:
    return state.set('deletedScenario', action.data);
    case LOADING_INDICATION:
      return state.set('showLoading', action.flag);
    case LOADING_INDICATION_TEXT:
      return state.set('loadingText', action.data);

    default:
      return state;
  }
}

export default rangingScenarioTrackerPageReducer;
