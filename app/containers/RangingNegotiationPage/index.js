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
import RadioButton from 'components/radio_button';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import styles from './style.scss';
import SelectorNegotiation2 from 'components/SelectorNegotiation2';
import {browserHistory} from 'react-router';
import InputField from 'components/input_field';
import {Nav} from 'react-bootstrap';
import {NavItem, Pagination} from 'react-bootstrap';

import {
  SaveBubbleParam2,
  generateSideFilter,
  SavePFilterParam,
  SaveStoreParam,
  SaveWeekParam,
  SaveBubbleParam,
  SaveSideFilterParam,
  SavePageParam,
  generateTextBoxQueryString,
  ResetClickParam,
  generateUrlParams,
  generateUrlParamsString,
  fetchGraph,
  generateTable,
  generateCheckedList,
  RadioChecked
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

  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      supplierImpactInfo: false,
      salesImpactVolumeInfo: false,
      profitImpactInfo: false,
      profitImpactCtsInfo: false,
      spplierImpactTableInfo: false,
      delistImpactTableInfo: false,
      activeKey: "1",
      activeKey2: "4",
      activePage: 1,
    };
  }

  componentDidUpdate = () => {
    //this.props.onURLRequest(this.props.location.query);
  };


  inputUpdate = (checked, base_product_number) => {
    console.log('inputupdate', base_product_number);
    this.props.onGenerateCheckedList(checked, base_product_number)
  };

  tableProductUpdate = (checked,base_product_number) => {
    console.log("printing the product selected",base_product_number);
    let deselectBub = [];
    let deselectBubFlag=0;

    //This will be used to change the opacity in bubble chart
    let tableArrray = this.props.RangingNegotiationPage.prodArrayOpacity;
    tableArrray = JSON.parse(tableArrray);

    for (let i = 0; i < tableArrray.length; i++) {
      if (tableArrray[i] !== base_product_number) {
        deselectBub.push(tableArrray[i]);
      }
      else {
        deselectBubFlag = 1;
      }
    }

    if (deselectBubFlag === 0) {
      deselectBub.push(base_product_number);
    }

    let tableJSON = JSON.stringify(deselectBub);
    this.props.onSaveBubbleParam2(tableJSON);
    this.props.onGenerateCheckedList(checked, base_product_number)
  };
  render() {
    let dataFilterUrlParams = this.props.RangingNegotiationPage.urlParamsString;
    let dataPerformanceUrlParams = this.props.RangingNegotiationPage.dataPerformanceUrlParams;
    let dataStoreUrlParams = this.props.RangingNegotiationPage.dataStoreUrlParams;
    let dataWeekUrlParams = this.props.RangingNegotiationPage.dataWeekUrlParams;
    //Formatting sales value in the table
    let formatSales = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000)
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
      }

      else {
        return ('£ ' + Math.round(i));
      }
    }

    //Formatting volume in the table
    let formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000)
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(i));
      }


    }

    return (
      <div>
        <div className="pageTitle" style={{width:'78%',float:'right'}}>Negotiation Opportunity</div>
        <div className="">
          <div style={{height: '100%',
            position: 'fixed',
            width:'20%',
            /* padding-right: 5px; */
            overflowX: 'hidden',
            overflowY: 'scroll'}}>
            {/*<Panel>*/}

            {(() => {
              if (this.props.RangingNegotiationPage.sideFilter) {
                return (
                  <SelectorNegotiation2 sideFilter={this.props.RangingNegotiationPage.sideFilter}
                                        onGenerateTable={this.props.onGenerateTable}
                                        onFetchGraph={this.props.onFetchGraph}
                                        onGenerateUrlParams={this.props.onGenerateUrlParams}
                                        onURLRequest={this.props.onURLRequest}
                                        onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                        location={this.props.location}
                                        onGenerateUrlParamsData={this.props.onGenerateSideFilter}
                  />

                )
              } else {
                return (<div>Loading</div>)
              }
            })()}
            {/*</Panel>*/}
          </div>
          {/*Defining the area for the content on right to the filters */}
          {/*<div className="wrapper">*/}

          {/*</div>*/}

          <div  style={{width:'78%',
            marginLeft:'22%'}}>


            <div className="row">
              <div className="col-md-12 content-wrap">

                <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect} className="tabsCustom">
                  <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                    this.setState({activeKey: "1"});
                    {/*let text = "WEEK : Last 13 weeks";*/
                    }
                    {/*this.updateText(text);*/
                    }
                    dataWeekUrlParams = "time_period=Last 13 weeks"
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}><span className="tab_label">Last 13 Weeks</span></NavItem>


                  <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                    this.setState({activeKey: "2"});

                    dataWeekUrlParams = "time_period=Last 26 weeks"
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}><span className="tab_label">Last 26 Weeks</span></NavItem>


                  <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                    this.setState({activeKey: "3"});
                    dataWeekUrlParams = "time_period=Last 52 weeks"
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}><span className="tab_label">Last 52 Weeks</span></NavItem>


                </Nav>

                <div style={{height:'0px',width:'100%'}}>&nbsp;</div>
                <Nav bsStyle="tabs" className="tabsCustom" activeKey={this.state.activeKey2}
                     onSelect={this.handleSelect}>
                  <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                    this.setState({activeKey2: "4"});
                    dataStoreUrlParams = "store_type=Main Estate"
                    this.props.onSaveStoreParam(dataStoreUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}><span className="tab_label">Main Estate</span></NavItem>
                  <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                    this.setState({activeKey2: "5"});
                    dataStoreUrlParams = "store_type=Express"
                    this.props.onSaveStoreParam(dataStoreUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                    // browserHistory.push(this.props.location.pathname + "?store_type=Express")
                  }}><span className="tab_label">Express</span></NavItem>


                </Nav>

                {/*<Panel>*/}

                <div className="row">
                  <div className="col-xs-7 col-md-7" style={{marginTop: '2%',width:'800px',overflow:'scroll'}}>

                    <BubbleChart2 data={this.props.RangingNegotiationPage.chartData}

                                  //Passing array which updates table
                                  selectedBubbleTable={this.props.RangingNegotiationPage.prodArrayTable}
                                  //Passing array which updates opacity
                                  selectedBubbleOpacity={this.props.RangingNegotiationPage.prodArrayOpacity}

                                  //Ajax calls to save prodArrayTable in state
                                  onSaveBubbleParam={this.props.onSaveBubbleParam}

                                  //Ajax calls to save prodArrayOpacity in state
                                  onSaveBubbleParam2={this.props.onSaveBubbleParam2}

                                  //To update graph and table
                                   onFetchGraph={this.props.onFetchGraph}
                                  onGenerateTable={this.props.onGenerateTable}
                    />

                    <i style={{fontSize: '12px'}}>*Size of the bubble corresponds to Rate of Sales</i>

                    <div className="resetButton" onClick={() => {
                      dataPerformanceUrlParams = '';
                      this.props.onSavePageParam("page=1");
                      this.props.onSavePFilterParam(dataPerformanceUrlParams);
                      this.props.onFetchGraph();
                      this.props.onGenerateTable();
                      this.props.onRadioChecked('6');
                    }}><p>View Selections</p></div>
                  </div>

                  <div className="col-xs-2 col-md-2 col-lg-3" style={{marginTop: '2%', fontSize: '14px'}}>

                    <h4>
                      Please select a negotiation strategy below to filter
                      'Negotiation
                      Opportunity' chart and table
                    </h4>

                    <div className="panel">
                      <div className="lowProfit" style={{height: '35px', backgroundColor: '#c74a52', opacity: '0.8'}}>
                        <RadioButton id={'1'}
                                     checked={(() => {
                                       if (this.props.RangingNegotiationPage.radioChecked === '1') {
                                         return true
                                       }
                                       else {
                                         return false
                                       }
                                     })()}
                                     label={'Low CPS/Low Profit'}
                                     valid={true}
                                     onChange={() => {
                                       dataPerformanceUrlParams = "performance_quartile=Low CPS/Low Profit";
                                       this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                       this.props.onFetchGraph();
                                       this.props.onGenerateTable();
                                       this.props.onRadioChecked('1');
                                     }}
                                     name="x"
                        />
                      </div>
                      <div className="panel-body" style={{marginTop: '2%'}}>
                        Delist Products
                      </div>
                    </div>
                    <div className="panel panel-default">
                      <div className="default"
                           style={{height: '35px', backgroundColor: '#6e6767', opacity: '0.8', fontColor: 'white'}}>
                        <RadioButton id={'2'}
                                     checked={(() => {
                                       if (this.props.RangingNegotiationPage.radioChecked == '2') {
                                         return true
                                       }
                                       else {
                                         return false
                                       }
                                     })()}

                                     label={'Low CPS/High Profit'}
                                     valid={true}
                                     onChange={() => {
                                       dataPerformanceUrlParams = "performance_quartile=Low CPS/High Profit";
                                       this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                       this.props.onFetchGraph();
                                       this.props.onGenerateTable();
                                       this.props.onRadioChecked('2');

                                     }}
                                     name="x"
                        />
                      </div>
                      <div className="panel-body" style={{height: '65px', marginTop: '3%'}}>
                        Hard
                        Bargaining’
                        for stronger
                        profits – Low importance to customers
                      </div>
                    </div>

                    <div className="panel panel-warning">
                      <div className="medProfit"
                           style={{height: '35px', backgroundColor: '#ffa626', opacity: '0.8', fontColor: 'white'}}>
                        <RadioButton id={'3'}
                                     label={'Med CPS/Med Profit'}
                                     valid={true}
                                     checked={(() => {
                                       if (this.props.RangingNegotiationPage.radioChecked == '3') {
                                         return true
                                       }
                                       else {
                                         return false
                                       }
                                     })()}
                                     onChange={() => {
                                       dataPerformanceUrlParams = "performance_quartile=Med CPS/Med Profit";
                                       this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                       this.props.onFetchGraph();
                                       this.props.onGenerateTable();
                                       this.props.onRadioChecked('3');

                                     }}
                                     name="x"
                        />
                      </div>
                      <div className="panel-body" style={{height: '60px', marginTop: '3%'}}>Area of
                        opportunity. Concession
                        trading – Subs/Ranging/Price. Reduce range to drive
                        volume
                      </div>
                    </div>

                    <div className="panel panel-success">
                      <div className="highProfit"
                           style={{height: '35px', backgroundColor: '#69b24a', opacity: '0.8', fontColor: 'white'}}>
                        <RadioButton id={'4'}
                                     label={'High CPS/High Profit'}
                                     valid={true}
                                     checked={(() => {
                                       if (this.props.RangingNegotiationPage.radioChecked == '4') {
                                         return true
                                       }
                                       else {
                                         return false
                                       }
                                     })()}
                                     onChange={() => {
                                       dataPerformanceUrlParams = "performance_quartile=High CPS/High Profit"
                                       this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                       this.props.onFetchGraph();
                                       this.props.onGenerateTable();
                                       this.props.onRadioChecked('4');

                                     }}
                                     name="x"
                        />
                      </div>
                      <div className="panel-body" style={{height: '50px', marginTop: '3%'}}>Build
                        Win-Win
                        relationship with
                        supplier to share further profit gains
                      </div>
                    </div>
                    <div className="panel">
                      <div className="highCps" style={{height: '35px', backgroundColor: '#99d9e5'}}>
                        <RadioButton id={'5'}
                                     label={'High CPS/Low Profit'}
                                     valid={true}
                                     checked={(() => {
                                       if (this.props.RangingNegotiationPage.radioChecked == '5') {
                                         return true
                                       }
                                       else {
                                         return false
                                       }
                                     })()}
                                     onChange={() => {
                                       dataPerformanceUrlParams = "performance_quartile=High CPS/Low Profit"
                                       this.props.onSavePFilterParam(dataPerformanceUrlParams);
                                       this.props.onFetchGraph();
                                       this.props.onGenerateTable();
                                       this.props.onRadioChecked('5');

                                     }}
                                     name="x"
                        />
                      </div>
                      <div className="panel-body" style={{marginTop: '5%'}}>Work
                        collaboratively to jointly
                        solve low profitability
                      </div>
                    </div>

                  </div>
                </div>
                {/*</Panel>*/}


                <Panel>
                  <div>
                    <div className="col-xs-12 col-xs-5" style={{marginBottom: "10px", marginLeft: "-14px"}}>

                      <InputField type={'string'}
                                  placeholder="Search for Product Description ..."
                                  dataPageUrlParams="page=1"
                                  value={this.props.textBoxQueryString}
                                  onChange={(e) => {
                                    this.props.onGenerateTextBoxQueryString(e);
                                    this.props.onGenerateTable();
                                    this.props.onSavePageParam(dataPageUrlParams);
                                  }}
                      />
                    </div>

                    <table className="table table-hover table-bordered" width="100%">

                      <thead style={{fontWeight: '700', fontSize: '12px', textAlign: 'center'}}>
                      <tr className="table-header-format">
                        <th style={{textAlign: 'center'}}>Select</th>
                        <th style={{textAlign: 'center'}}>Store Type</th>
                        <th style={{textAlign: 'center'}}>Base Product Number</th>
                        <th style={{textAlign: 'center'}}>Product Description</th>
                        <th style={{textAlign: 'center'}}>CPS</th>
                        <th style={{textAlign: 'center'}}>PPS</th>
                        <th style={{textAlign: 'center'}}>#Substitute Prod.</th>
                        <th style={{textAlign: 'center'}}>Value</th>
                        <th style={{textAlign: 'center'}}>Volume</th>
                        <th style={{textAlign: 'center'}}>Rate of Sale</th>
                        <th style={{textAlign: 'center'}}>Store Count</th>
                        <th style={{textAlign: 'center'}}>ASP</th>
                      </tr>
                      </thead>
                      <tbody className="table-body-format">

                      {(() => {

                        if (this.props.RangingNegotiationPage.data) {
                          return this.props.RangingNegotiationPage.data.table.map(obj => {
                            return (
                              <tr key={Math.random() + Date.now()}>
                                {/**/}
                                <td style={{textAlign: "center"}}>
                                  <Checkbox isDisabled={false} id={Math.random() + Date.now()}
                                            onChange={(e) => {
                                              this.inputUpdate(e.target.checked, obj.base_product_number)
                                              this.tableProductUpdate(e.target.checked,obj.base_product_number);

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
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.store_type}</td>
                                <td
                                  style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.base_product_number}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.long_description}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.cps}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{formatSales(obj.pps)}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.subs_count}</td>
                                <td style={{
                                  textAlign: 'center',
                                  verticalAlign: 'center'
                                }}>{formatSales(obj.sales_value)}</td>
                                <td style={{
                                  textAlign: 'center',
                                  verticalAlign: 'center'
                                }}>{formatVolume(obj.sales_volume)}</td>
                                <td style={{
                                  textAlign: 'center',
                                  verticalAlign: 'center'
                                }}>{formatSales(obj.rate_of_sale)}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.store_count}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>£ {obj.rsp}</td>
                              </tr>
                            )
                          })
                        }

                      })()}

                      </tbody>
                    </table>

                    {/*pagination*/}

                    {(() => {
                      if (this.props.RangingNegotiationPage.data && this.props.RangingNegotiationPage.data.count) {

                        return <Pagination
                          prev
                          next
                          first
                          last
                          ellipsis
                          boundaryLinks
                          items={this.props.RangingNegotiationPage.data.pagination_count}
                          maxButtons={5}
                          activePage={this.state.activePage}
                          onSelect={(e) => {

                            this.setState({activePage: e})

                            let dataPageUrlParams = "page=" + e;
                            {/*console.log("dataPageUrlParams",dataPageUrlParams)*/
                            }
                            this.props.onSavePageParam(dataPageUrlParams);
                            this.props.onGenerateTable();

                          }}
                        />

                      }
                    })()}

                    <div className="delistButton">
                      <Button buttonType={'primary'}
                              onClick={() => {

                                let objString = '/ranging/delist?'


                                this.props.RangingNegotiationPage.checkedList.map(obj => {
                                  if (obj.checked) {
                                    objString += 'long_description=' + obj.productId + '&'
                                  }
                                })
                                {/*objString.substring(0, objString.length - 1);*/
                                }
                                objString = objString.slice(0, objString.length - 1);
                                {/*console.log(objString);*/
                                }
                                window.location = objString;
                              }}>SEND TO DE-LIST</Button>
                    </div>
                  </div>

                </Panel>
              </div>
            </div>
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
    onSaveBubbleParam2: (e) => dispatch(SaveBubbleParam2(e)),
    onSavePageParam: (e) => dispatch(SavePageParam(e)),
    onRadioChecked: (e) => dispatch(RadioChecked(e)),
    onSaveSideFilterParam: (e) => dispatch(SaveSideFilterParam(e)),
    onGenerateTextBoxQueryString: (e) => dispatch(generateTextBoxQueryString(e.target.value)),
    onResetClickParam: (e) => dispatch(ResetClickParam(e)),
    onGenerateCheckedList: (a, b) => dispatch(generateCheckedList(a, b)),


  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNegotiationPage);
