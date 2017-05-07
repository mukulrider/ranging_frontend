import { createSelector } from 'reselect';

/**
 * Direct selector to the rangingViewScenarioPage state domain
 */
const selectRangingViewScenarioPageDomain = () => (state) => state.get('rangingViewScenarioPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RangingViewScenarioPage
 */

const makeSelectRangingViewScenarioPage = () => createSelector(
  selectRangingViewScenarioPageDomain(),
  (substate) => substate.toJS()
);


const makeUrlParamsString = () => createSelector(
  selectRangingViewScenarioPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRangingViewScenarioPage;
export {
  selectRangingViewScenarioPageDomain,
};
