import { createSelector } from 'reselect';

/**
 * Direct selector to the pricingScenarioOverviewPage state domain
 */
const selectPricingScenarioOverviewPageDomain = () => (state) => state.get('pricingScenarioOverviewPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PricingScenarioOverviewPage
 */

const makeSelectPricingScenarioOverviewPage = () => createSelector(
  selectPricingScenarioOverviewPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPricingScenarioOverviewPage;
export {
  selectPricingScenarioOverviewPageDomain,
};
