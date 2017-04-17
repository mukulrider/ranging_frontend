/*
 *
 * RangingNegotiationPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingNegotiationPage from './selectors';
import Button from 'components/button';
import BubbleChart2 from 'components/BubbleChart2';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import styles from './style.scss';
import SelectorNegotiation2 from 'components/SelectorNegotiation2';
import {browserHistory} from 'react-router';
import InputField from 'components/input_field';

import {

  generateSideFilter,
  SavePFilterParam,
  SaveStoreParam,
  SaveWeekParam,
  SaveBubbleParam
  ,
  SaveSideFilterParam,
  SavePageParam,
  generateTextBoxQueryString,
  ResetClickParam,
  generateUrlParams,
  generateUrlParamsString,
  fetchGraph,
  generateTable,
  generateCheckedList
} from './actions';
import {
  urlDataSuccess, WeekClick
} from './actions';

export class RangingNegotiationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    //For sending and saving url params

    //FOR TABLE
    this.props.onURLRequest(this.props.location.query);

    this.props.onGenerateTable();

    // FOR GRAPH
    this.props.onFetchGraph();

    // FOR FILTER
    this.props.onGenerateSideFilter();
  };

  componentDidUpdate = () => {
    //this.props.onURLRequest(this.props.location.query);
  };

  updateText = (t) => {

    // document.getElementById('clickInfo').p=t.innerHTML;
    document.getElementById("clickInfo").innerHTML = t;
  };

  updateStore = (t) => {

    // document.getElementById('clickInfo').p=t.innerHTML;
    document.getElementById("storeInfo").innerHTML = t;
  };

  inputUpdate = (checked, base_product_number) => {
    console.log('inputupdate');
    this.props.onGenerateCheckedList(checked, base_product_number)
  };

  render() {
    // console.log("------- table data ------- ",this.props.RangingNegotiationPage.data);
    //For url parameters
    //let dataPageUrlParams=this.props.RangingNpdPage.dataPageUrlParams;
    //This will save the parameters for performance filters
    let dataFilterUrlParams = this.props.RangingNegotiationPage.urlParamsString;
    let dataPerformanceUrlParams = this.props.RangingNegotiationPage.dataPerformanceUrlParams;
    let dataStoreUrlParams = this.props.RangingNegotiationPage.dataStoreUrlParams;
    let dataWeekUrlParams = this.props.RangingNegotiationPage.dataWeekUrlParams;

    //Formatting the
    let formatSales = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000)
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
      }


      else {
        return ('£ ' + Math.round(i));
      }
    }

    let formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000)
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(i));
      }


    }

    return (

      <div className={{'fontSize': '14px'}}>
        <Helmet
          title="Compass - Negotiation View"
          meta={[
            {name: 'description', content: 'Description of RangingNegotiationPage'},
          ]}
        />

        <div className="row">
          <div className="col-xs-12 col-md-2">
            {(() => {
              if (this.props.RangingNegotiationPage.sideFilter) {
                return (
                  <SelectorNegotiation2 sideFilter={this.props.RangingNegotiationPage.sideFilter}
                                        onGenerateTable={this.props.onGenerateTable}
                                        onFetchGraph={this.props.onFetchGraph}
                                        onGenerateUrlParams={this.props.onGenerateUrlParams}
                                        onURLRequest={this.props.onURLRequest}

                    //checkboxData={this.props.PricingScenarioOverviewPage.sideFilter}
                                        onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                        location={this.props.location}
                                        onGenerateUrlParamsData={this.props.onGenerateSideFilter}
                  />

                )
              } else {
                return (<div>Loading</div>)
              }
            })()}

          </div>
          {/*Defining the area for the content on right to the filters */}
          {/*<div className="wrapper">*/}
          <p>
            <span id="clickInfo">WEEK : Last 13 Weeks</span>
            <span id="separator"> | </span>
            <span id="storeInfo">STORE : Main Estate</span>
          </p>
          {/*</div>*/}
          <div className="col-xs-12 col-md-10">
            <div className="row">
              <div className="col-xs-12">
                <div className="row week-row">
                  <div className="col-xs-12 col-md-8">
                    <div className="col-xs-12 col-md-3">
                      <Button onClick={() => {

                        let text = "WEEK : Last 13 weeks";
                        this.updateText(text);
                        dataWeekUrlParams = "time_period=Last 13 weeks"
                        this.props.onSaveWeekParam(dataWeekUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                        //browserHistory.push(this.props.location.pathname + "?time_period=Last 13 weeks")
                      }}>Last 13 Weeks</Button>
                    </div>
                    <div className="col-xs-12 col-md-3">
                      <Button onClick={() => {
                        let text = "WEEK : Last 26 weeks";
                        this.updateText(text);
                        dataWeekUrlParams = "time_period=Last 26 weeks"
                        this.props.onSaveWeekParam(dataWeekUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                        //browserHistory.push(this.props.location.pathname + "?time_period=Last 26 weeks")
                      }}>Last 26 Weeks</Button>
                    </div>
                    <div className="col-xs-12 col-md-2">
                      <Button onClick={() => {
                        let text = "WEEK : Last 52 weeks";
                        this.updateText(text);
                        dataWeekUrlParams = "time_period=Last 52 weeks"
                        this.props.onSaveWeekParam(dataWeekUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                        //browserHistory.push(this.props.location.pathname + "?time_period=Last 52 weeks")
                      }}>Last 52 Weeks</Button>
                    </div>
                  </div>
                  {/*<div className="col-xs-12 col-md-2"></div>*/}
                </div>

                <div className="row store-row">
                  <Button onClick={() => {
                    let storeType = "STORE : Main Estate";
                    this.updateStore(storeType);
                    dataStoreUrlParams = "store_type=Main Estate"
                    this.props.onSaveStoreParam(dataStoreUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}>Main Estate</Button>
                  <Button onClick={() => {
                    let storeType = "STORE : Express";
                    this.updateStore(storeType);
                    dataStoreUrlParams = "store_type=Express"
                    this.props.onSaveStoreParam(dataStoreUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                    // browserHistory.push(this.props.location.pathname + "?store_type=Express")
                  }}>Express</Button>
                </div>
                <Panel>

                  <div className="row ">
                    <h3 className="text-center ts-blk-proview-subhead">Negotiation Opportunity</h3>

                    <div className="resetButton" onClick={() => {
                      //let resetUrlParams = "reset_clicked";
                      //this.props.onResetClickParam(resetUrlParams);
                      //let dataPageUrlParams = '';
                      dataPerformanceUrlParams = '';
                      let dataBubbleUrlParams = '';
                      this.props.onSavePageParam("page=1");
                      this.props.onSavePFilterParam(dataPerformanceUrlParams);
                      this.props.onSaveBubbleParam(dataBubbleUrlParams);
                      this.props.onFetchGraph();
                      this.props.onGenerateTable();

                    }}><p><u>Reset Chart</u></p></div>
                    <i className="time">*Time Period | </i>
                  </div>

                  <div className="row">
                    <div className="col-xs-12 col-md-8">
                      <BubbleChart2 data={this.props.RangingNegotiationPage.chartData}
                                    path={this.props.location}
                                    onSaveBubbleParam={this.props.onSaveBubbleParam}
                                    onFetchGraph={this.props.onFetchGraph}
                                    onGenerateTable={this.props.onGenerateTable}
                      />
                      <i>*Size of the bubble corresponds to RoS</i>
                    </div>

                    <div className="col-xs-12 col-md-4">
                      <h4>
                        Please select a negotiation strategy below to filter
                        'Negotiation
                        Opportunity' chart and table
                      </h4>

                      <div className="panel panel-danger" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";
                        this.props.onSavePFilterParam(dataPerformanceUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                      }}>
                        <div className="panel-heading">
                          <h5 className="panel-title">Low CPS/Low Profit</h5>
                        </div>
                        <div className="panel-body">
                          Delist Products
                        </div>
                      </div>


                      <div className="panel panel-default" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=Low CPS/High Profit";
                        //  browserHistory.push(this.props.location.pathname + "?performance_quartile=Low CPS/High Profit");
                        this.props.onSavePFilterParam(dataPerformanceUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                      }}>
                        <div className="panel-heading">
                          <h5 className="panel-title">Low CPS/High Profit</h5>
                        </div>
                        <div className="panel-body">
                          Hard
                          Bargaining’
                          for stronger
                          profits – Low importance to customers
                        </div>
                      </div>
                      <div className="panel panel-warning" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=Med CPS/Med Profit"
                        // browserHistory.push(this.props.location.pathname + "?performance_quartile=Med CPS/Med Profit");
                        this.props.onSavePFilterParam(dataPerformanceUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                      }}>
                        <div className="panel-heading">
                          <h5 className="panel-title">Med CPS/Med Profit</h5>
                        </div>
                        <div className="panel-body">Area of
                          opportunity. Concession
                          trading – Subs/Ranging/Price. Reduce range to drive
                          volume
                        </div>
                      </div>

                      <div className="panel panel-success" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=High CPS/High Profit"
                        //  browserHistory.push(this.props.location.pathname + "?performance_quartile=High CPS/High Profit");
                        this.props.onSavePFilterParam(dataPerformanceUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();

                      }}>
                        <div className="panel-heading">
                          <h5 className="panel-title">High CPS/High Profit</h5>
                        </div>
                        <div className="panel-body">Build
                          Win-Win
                          relationship with
                          supplier to share further profit gains
                        </div>
                      </div>
                      <div className="panel panel-info" onClick={() => {
                        dataPerformanceUrlParams = "performance_quartile=High CPS/Low Profit"

                        // browserHistory.push(this.props.location.pathname + "?performance_quartile=High CPS/Low Profit");
                        this.props.onSavePFilterParam(dataPerformanceUrlParams);
                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                      }}>
                        <div className="panel-heading">
                          <h5 className="panel-title">High CPS/Low Profit</h5>
                        </div>
                        <div className="panel-body">Work
                          collaboratively to jointly
                          solve low profitability
                        </div>
                      </div>

                    </div>
                  </div>
                </Panel>
              </div>
            </div>


            <Panel>
              <div>
                <div className="col-xs-12 col-xs-3" style={{marginBottom: '14px'}}>

                  <InputField type={'string'}
                              placeholder="Search for Product Description ..."
                              value={this.props.textBoxQueryString}
                              onChange={(e) => {
                                this.props.onGenerateTextBoxQueryString(e);
                                this.props.onGenerateTable();
                              }}
                  />
                </div>
                <div>
                  <Button buttonType={'primary'}
                          onClick={() => {
                            console.log('done')
                            {/*document.cookie = 'saved=' + JSON.stringify(this.props.RangingNegotiationPage.checkedList)*/
                            }
                            {/*document.cookie = "username=John Doe";*/
                            }
                            //x.substring(0, x.length - 1);
                            let objString = '/ranging/delist?'


                            this.props.RangingNegotiationPage.checkedList.map(obj => {
                              if (obj.checked){
                              objString += 'long_description=' + obj.productId + '&'
                              }
                            })
                            objString.substring(0, objString.length - 1);


                            window.location = objString;
                          }}>SAVE</Button>
                </div>
                <table className="table table-hover table-bordered table-striped ">

                  <thead style={{fontWeight: '700', fontSize: '12px', textAlign: 'center'}}>

                  <th>Select</th>
                  <th>Store Type</th>
                  <th>Base Product Number</th>
                  <th>Product Description</th>
                  <th>CPS</th>
                  <th>PPS</th>
                  <th>#Substitute Prod.</th>
                  <th>Value</th>
                  <th>Volume</th>
                  <th>Rate of Sale</th>
                  <th>Store Count</th>
                  <th>ASP</th>

                  </thead>
                  <tbody >

                  {(() => {

                    if (this.props.RangingNegotiationPage.data) {


                      {/*console.log("----------------------------------------------------------");*/
                      }
                      {/*console.log("----table data----",this.props.RangingNegotiationPage.data.table);*/
                      }
                      {/*console.log('done');*/
                      }
                      return this.props.RangingNegotiationPage.data.table.map(obj => {
                        return (
                          <tr key={Math.random() + Date.now()}>
                            {/**/}
                            <td style={{textAlign: "center"}}>
                              <Checkbox isDisabled={false} id={Math.random() + Date.now()}
                                        onChange={(e) => {
                                          console.log('checked');
                                          this.inputUpdate(e.target.checked, obj.base_product_number)
                                        }}
                                        checked={(() => {
                                          let checked = false;
                                          let base_product_number = obj.base_product_number.toString();
                                          this.props.RangingNegotiationPage.checkedList.map(obj2 => {
                                            if (obj2.checked) {
                                              if (obj2.productId == base_product_number) {
                                                checked = true
                                              }
                                            }
                                          });
                                          return checked
                                        })()}
                                        valid={true}/>
                            </td>
                            <td>{obj.store_type}</td>
                            <td style={{textAlign: "right"}}>{obj.base_product_number}</td>
                            <td style={{textAlign: "left"}}>{obj.long_description}</td>
                            <td style={{textAlign: "right"}}>{obj.cps}</td>
                            <td style={{textAlign: "right"}}>{formatSales(obj.pps)}</td>
                            <td style={{textAlign: "right"}}>{obj.subs_count}</td>
                            <td style={{textAlign: "right"}}>{formatSales(obj.sales_value)}</td>
                            <td style={{textAlign: "right"}}>{formatVolume(obj.sales_volume)}</td>
                            <td style={{textAlign: "right"}}>{formatSales(obj.rate_of_sale)}</td>
                            <td style={{textAlign: "right"}}>{obj.store_count}</td>
                            <td style={{textAlign: "right"}}>£ {obj.rsp}</td>
                          </tr>
                        )
                      })
                    }

                  })()}

                  </tbody>
                </table>

                {/*pagination*/}
                <nav aria-label="Page navigation example">
                  <ul className="pagination pagination-lg">
                    {(() => {

                      if (this.props.RangingNegotiationPage.data && this.props.RangingNegotiationPage.data.count) {
                        let x = [];
                        let start_index = this.props.RangingNegotiationPage.data.start_index;
                        let page = this.props.RangingNegotiationPage.data.page;
                        let end_index = this.props.RangingNegotiationPage.data.end_index;
                        let pagination_count = this.props.RangingNegotiationPage.data.pagination_count;

                        if (page > 5) {
                          page = page - 5
                        } else {
                          page = 1
                        }

                        if (pagination_count > 10) {
                          pagination_count = page + 10
                        }

                        for (let i = page;
                             i <= pagination_count;
                             i++) {

                          x.push(i)
                        }

                        return x.map(obj => {
                          return (
                            <li className="page-item"
                                onClick={() => {
                                  let dataPageUrlParams = "page=" + obj;
                                  this.props.onSavePageParam(dataPageUrlParams);
                                  this.props.onGenerateTable();

                                }}><a className="page-link" href="#">{obj}
                            </a></li>
                          )
                        })
                      }
                    })()}
                  </ul>
                </nav>
              </div>

            </Panel>
          </div>
        </div>

      </div>

    );
  }
}

RangingNegotiationPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};


const mapStateToProps = createStructuredSelector({
  RangingNegotiationPage: makeSelectRangingNegotiationPage()
});

function mapDispatchToProps(dispatch) {
  return {
    onURLRequest: (e) => dispatch(urlDataSuccess(e)),
    onWeekClick: (e) => dispatch(WeekClick(e)),
    onGenerateTable: (e) => dispatch(generateTable(e)),
    onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
    onFetchGraph: (e) => dispatch(fetchGraph(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),
    onSavePFilterParam: (e) => dispatch(SavePFilterParam(e)),
    onSaveStoreParam: (e) => dispatch(SaveStoreParam(e)),
    onSaveWeekParam: (e) => dispatch(SaveWeekParam(e)),
    onSaveBubbleParam: (e) => dispatch(SaveBubbleParam(e)),
    onSavePageParam: (e) => dispatch(SavePageParam(e)),
    onSaveSideFilterParam: (e) => dispatch(SaveSideFilterParam(e)),
    onGenerateTextBoxQueryString: (e) => dispatch(generateTextBoxQueryString(e.target.value)),
    onResetClickParam: (e) => dispatch(ResetClickParam(e)),
    onGenerateCheckedList: (a, b) => dispatch(generateCheckedList(a, b)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNegotiationPage);
