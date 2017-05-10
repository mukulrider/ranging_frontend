/*
 *
 * RangingViewDelistScenarioPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,WATERFALL_VALUE_SUCCESS, URL_PARAMETERS
} from './constants';

const initialState = fromJS({});

function rangingViewDelistScenarioPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;

      case WATERFALL_VALUE_SUCCESS:
      console.log("2.Updated the state in Reducer", action.data);
      return state.set('data', action.data);

      case URL_PARAMETERS:
      console.log("urlparameters", action.data);
      return state.set('urlparameters', action.data);

    default:
      return state;
  }
}

export default rangingViewDelistScenarioPageReducer;
