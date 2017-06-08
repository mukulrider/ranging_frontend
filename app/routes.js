// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars
  const namespace = '';
  return [

    {
      path: namespace + '/userinput',
      name: 'userInputPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/UserInputPage/reducer'),
          import('containers/UserInputPage/sagas'),
          import('containers/UserInputPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('userInputPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging/npd',
      name: 'rangingNpdPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RangingNpdPage/reducer'),
          import('containers/RangingNpdPage/sagas'),
          import('containers/RangingNpdPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rangingNpdPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging/npd-impact',
      name: 'rangingNpdImpactPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RangingNpdImpactPage/reducer'),
          import('containers/RangingNpdImpactPage/sagas'),
          import('containers/RangingNpdImpactPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rangingNpdImpactPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging/delist',
      name: 'delistContainer',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/DelistContainer/reducer'),
          import('containers/DelistContainer/sagas'),
          import('containers/DelistContainer'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('delistContainer', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging',
      name: 'rangingHomePage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RangingHomePage/reducer'),
          import('containers/RangingHomePage/sagas'),
          import('containers/RangingHomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rangingHomePage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging/negotiation',
      name: 'rangingNegotiationPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RangingNegotiationPage/reducer'),
          import('containers/RangingNegotiationPage/sagas'),
          import('containers/RangingNegotiationPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rangingNegotiationPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging/scenario-tracker',
      name: 'rangingScenarioTrackerPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/RangingScenarioTrackerPage/reducer'),
        import('containers/RangingScenarioTrackerPage/sagas'),
        import('containers/RangingScenarioTrackerPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rangingScenarioTrackerPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging/view-scenario',
      name: 'rangingViewScenarioPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/RangingViewScenarioPage/reducer'),
        import('containers/RangingViewScenarioPage/sagas'),
        import('containers/RangingViewScenarioPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rangingViewScenarioPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/ranging/view-delist-scenario',
      name: 'rangingViewDelistScenarioPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/RangingViewDelistScenarioPage/reducer'),
          import('containers/RangingViewDelistScenarioPage/sagas'),
          import('containers/RangingViewDelistScenarioPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('rangingViewDelistScenarioPage', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },


  ];
}
