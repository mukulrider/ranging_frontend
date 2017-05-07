/*
 *
 * RangingScenarioTrackerPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,ALL_SCENARIO_TABLE_SUCCESS,
} from './constants';

const initialState = fromJS({scenarioName:''});

function rangingScenarioTrackerPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
  case ALL_SCENARIO_TABLE_SUCCESS:
    return state.set('allScenarioList', action.data);
    default:
      return state;
  }
}

export default rangingScenarioTrackerPageReducer;
