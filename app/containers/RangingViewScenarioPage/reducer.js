/*
 *
 * RangingViewScenarioPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,SCENARIO_DATA_FETCH_SUCCESS,SEND_URL_PARAMS
} from './constants';

const initialState = fromJS({
  scenarioName:'testScenario',
  eventName:'testEvent',
  asp:1.00,
  acp:2.00,
  size:500,
});

function rangingViewScenarioPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SCENARIO_DATA_FETCH_SUCCESS:
      // let data=action.data.user_attributes[0];
      // data=data.replace(/'/g, '"');
      // data=JSON.parse(data);
      return state.set('scenarioData', action.data);
    case SEND_URL_PARAMS:
      // console.log("2.Updated the state in Reducer", action.data);
      return state.set('dataUrlParms', action.data);
    default:
      return state;
  }
}

export default rangingViewScenarioPageReducer;
