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
import {Modal, Pagination,Accordion} from 'react-bootstrap';
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
  DelistProductTableSpinnerSuccess,
  waterfallSpinner,
  GenerateTextBoxQueryString,
  GenerateTextBoxQueryStringDelist,
  WeekTabClick,
  StoreTabClick,
  UrlParams,
} from './actions';

import styles from './style.scss';

export class DelistContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    this.props.onGenerateUrlParamsString();
    this.props.onGenerateFilterParamsString();
    console.log("1onGenerateUrlParamsString");
    this.props.onDataUrlParams(this.props.location.query);
    console.log("2onDataUrlParams");
    this.props.onUrlParams(this.props.location.search);
    console.log("3onUrlParams");

    this.props.onWaterfallValueChart();
    // this.props.onWaterfallValueChart();

    console.log("4onWaterfallValueChart");
    // setTimeout(() => {
    //   // alert("time");
    //   this.props.onApiFetch();
    //   console.log("5onApiFetch");
    //   this.props.ondelistTable();
    //   console.log("6ondelistTable");
    // }, 10000);
    // this.props.onApiFetch();
    // console.log("5onApiFetch");
    // this.props.ondelistTable();
    // console.log("6ondelistTable");
    this.props.onGenerateSideFilter();
    console.log("7onGenerateSideFilter");
  };
  //
  // componentDidUpdate = () => {
  //   // this.props.onDataUrlParams(this.props.location.query);
  //   this.props.onUrlParams(this.props.location.search);
  // };

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
      activeKey: "1",
      activeKey2: "4",
    };
  }

  render() {

    let formatSales = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000);
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      }

      else {
        return ('£ ' + Math.round(i));
      }
    };


    let formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000);
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(i));
      }


    };

    // let abc = 1;
    // while (abc) {
    //   this.props.onApiFetch();
    //   console.log("5onApiFetch");
    //   this.props.ondelistTable();
    //   console.log("6ondelistTable");
    //   abc = 0;
    //   // alert(abc);
    // }
    return (
<div>

      {/*Page title*/}
    <div className="pageTitle">DELIST IMPACT</div>


    <div className="flextcontent">

        <div className="flexleft" style={{ flexBasis: '300px',marginTop:"24px"}}>

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



        <div className="flexright" style={{marginLeft: "1%"}}>

            <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect} className="tabsCustom">
              <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                this.setState({activeKey: "1"});
                let week_no = "time_period=13_weeks";
                this.props.onwaterfallSpinner();
                this.props.onwaterfallProfitSpinner();
                this.props.onSupplierImpactTableSpinner();
                this.props.onDelistProductTableSpinner();
                this.props.onWeekClick(week_no);
                this.props.onWaterfallValueChart();
                {/*setTimeout(() => {*/}
                  {/*// alert("time");*/}
                  {/*this.props.onApiFetch();*/}
                  {/*console.log("5onApiFetch");*/}
                  {/*this.props.ondelistTable();*/}
                {/*}, 20000);*/}


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

                {/*setTimeout(() => {*/}
                  {/*this.props.onApiFetch();*/}
                  {/*this.props.ondelistTable();*/}
                {/*}, 20000);*/}

                {/*this.props.onApiFetch();*/
                }
                {/*this.props.ondelistTable();*/
                }
                this.props.onWeekTabClick("Week: 26 weeks ")
              }} ><span className="tab_label">26 Weeks</span></NavItem>
              <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                this.setState({activeKey: "3"});
                let week_no = "time_period=52_weeks";
                this.props.onwaterfallSpinner();
                this.props.onwaterfallProfitSpinner();
                this.props.onSupplierImpactTableSpinner();
                this.props.onDelistProductTableSpinner();
                this.props.onWeekClick(week_no);
                this.props.onWaterfallValueChart();

                {/*setTimeout(() => {*/}
                  {/*this.props.onApiFetch();*/}
                  {/*this.props.ondelistTable();*/}
                {/*}, 20000);*/}

                {/*this.props.onApiFetch();*/
                }
                {/*this.props.ondelistTable();*/
                }
                this.props.onWeekTabClick("Week: 52 weeks ")
              }}><span className="tab_label">52 weeks</span></NavItem>
           </Nav>

          <div className="row" style={{marginLeft: "0.5%",paddingTop:"-5px"}}>
            <div className="col-md-12 content-wrap">

            <Nav bsStyle="tabs" className="tabsCustom tabsCustomInner" activeKey={this.state.activeKey2} onSelect={this.handleSelect}>
              <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                this.setState({activeKey2: "4"});
                let store_type = "store_type=Overview";
                this.props.onwaterfallSpinner();
                this.props.onwaterfallProfitSpinner();
                this.props.onSupplierImpactTableSpinner();
                this.props.onDelistProductTableSpinner();
                this.props.onStoreClick(store_type);
                this.props.onWaterfallValueChart();

                {/*setTimeout(() => {*/}
                  {/*this.props.onApiFetch();*/}
                  {/*this.props.ondelistTable();*/}
                {/*}, 20000);*/}
                this.props.onStoreTabClick("Store: Overview ")
              }} ><span className="tab_label">Overview</span></NavItem>
              <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                this.setState({activeKey2: "5"});
                let store_type = "store_type=Main Estate";
                this.props.onwaterfallSpinner();
                this.props.onwaterfallProfitSpinner();
                this.props.onSupplierImpactTableSpinner();
                this.props.onDelistProductTableSpinner();
                this.props.onStoreClick(store_type);
                this.props.onWaterfallValueChart();

                {/*setTimeout(() => {*/}
                  {/*this.props.onApiFetch();*/}
                  {/*this.props.ondelistTable();*/}
                {/*}, 20000);*/}
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

                {/*setTimeout(() => {*/}
                  {/*this.props.onApiFetch();*/}
                  {/*this.props.ondelistTable();*/}
                {/*}, 20000);*/}
                this.props.onStoreTabClick("Store: Express")
              }} ><span className="tab_label">Express</span></NavItem>

            </Nav>

            {/*<div className="breadcrumb">*/}
             {/*<span className="label">&nbsp;{this.props.DelistContainer.weekBreadcrumb ? this.props.DelistContainer.weekBreadcrumb:'Week 13'}</span>*/}
                {/*<span className="label">&gt;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.DelistContainer.storeBreadcrumb?this.props.DelistContainer.storeBreadcrumb:'Overview'}</span>*/}

            {/*</div>*/}

          <h2 className="pageModuleMainTitle" >SALES IMPACT</h2>

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

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
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
              This graph compares direct sales lost from the delisted products vs the final loss/gain in sales due to
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
                      <div className="pageModuleSubTitle" >
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
                                             positive_text='positive' negative_text='negative' total_text='total'
                                             data={ this.props.DelistContainer.waterfallValue.sales_chart }/>
                          </div>
                        </div>

                        {/*Impact number*/}
                        <div className="col-xs-6 impactNumbers">
                          {/*<div className="col-xs-6 text-center" style={{marginLeft: '25%'}}>*/}
                            <Panel>
                              {/*<div style={{textAlign: 'center', color: '#00539f', fontWeight: 'bold', fontSize: '16px'}}>*/}
                              <div>
                                Impact to Buying Controller:

                                <span
                                     className={(() => {
                                       if (this.props.DelistContainer.waterfallValue.bc_sales_contri > 0) {
                                         {/*alert(this.props.DelistContainer.waterfallValue.bc_sales_contri)*/
                                         }
                                         {/*alert(this.props.DelistContainer.waterfallValue.bc_sales_contri)*/
                                         }
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
                          {/*</div>*/}

                        </div>

                      </div>

                    </div>
                  </div>

                  {/*MODAL FOR SALES IMPACT VOLUME INFO ICON */}

                  <Modal show={this.state.salesImpactVolumeInfo} bsSize="lg"
                         aria-labelledby="contained-modal-title-lg"
                  >
                    <Modal.Header>

                      <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
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
                      This graph compares direct volume lost from the delisted products vs the final loss/gain in volume due to demand transfer to substitute products.
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
                            <WaterFallChart2 id="waterfallChart_2" yAxisName="Volume" formatter="formatSales"
                                             positive_text='positive' negative_text='negative' total_text='total'
                                             data={ this.props.DelistContainer.waterfallValue.vols_chart }/>
                          </div>
                        </div>

                        {/*impact number*/}
                          <div className="col-xs-6 impactNumbers">

                            <Panel>
                              <div>
                                Impact to Buying Controller

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

                      </div>


                    </div>
                  </div>



              </div>



              )
            } else if(this.props.DelistContainer.waterfallSpinner == 2){
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

          <h2 className="pageModuleMainTitle" >PROFIT IMPACT</h2>


          {/*MODAL FOR PROFIT IMPACT PROFIT INFO ICON */}

          <Modal show={this.state.profitImpactInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg">
            <Modal.Header>

              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
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
              This graph compares direct CGM lost from the delisted products vs the final loss/gain in CGM due to demand
              transfer to substitute products.
              Commercial Gross Margin (CGM) : This is BGM plus all other commercial income and expenses that are managed
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
                          <WaterFallChart2 id="waterfallChart_3" yAxisName="Profit" formatter="formatSales"
                          positive_text='positive' negative_text='negative' total_text='total'
                          data={ this.props.DelistContainer.waterfallValue.cgm_chart }/>
                          </div>
                          </div>


                        {/*Impact numbers*/}
                        <div className="col-xs-6 impactNumbers">
                            <Panel>
                            <div>
                              Impact to Buying Controller
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
                      </div>
                    </div>
                  </div>


                  {/*MODAL FOR PROFIT IMPACT - CTS INFO ICON */}
                  <Modal show={this.state.profitImpactCtsInfo} bsSize="lg"
                         aria-labelledby="contained-modal-title-lg">
                    <Modal.Header>

                      <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
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
                      This graph compares direct CTS gained from the delisted products vs the final loss/gain in CTS due
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
                    positive_text='negative' negative_text='positive' total_text='total1'
                    data={ this.props.DelistContainer.waterfallValue.cts_chart }/>
                    </div>
                    </div>



                {/*Impact number*/}
                          <div className="col-xs-6 impactNumbers">
                            <Panel>
                              <div>
                                Impact to Buying Controller
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

                      </div>
                    </div>
                  </div>
                </div>
              )
            } else if(this.props.DelistContainer.waterfallVolumeSpinner == 2){
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
            className="glyphicon glyphicon-info-sign pull-right" style={{right: '4px', fontSize: '17px', top: '4px'}}
            onClick={() => {
              this.setState({spplierImpactTableInfo: true});
            }}></span></h2>

          {/*MODAL FOR SUPPLIER IMPACT TABLE INFO ICON */}

          <Modal show={this.state.spplierImpactTableInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
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
              A Supplier level view of the gains (due to the substitute product) and losses (due to the delist product)
              Click on any row to view the data at a Product x Supplier level for that supplier.
            </Modal.Body>
          </Modal>

          <Panel>
            <div className="col-xs-12 col-xs-5" style={{left: '-16px'}}>
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
            <table className="table table-hover table-bordered table_cust">
              <thead style={{verticalAlign: 'middle'}}>
              <tr>
                <th rowSpan="3" >Supplier</th>
                <th colSpan="5" >Value</th>
                <th colSpan="5" >Volume</th>
              </tr>

              <tr>
                <th colSpan="1" >Before</th>
                <th colSpan="4" >After</th>
                <th colSpan="1" >Before</th>
                <th colSpan="4" >After</th>
              </tr>
              <tr>
                <th>Total value from supplier</th>
                <th>Direct value loss from delisted products</th>
                <th>Value gained from substitution</th>
                <th>Net Impact</th>
                <th> Net Impact %</th>
                <th>Total volume from supplier</th>
                <th>Direct volume loss from delisted products</th>
                <th>Volume gained from substitution</th>
                <th>Net Impact</th>
                <th>Net Impact %</th>
              </tr>
              </thead>
              <tbody className="table-body-format">
              {
                (() => {
                  if (this.props.DelistContainer.data && this.props.DelistContainer.data.sup_sales_table && (this.props.DelistContainer.supplierImpactTableSpinner == 1)) {
                    let a = this.props.DelistContainer.data.sup_sales_table;
                    return a.map(obj => {
                      return (

                        <tr id={Math.random() + Date.now()} onClick={() => {
                          this.props.onSupplierImpactTableClick(obj.parent_supplier);
                          this.setState({smShow: true});

                        }}>
                          <td>{obj.parent_supplier}</td>
                          <td>{formatSales(obj.predicted_value_share)}</td>
                          <td>{formatSales(obj.value_loss_share)}</td>
                          <td>{formatSales(obj.value_gain_share)}</td>
                          <td>{formatSales(obj.value_impact)}</td>
                          <td>{obj.value_impact_per}</td>
                          <td>{formatVolume(obj.predicted_volume_share)}</td>
                          <td>{formatVolume(obj.vols_loss_share)}</td>
                          <td>{formatVolume(obj.vols_gain_share)}</td>
                          <td>{formatVolume(obj.vol_impact)}</td>
                          <td>{obj.vol_impact_per}</td>
                        </tr>
                      )
                    })
                  } else if(this.props.DelistContainer.supplierImpactTableSpinner == 2){
                    let abcd = 1;
                    return (
                      <tr>
                        <td className="text-center" colSpan="11">Something went wrong. Please reload the page....!</td>
                      </tr>
                    )
                  } else {
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

            {(() => {
              if (this.props.DelistContainer.data && this.props.DelistContainer.data.sup_sales_table) {

                return <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={this.props.DelistContainer.data.pagination_count}
                  maxButtons={5}
                  activePage={this.state.activePage}
                  onSelect={(e) => {

                    this.setState({activePage: e})

                    this.props.onSupplierImpactTableSpinner();
                    let supplierPaginationData = "supplier_page=" + e;
                    this.props.onsupplierPagination(supplierPaginationData);
                    this.props.onTableType("supplier");
                    this.props.onApiFetch();
                  }}
                />

              }
            }
            )()}


          </Panel>

          {/*MODAL FOR SUPPLIER IMPACT TABLE*/}

          <Modal show={this.state.smShow} bsClass="modal" bsSize="large" aria-labelledby="contained-modal-title-sm"
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
              <table className="table table-hover table-border table_cust" style={{fontSize: '16px'}}>
                {/*<div>*/}
                <thead>
                <th style={{verticalAlign: 'middle'}}>Delisted product</th>
                <th style={{verticalAlign: 'middle', position: 'relative', width: '9%'}}>Predicted Value</th>
                <th style={{verticalAlign: 'middle', position: 'relative', width: '9%'}}>Predicted Volume</th>
                <th style={{verticalAlign: 'middle', position: 'relative', width: '8%'}}>Value loss</th>
                <th style={{verticalAlign: 'middle', position: 'relative', width: '8%'}}>Volume loss</th>
                <th style={{verticalAlign: 'middle'}}>Substituting Supplier</th>
                <th style={{verticalAlign: 'middle'}}>Substituting Product</th>
                <th style={{verticalAlign: 'middle', position: 'relative', width: '9%'}}>Value gain due to
                  substitution
                </th>
                <th style={{verticalAlign: 'middle', position: 'relative', width: '9%'}}>Volume gain due to
                  substitution
                </th>
                </thead>
                <tbody className="table-body-format">
                {
                  (() => {
                    if (this.props.DelistContainer.supplierPopuptableDataSuccess) {
                      console.log("this.props.DelistContainer.supplierPopuptableDataSuccess.table", this.props.DelistContainer.supplierPopuptableDataSuccess.COUNT);
                      let a = this.props.DelistContainer.supplierPopuptableDataSuccess.table;
                      return a.map(obj => {
                        return (

                          <tr>
                            <td>{obj.productcode} - {obj.productdescription}</td>
                            <td>{formatSales(obj.delist_pred_value)}</td>
                            <td>{formatVolume(obj.delist_pred_vol)}</td>
                            <td>{formatSales(obj.delist_value_loss)}</td>
                            <td>{formatVolume(obj.delist_vol_loss)}</td>
                            <td>{obj.substitute_supplier}</td>
                            <td>{obj.substituteproductcode}-{obj.substituteproductdescription}</td>
                            <td>{formatSales(obj.substitute_value_gain)}</td>
                            <td>{formatVolume(obj.substitute_vol_gain)}</td>
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
                <ul className="pagination pagination-lg">
                  <li><a role="button" href="#"><span aria-label="Prev">‹</span></a></li>
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
                              }}><a >{objj}
                          </a></li>
                        )
                      })
                    }
                  })()}
                  <li><a role="button" href="#"><span aria-label="Last">›</span></a></li>
                </ul>
              </nav>
            </Modal.Body>
          </Modal>

          <h2 className="pageModuleMainTitle"><b
            style={{verticalAlign: 'middle'}}>DELIST PRODUCT TABLE</b> <span
            className="glyphicon glyphicon-info-sign pull-right" style={{right: '4px', fontSize: '17px', top: '4px'}}
            onClick={() => {
              this.setState({delistImpactTableInfo: true});
            }}></span></h2>

          {/*MODAL FOR DELIST PRODUCT TABLE INFO ICON */}


          <Modal show={this.state.delistImpactTableInfo} bsSize="lg"
                 aria-labelledby="contained-modal-title-lg">
            <Modal.Header>
              <Modal.Title id="contained-modal-title-sm" style={{textAlign: 'center', fontSize: '14px'}}><span
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
            <div className="col-xs-12 col-xs-5" style={{left: '-16px'}}>
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
            <table className="table table-hover table-bordered table_cust">
              <thead>
              <tr style={{height:"15px"}}>
                    <th>Product Code
                  </th>
                  <th>Product
                    Description
                  </th>
                  <th>No of Stores</th>
                  <th>Predicted Value</th>
                  <th>Predicted Volume</th>
                  <th>Predicted Cgm</th>
                  <th>View Substitutes</th>
              </tr>
                </thead>

                <tbody className="table-body-format">
              {
                (() => {
                  if (this.props.DelistContainer.delisttableData && this.props.DelistContainer.delisttableData.delist_prod_table && (this.props.DelistContainer.delistProductTableSpinner == 1)) {
                    return this.props.DelistContainer.delisttableData.delist_prod_table.map(obj => {
                      return (
                        <tr id={Math.random() + Date.now()}>
                          <td>{obj.productcode}</td>
                          <td>{obj.long_description}</td>
                          <td>{obj.no_of_stores}</td>
                          <td>{formatSales(obj.predicted_value)}</td>
                          <td>{formatVolume(obj.predicted_volume)}</td>
                          <td>{formatSales(obj.predicted_cgm)}</td>
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
                  } else if(this.props.DelistContainer.delistProductTableSpinner == 2){
                    let abcd = 1;
                    return (
                      <tr>
                        <td className="text-center" colSpan="7">Something went wrong. Please reload the page....!</td>
                      </tr>
                    )
                  } else {
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

            {(() => {

              if (this.props.DelistContainer.delisttableData && this.props.DelistContainer.delisttableData.delist_prod_table) {
                return <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  items={this.props.DelistContainer.delisttableData.pagination_count}
                  maxButtons={5}
                  activePage={this.state.activePageDelist}
                  onSelect={(e) => {
                    this.setState({activePageDelist: e});
                    this.props.onDelistProductTableSpinner();
                    let delistPaginationData = "delist_page=" + e;
                    this.props.onTableType("delist");
                    this.props.ondelistPagination(delistPaginationData);
                    this.props.ondelistTable();
                  }}
                />

              }

            })()}

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
                <table className="table table-hover table-bordered" style={{fontSize: '16px'}}>
                  <thead>
                  <tr id={Math.random() + Date.now()}>
                    <th>Substitute Product Code</th>
                    <th>Substitute Product Description</th>
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
                <ul className="pagination pagination-lg">
                  <li><a role="button" href="#"><span aria-label="Prev">‹</span></a></li>
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
                              }}><a className="page-link" >{objj}
                          </a></li>
                        )
                      })
                    }
                  })()}
                  <li><a role="button" href="#"><span aria-label="Last">›</span></a></li>
                </ul>
              </nav>

            </Modal.Body>

          </Modal>
            </div>
          </div>
        </div>
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
    onDelistProductTableSpinner: (e) => dispatch(DelistProductTableSpinnerSuccess(e)),

    //TESTING AJAX     //PAGINATION FOR DEMO TABLE
    onAjaxClick: (e) => dispatch(ajaxClick(e)),

    //CASCADING FILTERS
    onUrlParamsData: (e) => dispatch(urlParamsData(e)),
    onGenerateUrlParamsData: (e) => dispatch(generateUrlParamsData(e)),
    onApplyClick: (e) => dispatch(ApplyClick(e)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelistContainer);
