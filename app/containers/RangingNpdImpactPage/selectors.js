import { createSelector } from 'reselect';

/**
 * Direct selector to the rangingNpdImpactPage state domain
 */
const selectRangingNpdImpactPageDomain = () => (state) => state.get('rangingNpdImpactPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RangingNpdImpactPage
 */

const makeSelectRangingNpdImpactPage = () => createSelector(
  selectRangingNpdImpactPageDomain(),
  (substate) => substate.toJS()
);

const makeUrlParamsString = () => createSelector(
  selectRangingNpdImpactPageDomain(),
  (substate) => substate.toJS()
);


export default makeSelectRangingNpdImpactPage;
export {
  selectRangingNpdImpactPageDomain,
};
