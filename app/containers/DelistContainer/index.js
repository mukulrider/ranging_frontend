/*
 *
 * DelistContainer
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectDelistContainer from './selectors';
import messages from './messages';
import Button from 'components/button';
import BarChart2 from 'components/BarChart2';
import WaterFallChart2 from 'components/WaterFallChart2';
import Spinner from 'components/spinner';
import InputField from 'components/input_field';

import {
  makeSideFilter, makeUrlParams, makeUrlParamsString,
} from './selectors';


import NewSelector2 from 'components/NewSelector2';

import {browserHistory} from 'react-router';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import {Modal} from 'react-bootstrap';
import {
  apiFetch,
  dataUrlParams,
  WeekClick,
  StoreClick,
  TableDataFetch,
  SubstitutesClick,
  SubstitutesClickSendLongDesc,
  SupplierImpactTableClick,
  generateSideFilter,
  generateUrlParams,
  generateTable,
  generateUrlParamsString,
  WaterfallValueChart,
  WaterfallValueChartSuccess,
  ajaxClick,
  checkboxChange, urlParamsData, generateUrlParamsData,
  ApplyClick,
  supplierPagination,
  delistPagination,
  tableType,
  supplierPopupPagination,
  delistPopupPagination,
  delistTable,
  GenerateTextBoxQueryString,
  GenerateTextBoxQueryStringDelist,
  WeekTabClick,
  StoreTabClick,
} from './actions';

import styles from './style.scss';

export class DelistContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.onDataUrlParams(this.props.location.query);
    this.props.onGenerateUrlParamsString();
    this.props.onWaterfallValueChart();
    this.props.onApiFetch();
    this.props.ondelistTable();
    this.props.onGenerateSideFilter();
  };

  componentDidUpdate = () => {
    this.props.onDataUrlParams(this.props.location.query);
  };

  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      supplierImpactInfo: false,
      profitImpactInfo: false,
      spplierImpactTableInfo: false,
      delistImpactTableInfo: false
    };
  }

  render() {

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

      <div className="row" style={{fontSize: '14px'}}>
        <div className="col-xs-2">
          <Panel>
            {/*<SelectorDelist sideFilter={this.props.DelistContainer.sideFilter}*/}
            {/*location={this.props.location}*/}
            {/*onGenerateTable={this.props.onGenerateTable}*/}
            {/*onGenerateUrlParams={this.props.onGenerateUrlParams}*/}
            {/*onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}/>*/}

            {console.log("this.props.DelistContainer.sideFilter", this.props.DelistContainer.sideFilter)}

            {(() => {
              if (this.props.DelistContainer.sideFilter) {
                return (
                  <NewSelector2 sideFilter={this.props.DelistContainer.sideFilter}
                                location={this.props.location}
                                onApplyClick={this.props.onApplyClick}
                                onWaterfall={this.props.onWaterfallValueChart}
                                onApiFetch={this.props.onApiFetch}
                                ondelist={this.props.ondelistTable}
                                onDataUrlParams={this.props.DataUrlParams}
                                onUrlParamsData={this.props.onUrlParamsData}
                                onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}/>
                )
              } else {
                return (
                  <div>LOADING</div>
                )
              }
            })()}
          </Panel>
        </div>
        {  console.log("hiii", this.props) }
        <div className="col-xs-10">
          <div className="row">
            <div className="nav-tabs-customm">
              <ul className="nav nav-tabs  nav-justified">
                <li><a href="#" onClick={() => {
                  let week_no = "time_period=13_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 13 weeks ");
                }}>WEEK 13</a></li>
                <li><a href="#" onClick={() => {
                  let week_no = "time_period=26_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 26 weeks ");
                }}>Week 26</a></li>
                <li><a href="#" onClick={() => {
                  let week_no = "time_period=52_weeks";
                  this.props.onWeekClick(week_no);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onWeekTabClick("Week: 52 weeks ");
                }}>Week 52</a></li>
              </ul>
            </div>

            <div className="nav-tabs-customm">
              <ul className="nav nav-tabs  nav-justified">
                <li><a href="#" onClick={() => {
                  let store_type = "store_type=Overview";
                  this.props.onStoreClick(store_type);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onStoreTabClick("Store: Overview ");
                }}>Overview</a></li>
                <li><a href="#"  onClick={() => {
                  let store_type = "store_type=Main Estate";
                  this.props.onStoreClick(store_type);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onStoreTabClick("Store: Main Estate ");
                }}>Main Estate</a></li>
                <li><a href="#" onClick={() => {
                  let store_type = "store_type=Express";
                  this.props.onStoreClick(store_type);
                  this.props.onWaterfallValueChart();
                  this.props.onApiFetch();
                  this.props.ondelistTable();
                  this.props.onStoreTabClick("Store: Express");
                }}>Express</a></li>
              </ul>
            </div>

            {/*<Button onClick={() => {*/}
              {/*let week_no = "time_period=13_weeks";*/}
              {/*this.props.onWeekClick(week_no);*/}
              {/*this.props.onWaterfallValueChart();*/}
              {/*this.props.onApiFetch();*/}
              {/*this.props.ondelistTable();*/}
              {/*this.props.onWeekTabClick("Week: 13 weeks ");*/}
            {/*}}>WEEK 13</Button>&nbsp;&nbsp;*/}
            {/*<Button onClick={() => {*/}
              {/*let week_no = "time_period=26_weeks";*/}
              {/*this.props.onWeekClick(week_no);*/}
              {/*this.props.onWaterfallValueChart();*/}
              {/*this.props.onApiFetch();*/}
              {/*this.props.ondelistTable();*/}
              {/*this.props.onWeekTabClick("Week: 26 weeks ");*/}
            {/*}}>Week 26</Button>&nbsp;&nbsp;*/}
            {/*<Button onClick={() => {*/}
              {/*let week_no = "time_period=52_weeks";*/}
              {/*this.props.onWeekClick(week_no);*/}
              {/*this.props.onWaterfallValueChart();*/}
              {/*this.props.onApiFetch();*/}
              {/*this.props.ondelistTable();*/}
              {/*this.props.onWeekTabClick("Week: 52 weeks ");*/}
            {/*}}>Week 52</Button>*/}
          </div>
          <br></br>
          {/*<div className="row">*/}
            {/*<Button onClick={() => {*/}
              {/*let store_type = "store_type=Overview";*/}
              {/*this.props.onStoreClick(store_type);*/}
              {/*this.props.onWaterfallValueChart();*/}
              {/*this.props.onApiFetch();*/}
              {/*this.props.ondelistTable();*/}
              {/*this.props.onStoreTabClick("Store: Overview ");*/}
            {/*}}>Overview</Button>&nbsp;&nbsp;*/}
            {/*<Button onClick={() => {*/}
              {/*let store_type = "store_type=Main Estate";*/}
              {/*this.props.onStoreClick(store_type);*/}
              {/*this.props.onWaterfallValueChart();*/}
              {/*this.props.onApiFetch();*/}
              {/*this.props.ondelistTable();*/}
              {/*this.props.onStoreTabClick("Store: Main Estate ");*/}
            {/*}}>Main Estate</Button>&nbsp;&nbsp;*/}
            {/*<Button onClick={() => {*/}
              {/*let store_type = "store_type=Express";*/}
              {/*this.props.onStoreClick(store_type);*/}
              {/*this.props.onWaterfallValueChart();*/}
              {/*this.props.onApiFetch();*/}
              {/*this.props.ondelistTable();*/}
              {/*this.props.onStoreTabClick("Store: Express");*/}
            {/*}}>Express</Button>*/}
          {/*</div>*/}
          <div className="row">
            <p>
              <span>&nbsp;{this.props.DelistContainer.weekBreadcrumb}</span>
              <span>&nbsp;{this.props.DelistContainer.storeBreadcrumb}</span>
            </p>
          </div>
          <h1 className="ts-blk-proview-subhead ts-blk-proview" style={{fontSize: '32px', verticalAlign: 'middle'}}><b
            style={{verticalAlign: 'middle'}}>SALES IMPACT</b> <span
            className="glyphicon glyphicon-info-sign pull-right" style={{right: '4px', fontSize: '28px', top: '4px'}}
            onClick={() => {
              this.setState({supplierImpactInfo: true});
            }}></span></h1>

          {/*MODAL FOR SUPPLIER IMPACT INFO ICON */}

          <Modal show={this.state.supplierImpactInfo} bsSize="sm"
                 aria-labelledby="contained-modal-title-sm"
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm">
                <div style={{textAlign: 'right'}}><b>{this.props.DelistContainer.supplierPopupTableData} <span
                  onClick={() => this.setState({supplierImpactInfo: false})}><b>X</b></span></b></div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>


            </Modal.Body>
          </Modal>

          {(() => {
            if (this.props.DelistContainer.waterfallValue && this.props.DelistContainer.waterfallValue.sales_chart && this.props.DelistContainer.waterfallValue.vols_chart) {
              return (
                <div className="row">

                  <div className="col-xs-6">
                    <Panel>
                      <h2 className="ts-blk-proview-subhead ts-blk-proview"
                          style={{fontSize: '28px', verticalAlign: 'middle', top: '-22px', position:'relative'}}><b
                        style={{verticalAlign: 'middle'}}>Value</b></h2>
                      <div className="row">
                        <div className="col-xs-7">
                          <WaterFallChart2 id="waterfallChart_1" yAxisName="Value" formatter="formatSales"
                                           positive_text='positive' negative_text='negative' total_text='total'
                                           data={ this.props.DelistContainer.waterfallValue.sales_chart }/>

                        </div>
                        <div className="col-xs-5">
                          <Panel>
                            {/*<div style={{textAlign: 'center', color: '#00539f', fontWeight: 'bold', fontSize: '16px'}}>*/}
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Buying
                              Controller
                              <br></br>
                              <div style={{fontWeight: 'bold', fontSize: '16px', left: '9px'}}
                                   className={(() => {
                                     if (this.props.DelistContainer.waterfallValue.bc_sales_contri > 0) {
                                       return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                     }
                                     else if (this.props.DelistContainer.waterfallValue.bc_sales_contri < 0) {
                                       return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                     } else {
                                       return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                     }
                                   })()}>
                                {this.props.DelistContainer.waterfallValue.bc_sales_contri}
                              </div>
                            </div>
                          </Panel>

                          <Panel>
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Product
                              Sub-group
                            </div>
                            <div style={{
                              textAlign: 'center',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              left: '93px'
                            }}
                                 className={(() => {
                                   if (this.props.DelistContainer.waterfallValue.psg_sales_contri > 0) {
                                     return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                   }
                                   else if (this.props.DelistContainer.waterfallValue.psg_sales_contri < 0) {
                                     return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                   } else {
                                     return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                   }
                                 })()}>
                              {this.props.DelistContainer.waterfallValue.psg_sales_contri}
                            </div>
                          </Panel>
                        </div>
                      </div>

                    </Panel>
                  </div>
                  <div className="col-xs-6">
                    <Panel>
                      <h2 className="ts-blk-proview-subhead ts-blk-proview"
                          style={{fontSize: '28px', verticalAlign: 'middle', position:'relative'}}><b style={{verticalAlign: 'middle'}}>Volume</b>
                      </h2>
                      <div className="row">
                        <div className="col-xs-7">
                          <WaterFallChart2 id="waterfallChart_2" yAxisName="Volume" formatter="formatSales"
                                           positive_text='positive' negative_text='negative' total_text='total'
                                           data={ this.props.DelistContainer.waterfallValue.vols_chart }/>
                        </div>
                        <div className="col-xs-5">
                          <Panel>
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Buying
                              Controller
                            </div>
                            <div style={{
                              textAlign: 'center',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              left: '93px'
                            }}
                                 className={(() => {
                                   if (this.props.DelistContainer.waterfallValue.bc_vols_contri > 0) {
                                     return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                   }
                                   else if (this.props.DelistContainer.waterfallValue.bc_vols_contri < 0) {
                                     return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                   } else {
                                     return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                   }
                                 })()}>
                              {this.props.DelistContainer.waterfallValue.bc_vols_contri}
                            </div>
                          </Panel>

                          <Panel>
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Product
                              Sub-group
                            </div>
                            <div style={{
                              textAlign: 'center',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              left: '93px'
                            }}
                                 className={(() => {
                                   if (this.props.DelistContainer.waterfallValue.psg_vols_contri > 0) {
                                     return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                   }
                                   else if (this.props.DelistContainer.waterfallValue.psg_vols_contri < 0) {
                                     return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                   } else {
                                     return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                   }
                                 })()}>
                              {this.props.DelistContainer.waterfallValue.psg_vols_contri}
                            </div>
                          </Panel>
                        </div>
                      </div>
                    </Panel>
                  </div>
                </div>
              )
            } else {
              let abcd = 1;
              return (
                <div>
                  <h2 className="text-center"><Spinner />Please Wait a Moment....!</h2>
                </div>
              )
            }
          })()}
          <h1 className="ts-blk-proview-subhead ts-blk-proview" style={{fontSize: '32px', verticalAlign: 'middle'}}><b
            style={{verticalAlign: 'middle'}}>PROFIT IMPACT</b> <span
            className="glyphicon glyphicon-info-sign pull-right" style={{right: '4px', fontSize: '28px', top: '4px'}}
            onClick={() => {
              this.setState({profitImpactInfo: true});
            }}></span></h1>


          {/*MODAL FOR PROFIT IMPACT INFO ICON */}

          <Modal show={this.state.profitImpactInfo} bsSize="small"
                 aria-labelledby="contained-modal-title-sm">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm">
                <div style={{textAlign: 'center'}}><b>{this.props.DelistContainer.supplierPopupTableData}
                  <div style={{textAlign: 'right'}}><span
                    onClick={() => this.setState({profitImpactInfo: false})}><b>X</b></span></div>
                </b></div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>


            </Modal.Body>
          </Modal>


          {(() => {
            if (this.props.DelistContainer.waterfallValue && this.props.DelistContainer.waterfallValue.cgm_chart && this.props.DelistContainer.waterfallValue.cts_chart) {
              return (
                <div className="row">
                  <div className="col-xs-6">
                    <Panel>
                      <h2 className="ts-blk-proview-subhead ts-blk-proview"
                          style={{fontSize: '28px', verticalAlign: 'middle'}}><b style={{verticalAlign: 'middle'}}>PROFIT</b>
                      </h2>
                      <div className="row">
                        <div className="col-xs-7">
                          <WaterFallChart2 id="waterfallChart_3" yAxisName="Profit" formatter="formatSales"
                                           positive_text='positive' negative_text='negative' total_text='total'
                                           data={ this.props.DelistContainer.waterfallValue.cgm_chart }/>
                        </div>
                        <div className="col-xs-5">
                          <Panel>
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Buying
                              Controller
                            </div>
                            <div style={{
                              textAlign: 'center',
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              left: '93px'
                            }}
                                 className={(() => {
                                   if (this.props.DelistContainer.waterfallValue.bc_cgm_contri > 0) {
                                     return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                   }
                                   else if (this.props.DelistContainer.waterfallValue.bc_cgm_contri < 0) {
                                     return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                   } else {
                                     return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                   }
                                 })()}>
                              {this.props.DelistContainer.waterfallValue.bc_cgm_contri}
                            </div>
                          </Panel>
                          <Panel>
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Product
                              Sub-group
                            </div>
                            <div style={{
                              textAlign: 'center',
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              left: '93px'
                            }}
                                 className={(() => {
                                   if (this.props.DelistContainer.waterfallValue.psg_cgm_contri > 0) {
                                     return "glyphicon glyphicon-chevron-up"
                                   }
                                   else if (this.props.DelistContainer.waterfallValue.psg_cgm_contri < 0) {
                                     return "glyphicon glyphicon-chevron-down"
                                   } else {
                                     return "glyphicon glyphicon-minus-sign"
                                   }
                                 })()}>
                              {this.props.DelistContainer.waterfallValue.psg_cgm_contri}
                            </div>
                          </Panel>
                        </div>
                      </div>
                    </Panel>
                  </div>
                  <div className="col-xs-6">
                    <Panel>
                      <h2 className="ts-blk-proview-subhead ts-blk-proview"
                          style={{fontSize: '28px', verticalAlign: 'middle'}}><b
                        style={{verticalAlign: 'middle'}}>CTS</b></h2>
                      <div className="row">
                        <div className="col-xs-7">
                          <WaterFallChart2 id="waterfallChart_4" yAxisName="CTS" formatter="formatSales"
                                           positive_text='negative' negative_text='positive' total_text='total1'
                                           data={ this.props.DelistContainer.waterfallValue.cts_chart }/>
                        </div>
                        <div className="col-xs-5">
                          <Panel>
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Buying
                              Controller
                            </div>
                            <div style={{
                              textAlign: 'center',
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              left: '93px'
                            }}
                                 className={(() => {
                                   if (this.props.DelistContainer.waterfallValue.bc_cgm_contri > 0) {
                                     return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                   }
                                   else if (this.props.DelistContainer.waterfallValue.bc_cgm_contri < 0) {
                                     return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                   } else {
                                     return "glyphicon glyphicon-minus-sign"
                                   }
                                 })()}>
                              {this.props.DelistContainer.waterfallValue.bc_cgm_contri}
                            </div>
                          </Panel>

                          <Panel>
                            <div style={{textAlign: 'center', color: '#333333', fontWeight: 'bold', fontSize: '16px'}}>
                              Impact to Product
                              Sub-group
                            </div>
                            <div style={{
                              textAlign: 'center',
                              color: 'red',
                              fontWeight: 'bold',
                              fontSize: '16px',
                              left: '93px'
                            }}
                                 className={(() => {
                                   if (this.props.DelistContainer.waterfallValue.psg_cgm_contri > 0) {
                                     return "glyphicon glyphicon-chevron-up"
                                   }
                                   else if (this.props.DelistContainer.waterfallValue.psg_cgm_contri < 0) {
                                     return "glyphicon glyphicon-chevron-down"
                                   } else {
                                     return "glyphicon glyphicon-minus-sign"
                                   }
                                 })()}>
                              {this.props.DelistContainer.waterfallValue.psg_cgm_contri}
                            </div>
                          </Panel>
                        </div>
                      </div>
                    </Panel>
                  </div>
                </div>
              )
            }
            else {
              return (
                <div><h2 className="text-center"><Spinner />Please Wait a Moment....! </h2></div>
              )
            }
          })()}

          <h1 className="ts-blk-proview-subhead ts-blk-proview" style={{fontSize: '32px', verticalAlign: 'middle'}}><b
            style={{verticalAlign: 'middle'}}>SUPPLIER IMPACT TABLE </b><span
            className="glyphicon glyphicon-info-sign pull-right" style={{right: '4px', fontSize: '28px', top: '4px'}}
            onClick={() => {
              this.setState({spplierImpactTableInfo: true});
            }}></span></h1>

          {/*MODAL FOR SUPPLIER IMPACT TABLE INFO ICON */}

          <Modal show={this.state.spplierImpactTableInfo} bsSize="small"
                 aria-labelledby="contained-modal-title-sm">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm">
                <div style={{textAlign: 'center'}}><b>{this.props.DelistContainer.supplierPopupTableData}</b>
                  <div style={{textAlign: 'right'}}><span
                    onClick={() => this.setState({spplierImpactTableInfo: false})}><b>X</b></span></div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>


            </Modal.Body>
          </Modal>

          <Panel>
            <div className="col-xs-12 col-xs-5" style={{left: '-13px'}}>
              <InputField type={'string'}
                          placeholder="Search Supplier"
                          value={this.props.textBoxQueryString}
                          onChange={(e) => {
                            this.props.onGenerateTextBoxQueryString(e);
                            this.props.onApiFetch();
                          }}
              />
            </div>
            <div className="row">
              <div className="col-xs-12 col-xs-5"></div>
            </div>
            <br></br>
            <table className="table table-hover table-striped table-bordered table_cust">
              <thead style={{verticalAlign: 'middle'}}>
              <tr>
                <th rowSpan="3" style={{verticalAlign: 'middle', fontSize: '14px'}}>Supplier</th>
                <th colSpan="5" style={{verticalAlign: 'middle', fontSize: '14px'}}>Value</th>
                <th colSpan="5" style={{verticalAlign: 'middle', fontSize: '14px'}}>Volume</th>
              </tr>
              <tr>
                <th colSpan="1" style={{verticalAlign: 'middle', fontSize: '14px'}}>Before</th>
                <th colSpan="4" style={{verticalAlign: 'middle', fontSize: '14px'}}>After</th>
                <th colSpan="1" style={{verticalAlign: 'middle', fontSize: '14px'}}>Before</th>
                <th colSpan="4" style={{verticalAlign: 'middle', fontSize: '14px'}}>After</th>
              </tr>
              <tr>
                <th style={{verticalAlign: 'middle'}}>Total value from supplier</th>
                <th style={{verticalAlign: 'middle'}}>Direct value loss from delisted products</th>
                <th style={{verticalAlign: 'middle'}}>Value gained from substitution</th>
                <th style={{verticalAlign: 'middle'}}>Net Impact</th>
                <th style={{verticalAlign: 'middle'}}>Net Impact %</th>
                <th style={{verticalAlign: 'middle'}}>Total volume from supplier</th>
                <th style={{verticalAlign: 'middle'}}>Direct volume loss from delisted products</th>
                <th style={{verticalAlign: 'middle'}}>Volume gained from substitution</th>
                <th style={{verticalAlign: 'middle'}}>Net Impact</th>
                <th style={{verticalAlign: 'middle'}}>Net Impact %</th>
              </tr>
              </thead>
              <tbody>
              {
                (() => {
                  if (this.props.DelistContainer.data && this.props.DelistContainer.data.sup_sales_table) {
                    let a = this.props.DelistContainer.data.sup_sales_table;
                    return a.map(obj => {
                      return (

                        <tr id={Math.random() + Date.now()} onClick={() => {
                          {/*this.props.onSubstitutesClick();*/
                          }
                          {/*browserHistory.push(this.props.location.pathname + "?week=4")*/
                          }
                          {
                            {/*alert(obj.parent_supplier);*/
                            }
                          }
                          this.props.onSupplierImpactTableClick(obj.parent_supplier);
                          this.setState({smShow: true});
                          {/*alert("hi");*/
                          }
                        }}>
                          <td>{obj.parent_supplier}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{formatSales(obj.predicted_value_share)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{formatSales(obj.value_loss_share)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center"
                          }}>{formatSales(obj.value_gain_share)}</td>
                          <td style={{verticalAlign: 'middle', textAlign: "right"}}>{formatSales(obj.value_impact)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{obj.value_impact_per}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{formatVolume(obj.predicted_volume_share)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{formatVolume(obj.vols_loss_share)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{formatVolume(obj.vols_gain_share)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{formatVolume(obj.vol_impact)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center",
                            fontSize: '14px'
                          }}>{obj.vol_impact_per}</td>
                        </tr>
                      )
                    })
                  }
                  else {
                    return (
                      <tr>
                        <td className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</td>
                      </tr>
                    )
                  }
                })()
              }
              </tbody>
            </table>

            {/*pagination*/}
            <nav aria-label="Page navigation example">
              <span style={{
                fontSize: '14px',
                position: 'relative',
                float: 'left',
                top: '40px',
                fontSize: '14px'
              }}>Page:</span>
              <ul className="pagination pagination-lg">
                {(() => {

                  if (this.props.DelistContainer.data && this.props.DelistContainer.data.sup_sales_table) {
                    let x = [];
                    let start_index = this.props.DelistContainer.data.start_index;
                    let page = this.props.DelistContainer.data.page;
                    let end_index = this.props.DelistContainer.data.end_index;
                    let pagination_count = this.props.DelistContainer.data.pagination_count;
                    let selected_page = 1;

                    {/*if (this.props.location.query.startRow) {*/
                    }
                    {/*selected_page = this.props.location.query.startRow;*/
                    }
                    {/*}*/
                    }


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

                    return x.map(objj => {
                      return (
                        <li className="page-item"
                            onClick={() => {
                              console.log("obj", (objj));
                              let supplierPaginationData = "supplier_page=" + objj;
                              this.props.onsupplierPagination(supplierPaginationData);
                              this.props.onTableType("supplier");
                              this.props.onApiFetch();
                            }}><a className="page-link" href="#" style={{
                          borderTopLeftRadius: '20px',
                          borderBottomLeftRadius: '20px',
                          borderBottomRightRadius: '20px',
                          borderTopRightRadius: '20px',
                          margin: '10px',
                          fontSize: '14px'
                        }}>{objj}
                        </a> &nbsp;&nbsp; </li>
                      )
                    })
                  }
                })()}
              </ul>
            </nav>
          </Panel>

          {/*MODAL FOR SUPPLIER IMPACT TABLE*/}

          <Modal show={this.state.smShow} bsClass="modal" bsSize="large" aria-labelledby="contained-modal-title-sm"
                 dialogClassName="custom-modal">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm">
                <div style={{textAlign: 'center'}}><b>{this.props.DelistContainer.supplierPopupTableData}</b>
                  <div style={{textAlign: 'right'}}><span onClick={() => this.setState({smShow: false})}><b>X</b></span>
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-hover table-striped table-bordered table_cust" style={{fontSize: '16px'}}>
                {/*<div>*/}
                <thead>
                <th style={{verticalAlign: 'middle'}}>Delisted product</th>
                <th style={{verticalAlign: 'middle'}}>Predicted Value</th>
                <th style={{verticalAlign: 'middle'}}>Predicted Volume</th>
                <th style={{verticalAlign: 'middle', width: '80px'}}>Value loss</th>
                <th style={{verticalAlign: 'middle'}}>Volume loss</th>
                <th style={{verticalAlign: 'middle'}}>Substituting Supplier</th>
                <th style={{verticalAlign: 'middle'}}>Substituting Product</th>
                <th style={{verticalAlign: 'middle'}}>Value gain due to substitution</th>
                <th style={{verticalAlign: 'middle'}}>Volume gain due to substitution</th>
                </thead>
                <tbody>
                {
                  (() => {
                    if (this.props.DelistContainer.supplierPopuptableDataSuccess) {
                      console.log("this.props.DelistContainer.supplierPopuptableDataSuccess.table", this.props.DelistContainer.supplierPopuptableDataSuccess.COUNT);
                      let a = this.props.DelistContainer.supplierPopuptableDataSuccess.table;
                      return a.map(obj => {
                        return (

                          <tr>
                            <td>{obj.productcode} - {obj.productdescription}</td>
                            <td style={{
                              verticalAlign: 'middle',
                              textAlign: "center"
                            }}>{formatSales(obj.delist_pred_value)}</td>
                            <td style={{
                              verticalAlign: 'middle',
                              textAlign: "center"
                            }}>{formatVolume(obj.delist_pred_vol)}</td>
                            <td style={{textAlign: "right"}}>{formatSales(obj.delist_value_loss)}</td>
                            <td style={{
                              verticalAlign: 'middle',
                              textAlign: "center"
                            }}>{formatVolume(obj.delist_vol_loss)}</td>
                            <td>{obj.substitute_supplier}</td>
                            <td>{obj.substituteproductcode}-{obj.substituteproductdescription}</td>
                            <td style={{
                              verticalAlign: 'middle',
                              textAlign: "center"
                            }}>{formatSales(obj.substitute_value_gain)}</td>
                            <td style={{
                              verticalAlign: 'middle',
                              textAlign: "center"
                            }}>{formatVolume(obj.substitute_vol_gain)}</td>
                          </tr>
                        )
                      })
                    }
                  })()
                }
                </tbody>
                {/*</div>*/}
              </table>
              {/*pagination*/}
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-lg"><span style={{
                  fontSize: '14px',
                  position: 'relative',
                  float: 'left',
                  top: '20px',
                  fontSize: '14px'
                }}>Page:</span>
                  {(() => {

                    if (this.props.DelistContainer.supplierPopuptableDataSuccess && this.props.DelistContainer.supplierPopuptableDataSuccess.table) {
                      let x = [];
                      let start_index = this.props.DelistContainer.supplierPopuptableDataSuccess.start_index;
                      let page = this.props.DelistContainer.supplierPopuptableDataSuccess.page;
                      let end_index = this.props.DelistContainer.supplierPopuptableDataSuccess.end_index;
                      let pagination_count = this.props.DelistContainer.supplierPopuptableDataSuccess.pagination_count;
                      let selected_page = 1;

                      {/*if (this.props.location.query.startRow) {*/
                      }
                      {/*selected_page = this.props.location.query.startRow;*/
                      }
                      {/*}*/
                      }


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

                      return x.map(objj => {
                        return (
                          <li className="page-item"
                              onClick={() => {
                                console.log("obj", (objj));
                                {/*alert(this.props.DelistContainer.supplierPopupTableData);*/
                                }
                                let supplierPopupPaginationData = "supplier_popup_page=" + objj;
                                this.props.onsupplierPopupPagination(supplierPopupPaginationData);
                                this.props.onTableType("supplier_popup");
                                this.props.onSupplierImpactTableClick(this.props.DelistContainer.supplierPopupTableData);
                              }}><a className="page-link" href="#" style={{
                            borderTopLeftRadius: '20px',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px',
                            borderTopRightRadius: '20px',
                            margin: '10px',
                            fontSize: '14px'
                          }}>{objj}
                          </a></li>
                        )
                      })
                    }
                  })()}
                </ul>
              </nav>
            </Modal.Body>
          </Modal>

          <h1 className="ts-blk-proview-subhead ts-blk-proview" style={{fontSize: '32px', verticalAlign: 'middle'}}><b
            style={{verticalAlign: 'middle'}}>DELIST PRODUCT TABLE</b> <span
            className="glyphicon glyphicon-info-sign pull-right" style={{right: '4px', fontSize: '28px', top: '4px'}}
            onClick={() => {
              this.setState({delistImpactTableInfo: true});
            }}></span></h1>

          {/*MODAL FOR DELIST PRODUCT TABLE INFO ICON */}

          <Modal show={this.state.delistImpactTableInfo} bsSize="small"
                 aria-labelledby="contained-modal-title-sm">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm">
                <div style={{textAlign: 'center'}}><b></b>
                  <div style={{textAlign: 'right'}}><span onClick={() => this.setState({delistImpactTableInfo: false})}><b>X</b></span>
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>


            </Modal.Body>
          </Modal>

          <Panel>
            <div className="col-xs-12 col-xs-5" style={{left: '-13px'}}>
              <InputField type={'string'}
                          placeholder="Search Product Description"
                          value={this.props.textBoxQueryString}
                          onChange={(e) => {
                            this.props.onGenerateTextBoxQueryStringDelist(e);
                            this.props.ondelistTable();
                          }}
              />
            </div>
            <div className="row">
              <div className="col-xs-12 col-xs-5"></div>
            </div>
            <br></br>
            <table className="table table-hover table-striped table-bordered table_cust">
              <thead>
              <th style={{verticalAlign: 'middle', fontSize: '14px'}}>Product Code</th>
              <th style={{verticalAlign: 'middle', fontSize: '14px'}}>Product Description</th>
              <th style={{verticalAlign: 'middle', fontSize: '14px'}}>No of Stores</th>
              <th style={{verticalAlign: 'middle', fontSize: '14px'}}>Predicted Value</th>
              <th style={{verticalAlign: 'middle', fontSize: '14px'}}>Predicted Volume</th>
              <th style={{verticalAlign: 'middle', fontSize: '14px'}}>Predicted Cgm</th>
              <th style={{verticalAlign: 'middle', fontSize: '14px'}}>View Substitutes</th>
              </thead>
              <tbody>
              {
                (() => {
                  if (this.props.DelistContainer.delisttableData && this.props.DelistContainer.delisttableData.delist_prod_table) {
                    return this.props.DelistContainer.delisttableData.delist_prod_table.map(obj => {
                      return (
                        <tr id={Math.random() + Date.now()}>
                          <td style={{verticalAlign: 'middle', textAlign: "center"}}>{obj.productcode}</td>
                          <td>{obj.long_description}</td>
                          <td style={{verticalAlign: 'middle', textAlign: "center"}}>{obj.no_of_stores}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center"
                          }}>{formatSales(obj.predicted_sales)}</td>
                          <td style={{
                            verticalAlign: 'middle',
                            textAlign: "center"
                          }}>{formatVolume(obj.predicted_volume_x)}</td>
                          <td
                            style={{verticalAlign: 'middle', textAlign: "center"}}>{formatSales(obj.predicted_cgm)}</td>
                          <td><Button style={{minWidth: '10px', height: '50px'}} onClick={() => {

                            this.props.onSubstitutesClick(obj.productcode);
                            this.props.onSubstitutesClickSendLongDesc(obj.long_description);

                            this.setState({lgShow: true});
                            if (this.props.DelistContainer) {
                              {/*console.log(this.props.DelistContainer.data.delist_prod_table);*/
                              }
                            }

                          }}>View Substitutes</Button></td>
                        </tr>
                      )
                    })
                  }
                  else {
                    return (
                      <tr>
                        <td className="text-center" colSpan="7"><Spinner />Please Wait a Moment....!</td>
                      </tr>
                    )
                  }
                })()
              }
              </tbody>
            </table>

            {/*pagination*/}
            <nav aria-label="Page navigation example">
              <ul className="pagination pagination-lg"><span style={{
                fontSize: '14px',
                position: 'relative',
                float: 'left',
                top: '20px',
                fontSize: '14px'
              }}>Page:</span>
                {(() => {

                  if (this.props.DelistContainer.delisttableData && this.props.DelistContainer.delisttableData.delist_prod_table) {
                    let x = [];
                    let start_index = this.props.DelistContainer.delisttableData.start_index;
                    let page = this.props.DelistContainer.delisttableData.page;
                    let end_index = this.props.DelistContainer.delisttableData.end_index;
                    let pagination_count = this.props.DelistContainer.delisttableData.pagination_count;
                    let selected_page = 1;

                    {/*if (this.props.location.query.startRow) {*/
                    }
                    {/*selected_page = this.props.location.query.startRow;*/
                    }
                    {/*}*/
                    }


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

                    return x.map(objj => {
                      return (
                        <li className="page-item"
                            onClick={() => {
                              console.log("obj - delist", (objj));
                              let delistPaginationData = "delist_page=" + objj;
                              this.props.onTableType("delist");
                              this.props.ondelistPagination(delistPaginationData);
                              this.props.ondelistTable();
                            }}><a className="page-link" href="#" style={{
                          borderTopLeftRadius: '20px',
                          borderBottomLeftRadius: '20px',
                          borderBottomRightRadius: '20px',
                          borderTopRightRadius: '20px',
                          margin: '10px',
                          fontSize: '14px'
                        }}>{objj}
                        </a></li>
                      )
                    })
                  }
                })()}
              </ul>
            </nav>
          </Panel>
          {/*MODAL FOR PRODUCT IMPACT TABLE*/
          }

          <Modal show={this.state.lgShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm">
                <div style={{textAlign: 'center', verticalAlign: 'middle', fontSize: '14px'}}>
                  <b>{this.props.DelistContainer.substitutesData}
                    - {this.props.DelistContainer.substitutesDataLongDesc}</b>
                  <div style={{textAlign: 'right'}}><span onClick={() => this.setState({lgShow: false})}><b>X</b></span>
                  </div>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dialog modal-lg">
              <div>
                <table className="table table-hover table-striped table-bordered" style={{fontSize: '16px'}}>
                  <thead>
                  <tr id={Math.random() + Date.now()} style={{fontWeight: 'bold'}}>
                    <td style={{verticalAlign: 'middle', fontSize: '14px'}}>Substitute Product Code</td>
                    <td style={{verticalAlign: 'middle', fontSize: '14px'}}>Substitute Product Description</td>
                  </tr>
                  </thead>
                  <tbody>
                  {(() => {
                    if (this.props.DelistContainer.substitutesTableData) {
                      return this.props.DelistContainer.substitutesTableData.table.map(obj => {
                          return (
                            <tr>
                              <td style={{
                                verticalAlign: 'middle',
                                textAlign: 'center',
                                width: '180px',
                                fontSize: '14px'
                              }}>{obj.substituteproductcode}</td>
                              <td style={{
                                verticalAlign: 'middle',
                                textAlign: "left", fontSize: '14px'
                              }}>{obj.substituteproductdescription}</td>
                            </tr>
                          )
                        }
                      )
                    }
                  })()}
                  </tbody>
                </table>
              </div>

              {/*pagination*/}
              <nav aria-label="Page navigation example">
                <ul className="pagination pagination-lg"><span style={{
                  fontSize: '14px',
                  position: 'relative',
                  float: 'left',
                  top: '20px',
                  fontSize: '14px'
                }}>Page:</span>
                  {(() => {

                    if (this.props.DelistContainer.substitutesTableData && this.props.DelistContainer.substitutesTableData.table) {
                      let x = [];
                      let start_index = this.props.DelistContainer.substitutesTableData.start_index;
                      let page = this.props.DelistContainer.substitutesTableData.page;
                      let end_index = this.props.DelistContainer.substitutesTableData.end_index;
                      let pagination_count = this.props.DelistContainer.substitutesTableData.pagination_count;
                      let selected_page = 1;

                      {/*if (this.props.location.query.startRow) {*/
                      }
                      {/*selected_page = this.props.location.query.startRow;*/
                      }
                      {/*}*/
                      }


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

                      return x.map(objj => {
                        return (
                          <li className="page-item"
                              onClick={() => {
                                console.log("obj", (objj));
                                let delistPopupPaginationData = "delist_popup_page=" + objj;
                                this.props.ondelistPopupPagination(delistPopupPaginationData);
                                this.props.onTableType("delist_popup");
                                this.props.onSubstitutesClick(this.props.DelistContainer.substitutesData);
                              }}><a className="page-link" href="#" style={{
                            borderTopLeftRadius: '20px',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px',
                            borderTopRightRadius: '20px',
                            margin: '10px',
                            fontSize: '14px'
                          }}>{objj}
                          </a></li>
                        )
                      })
                    }
                  })()}
                </ul>
              </nav>

            </Modal.Body>

          </Modal>

        </div>
      </div>
    )
  }
}

DelistContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  DelistContainer: makeSelectDelistContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    onApiFetch: (e) => dispatch(apiFetch(e)),
    onDataUrlParams: (e) => dispatch(dataUrlParams(e)),

    //TABS
    onWeekClick: (e) => dispatch(WeekClick(e)),
    onStoreClick: (e) => dispatch(StoreClick(e)),

    //BREADCRUMBS
    onWeekTabClick: (e) => dispatch(WeekTabClick(e)),
    onStoreTabClick: (e) => dispatch(StoreTabClick(e)),

    //SEARCH RESULT FOR SUPPLIER TABLE
    onGenerateTextBoxQueryString: (e) => dispatch(GenerateTextBoxQueryString(e.target.value)),

    //SEARCH RESULT FOR DELIST TABLE
    onGenerateTextBoxQueryStringDelist: (e) => dispatch(GenerateTextBoxQueryStringDelist(e.target.value)),

    //TABLE TYPE FOR DELIST
    onTableType: (e) => dispatch(tableType(e)),

    //DELIST PAGINATION TABLE
    ondelistTable: (e) => dispatch(delistTable(e)),

    //SUPPLIER PAGINATION TABLE
    onsupplierPagination: (e) => dispatch(supplierPagination(e)),

    //SUPPLIER POPUP PAGINATION TABLE
    onsupplierPopupPagination: (e) => dispatch(supplierPopupPagination(e)),

    //DELIST PAGINATION TABLE
    ondelistPagination: (e) => dispatch(delistPagination(e)),

    //DELIST POPUP PAGINATION TABLE
    ondelistPopupPagination: (e) => dispatch(delistPopupPagination(e)),

    onTableDataFetch: (e) => dispatch(tableDataFetch(e)),

    // POPUP FOR SUBSTITUTE TABLE
    onSubstitutesClick: (e) => dispatch(SubstitutesClick(e)),
    onSubstitutesClickSendLongDesc: (e) => dispatch(SubstitutesClickSendLongDesc(e)),

    // POPUP FOR SUPPLIER IMPACT TABLE TABLE
    onSupplierImpactTableClick: (e) => dispatch(SupplierImpactTableClick(e)),

    onWaterfallValueChart: (e) => dispatch(WaterfallValueChart(e)),

    // onGenerateTable: (e) => dispatch(generateTable(e)),
    onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),

    onWaterfall: (e) => dispatch(WaterfallValueChart(e)),
    ondelist: (e) => dispatch(delistTable(e)),

    //TESTING AJAX     //PAGINATION FOR DEMO TABLE
    onAjaxClick: (e) => dispatch(ajaxClick(e)),

    //CASCADING FILTERS
    onUrlParamsData: (e) => dispatch(urlParamsData(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateUrlParamsData(e)),
    onApplyClick: (e) => dispatch(ApplyClick(e)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelistContainer);
