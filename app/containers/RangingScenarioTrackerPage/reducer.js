/*
 *
 * RangingScenarioTrackerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,ALL_SCENARIO_TABLE_SUCCESS,TAB_CHANGE,DELETE_SCENARIO
} from './constants';

const initialState = fromJS({scenarioName:'',selectedTab:'npd',deletedScenario:''});

function rangingScenarioTrackerPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
  case ALL_SCENARIO_TABLE_SUCCESS:
    return state.set('allScenarioList', action.data);
  case TAB_CHANGE:
    return state.set('selectedTab', action.data);
 case DELETE_SCENARIO:
    return state.set('deletedScenario', action.data);

    default:
      return state;
  }
}

export default rangingScenarioTrackerPageReducer;
