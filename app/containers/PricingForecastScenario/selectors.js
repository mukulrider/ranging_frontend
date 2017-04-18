import { createSelector } from 'reselect';

/**
 * Direct selector to the pricingForecastScenario state domain
 */
const selectPricingForecastScenarioDomain = () => (state) => state.get('pricingForecastScenario');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PricingForecastScenario
 */

const makeSelectPricingForecastScenario = () => createSelector(
  selectPricingForecastScenarioDomain(),
  (substate) => substate.toJS()
);

const makeSelectPricingForecastScenarioEventId = () => createSelector(
  selectPricingForecastScenarioDomain(),
  (pricingForecastState) => pricingForecastState.get('eventId')
);

const makeSelectPricingForecastScenarioScenarioId = () => createSelector(
  selectPricingForecastScenarioDomain(),
  (pricingForecastState) => pricingForecastState.get('scenarioId')
);

const makeSelectPricingForecastEventIdDetails = () => createSelector(
  selectPricingForecastScenarioDomain(),
  (pricingForecastState) => pricingForecastState.get('eventIdDetails')
);


const makeSelectPricingForecastScenarioData = () => createSelector(
  selectPricingForecastScenarioDomain(),
  (pricingForecastState) => pricingForecastState.get('scenarioData')
);

export default makeSelectPricingForecastScenario;
export {
  selectPricingForecastScenarioDomain,
  makeSelectPricingForecastScenarioScenarioId,
  makeSelectPricingForecastScenarioEventId,
  makeSelectPricingForecastEventIdDetails
};
