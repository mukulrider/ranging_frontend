
import { fromJS } from 'immutable';
import pricingScenarioOverviewPageReducer from '../reducer';

describe('pricingScenarioOverviewPageReducer', () => {
  it('returns the initial state', () => {
    expect(pricingScenarioOverviewPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
