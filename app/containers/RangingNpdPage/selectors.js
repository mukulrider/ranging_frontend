import { createSelector } from 'reselect';

/**
 * Direct selector to the rangingNpdPage state domain
 */
const selectRangingNpdPageDomain = () => (state) => state.get('rangingNpdPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RangingNpdPage
 */

const makeSelectRangingNpdPage = () => createSelector(
  selectRangingNpdPageDomain(),
  (substate) => substate.toJS()
);
const makeUrlParamsString = () => createSelector(
  selectRangingNpdPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRangingNpdPage;
export {
  selectRangingNpdPageDomain,
  makeUrlParamsString
};
