
import { fromJS } from 'immutable';
import rangingNpdImpactPageReducer from '../reducer';

describe('rangingNpdImpactPageReducer', () => {
  it('returns the initial state', () => {
    expect(rangingNpdImpactPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
