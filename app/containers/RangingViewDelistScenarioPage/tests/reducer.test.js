
import { fromJS } from 'immutable';
import rangingViewDelistScenarioPageReducer from '../reducer';

describe('rangingViewDelistScenarioPageReducer', () => {
  it('returns the initial state', () => {
    expect(rangingViewDelistScenarioPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
