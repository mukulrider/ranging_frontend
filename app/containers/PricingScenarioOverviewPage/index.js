/*
 *
 * PricingScenarioOverviewPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import makeSelectPricingScenarioOverviewPage from './selectors';
import {
  overviewFetch, checkboxChange, urlParamsData,
  generateUrlParamsString, generateUrlParamsData, generateUrlParamsData2
} from './actions';
import Spinner from 'components/spinner';
import Checkbox from 'components/checkbox';
// import NewSelector from 'components/NewSelector';
import NewSelector2 from 'components/NewSelector2';
import BubbleChart from 'components/BubbleChart';
// import SelectorContainer from 'containers/SelectorContainer';
import {browserHistory} from 'react-router';
import {defaultAction} from './actions';

export class PricingScenarioOverviewPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    console.log('componentDidMount');
    this.props.onOverviewFetch();
    this.props.onGenerateUrlParamsData2();
    // this.updateNewState();
    console.log('----------', this.props.PricingScenarioOverviewPage)
  };

  // updateNewState = () => {
  //   let data = this.props.PricingScenarioOverviewPage.data, hierarchyList = [], selectedList = [];
  //   data.map(obj => {
  //     Object.keys(this.props.location.query).map(queryKey => {
  //       if (obj.names == queryKey) {
  //         // console.log(queryKey);
  //         obj.items.map(item => {
  //           if (item.endsWith(this.props.location.query[queryKey])) {
  //             // console.log(item);
  //             selectedList.push(item);
  //             item = item.split('__');
  //             item.pop();
  //             item = item.join('__');
  //             hierarchyList.push(item);
  //           }
  //         })
  //       }
  //     })
  //   });
  //   this.props.onUrlParamsData({
  //     x: 6,
  //     query: this.props.location.query,
  //     hierarchyList: hierarchyList,
  //     selectedList: selectedList
  //   })
  // };

  componentDidUpdate = () => {
    console.log('PricingScenarioOverviewPage componentDidUpdate', this.props.location);
  };

  render() {
    console.log('rerendering');
    return (
      <div style={{fontSize: '14px'}}>
        {/*<BubbleChart idx="asd1234" data="asdf" defaultAction={this.props.onDefaultAction}/>*/}
        {(()=>{
          if (this.props.PricingScenarioOverviewPage.urlParamsData2) {
            return (
              <NewSelector2 sideFilter={this.props.PricingScenarioOverviewPage.urlParamsData2}
                            onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                            location={this.props.location}
                            onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}
              />
            )
          }else{
            return (
              <div>LOADING</div>
            )
          }
        })()}
        {/*<NewSelector urlData={this.props.PricingScenarioOverviewPage.urlData}*/}
        {/*sideFilter={this.props.PricingScenarioOverviewPage.data}*/}
        {/*location={this.props.location}*/}
        {/*onUrlParamsData={this.props.onUrlParamsData}*/}
        {/*onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}*/}
        {/*onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}/>*/}
      </div>
    );
  }
}

PricingScenarioOverviewPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  PricingScenarioOverviewPage: makeSelectPricingScenarioOverviewPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onOverviewFetch: (e) => dispatch(overviewFetch()),
    onDefaultAction: (e) => dispatch(defaultAction(e)),
    onUrlParamsData: (e) => dispatch(urlParamsData(e)),
    onCheckboxChange: (e) => dispatch(checkboxChange()),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateUrlParamsData(e)),
    onGenerateUrlParamsData2: (e) => dispatch(generateUrlParamsData2(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingScenarioOverviewPage);
