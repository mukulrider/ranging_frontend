/*
 *
 * PricingScenarioOverviewPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import makeSelectPricingScenarioOverviewPage from './selectors';
import {overviewFetch, checkboxChange, urlParamsData, generateUrlParamsString, generateUrlParamsData} from './actions';
import Spinner from 'components/spinner';
import Checkbox from 'components/checkbox';
import NewSelector from 'components/NewSelector';
import BubbleChart from 'components/BubbleChart';
// import SelectorContainer from 'containers/SelectorContainer';
import {browserHistory} from 'react-router';

export class PricingScenarioOverviewPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    console.log('componentDidMount');
    this.props.onOverviewFetch();
    this.updateNewState();
    console.log('----------', this.props.PricingScenarioOverviewPage)
  };

  updateNewState = () => {
    let data = this.props.PricingScenarioOverviewPage.data, hierarchyList = [], selectedList = [];
    data.map(obj => {
      Object.keys(this.props.location.query).map(queryKey => {
        if (obj.names == queryKey) {
          // console.log(queryKey);
          obj.items.map(item => {
            if (item.endsWith(this.props.location.query[queryKey])) {
              // console.log(item);
              selectedList.push(item);
              item = item.split('__');
              item.pop();
              item = item.join('__');
              hierarchyList.push(item);
            }
          })
        }
      })
    });
    this.props.onUrlParamsData({
      x: 6,
      query: this.props.location.query,
      hierarchyList: hierarchyList,
      selectedList: selectedList
    })
  };

  componentDidUpdate = () => {
    console.log('PricingScenarioOverviewPage componentDidUpdate', this.props.location);
  };

  // constructor(props) {
  //   super(props);
  //   console.log('constructor');
  //   console.log(this.props.location);
  // }

  // updateUrl = (category) => {
  //   let newUrl = this.props.location.pathname;
  //   let x = '';
  //   // let queryParams = this.props.location.query;
  //   // console.log(this.refs.selector);
  //   [...this.refs.selector.querySelectorAll('input')].map(obj => {
  //     if (obj.checked == true) {
  //       x = x + `${category}=${obj.name.split('__').pop()}&`;
  //     }
  //   });
  //   const queryString = x.substring(0, x.length - 1);
  //   browserHistory.push(newUrl + '?' + queryString)
  // };

  render() {
    console.log('rerendering');
    return (
      <div style={{fontSize: '14px'}}>
        <NewSelector urlData={this.props.PricingScenarioOverviewPage.urlData}
                     sideFilter={this.props.PricingScenarioOverviewPage.data}
                     location={this.props.location}
                     onUrlParamsData={this.props.onUrlParamsData}
                     onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                     onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}/>
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
    onUrlParamsData: (e) => dispatch(urlParamsData(e)),
    onCheckboxChange: (e) => dispatch(checkboxChange()),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateUrlParamsData(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingScenarioOverviewPage);
