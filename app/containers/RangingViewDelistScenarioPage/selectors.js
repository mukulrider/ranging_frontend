import { createSelector } from 'reselect';

/**
 * Direct selector to the rangingViewDelistScenarioPage state domain
 */
const selectRangingViewDelistScenarioPageDomain = () => (state) => state.get('rangingViewDelistScenarioPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RangingViewDelistScenarioPage
 */

const makeSelectRangingViewDelistScenarioPage = () => createSelector(
  selectRangingViewDelistScenarioPageDomain(),
  (substate) => substate.toJS()
);

const makeUrlParamsString = () => createSelector(
  selectRangingViewDelistScenarioPageDomain(),
  (substate) => substate.toJS()
);


export default makeSelectRangingViewDelistScenarioPage;
export {
  selectRangingViewDelistScenarioPageDomain,
};
