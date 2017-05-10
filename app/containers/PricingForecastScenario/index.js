/*
 *
 * PricingForecastScenario
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectPricingForecastScenario from './selectors';
import MultiLineChart2 from 'components/MultiLineChart2';
import Panel from 'components/panel';
import Button from 'components/button';
import Spinner from 'components/spinner';
import MultilineOrdinalChart from 'components/MultilineOrdinalChart';
import Label from 'components/label';
import * as d3 from 'd3';
import styles from './style.scss';
import messages from './messages';
import {
  FetchForecastScenarioData,
  updateEventId,
  updateScenarioId,
  fetchForecastEventData,
  updateScenarioData,
  generatePriceGravityChart
} from './actions';
import {Modal, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';

// todo: add tabs

export class PricingForecastScenario extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    console.log('componentDidMount andfd printing whole data from reducer');
    if (this.props.params.eventId && this.props.params.scenarioId) {
      this.props.onUpdateEventId(this.props.params.eventId);
      this.props.onUpdateScenarioId(this.props.params.scenarioId);

      this.props.onFetchForecastEventData(this.props.params.eventId.split('-').pop());
      this.props.onFetchForecastScenarioData();
      this.props.onUpdateScenarioData();
      this.props.onGeneratePriceGravityChart();
    }

  };

  constructor(props) {
    super(props);
    this.state = {smShow: false, lgShow: false, lgCannibalizedProductsShow: false, activeKey: '1'};
  }

  aggData = (allProductList) => {
    let arr = [];
    const uniqueProductList = [...new Set(allProductList.map(item => item.productClientId))];
    uniqueProductList.map(uniqueProduct => {
      let temp_obj = {};
      allProductList.map(product => {
        if (uniqueProduct == product.productClientId) {
          temp_obj.productClientId = product.productClientId;

          temp_obj.productName = product.productName;

          temp_obj.baselineProfit = temp_obj.baselineProfit ?
            temp_obj.baselineProfit + product.baselineProfit : product.baselineProfit;

          temp_obj.profit = temp_obj.profit ?
            temp_obj.profit + product.profit : product.profit;

          temp_obj.baselineUnitSales = temp_obj.baselineUnitSales ?
            temp_obj.baselineUnitSales + product.baselineUnitSales : product.baselineUnitSales;

          temp_obj.unitSales = temp_obj.unitSales ?
            temp_obj.unitSales + product.unitSales : product.unitSales;

          temp_obj.baselineCashSales = temp_obj.baselineCashSales ?
            temp_obj.baselineCashSales + product.baselineCashSales : product.baselineCashSales;

          temp_obj.cashSales = temp_obj.cashSales ?
            temp_obj.cashSales + product.cashSales : product.cashSales
        }
      });
      arr.push(temp_obj)
    });
    return arr
  };

  render() {

    const aggregatedProductList = this.aggData(this.props.PricingForecastScenario.chartData.forecasts.items);
    const forecastItems = this.props.PricingForecastScenario.chartData.forecasts.items;
    const forecastSummary = this.props.PricingForecastScenario.chartData.forecastSummary;
    const forecastSummary_sales = (forecastSummary.unitSales - forecastSummary.baselineUnitSales) / forecastSummary.unitSales;
    const forecastSummary_volume = (forecastSummary.cashSales - forecastSummary.baselineCashSales) / forecastSummary.cashSales;
    const forecastSummary_profit = (forecastSummary.profit - forecastSummary.baselineProfit) / forecastSummary.profit;
    const forecastSummary_margin = (forecastSummary.margin - forecastSummary.baselineMargin) / forecastSummary.margin;

    for (let i = 0; i < forecastItems.length; i++) {
      forecastItems[i].Margin = forecastItems[i].profit / forecastItems[i].cashSales;
      forecastItems[i].baselineMargin = forecastItems[i].baselineProfit / forecastItems[i].baselineCashSales;
    }


    let chartDataFormat = (metric_name, baseline_metric_name) => {
      // let metric_name='profit';
      // let baseline_metric_name='baselineProfit';
      // console.log('-------------------forecastItems', forecastItems);
      let metric = d3.nest()
        .key(function (d) {
          return d.date;
        })
        .rollup(function (v) {
          return d3.sum(v, function (d) {
            return d[metric_name];
          });
        })
        .entries(forecastItems);
      let baseLineMetric = d3.nest()
        .key(function (d) {
          return d.date;
        })
        .rollup(function (v) {
          return d3.sum(v, function (d) {
            return d[baseline_metric_name];
          });
        })
        .entries(forecastItems);
      let i;

      for (i = 0; i < metric.length; i++) {
        metric[i].Date = metric[i]['key'];
        metric[i].Type = metric_name;
        delete metric[i].key;
      }
      for (i = 0; i < baseLineMetric.length; i++) {
        baseLineMetric[i].Date = baseLineMetric[i]['key'];
        baseLineMetric[i].Type = baseline_metric_name;
        delete baseLineMetric[i].key;
      }

      let combinedMetric = metric.concat(baseLineMetric);


      // console.log(JSON.stringify(combined));

      let parseDate = d3.timeParse("%Y-%m-%dT%H:%M:%S");

      combinedMetric.forEach(function (d) {
        d.Date = parseDate(d.Date);

      });
      return combinedMetric;
    };

    console.log(aggregatedProductList);
    if (this.props.params.scenarioId) {
      return (
        <div style={{fontSize: '14px'}}>
          <div className="row" style={{textAlign: 'center'}}>
            <h1>Output from Pricestrat</h1>
          </div>
          <hr/>
          <Modal show={this.state.lgShow} bsSize="small" aria-labelledby="contained-modal-title-sm">
            <Modal.Body>
              <div>
                <table className="table" style={{fontWeight: '700', textAlign: 'center'}}>
                  <thead>
                  <tr>
                    <td>Product Id</td>
                    <td>Zone Id</td>
                    <td>Violation Date</td>
                    <td>Constraint</td>
                  </tr>
                  </thead>
                  <tbody>
                  {(() => {
                    if (this.props.PricingForecastScenario.chartData.violations.items) {
                      return this.props.PricingForecastScenario.chartData.violations.items.map(obj => {
                        return <tr>
                          <td>{obj.productClientId}</td>
                          <td>{obj.zoneClientId}</td>
                          <td>{obj.violationDate}</td>
                          <td>{obj.constraintType}</td>
                        </tr>
                      })
                    }
                  })()}

                  </tbody>
                </table>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.setState({lgShow: false})
                }}
                style={{display: 'block', margin: '0 auto'}}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={this.state.lgCannibalizedProductsShow}
                 bsSize="large"
                 aria-labelledby="contained-modal-title-sm">
            <Modal.Body>
              {(() => {
                return (
                  <div>
                    <table className="table">
                      <thead style={{fontWeight: '700', textAlign: 'center'}}>
                      <tr>
                        <td>Product Id</td>
                        <td>Product Name</td>
                        <td>Base Profit</td>
                        <td>Scenario Profit</td>
                        <td>Base Unit Sales</td>
                        <td>Scenario Unit Sales</td>
                        <td>Base Cash Sales</td>
                        <td>Scenario Cash Sales</td>
                      </tr>
                      </thead>
                      <tbody>
                      {aggregatedProductList.map(aggregatedProduct => {
                        if (this.props.PricingForecastScenario.scenarioData) {
                          let changedProductList = JSON.parse(this.props.PricingForecastScenario.scenarioData.changed_products);
                          return changedProductList.map(changedProduct => {
                            if (changedProduct.productId != aggregatedProduct.productClientId
                              && aggregatedProduct.profit < aggregatedProduct.baselineProfit) {
                              return (
                                <tr>
                                  <td>{aggregatedProduct.productClientId}</td>
                                  <td>{aggregatedProduct.productName}</td>
                                  <td>{'£ ' + (aggregatedProduct.baselineProfit / 1000).toFixed(3) + 'K'}</td>
                                  <td>{'£ ' + (aggregatedProduct.profit / 1000).toFixed(3) + 'K'}</td>
                                  <td>{(aggregatedProduct.baselineUnitSales / 1000) + 'K'}</td>
                                  <td>{(aggregatedProduct.unitSales / 1000) + 'K'}</td>
                                  <td>{'£ ' + (aggregatedProduct.baselineCashSales / 1000).toFixed(3) + 'K'}</td>
                                  <td>{'£ ' + (aggregatedProduct.cashSales / 1000).toFixed(3) + 'K'}</td>
                                </tr>
                              )
                            }
                          })
                        }
                      })}
                      </tbody>
                    </table>
                  </div>
                )
              })()}
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.setState({lgCannibalizedProductsShow: false})
                }}
                style={{display: 'block', margin: '0 auto'}}>Close</Button>
            </Modal.Footer>
          </Modal>

          {/*<Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}>*/}
            {/*<NavItem eventKey="1" href="/home">NavItem 1 content</NavItem>*/}
            {/*<NavItem eventKey="2" title="Item">NavItem 2 content</NavItem>*/}
            {/*<NavItem eventKey="3" disabled>NavItem 3 content</NavItem>*/}
            {/*<NavDropdown eventKey="4" title="Dropdown" id="nav-dropdown">*/}
              {/*<MenuItem eventKey="4.1">Action</MenuItem>*/}
              {/*<MenuItem eventKey="4.2">Another action</MenuItem>*/}
              {/*<MenuItem eventKey="4.3">Something else here</MenuItem>*/}
              {/*<MenuItem divider />*/}
              {/*<MenuItem eventKey="4.4">Separated link</MenuItem>*/}
            {/*</NavDropdown>*/}
          {/*</Nav>*/}

          <div className="row">
            <div className="col-xs-3" style={{textAlign: 'center'}}>
              <a href={this.props.PricingForecastScenario.scenarioData ?
                `${this.props.PricingForecastScenario.scenarioData.scenario_category_id}-${this.props.PricingForecastScenario.scenarioData.id}` : ''}>
                <Button buttonType={'primary'}>Category Level</Button></a>
            </div>
            <div className="col-xs-3" style={{textAlign: 'center'}}>
              <a href={this.props.PricingForecastScenario.scenarioData ?
                `${this.props.PricingForecastScenario.scenarioData.scenario_buyer_id}-${this.props.PricingForecastScenario.scenarioData.id}` : ''}>
                <Button buttonType={'primary'}>Buyer Level</Button></a>
            </div>
            <div className="col-xs-3" style={{textAlign: 'center'}}>
              <a href={this.props.PricingForecastScenario.scenarioData ?
                `${this.props.PricingForecastScenario.scenarioData.scenario_buying_controller_id}-${this.props.PricingForecastScenario.scenarioData.id}` : ''}>
                <Button buttonType={'primary'}>Buying Controller Level</Button>
              </a>
            </div>
            <div className="col-xs-3" style={{textAlign: 'center'}}>
              <Button buttonType={'primary'} onClick={() => this.setState({lgCannibalizedProductsShow: true})}>
                Cannibalized Products
              </Button>
            </div>
          </div>


          <div className="row">
            <div className="col-xs-12">
              <h2 style={{textAlign: 'center'}}>Overview</h2>
              <div className="row">

                {/*Sales*/}
                {(() => {
                  if (this.props.PricingForecastScenario.chartData) {
                    return (

                      <div className="col-xs-3 overview-blk ">
                        <Panel>
                          <h4 className="overview-blk-heading" style={{textAlign: 'center'}}>SALES</h4>

                          {(() => {
                            if ((forecastSummary.unitSales - forecastSummary.baselineUnitSales) < 0) {
                              return <span className="glyphicon glyphicon-triangle-bottom"> </span>
                            } else {
                              return <span className="glyphicon glyphicon-triangle-top"> </span>
                            }
                          })()}
                          <span
                            className="overview-blk-value">{(Math.round(forecastSummary_sales * 100000) / 100).toFixed(1)}%</span>
                        </Panel>
                      </div>


                    )

                  } else {
                    return (
                      <div>
                        <br/><br/>
                        <h1 style={{textAlign: 'center'}}>Loading <Spinner/></h1>
                      </div>
                    )
                  }
                })()}

                {/*Volume */}
                {(() => {
                  if (this.props.PricingForecastScenario.chartData) {
                    return (

                      <div className="col-xs-3 overview-blk">
                        <Panel>
                          <h4 className="overview-blk-heading" style={{textAlign: 'center'}}>VOLUME</h4>
                          {(() => {
                            if ((forecastSummary.cashSales - forecastSummary.baselineCashSales) < 0) {
                              return <span className="glyphicon glyphicon-triangle-bottom"> </span>
                            } else {
                              return <span className="glyphicon glyphicon-triangle-top"> </span>
                            }
                          })()}
                          <span
                            className="overview-blk-value">{(Math.round(forecastSummary_volume * 100000) / 100).toFixed(1)}%</span>
                        </Panel>
                      </div>

                    )

                  } else {
                    return (
                      <div>
                        <br/><br/>
                        <h1 style={{textAlign: 'center'}}>Loading <Spinner/></h1>
                      </div>
                    )
                  }
                })()}

                {/*Profit*/}
                {(() => {
                  if (this.props.PricingForecastScenario.chartData) {
                    return (

                      <div className="col-xs-3 overview-blk">
                        <Panel>
                          <h4 className="overview-blk-heading">PROFIT</h4>

                          {(() => {
                            if ((forecastSummary.profit - forecastSummary.baselineProfit) < 0) {
                              return <span className="glyphicon glyphicon-triangle-bottom"> </span>
                            } else {
                              return <span className="glyphicon glyphicon-triangle-top"> </span>
                            }
                          })()}
                          <span
                            className="overview-blk-value">{(Math.round(forecastSummary_profit * 100000) / 100).toFixed(1)}%</span>

                        </Panel>
                      </div>

                    )

                  } else {
                    return (
                      <div>
                        <br/><br/>
                        <h1 style={{textAlign: 'center'}}>Loading <Spinner/></h1>
                      </div>
                    )
                  }
                })()}

                {/*Margin*/}
                {(() => {
                  if (this.props.PricingForecastScenario.chartData) {
                    return (

                      <div className="col-xs-3 overview-blk">
                        <Panel>
                          <h4 className="overview-blk-heading" style={{textAlign: 'center'}}>MARGIN</h4>
                          {(() => {
                            if ((forecastSummary.margin - forecastSummary.baselineMargin) < 0) {
                              return <span className="glyphicon glyphicon-triangle-bottom"> </span>
                            } else {
                              return <span className="glyphicon glyphicon-triangle-top"> </span>
                            }
                          })()}
                          <span
                            className="overview-blk-value">{(Math.round(forecastSummary_margin * 100000) / 100).toFixed(1)}%</span>
                        </Panel>
                      </div>

                    )

                  } else {
                    return (
                      <div>
                        <br/><br/>
                        <h1 style={{textAlign: 'center'}}>Loading <Spinner/></h1>
                      </div>
                    )
                  }
                })()}
              </div>

            </div>
          </div>

          <Panel>
            <div className="row">
              <div className="col-xs-12">
                {(() => {
                  return (
                    <div>
                      <div className="row" style={{textAlign: 'right', marginRight: '50px'}}>
                        <Button buttonType={'primary'} onClick={() => this.setState({lgShow: true})}>Show
                          Violations</Button>
                      </div>
                      <table className="table">
                        <thead style={{fontWeight: '700', textAlign: 'center'}}>
                        <tr>
                          <td>Product Id</td>
                          <td>Product Name</td>
                          <td>Base Profit</td>
                          <td>Scenario Profit</td>
                          <td>Base Unit Sales</td>
                          <td>Scenario Unit Sales</td>
                          <td>Base Cash Sales</td>
                          <td>Scenario Cash Sales</td>
                        </tr>
                        </thead>
                        <tbody>
                        {aggregatedProductList.map(aggregatedProduct => {
                          if (this.props.PricingForecastScenario.scenarioData) {
                            let changedProductList = JSON.parse(this.props.PricingForecastScenario.scenarioData.changed_products);
                            return changedProductList.map(changedProduct => {
                              if (changedProduct.productId == aggregatedProduct.productClientId) {
                                return (
                                  <tr>
                                    <td>{aggregatedProduct.productClientId}</td>
                                    <td>{aggregatedProduct.productName}</td>
                                    <td>{'£ ' + (aggregatedProduct.baselineProfit / 1000).toFixed(0) + 'K'}</td>
                                    <td>{'£ ' + (aggregatedProduct.profit / 1000).toFixed(0) + 'K'}</td>
                                    <td>{(aggregatedProduct.baselineUnitSales / 1000) + 'K'}</td>
                                    <td>{(aggregatedProduct.unitSales / 1000) + 'K'}</td>
                                    <td>{'£ ' + (aggregatedProduct.baselineCashSales / 1000).toFixed(0) + 'K'}</td>
                                    <td>{'£ ' + (aggregatedProduct.cashSales / 1000).toFixed(0) + 'K'}</td>
                                  </tr>
                                )
                              }
                            })
                          }
                        })}
                        </tbody>
                      </table>
                    </div>
                  )
                })()}
              </div>
            </div>
          </Panel>

          {/*Graphs*/}


          {/*Heading */}
          <div className="col-xs-12 overview-blk">
            <h3 style={{textAlign: 'center'}}>Forecast Graph</h3>
          </div>

          {/*Sales and Volume*/}
          <div className="row">
            <div className="col-xs-6 test">

              <Panel>
                <h4 className="graph-heading text-center">VALUE</h4>
                <MultiLineChart2 data={[chartDataFormat('cashSales', 'baselineCashSales', '0'), "id2", '£ ', 'Value']}/>
              </Panel>
            </div>
            <div className="col-xs-6">
              <Panel>
                <h4 className="graph-heading text-center">VOLUME</h4>
                <MultiLineChart2
                  data={[chartDataFormat('unitSales', 'baselineUnitSales', '0'), "id3", '£ ', 'Volume']}/>
              </Panel>
            </div>

          </div>

          {/*Profit & margin*/}
          <div className="row">

            <div className="col-xs-6">
              <Panel >
                <h4 className="graph-heading text-center">PROFIT</h4>
                <MultiLineChart2 data={[chartDataFormat('profit', 'baselineProfit', '0'), "id1", '£ ', 'Profit']}/>
              </Panel>
            </div>

            <div className="col-xs-6">
              <Panel>
                <h4 className="graph-heading text-center">MARGIN %</h4>
                <MultiLineChart2 data={[chartDataFormat('margin', 'baselineMargin', '%'), "id4", ' ', 'Margin in %']}/>
              </Panel>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              {(() => {
                if (this.props.PricingForecastScenario.priceGravityChart) {
                  return (
                    <div>
                      {/*<MultilineOrdinalChart data={[*/}
                      {/*{chart_data: this.props.PricingForecastScenario.priceGravityChart.data},*/}
                      {/*{xaxis_col_name: 'price_gravity'},*/}
                      {/*{yaxis_col_name: 'sku_gravity'},*/}
                      {/*{series_col_name: 'id'},*/}
                      {/*{series_col_name: 'id'},*/}
                      {/*{xaxis_bands: this.props.PricingForecastScenario.priceGravityChart.axis_data},*/}
                      {/*{color_order: this.props.PricingForecastScenario.priceGravityChart.colors},*/}
                      {/*'id2',*/}
                      {/*'$'*/}
                      {/*]}/>*/}
                    </div>
                  )
                } else {
                  return (
                    <div>LOADING</div>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div style={{fontSize: '14px'}}>

        </div>
      )
    }

  }
}

PricingForecastScenario.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  PricingForecastScenario: makeSelectPricingForecastScenario(),
  // PricingForecastEventData: makeSelectPricingForecastEventData(),
  // forecastEventData: makeSelectPricingForecastEventData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchForecastScenarioData: () => dispatch(FetchForecastScenarioData()),
    onUpdateEventId: (e) => dispatch(updateEventId(e)),
    onUpdateScenarioId: (e) => dispatch(updateScenarioId(e)),
    onFetchForecastEventData: (e) => dispatch(fetchForecastEventData(e)),
    onUpdateScenarioData: (e) => dispatch(updateScenarioData(e)),
    onGeneratePriceGravityChart: (e) => dispatch(generatePriceGravityChart(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingForecastScenario);
