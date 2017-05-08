
import { fromJS } from 'immutable';
import rangingViewScenarioPageReducer from '../reducer';

describe('rangingViewScenarioPageReducer', () => {
  it('returns the initial state', () => {
    expect(rangingViewScenarioPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
