
import { fromJS } from 'immutable';
import rangingScenarioTrackerPageReducer from '../reducer';

describe('rangingScenarioTrackerPageReducer', () => {
  it('returns the initial state', () => {
    expect(rangingScenarioTrackerPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
