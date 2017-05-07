import { createSelector } from 'reselect';

/**
 * Direct selector to the rangingScenarioTrackerPage state domain
 */
const selectRangingScenarioTrackerPageDomain = () => (state) => state.get('rangingScenarioTrackerPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RangingScenarioTrackerPage
 */

const makeSelectRangingScenarioTrackerPage = () => createSelector(
  selectRangingScenarioTrackerPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectRangingScenarioTrackerPage;
export {
  selectRangingScenarioTrackerPageDomain,
};
