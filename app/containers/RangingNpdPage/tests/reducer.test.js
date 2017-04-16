
import { fromJS } from 'immutable';
import rangingNpdPageReducer from '../reducer';

describe('rangingNpdPageReducer', () => {
  it('returns the initial state', () => {
    expect(rangingNpdPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
