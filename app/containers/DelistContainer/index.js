/*
 *
 * DelistContainer
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectDelistContainer from './selectors';
import messages from './messages';
import Button from 'components/button';
import BarChart2 from 'components/BarChart2';
import WaterFallChart2 from 'components/WaterFallChart2';
import Spinner from 'components/spinner';
import InputField from 'components/input_field';
require('react-bootstrap-table/css/react-bootstrap-table.css')

import {
  makeSideFilter, makeUrlParams, makeUrlParamsString,
} from './selectors';


import NewSelector2 from 'components/NewSelector2';

import {browserHistory} from 'react-router';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import {Modal, Pagination, Accordion} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
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
  generateSideFilterReset,
  generateUrlParams,
  generateTable,
  generateUrlParamsString,
  generateFilterParamsString,
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
  WaterfallSpinnerSuccess,
  WaterfallProfitSpinnerSuccess,
  SupplierImpactTableSpinnerSuccess,
  SupplierPopupTableSpinnerSuccess,
  DelistProductTableSpinnerSuccess,
  onDelistDefaultView,
  DelistPopupTableSpinnerSuccess,
  waterfallSpinner,
  GenerateTextBoxQueryString,
  GenerateTextBoxQueryStringDelist,
  WeekTabClick,
  StoreTabClick,
  UrlParams,
  saveScenarioFlag,saveScenarioName,updateSaveScenarioResponse,saveTagName,
} from './actions';

import styles from './style.scss';

export class DelistContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.onGenerateUrlParamsString();
    this.props.onGenerateFilterParamsString();
    // console.log("1onGenerateUrlParamsString");
    this.props.onDataUrlParams(this.props.location.query);
    // console.log("2onDataUrlParams");
    this.props.onUrlParams(this.props.location.search);

    this.props.onWaterfallValueChart();
    this.props.onGenerateSideFilter();
    console.log("7onGenerateSideFilter");
  };

  cellButton=(cell, row,enumObject, rowIndex)=>{
    return (
    <button
    type="button"
    className="btn btn-primary"
    onClick={() =>{
      console.log("Inside REact Button click!",this)
      this.props.onSubstitutesClick(row.productcode);
      this.props.onSubstitutesClickSendLongDesc(row.long_description);
      this.props.onDelistPopupTableSpinnerSuccess(0);
      this.setState({lgShow: true});
    }}
    >
    View Substitutes
    </button>
    )
  }

/*  supplierPopUpProduct=(cell,row)=> {
  console.log("Inside Pop Up table Success!")
  console.log(row)
  return row.productcode + '-' + row.productdescription;
}

  supplierPopUpSubsProduct=(cell,row) => {
  return row.substituteproductcode + '-' + row.substituteproductdescription;
}*/

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
      activePage: 1,
      activePageDelist: 1,
      activePageSupplierPopup: 1,
      activePageDelistPopup: 1,
      activeKey: "1",
      activeKey2: "4",


      saveScenarioStatus: '',
      showSaveScenarioSuccessModalFlag: false,
      showSaveScenarioModalFlag: false,
      showSaveScenarioOverwriteConfirmationModalFlag: false,

    };
  }

  render() {
    //For url parameters
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }, {
        text: 'All', value: 25
      }], // you can change the dropdown list for size per page
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5,  // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      expandRowBgColor: 'rgb(242, 255, 163)'
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    const rowOptions = {
      onRowClick: (row, e) => {
        this.props.onSupplierImpactTableClick(row.parent_supplier);
        this.setState({smShow: true});
        this.props.onSupplierPopupTableSpinner(0);

      }
    }
    console.log('hi', this.props);

    let formatSales = (cell) => {
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.round(cell / 1000);
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
      }
      else {
        return ('£ ' + Math.round(cell));
      }
    }

    let addingPercentage = (cell) => {
        return (cell + '%');
    }

    let formatVolume = (cell) => {
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.round(cell / 1000);
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(cell));
      }
    };

    let supplierPopUpProduct = (cell, row) => {
      console.log("Inside Pop Up table Success!")
      console.log(row)
      return row.productcode + '-' + row.productdescription;
    }

    let supplierPopUpSubsProduct = (cell, row) => {
      return row.substituteproductcode + '-' + row.substituteproductdescription;
    }

    return (
      <div>
        <Helmet
          title="Delist View"
          meta={[
            {name: 'description', content: 'Description of Delist View'},
          ]}
        />

        {/*Page title*/}
        <div className="pageTitle" style={{marginTop:'-1%'}}>DELIST IMPACT</div>


        {/*Save Scenario Modal*/}
        <Modal show={this.state.showSaveScenarioModalFlag} bsSize="lg" style={{marginTop: '10%'}}
               aria-labelledby="contained-modal-title-lg">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                                  <span className="pageModuleTitle"><b>Save Scenario</b>
                                  <span style={{textAlign: 'right', float: 'right'}}
                                        onClick={() => {

                                          this.setState({showSaveScenarioModalFlag: false});


                                        }}>
                                  <b>X</b></span></span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="infoModalText">

            <div className="row formattedText">

             <div className="col-xs-12">

                <div className="col-xs-2"></div>
                <div className="col-xs-4">
                  Scenario Name:
                </div>
                <div className="col-xs-4">
                  <InputField type="text"
                              placeholder="Enter Scenario Type"
                              value={this.props.DelistContainer.scenarioName}
                              onChange={(e) => {
                                this.props.onSaveScenarioName(e);
                              }}

                  />
                </div>
                <div className="col-xs-2"></div>
              </div>

            </div>


            <div className="row" style={{marginTop: '10px'}}>

              <Button onClick={() => {
                if (this.props.DelistContainer.scenarioName === '') {
                  alert("Enter scenario name!");
                } else {
                  document.body.style.cursor = 'wait';
                  this.props.onSaveScenarioFlag();
                }

              }}
                      style={{display: 'block', marginTop: "1%", marginLeft: '39%'}}>Save</Button>

            </div>

          </Modal.Body>
        </Modal>

        {/*Saving Success modal*/}
        <Modal show={this.state.showSaveScenarioSuccessModalFlag} bsSize="lg" style={{marginTop: '10%'}}
               aria-labelledby="contained-modal-title-lg">

          <Modal.Body className="infoModalText">


            <div className="center-this" style={{color: 'Green', fontSize: '20px', lineHeight: '28px'}}>
              <i>Scenario '{this.props.DelistContainer.scenarioName}' has been saved successfully!</i><br/>
              <br/>
              What do you wish to do next?
            </div>


            <div className="row" style={{marginTop: '2%'}}>
              <div className="col-xs-6">
                <Button onClick={() => {
                  this.setState({showSaveScenarioSuccessModalFlag: false});

                }}
                        style={{display: 'block', marginTop: "1%", marginLeft: '35%'}}>Create New Scenario</Button>
              </div>
              <div className="col-xs-6">
                <Button onClick={() => {
                  let page = '/ranging/scenario-tracker?';

                  let objString = page;
                  window.location = objString;

                }}
                        style={{display: 'block', marginTop: "1%", marginLeft: '28%'}}>Go to Scenario Tracker</Button>
              </div>
            </div>

          </Modal.Body>
        </Modal>


        <div className="row" style={{
          marginLeft: '0px',
          marginRight: '0px',
          marginTop: '-1%',
        }}>

          <div style={{
            height: '100%',
            position: 'fixed',
            width: '20%',
            /* padding-right: 5px; */
            overflowX: 'hidden',
            overflowY: 'scroll',
            borderTop: '1px solid #ccc',
            marginTop: '1.5%'
          }}>


            {/*<Panel>*/}
            {/*<SelectorDelist sideFilter={this.props.DelistContainer.sideFilter}*/}
            {/*location={this.props.location}*/}
            {/*onGenerateTable={this.props.onGenerateTable}*/}
            {/*onGenerateUrlParams={this.props.onGenerateUrlParams}*/}
            {/*onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}/>*/}

            {/*{console.log("this.props.DelistContainer.sideFilter", this.props.DelistContainer.sideFilter)}*/}

            {(() => {
              if (this.props.DelistContainer.sideFilter) {
                return (
                  <NewSelector2 sideFilter={this.props.DelistContainer.sideFilter}
                                location={this.props.location}
                                onFilterReset={this.props.onFilterReset}
                                onDataUrlParams={this.props.DataUrlParams}
                                onUrlParamsData={this.props.onUrlParamsData}
                                onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                onGenerateFilterParamsString={this.props.onGenerateFilterParamsString}
                                onGenerateUrlParamsData={this.props.onGenerateUrlParamsData}
                                onApplyClick={this.props.onApplyClick}
                                onWaterfall={this.props.onWaterfallValueChart}
                                onApiFetch={this.props.onApiFetch}
                                ondelist={this.props.ondelistTable}
                                onwaterfallSpinner={this.props.onwaterfallSpinner}
                                onwaterfallProfitSpinner={this.props.onwaterfallProfitSpinner}
                                onSupplierImpactTableSpinner={this.props.onSupplierImpactTableSpinner}
                                onDelistProductTableSpinner={this.props.onDelistProductTableSpinner}
                                onDelistDefaultView={this.props.onDelistDefaultView}
                                filterUrlParamString={this.props.DelistContainer.urlParamsString}
                  />
                )
              } else {
                return (
                  <div style={{padding: '10px'}}>LOADING</div>
                )
              }
            })()}
            {/*</Panel>*/}
          </div>


          {(() => {
            if ((!(this.props.location.search == "")) || (this.props.DelistContainer.delistDefaultView == 1)) {
              return (
                <div style={{
                  width: '78%',
                  marginLeft: '22%'
                }}>
                  <div className="row" style={{marginLeft: "0.5%", paddingTop: "-5px"}}>
                    <div className="col-md-12 content-wrap">

                      <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
                           className="tabsCustom">
                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                          this.setState({activeKey: "1"});
                          let week_no = "time_period=13_weeks";
                          this.props.onwaterfallSpinner();
                          this.props.onwaterfallProfitSpinner();
                          this.props.onSupplierImpactTableSpinner();
                          this.props.onDelistProductTableSpinner();
                          this.props.onWeekClick(week_no);
                          this.props.onWaterfallValueChart();
                          {/*setTimeout(() => {*/
                          }
                          {/*// alert("time");*/
                          }
                          {/*this.props.onApiFetch();*/
                          }
                          {/*console.log("5onApiFetch");*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          {/*}, 20000);*/
                          }


                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          this.props.onWeekTabClick("Week: 13 weeks ")
                        }}><span className="tab_label">13 Weeks</span></NavItem>
                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                          this.setState({activeKey: "2"});
                          let week_no = "time_period=26_weeks";
                          this.props.onwaterfallSpinner();
                          this.props.onwaterfallProfitSpinner();
                          this.props.onSupplierImpactTableSpinner();
                          this.props.onDelistProductTableSpinner();
                          this.props.onWeekClick(week_no);
                          this.props.onWaterfallValueChart();

                          {/*setTimeout(() => {*/
                          }
                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          {/*}, 20000);*/
                          }

                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          this.props.onWeekTabClick("Week: 26 weeks ")
                        }}><span className="tab_label">26 Weeks</span></NavItem>
                        <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                          this.setState({activeKey: "3"});
                          let week_no = "time_period=52_weeks";
                          this.props.onwaterfallSpinner();
                          this.props.onwaterfallProfitSpinner();
                          this.props.onSupplierImpactTableSpinner();
                          this.props.onDelistProductTableSpinner();
                          this.props.onWeekClick(week_no);
                          this.props.onWaterfallValueChart();

                          {/*setTimeout(() => {*/
                          }
                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          {/*}, 20000);*/
                          }

                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          this.props.onWeekTabClick("Week: 52 weeks ")
                        }}><span className="tab_label">52 weeks</span></NavItem>
                      </Nav>

                      <div style={{height: '0px', width: '100%'}}>&nbsp;</div>
                      <Nav bsStyle="tabs" className="tabsCustom tabsCustomInner" activeKey={this.state.activeKey2}
                           onSelect={this.handleSelect}>
                        <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                          this.setState({activeKey2: "4"});
                          let store_type = "store_type=Overview";
                          this.props.onwaterfallSpinner();
                          this.props.onwaterfallProfitSpinner();
                          this.props.onSupplierImpactTableSpinner();
                          this.props.onDelistProductTableSpinner();
                          this.props.onStoreClick(store_type);
                          this.props.onWaterfallValueChart();

                          {/*setTimeout(() => {*/
                          }
                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          {/*}, 20000);*/
                          }
                          this.props.onStoreTabClick("Store: Overview ")
                        }}><span className="tab_label">Overview</span></NavItem>
                        <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                          this.setState({activeKey2: "5"});
                          let store_type = "store_type=Main Estate";
                          this.props.onwaterfallSpinner();
                          this.props.onwaterfallProfitSpinner();
                          this.props.onSupplierImpactTableSpinner();
                          this.props.onDelistProductTableSpinner();
                          this.props.onStoreClick(store_type);
                          this.props.onWaterfallValueChart();

                          {/*setTimeout(() => {*/
                          }
                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          {/*}, 20000);*/
                          }
                          this.props.onStoreTabClick("Store: Main Estate ")
                        }}><span className="tab_label">Main Estate</span></NavItem>
                        <NavItem className="tabsCustomList" eventKey="6" onClick={() => {
                          this.setState({activeKey2: "6"});
                          let store_type = "store_type=Express";
                          this.props.onwaterfallSpinner();
                          this.props.onwaterfallProfitSpinner();
                          this.props.onSupplierImpactTableSpinner();
                          this.props.onDelistProductTableSpinner();
                          this.props.onStoreClick(store_type);
                          this.props.onWaterfallValueChart();

                          {/*setTimeout(() => {*/
                          }
                          {/*this.props.onApiFetch();*/
                          }
                          {/*this.props.ondelistTable();*/
                          }
                          {/*}, 20000);*/
                          }
                          this.props.onStoreTabClick("Store: Express")
                        }}><span className="tab_label">Express</span></NavItem>

                      </Nav>

                      {/*Save Scenario*/}
                      <div className="row" style={{textAlign:'right',marginRight:'2%'}}>
                        <Button  onClick={() => {
                          this.setState({showSaveScenarioModalFlag: true});
                        }}
                                 style={{marginTop:'2%'}}>Save Scenario</Button>
                      </div>


                      {/*Saving scenario modal call-conditions*/}
                      {(()=>{
                        if(this.props.DelistContainer.saveScenarioResponse!=='') {
                          if (this.props.DelistContainer.saveScenarioResponse.save_scenario === "SUCCESS") {
                            console.log("entered success function");
                            document.body.style.cursor='default';
                            this.props.onSaveScenarioResponse('');
                            this.setState({showSaveScenarioModalFlag: false});
                            this.setState({showSaveScenarioSuccessModalFlag: true});

                          }

                        }


                      })()}


                      {/*<div className="breadcrumb">*/}
                      {/*<span className="label">&nbsp;{this.props.DelistContainer.weekBreadcrumb ? this.props.DelistContainer.weekBreadcrumb:'Week 13'}</span>*/}
                      {/*<span className="label">&gt;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.DelistContainer.storeBreadcrumb?this.props.DelistContainer.storeBreadcrumb:'Overview'}</span>*/}

                      {/*</div>*/}

                      <h2 className="pageModuleMainTitle"><b
                        style={{verticalAlign: 'middle'}}>DELIST PRODUCT TABLE</b> <span
                        className="glyphicon glyphicon-info-sign pull-right"
                        style={{right: '4px', fontSize: '17px', top: '4px'}}
                        onClick={() => {
                          this.setState({delistImpactTableInfo: true});
                        }}></span></h2>

                      {/*MODAL FOR DELIST PRODUCT TABLE INFO ICON */}


                      <Modal show={this.state.delistImpactTableInfo} bsSize="lg"
                             aria-labelledby="contained-modal-title-lg">
                        <Modal.Header>
                          <Modal.Title id="contained-modal-title-sm"
                                       style={{textAlign: 'center', fontSize: '14px'}}><span
                            style={{textAlign: 'center', fontSize: '14px'}}><b> Delisted Products</b><span
                            style={{textAlign: 'right', float: 'right'}}
                            onClick={() => this.setState({delistImpactTableInfo: false})}><b>X</b></span></span>
                            <div style={{textAlign: 'center'}}>
                              <div style={{textAlign: 'right'}}>
                              </div>
                            </div>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{fontSize: '14px'}}>
                          This table provides more details about the delisted products.
                        </Modal.Body>
                      </Modal>

                      <Panel>
                        <div>
                          {
                            (() => {
                              if (this.props.DelistContainer.delisttableData && this.props.DelistContainer.delisttableData.delist_prod_table && (this.props.DelistContainer.delistProductTableSpinner == 1)) {


                                return (
                                  <div>
                                    <BootstrapTable
                                      data={this.props.DelistContainer.delisttableData.delist_prod_table}
                                      options={options}
                                      striped={true}
                                      hover
                                      condensed
                                      pagination={ true }
                                      search={true}
                                      exportCSV={true}
                                    >
                                      <TableHeaderColumn dataField="productcode" isKey={true} dataSort={true}
                                                         dataAlign="center">Product Code</TableHeaderColumn>
                                      <TableHeaderColumn dataField="long_description" dataSort={true}
                                                         dataAlign="center">Product Description</TableHeaderColumn>
                                      <TableHeaderColumn dataField="no_of_stores" dataSort={true} dataAlign="center"
                                                         width="9%">No of Stores</TableHeaderColumn>
                                      <TableHeaderColumn dataField="predicted_value" dataFormat={formatSales}
                                                         dataSort={true} dataAlign="center" width="9%">Predicted
                                        Value</TableHeaderColumn>
                                      <TableHeaderColumn dataField="predicted_volume" dataFormat={formatVolume}
                                                         dataSort={true} dataAlign="center" width="8%">Predicted
                                        Volume</TableHeaderColumn>
                                      <TableHeaderColumn dataField="predicted_cgm" dataFormat={formatSales}
                                                         dataSort={true} dataAlign="center">Predicted
                                        Cgm</TableHeaderColumn>
                                      <TableHeaderColumn dataField="per_value_transfer" dataFormat={addingPercentage} dataSort={true} dataAlign="center">Value Transfer</TableHeaderColumn>
                                      <TableHeaderColumn dataField="per_vol_transfer" dataFormat={addingPercentage} dataSort={true} dataAlign="center">Volume Transfer</TableHeaderColumn>
                                      <TableHeaderColumn dataField="psg_value_impact" dataFormat={addingPercentage} dataSort={true} dataAlign="center">Product Sub Group Value Impact(%)</TableHeaderColumn>
                                      <TableHeaderColumn dataFormat={this.cellButton} dataAlign="center">View
                                        Substitutes</TableHeaderColumn>
                                    </BootstrapTable>

                                  </div>
                                );

                              }
                              else {
                                return (

                                  <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                                );
                              }
                            })()
                          }

                        </div>
                      </Panel>

                      <h2 className="pageModuleMainTitle">SALES IMPACT</h2>

                      {/*<Nav bsStyle="tabs" activeKey={this.state.activeKey2}>*/}
                      {/*<NavItem eventKey="11" onClick={() => this.setState({activeKey2: "11"})}>NavItem 11 content</NavItem>*/}
                      {/*<NavItem eventKey="22" onClick={() => this.setState({activeKey2: "22"})}>NavItem 22 content</NavItem>*/}
                      {/*<NavItem eventKey="33" onClick={() => this.setState({activeKey2: "33"})}>NavItem 33 content</NavItem>*/}
                      {/*</Nav>*/}

                      {/*MODAL FOR SUPPLIER IMPACT INFO ICON */}

                      <Modal show={this.state.supplierImpactInfo} bsSize="lg"
                             aria-labelledby="contained-modal-title-lg"
                      >
                        <Modal.Header>

                          <Modal.Title id="contained-modal-title-sm"
                                       style={{textAlign: 'center', fontSize: '14px'}}><span
                            style={{textAlign: 'center', fontSize: '14px'}}><b>Value</b><span
                            style={{textAlign: 'right', float: 'right'}}
                            onClick={() => this.setState({supplierImpactInfo: false})}><b>X</b></span></span>
                            <div style={{textAlign: 'center'}}>
                              <div style={{textAlign: 'right'}}>
                              </div>
                            </div>
                          </Modal.Title>

                        </Modal.Header>
                        <Modal.Body style={{fontSize: '14px'}}>
                          This graph compares direct sales lost from the delisted products vs the final loss/gain in
                          sales due
                          to
                          demand transfer to substitute products.
                          Value: Sales of a supplier in £
                        </Modal.Body>
                      </Modal>

                      {(() => {
                        if (this.props.DelistContainer.waterfallValue && this.props.DelistContainer.waterfallValue.sales_chart && this.props.DelistContainer.waterfallValue.vols_chart && (this.props.DelistContainer.waterfallSpinner == 1)) {
                          return (


                            <div className="row">

                              {/*-----Value Chart-----*/}
                              <div className="col-xs-6">
                                <div className="ts-blk-proview">

                                  {/*Heading*/}
                                  <div className="pageModuleSubTitle">
                                    Value
                                    <span className="glyphicon glyphicon-info-sign pull-right"
                                          style={{right: '4px', fontSize: '17px', top: '4px'}}
                                          onClick={() => {
                                            this.setState({supplierImpactInfo: true});
                                          }}> </span>
                                  </div>

                                  {/*Chart and impact numbers*/}
                                  <div className="panel-body">

                                    {/*Chart*/}
                                    <div className="row">
                                      <div className="col-xs-12 chartwrap">
                                        <WaterFallChart2 id="waterfallChart_1" yAxisName="Value" formatter="formatSales"
                                                         positive_text='positive' negative_text='negative'
                                                         total_text='total'
                                                         data={ this.props.DelistContainer.waterfallValue.sales_chart }/>
                                      </div>
                                    </div>
                                    {/*Impact number*/}
                                    {/*<div className="col-xs-6 text-center" style={{marginLeft: '25%'}}>*/}

                                    <div className="col-xs-5 impactNumbers" style={{float: 'left'}}>
                                      <Panel>
                                        {/*<div style={{textAlign: 'center', color: '#00539f', fontWeight: 'bold', fontSize: '16px'}}>*/}
                                        <div>
                                          Impact to Buying Controller:

                                          <span
                                            className={(() => {
                                              if (this.props.DelistContainer.waterfallValue.bc_sales_contri > 0) {
                                                return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                              }
                                              else if (this.props.DelistContainer.waterfallValue.bc_sales_contri < 0) {
                                                return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                              } else {
                                                return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                              }
                                            })()}>&nbsp;
                                            {this.props.DelistContainer.waterfallValue.bc_sales_contri}%
                                </span>

                                        </div>
                                      </Panel>
                                    </div>
                                    {/*<div className="col-xs-2 impactNumbers">*/}
                                    {/*</div>*/}
                                    <div className="col-xs-5 impactNumbers" style={{float: 'right'}}>
                                      <Panel>
                                        {/*<div style={{textAlign: 'center', color: '#00539f', fontWeight: 'bold', fontSize: '16px'}}>*/}
                                        <div>
                                          Total Value Transfer:

                                          <span
                                            className={(() => {
                                              if (this.props.DelistContainer.waterfallValue.sales_tot_transfer > 0) {
                                                {/*alert(this.props.DelistContainer.waterfallValue.bc_sales_contri)*/
                                                }
                                                {/*alert(this.props.DelistContainer.waterfallValue.bc_sales_contri)*/
                                                }
                                                return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                              }
                                              else if (this.props.DelistContainer.waterfallValue.sales_tot_transfer < 0) {
                                                return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                              } else {
                                                return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                              }
                                            })()}>&nbsp;
                                            {this.props.DelistContainer.waterfallValue.sales_tot_transfer}%
                                </span>

                                        </div>
                                      </Panel>
                                    </div>
                                  </div>

                                </div>
                              </div>

                              {/*MODAL FOR SALES IMPACT VOLUME INFO ICON */}

                              <Modal show={this.state.salesImpactVolumeInfo} bsSize="lg"
                                     aria-labelledby="contained-modal-title-lg"
                              >
                                <Modal.Header>

                                  <Modal.Title id="contained-modal-title-sm"
                                               style={{textAlign: 'center', fontSize: '14px'}}><span
                                    style={{textAlign: 'center', fontSize: '14px'}}><b>Volume</b><span
                                    style={{textAlign: 'right', float: 'right'}}
                                    onClick={() => this.setState({salesImpactVolumeInfo: false})}><b>X</b></span></span>
                                    <div style={{textAlign: 'center'}}>
                                      <div style={{textAlign: 'right'}}>
                                      </div>
                                    </div>
                                  </Modal.Title>

                                </Modal.Header>
                                <Modal.Body style={{fontSize: '14px'}}>
                                  This graph compares direct volume lost from the delisted products vs the final
                                  loss/gain in
                                  volume due to demand transfer to substitute products.
                                  Volume: Units of a product sold
                                </Modal.Body>
                              </Modal>

                              {/*-----volume-----*/}
                              <div className="col-xs-6">
                                <div className="ts-blk-proview">


                                  {/*Heading*/}
                                  <div className="pageModuleSubTitle">
                                    Volume<span
                                    className="glyphicon glyphicon-info-sign pull-right"
                                    style={{right: '4px', fontSize: '17px', top: '4px'}}
                                    onClick={() => {
                                      this.setState({salesImpactVolumeInfo: true});
                                    }}></span>
                                  </div>

                                  {/*Chart and impact numbers*/}
                                  <div className="panel-body">

                                    {/*chart*/}
                                    <div className="row">
                                      <div className="col-xs-12 chartwrap">
                                        <WaterFallChart2 id="waterfallChart_2" yAxisName="Volume"
                                                         formatter="formatSales"
                                                         positive_text='positive' negative_text='negative'
                                                         total_text='total'
                                                         data={ this.props.DelistContainer.waterfallValue.vols_chart }/>
                                      </div>
                                    </div>

                                    {/*impact number*/}
                                    <div className="col-xs-5 impactNumbers" style={{float: 'left'}}>

                                      <Panel>
                                        <div>
                                          Impact to Buying Controller:

                                          <span
                                            className={(() => {
                                              if (this.props.DelistContainer.waterfallValue.bc_vols_contri > 0) {
                                                return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                              }
                                              else if (this.props.DelistContainer.waterfallValue.bc_vols_contri < 0) {
                                                return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                              } else {
                                                return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                              }
                                            })()}>&nbsp;
                                            {this.props.DelistContainer.waterfallValue.bc_vols_contri} %
                              </span>
                                        </div>
                                      </Panel>

                                    </div>
                                    <div className="col-xs-5 impactNumbers" style={{float: 'right'}}>

                                      <Panel>
                                        <div>
                                          Total Volume Transfer:

                                          <span
                                            className={(() => {
                                              if (this.props.DelistContainer.waterfallValue.vol_tot_transfer > 0) {
                                                return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                              }
                                              else if (this.props.DelistContainer.waterfallValue.vol_tot_transfer < 0) {
                                                return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                              } else {
                                                return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                              }
                                            })()}>&nbsp;
                                            {this.props.DelistContainer.waterfallValue.vol_tot_transfer} %
                              </span>
                                        </div>
                                      </Panel>

                                    </div>

                                  </div>


                                </div>
                              </div>


                            </div>



                          )
                        } else if (this.props.DelistContainer.waterfallSpinner == 2) {
                          let abcd = 1;
                          return (
                            <div>
                              <h2 className="text-center">Something went wrong. Please reload the page....!</h2>
                            </div>
                          )
                        }
                        else {
                          let abcd = 1;
                          return (
                            <div>
                              <h2 className="text-center"><Spinner />Please Wait a Moment....!</h2>
                            </div>
                          )
                        }
                      })()}


                      {/*<h2 className="ts-blk-proview-subhead ts-blk-proview" style={{fontSize: '28px', verticalAlign: 'middle'}}><b*/}
                      {/*style={{verticalAlign: 'middle'}}>PROFIT IMPACT</b></h2>*/}

                      <h2 className="pageModuleMainTitle">PROFIT IMPACT</h2>


                      {/*MODAL FOR PROFIT IMPACT PROFIT INFO ICON */}

                      <Modal show={this.state.profitImpactInfo} bsSize="lg"
                             aria-labelledby="contained-modal-title-lg">
                        <Modal.Header>

                          <Modal.Title id="contained-modal-title-sm"
                                       style={{textAlign: 'center', fontSize: '14px'}}><span
                            style={{textAlign: 'center', fontSize: '14px'}}><b>Profit</b><span
                            style={{textAlign: 'right', float: 'right'}}
                            onClick={() => this.setState({profitImpactInfo: false})}><b>X</b></span></span>
                            <div style={{textAlign: 'center'}}>
                              <div style={{textAlign: 'right'}}>
                              </div>
                            </div>
                          </Modal.Title>


                        </Modal.Header>
                        <Modal.Body style={{fontSize: '14px'}}>
                          This graph compares direct CGM lost from the delisted products vs the final loss/gain in CGM
                          due to
                          demand
                          transfer to substitute products.
                          Commercial Gross Margin (CGM) : This is BGM plus all other commercial income and expenses that
                          are
                          managed
                          by Product.
                        </Modal.Body>
                      </Modal>


                      {(() => {
                        if (this.props.DelistContainer.waterfallValue && this.props.DelistContainer.waterfallValue.cgm_chart && this.props.DelistContainer.waterfallValue.cts_chart && (this.props.DelistContainer.waterfallVolumeSpinner == 1)) {
                          return (
                            <div className="row">

                              {/*-----Profit Chart-----*/}
                              <div className="col-xs-6">
                                <div className="ts-blk-proview">


                                  {/*Heading*/}
                                  <div className="pageModuleSubTitle">
                                    Profit<span
                                    className="glyphicon glyphicon-info-sign pull-right"
                                    style={{right: '4px', fontSize: '17px', top: '4px'}}
                                    onClick={() => {
                                      this.setState({profitImpactInfo: true});
                                    }}></span>
                                  </div>

                                  <div className="panel-body">

                                    {/*Chart*/}
                                    <div className="row">
                                      <div className="col-xs-12 chartwrap">
                                        <WaterFallChart2 id="waterfallChart_3" yAxisName="Profit"
                                                         formatter="formatSales"
                                                         positive_text='positive' negative_text='negative'
                                                         total_text='total'
                                                         data={ this.props.DelistContainer.waterfallValue.cgm_chart }/>
                                      </div>
                                    </div>


                                    {/*Impact numbers*/}
                                    <div className="col-xs-5 impactNumbers" style={{float: 'left'}}>
                                      <Panel>
                                        <div>
                                          Impact to Buying Controller:
                                        </div>
                                        <span
                                          className={(() => {
                                            if (this.props.DelistContainer.waterfallValue.bc_cgm_contri > 0) {
                                              return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                            }
                                            else if (this.props.DelistContainer.waterfallValue.bc_cgm_contri < 0) {
                                              return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                            } else {
                                              return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                            }
                                          })()}>&nbsp;
                                          {this.props.DelistContainer.waterfallValue.bc_cgm_contri}%
                            </span>
                                      </Panel>
                                    </div>

                                    <div className="col-xs-5 impactNumbers" style={{float: 'right'}}>
                                      <Panel>
                                        <div>
                                          Total Profit Transfer:
                                        </div>
                                        <span
                                          className={(() => {
                                            if (this.props.DelistContainer.waterfallValue.cgm_tot_transfer > 0) {
                                              return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                            }
                                            else if (this.props.DelistContainer.waterfallValue.cgm_tot_transfer < 0) {
                                              return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                            } else {
                                              return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                            }
                                          })()}>&nbsp;
                                          {this.props.DelistContainer.waterfallValue.cgm_tot_transfer}%
                            </span>
                                      </Panel>
                                    </div>

                                  </div>
                                </div>
                              </div>


                              {/*MODAL FOR PROFIT IMPACT - CTS INFO ICON */}
                              <Modal show={this.state.profitImpactCtsInfo} bsSize="lg"
                                     aria-labelledby="contained-modal-title-lg">
                                <Modal.Header>

                                  <Modal.Title id="contained-modal-title-sm"
                                               style={{textAlign: 'center', fontSize: '14px'}}><span
                                    style={{textAlign: 'center', fontSize: '14px'}}><b>CTS:</b><span
                                    style={{textAlign: 'right', float: 'right'}}
                                    onClick={() => this.setState({profitImpactCtsInfo: false})}><b>X</b></span></span>
                                    <div style={{textAlign: 'center'}}>
                                      <div style={{textAlign: 'right'}}>
                                      </div>
                                    </div>
                                  </Modal.Title>

                                </Modal.Header>
                                <Modal.Body style={{fontSize: '14px'}}>
                                  This graph compares direct CTS gained from the delisted products vs the final
                                  loss/gain in
                                  CTS due
                                  to demand transfer to substitute products.
                                  Cost to Serve (CTS)
                                </Modal.Body>
                              </Modal>

                              {/*-----CTS Chart-----*/}
                              <div className="col-xs-6">
                                <div className="ts-blk-proview">


                                  <div className="pageModuleSubTitle">
                                    CTS<span
                                    className="glyphicon glyphicon-info-sign pull-right"
                                    style={{right: '4px', fontSize: '17px', top: '4px'}}
                                    onClick={() => {
                                      this.setState({profitImpactCtsInfo: true});
                                    }}></span>
                                  </div>


                                  <div className="panel-body">


                                    {/*Chart*/}
                                    <div className="row">
                                      <div className="col-xs-12 chartwrap">
                                        <WaterFallChart2 id="waterfallChart_4" yAxisName="CTS" formatter="formatSales"
                                                         positive_text='negative' negative_text='positive'
                                                         total_text='total'
                                                         data={ this.props.DelistContainer.waterfallValue.cts_chart }/>
                                      </div>
                                    </div>


                                    {/*Impact number*/}
                                    <div className="col-xs-5 impactNumbers" style={{float: 'left'}}>
                                      <Panel>
                                        <div>
                                          Impact to Buying Controller:
                                        </div>
                                        <span
                                          className={(() => {
                                            if (this.props.DelistContainer.waterfallValue.bc_cts_contri > 0) {
                                              return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                            }
                                            else if (this.props.DelistContainer.waterfallValue.bc_cts_contri < 0) {
                                              return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                            } else {
                                              return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                            }
                                          })()}>&nbsp;
                                          {this.props.DelistContainer.waterfallValue.bc_cts_contri}%
                              </span>

                                      </Panel>
                                    </div>

                                    <div className="col-xs-5 impactNumbers" style={{float: 'right'}}>
                                      <Panel>
                                        <div>
                                          Total CTS Transfer:
                                        </div>
                                        <span
                                          className={(() => {
                                            if (this.props.DelistContainer.waterfallValue.cts_tot_transfer > 0) {
                                              return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                            }
                                            else if (this.props.DelistContainer.waterfallValue.cts_tot_transfer < 0) {
                                              return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                            } else {
                                              return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                            }
                                          })()}>&nbsp;
                                          {this.props.DelistContainer.waterfallValue.cts_tot_transfer}%
                              </span>

                                      </Panel>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        } else if (this.props.DelistContainer.waterfallVolumeSpinner == 2) {
                          let abcd = 1;
                          return (
                            <div>
                              <h2 className="text-center">Something went wrong. Please reload the page....!</h2>
                            </div>
                          )
                        }
                        else {
                          return (
                            <div><h2 className="text-center"><Spinner />Please Wait a Moment....! </h2></div>
                          )
                        }
                      })()}

                      <h2 className="pageModuleMainTitle"><b
                        style={{verticalAlign: 'middle'}}>SUPPLIER IMPACT TABLE </b><span
                        className="glyphicon glyphicon-info-sign pull-right"
                        style={{right: '4px', fontSize: '17px', top: '4px'}}
                        onClick={() => {
                          this.setState({spplierImpactTableInfo: true});
                        }}></span></h2>

                      {/*MODAL FOR SUPPLIER IMPACT TABLE INFO ICON */}

                      <Modal show={this.state.spplierImpactTableInfo} bsSize="lg"
                             aria-labelledby="contained-modal-title-lg">
                        <Modal.Header>
                          <Modal.Title id="contained-modal-title-sm"
                                       style={{textAlign: 'center', fontSize: '14px'}}><span
                            style={{textAlign: 'center', fontSize: '14px'}}><b>Supplier Table</b><span
                            style={{textAlign: 'right', float: 'right'}}
                            onClick={() => this.setState({spplierImpactTableInfo: false})}><b>X</b></span></span>
                            <div style={{textAlign: 'center'}}>
                              <div style={{textAlign: 'right'}}>
                              </div>
                            </div>
                          </Modal.Title>

                        </Modal.Header>
                        <Modal.Body style={{fontSize: '14px'}}>
                          A Supplier level view of the gains (due to the substitute product) and losses (due to the
                          delist
                          product)
                          Click on any row to view the data at a Product x Supplier level for that supplier.
                        </Modal.Body>
                      </Modal>
                      <Panel>
                        <div>
                          {
                            (() => {
                              if (this.props.DelistContainer.data && this.props.DelistContainer.data.sup_sales_table && (this.props.DelistContainer.supplierImpactTableSpinner == 1)) {


                                return (
                                  <div>
                                    <BootstrapTable
                                      data={this.props.DelistContainer.data.sup_sales_table}
                                      options={Object.assign({}, options, rowOptions)}
                                      striped={true}
                                      hover
                                      condensed
                                      pagination={ true }
                                      search={true}
                                      exportCSV={true}
                                    >
                                      <TableHeaderColumn row="0" rowSpan="3" dataField="parent_supplier" isKey={true}
                                                         dataAlign="center" dataSort={true}>Supplier</TableHeaderColumn>
                                      <TableHeaderColumn row="0" colSpan="5" dataSort={true}
                                                         dataAlign="center">Value</TableHeaderColumn>
                                      <TableHeaderColumn row="1" dataSort={true}
                                                         dataAlign="center">Before</TableHeaderColumn>
                                      <TableHeaderColumn row="1" colSpan="4" dataSort={true}
                                                         dataAlign="center">After</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="predicted_value_share"
                                                         dataFormat={formatSales} dataAlign="center">Total value from
                                        supplier</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="value_loss_share" dataFormat={formatSales}
                                                         dataAlign="center">Direct value loss from delisted
                                        products</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="value_gain_share" dataFormat={formatSales}
                                                         dataAlign="center">Value gained from
                                        substitution</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="value_impact" dataFormat={formatSales}
                                                         dataAlign="center">Net Impact</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="value_impact_per" dataAlign="center">Net
                                        Impact %</TableHeaderColumn>
                                      <TableHeaderColumn row="0" colSpan="5"
                                                         dataAlign="center">Volume</TableHeaderColumn>
                                      <TableHeaderColumn row="1" dataSort={true}
                                                         dataAlign="center">Before</TableHeaderColumn>
                                      <TableHeaderColumn row="1" colSpan="4" dataSort={true}
                                                         dataAlign="center">After</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="predicted_volume_share"
                                                         dataFormat={formatVolume} dataAlign="center">Total value from
                                        supplier</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="vols_loss_share" dataFormat={formatVolume}
                                                         dataAlign="center">Direct value loss from delisted
                                        products</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="vols_gain_share" dataFormat={formatVolume}
                                                         dataAlign="center">Value gained from
                                        substitution</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="vol_impact" dataFormat={formatVolume}
                                                         dataAlign="center">Net Impact</TableHeaderColumn>
                                      <TableHeaderColumn row="2" dataField="vol_impact_per" dataAlign="center">Net
                                        Impact %</TableHeaderColumn>
                                    </BootstrapTable>

                                  </div>
                                );

                              }
                              else {
                                return (

                                  <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                                );
                              }
                            })()
                          }

                        </div>
                      </Panel>

                      {/*MODAL FOR SUPPLIER IMPACT TABLE*/}

                      <Modal show={this.state.smShow} bsClass="modal" bsSize="small"
                             aria-labelledby="contained-modal-title-sm"
                             dialogClassName="custom-modal">
                        <Modal.Header>
                          <Modal.Title id="contained-modal-title-sm">
                            <div style={{textAlign: 'center'}}><b style={{
                              textAlign: 'center',
                              top: '15px',
                              position: 'relative'
                            }}>{this.props.DelistContainer.supplierPopupTableData}</b>
                              <div style={{textAlign: 'right'}}><span onClick={() => this.setState({smShow: false})}><b>X</b></span>
                              </div>
                            </div>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div>
                            {
                              (() => {
                                if (this.props.DelistContainer.supplierPopuptableDataSuccess && (this.props.DelistContainer.supplierPopupTableSpinner == 1)) {


                                  return (
                                    <div>
                                      <BootstrapTable
                                        data={this.props.DelistContainer.supplierPopuptableDataSuccess.table}
                                        options={options}
                                        striped={true}
                                        hover
                                        condensed
                                        pagination={ true }
                                        search={true}
                                        exportCSV={true}
                                      >
                                        <TableHeaderColumn dataField="productcode" dataFormat={supplierPopUpProduct}
                                                           isKey={true} dataSort={true} dataAlign="center">Delisted
                                          product</TableHeaderColumn>
                                        <TableHeaderColumn dataField="delist_pred_value" dataFormat={formatSales}
                                                           dataSort={true} dataAlign="center" width="9%">Predicted
                                          Value</TableHeaderColumn>
                                        <TableHeaderColumn dataField="delist_pred_vol" dataFormat={formatVolume}
                                                           dataSort={true} dataAlign="center" width="9%">Predicted
                                          Volume</TableHeaderColumn>
                                        <TableHeaderColumn dataField="delist_value_loss" dataFormat={formatSales}
                                                           dataSort={true} dataAlign="center" width="8%">Value
                                          loss</TableHeaderColumn>
                                        <TableHeaderColumn dataField="delist_vol_loss" dataFormat={formatVolume}
                                                           dataSort={true} dataAlign="center">Volume
                                          loss</TableHeaderColumn>
                                        <TableHeaderColumn dataField="substitute_supplier" dataSort={true}
                                                           dataAlign="center">Substituting Supplier</TableHeaderColumn>
                                        <TableHeaderColumn dataField="substituteproductcode"
                                                           dataFormat={supplierPopUpSubsProduct} dataSort={true}
                                                           dataAlign="center" width="9%">Substituting
                                          Product</TableHeaderColumn>
                                        <TableHeaderColumn dataField="substitute_value_gain" dataFormat={formatSales}
                                                           dataSort={true} dataAlign="center" width="9%">Value gain due
                                          to
                                          substitution</TableHeaderColumn>
                                        <TableHeaderColumn dataField="substitute_vol_gain" dataFormat={formatVolume}
                                                           dataSort={true} dataAlign="center">Volume gain due to
                                          substitution</TableHeaderColumn>


                                      </BootstrapTable>

                                    </div>
                                  );

                                }
                                else {
                                  return (

                                    <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                                  );
                                }
                              })()
                            }

                          </div>
                        </Modal.Body>
                      </Modal>


                      {/*MODAL FOR PRODUCT IMPACT TABLE UP*/
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
                            {
                              (() => {
                                if (this.props.DelistContainer.substitutesTableData && (this.props.DelistContainer.delistPopupTableSpinner == 1)) {


                                  return (
                                    <div>
                                      <BootstrapTable
                                        data={this.props.DelistContainer.substitutesTableData.table}
                                        options={options} /*tableStyle={ { width: '80%',marginLeft:'10%' }}*/
                                        striped={true}
                                        hover
                                        condensed
                                        pagination={ true }
                                        search={true}
                                        exportCSV={true}
                                      >
                                        <TableHeaderColumn dataField="substituteproductcode" width="80px" isKey={true}
                                                           dataSort={true} dataAlign="center">Substitute Product
                                          Code</TableHeaderColumn>
                                        <TableHeaderColumn dataField="substituteproductdescription" dataSort={true}
                                                           dataAlign="left" width="9%">Substitute Product
                                          Description</TableHeaderColumn>


                                      </BootstrapTable>

                                    </div>
                                  );

                                } else if (this.props.DelistContainer.delistPopupTableSpinner == 2) {
                                  let abcd = 1;
                                  return (
                                    <tr>
                                      <td className="text-center" colSpan="7">Something went wrong. Please reload the
                                        page....!
                                      </td>
                                    </tr>
                                  )
                                }
                                else {
                                  return (

                                    <div className="text-center" colSpan="11"><Spinner />Please Wait a Moment....!</div>

                                  );
                                }
                              })()
                            }
                              </div>
                              </Modal.Body>

                              </Modal>
                              </div>
                              </div>

                              </div>
                              )
                              }
                            else {
                            return (
                            <div className="selectAttrituteIndicator" style={{
                              width: '78%',
                              marginLeft: '22%'
                            }}>
                            <div>
                            <div> ----- Please select the filters to get started ------</div>
                            </div>
                            </div>

                            )
                          }
                            })()}


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
          onUrlParams: (e) => dispatch(UrlParams(e)),

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
          onFilterReset: (e) => dispatch(generateSideFilterReset(e)),
          onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
          onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),

          onGenerateFilterParamsString: (e) => dispatch(generateFilterParamsString(e)),

          onWaterfall: (e) => dispatch(WaterfallValueChart(e)),
          ondelist: (e) => dispatch(delistTable(e)),
          onwaterfallSpinner: (e) => dispatch(WaterfallSpinnerSuccess(e)),
          onwaterfallProfitSpinner: (e) => dispatch(WaterfallProfitSpinnerSuccess(e)),
          onSupplierImpactTableSpinner: (e) => dispatch(SupplierImpactTableSpinnerSuccess(e)),

          //SUPPLIER POPUP SPINNER
          onSupplierPopupTableSpinner: (e) => dispatch(SupplierPopupTableSpinnerSuccess(e)),
          onDelistProductTableSpinner: (e) => dispatch(DelistProductTableSpinnerSuccess(e)),

          //DELIST DEFAULT VIEW - EMPTY SCREEN
          onDelistDefaultView: (e) => dispatch(onDelistDefaultView(e)),

          //DELIST POPUP TABLE SPINNER
          onDelistPopupTableSpinnerSuccess: (e) => dispatch(DelistPopupTableSpinnerSuccess(e)),

          //TESTING AJAX     //PAGINATION FOR DEMO TABLE
          onAjaxClick: (e) => dispatch(ajaxClick(e)),

    //CASCADING FILTERS
    onUrlParamsData: (e) => dispatch(urlParamsData(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateUrlParamsData(e)),
    onApplyClick: (e) => dispatch(ApplyClick(e)),

    //Saving scenario
    onSaveScenarioName: (e) => dispatch(saveScenarioName(e.target.value)),
    onSaveScenarioFlag: (e) => dispatch(saveScenarioFlag(e)),
    onSaveScenarioResponse: (e) => dispatch(updateSaveScenarioResponse(e)),
    onSaveTagName: (e) => dispatch(saveTagName(e.target.value)),

        };
        }

          export default connect(mapStateToProps, mapDispatchToProps)(DelistContainer);
