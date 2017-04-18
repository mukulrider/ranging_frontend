
import { fromJS } from 'immutable';
import pricingForecastScenarioReducer from '../reducer';

describe('pricingForecastScenarioReducer', () => {
  it('returns the initial state', () => {
    expect(pricingForecastScenarioReducer(undefined, {})).toEqual(fromJS({}));
  });
});
