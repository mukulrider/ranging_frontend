/*
 *
 * RangingViewDelistScenarioPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingViewDelistScenarioPage from './selectors';
import messages from './messages';
import Button from 'components/button';
import Panel from 'components/panel';
import Spinner from 'components/spinner';
import {Nav} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';
import {Modal, Pagination, Accordion} from 'react-bootstrap';
import WaterFallChart2 from 'components/WaterFallChart2';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
require('react-bootstrap-table/css/react-bootstrap-table.css')

import {
  WaterfallValueChart, urlparameters
} from './actions';

import styles from './style.scss';

export class RangingViewDelistScenarioPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.urlparameters(this.props.location.search);
    this.props.onWaterfallValueChart();
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

    let formatSales = (cell) => {
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.round(cell / 1000);
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
      }
      else {
        return ('£ ' + Math.round(cell));
      }
    }

    let formatVolume = (cell) => {
      if (cell >= 1000 || cell <= -1000) {
        let rounded = Math.round(cell / 1000);
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(cell));
      }
    };

    let addingPercentage = (cell) => {
      return (cell + '%');
    }
    console.log('this.props', this.props);
    let week_13_chart, week_13_chart_cgm_chart, week_13_chart_cgm_tot_transfer, week_13_chart_cts_chart,
      week_13_chart_cts_tot_transfer, week_13_chart_sales_chart, week_13_chart_sales_tot_transfer,
      week_13_chart_vols_chart, week_13_chart_vol_tot_transfer, week_13_supplier_table, week_13_delist_table,
      week_13_chart_cgm_tot_transfer_impact, week_13_chart_vol_tot_transfer_impact,
      week_13_chart_cts_tot_transfer_impact,
      week_13_chart_sales_tot_transfer_impact;

    let week_26_chart, week_26_chart_cgm_chart, week_26_chart_cgm_tot_transfer, week_26_chart_cts_chart,
      week_26_chart_cts_tot_transfer, week_26_chart_sales_chart, week_26_chart_sales_tot_transfer,
      week_26_chart_vols_chart, week_26_chart_vol_tot_transfer, week_26_supplier_table, week_26_delist_table,
      week_26_chart_cgm_tot_transfer_impact, week_26_chart_vol_tot_transfer_impact,
      week_26_chart_cts_tot_transfer_impact,
      week_26_chart_sales_tot_transfer_impact;


    let week_52_chart, week_52_chart_cgm_chart, week_52_chart_cgm_tot_transfer, week_52_chart_cts_chart,
      week_52_chart_cts_tot_transfer, week_52_chart_sales_chart, week_52_chart_sales_tot_transfer,
      week_52_chart_vols_chart, week_52_chart_vol_tot_transfer, week_52_supplier_table, week_52_delist_table,
      week_52_chart_cgm_tot_transfer_impact, week_52_chart_vol_tot_transfer_impact,
      week_52_chart_cts_tot_transfer_impact,
      week_52_chart_sales_tot_transfer_impact;


    let week_chart, week_chart_cgm_chart, week_chart_cgm_tot_transfer, week_chart_cts_chart,
      week_chart_cts_tot_transfer, week_chart_sales_chart, week_chart_sales_tot_transfer,
      week_chart_vols_chart, week_chart_vol_tot_transfer, week_supplier_table, week_delist_table,
      week_chart_cgm_tot_transfer_impact, week_chart_vol_tot_transfer_impact, week_chart_cts_tot_transfer_impact,
      week_chart_sales_tot_transfer_impact;

    let scenario_name;

    if (this.props.RangingViewDelistScenarioPage.data) {

      scenario_name = this.props.RangingViewDelistScenarioPage.data.scenario_name;

      week_13_chart = this.props.RangingViewDelistScenarioPage.data.week_13.queryset_13[0].chart_attr;
      week_13_chart = week_13_chart.replace(/'/g, '"');
      week_13_chart = JSON.parse(week_13_chart);
      console.log('week_13', week_13_chart);

      //26 WEEKS
      week_26_chart = this.props.RangingViewDelistScenarioPage.data.week_26.queryset_26[0].chart_attr;
      week_26_chart = week_26_chart.replace(/'/g, '"');
      week_26_chart = JSON.parse(week_26_chart);
      console.log('week_26', week_26_chart);

      // //52 WEEKS
      week_52_chart = this.props.RangingViewDelistScenarioPage.data.week_52.queryset_52[0].chart_attr;
      week_52_chart = week_52_chart.replace(/'/g, '"');
      week_52_chart = JSON.parse(week_52_chart);
      console.log('week_52', week_52_chart);

      //***************************************** CHART VARIABLES *****************************************

      //13 WEEKS
      week_13_chart_cgm_chart = week_13_chart.cgm_chart;
      week_13_chart_cgm_tot_transfer = week_13_chart.cgm_tot_transfer;
      week_13_chart_cgm_tot_transfer_impact = week_13_chart.bc_cgm_contri;

      week_13_chart_cts_chart = week_13_chart.cts_chart;
      week_13_chart_cts_tot_transfer = week_13_chart.cts_tot_transfer;
      week_13_chart_cts_tot_transfer_impact = week_13_chart.bc_cts_contri;

      week_13_chart_sales_chart = week_13_chart.sales_chart;
      week_13_chart_sales_tot_transfer = week_13_chart.sales_tot_transfer;
      week_13_chart_sales_tot_transfer_impact = week_13_chart.bc_sales_contri;

      week_13_chart_vols_chart = week_13_chart.vols_chart;
      week_13_chart_vol_tot_transfer = week_13_chart.vol_tot_transfer;
      week_13_chart_vol_tot_transfer_impact = week_13_chart.bc_vols_contri;

      //26 WEEKS
      week_26_chart_cgm_chart = week_26_chart.cgm_chart;
      week_26_chart_cgm_tot_transfer = week_26_chart.cgm_tot_transfer;
      week_26_chart_cgm_tot_transfer_impact = week_13_chart.bc_cgm_contri;

      week_26_chart_cts_chart = week_26_chart.cts_chart;
      week_26_chart_cts_tot_transfer = week_26_chart.cts_tot_transfer;
      week_26_chart_cts_tot_transfer_impact = week_26_chart.bc_cts_contri;

      week_26_chart_sales_chart = week_26_chart.sales_chart;
      week_26_chart_sales_tot_transfer = week_26_chart.sales_tot_transfer;
      week_26_chart_sales_tot_transfer_impact = week_26_chart.bc_sales_contri;

      week_26_chart_vols_chart = week_26_chart.vols_chart;
      week_26_chart_vol_tot_transfer = week_26_chart.vol_tot_transfer;
      week_26_chart_vol_tot_transfer_impact = week_26_chart.bc_vols_contri;

      //52 WEEKS
      week_52_chart_cgm_chart = week_52_chart.cgm_chart;
      week_52_chart_cgm_tot_transfer = week_52_chart.cgm_tot_transfer;
      week_52_chart_cgm_tot_transfer_impact = week_52_chart.bc_cgm_contri;

      week_52_chart_cts_chart = week_52_chart.cts_chart;
      week_52_chart_cts_tot_transfer = week_52_chart.cts_tot_transfer;
      week_52_chart_cts_tot_transfer_impact = week_52_chart.bc_cts_contri;

      week_52_chart_sales_chart = week_52_chart.sales_chart;
      week_52_chart_sales_tot_transfer = week_52_chart.sales_tot_transfer;
      week_52_chart_sales_tot_transfer_impact = week_52_chart.bc_sales_contri;

      week_52_chart_vols_chart = week_52_chart.vols_chart;
      week_52_chart_vol_tot_transfer = week_52_chart.vol_tot_transfer;
      week_52_chart_vol_tot_transfer_impact = week_52_chart.bc_vols_contri;


      //****************************************************************************************************

      //********************************* SUPPLIER TABLE VARIABLES *****************************************
      //13 WEEKS
      week_13_supplier_table = this.props.RangingViewDelistScenarioPage.data.week_13.queryset_13[0].supp_attr;
      console.log('week_13_supplier_table1', week_13_supplier_table);
      week_13_supplier_table = week_13_supplier_table.replace(/'/g, '"');
      console.log('week_13_supplier_table1', week_13_supplier_table);
      week_13_supplier_table = JSON.parse(week_13_supplier_table);
      week_13_supplier_table = week_13_supplier_table.sup_attr;
      console.log('week_13_supplier_table', week_13_supplier_table);

      //26 WEEKS
      week_26_supplier_table = this.props.RangingViewDelistScenarioPage.data.week_26.queryset_26[0].supp_attr;
      week_26_supplier_table = week_26_supplier_table.replace(/'/g, '"');
      console.log('week_26_supplier_table1', week_26_supplier_table);
      week_26_supplier_table = JSON.parse(week_26_supplier_table);
      week_26_supplier_table = week_26_supplier_table.sup_attr;
      console.log('week_26_supplier_table', week_26_supplier_table);

      //52 WEEK
      week_52_supplier_table = this.props.RangingViewDelistScenarioPage.data.week_52.queryset_52[0].supp_attr;
      week_52_supplier_table = week_52_supplier_table.replace(/'/g, '"');
      console.log('week_13_supplier_table1', week_52_supplier_table);
      week_52_supplier_table = JSON.parse(week_52_supplier_table);
      week_52_supplier_table = week_52_supplier_table.sup_attr;
      console.log('week_52_supplier_table', week_52_supplier_table);
      //****************************************************************************************************

      //********************************* DELIST TABLE VARIABLES *****************************************

      //13 WEEK
      week_13_delist_table = this.props.RangingViewDelistScenarioPage.data.week_13.queryset_13[0].delist_attr;
      week_13_delist_table = week_13_delist_table.replace(/'/g, '"');
      console.log('week_13_delist_table', week_13_delist_table);
      week_13_delist_table = JSON.parse(week_13_delist_table);
      week_13_delist_table = week_13_delist_table.delist_attr;
      console.log('week_13_delist_table', week_13_delist_table);

      //26 WEEK
      week_26_delist_table = this.props.RangingViewDelistScenarioPage.data.week_26.queryset_26[0].delist_attr;
      week_26_delist_table = week_26_delist_table.replace(/'/g, '"');
      console.log('week_13_delist_table', week_26_delist_table);
      week_26_delist_table = JSON.parse(week_26_delist_table);
      week_26_delist_table = week_26_delist_table.delist_attr;
      console.log('week_26_delist_table', week_26_delist_table);

      //13 WEEK
      week_52_delist_table = this.props.RangingViewDelistScenarioPage.data.week_52.queryset_52[0].delist_attr;
      week_52_delist_table = week_52_delist_table.replace(/'/g, '"');
      console.log('week_52_delist_table', week_52_delist_table);
      week_52_delist_table = JSON.parse(week_52_delist_table);
      week_52_delist_table = week_52_delist_table.delist_attr;
      console.log('week_52_delist_table', week_52_delist_table);
      //****************************************************************************************************


      //**************************   GIVING DEFAULT VALUES   ************************************************

      week_chart_cgm_chart = week_13_chart_cgm_chart;
      week_chart_cgm_tot_transfer = week_13_chart_cgm_tot_transfer;
      week_chart_cgm_tot_transfer_impact = week_13_chart_cgm_tot_transfer_impact;
      week_chart_cts_chart = week_13_chart_cts_chart;
      week_chart_cts_tot_transfer = week_13_chart_cts_tot_transfer;
      week_chart_cts_tot_transfer_impact = week_13_chart_cts_tot_transfer_impact;
      week_chart_sales_chart = week_13_chart_sales_chart;
      week_chart_sales_tot_transfer = week_13_chart_sales_tot_transfer;
      week_chart_sales_tot_transfer_impact = week_13_chart_sales_tot_transfer_impact;
      week_chart_vols_chart = week_13_chart_vols_chart;
      week_chart_vol_tot_transfer = week_13_chart_vol_tot_transfer;
      week_chart_vol_tot_transfer_impact = week_13_chart_vol_tot_transfer_impact;
      week_supplier_table = week_13_supplier_table;
      week_delist_table = week_13_delist_table


    }
    return (
      <div>
        <Helmet
          title="RangingViewDelistScenarioPage"
          meta={[
            {name: 'description', content: 'Description of RangingViewDelistScenarioPage'},
          ]}
        />
        <div style={{
          width: '80%',
          marginLeft: '10%'
        }}>

          {/*Page title*/}
          <div className="pageTitle">
            <div className="row">
              <div className="col-xs-2" style={{marginLeft: '1.2%', marginBottom: '1%', marginTop: '1%'}}>
                <button type="button" className="btn btn-primary" onClick={() => {
                  let page = '/ranging/scenario-tracker?';
                  let objString = page;
                  window.location = objString;
                }}><span className="glyphicon glyphicon-arrow-left"/><span>Go back to Scenario tracker</span>
                </button>
              </div>
              <div className="col-xs-8">
                Scenario:
                {(() => {

                  {
                    this.props.RangingViewDelistScenarioPage.data
                  }
                  {
                    return (
                      <div>
                        {scenario_name}
                      </div>
                    )
                  }
                })()}
              </div>

              <div className="col-xs-2" style={{float: 'right',marginBottom: '1%', marginTop: '-1.2%'}}>
                <button type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          let page = '/ranging/delist?';

                          let objString = page;
                          window.location = objString;

                        }}>Delist<span className="glyphicon glyphicon-arrow-right"/></button>
              </div>
            </div>

          </div>

          <div className="row" style={{marginLeft: "0.5%", paddingTop: "-5px"}}>
            <div className="col-md-12 content-wrap">

              <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
                   className="tabsCustom">
                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                  this.setState({activeKey: "1"});
                  {/*week_chart_cgm_chart = week_13_chart_cgm_chart;*/
                  }
                  {/*week_chart_cgm_tot_transfer = week_13_chart_cgm_tot_transfer;*/
                  }
                  {/*week_chart_cts_chart = week_13_chart_cts_chart;*/
                  }
                  {/*week_chart_cts_tot_transfer = week_13_chart_cts_tot_transfer;*/
                  }
                  {/*week_chart_sales_chart = week_13_chart_sales_chart;*/
                  }
                  {/*week_chart_sales_tot_transfer = week_13_chart_sales_tot_transfer;*/
                  }
                  {/*week_chart_vols_chart = week_13_chart_vols_chart;*/
                  }
                  {/*week_chart_vol_tot_transfer = week_13_chart_vol_tot_transfer;*/
                  }
                  {/*week_supplier_table = week_13_supplier_table;*/
                  }
                  {/*week_delist_table = week_13_delist_table*/
                  }

                  {/*let week_no = "time_period=13_weeks";*/
                  }
                  {/*this.props.onwaterfallSpinner();*/
                  }
                  {/*this.props.onwaterfallProfitSpinner();*/
                  }
                  {/*this.props.onSupplierImpactTableSpinner();*/
                  }
                  {/*this.props.onDelistProductTableSpinner();*/
                  }
                  {/*this.props.onWeekClick(week_no);*/
                  }
                  {/*this.props.onWaterfallValueChart();*/
                  }
                  {/*this.props.onWeekTabClick("Week: 13 weeks ")*/
                  }
                }}><span className="tab_label">13 Weeks</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                  this.setState({activeKey: "2"});

                  {/*week_chart_cgm_chart = week_26_chart_cgm_chart;*/
                  }
                  {/*week_chart_cgm_tot_transfer = week_26_chart_cgm_tot_transfer;*/
                  }
                  {/*week_chart_cts_chart = week_26_chart_cts_chart;*/
                  }
                  {/*week_chart_cts_tot_transfer = week_26_chart_cts_tot_transfer;*/
                  }
                  {/*week_chart_sales_chart = week_26_chart_sales_chart;*/
                  }
                  {/*week_chart_sales_tot_transfer = week_26_chart_sales_tot_transfer;*/
                  }
                  {/*week_chart_vols_chart = week_26_chart_vols_chart;*/
                  }
                  {/*week_chart_vol_tot_transfer = week_26_chart_vol_tot_transfer;*/
                  }
                  {/*week_supplier_table = week_26_supplier_table;*/
                  }
                  {/*week_delist_table = week_26_delist_table*/
                  }

                  {/*let week_no = "time_period=26_weeks";*/
                  }
                  {/*this.props.onwaterfallSpinner();*/
                  }
                  {/*this.props.onwaterfallProfitSpinner();*/
                  }
                  {/*this.props.onSupplierImpactTableSpinner();*/
                  }
                  {/*this.props.onDelistProductTableSpinner();*/
                  }
                  {/*this.props.onWeekClick(week_no);*/
                  }
                  {/*this.props.onWaterfallValueChart();*/
                  }
                  {/*this.props.onWeekTabClick("Week: 26 weeks ")*/
                  }
                }}><span className="tab_label">26 Weeks</span></NavItem>

                <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                  this.setState({activeKey: "3"});

                  {/*week_chart_cgm_chart = week_52_chart_cgm_chart;*/
                  }
                  {/*week_chart_cgm_tot_transfer = week_52_chart_cgm_tot_transfer;*/
                  }
                  {/*week_chart_cts_chart = week_52_chart_cts_chart;*/
                  }
                  {/*week_chart_cts_tot_transfer = week_52_chart_cts_tot_transfer;*/
                  }
                  {/*week_chart_sales_chart = week_52_chart_sales_chart;*/
                  }
                  {/*week_chart_sales_tot_transfer = week_52_chart_sales_tot_transfer;*/
                  }
                  {/*week_chart_vols_chart = week_52_chart_vols_chart;*/
                  }
                  {/*week_chart_vol_tot_transfer = week_52_chart_vol_tot_transfer;*/
                  }
                  {/*week_supplier_table = week_52_supplier_table;*/
                  }
                  {/*week_delist_table = week_52_delist_table*/
                  }

                  console.log('week_delist_table1', week_delist_table);
                  {/*let week_no = "time_period=52_weeks";*/
                  }
                  {/*this.props.onwaterfallSpinner();*/
                  }
                  {/*this.props.onwaterfallProfitSpinner();*/
                  }
                  {/*this.props.onSupplierImpactTableSpinner();*/
                  }
                  {/*this.props.onDelistProductTableSpinner();*/
                  }
                  {/*this.props.onWeekClick(week_no);*/
                  }
                  {/*this.props.onWaterfallValueChart();*/
                  }
                  {/*this.props.onWeekTabClick("Week: 52 weeks ")*/
                  }
                }}><span className="tab_label">52 weeks</span></NavItem>
              </Nav>

              <div style={{height: '0px', width: '100%'}}>&nbsp;</div>

              {/*<div className="breadcrumb">*/}
              {/*<span className="label">&nbsp;{this.props.DelistContainer.weekBreadcrumb ? this.props.DelistContainer.weekBreadcrumb:'Week 13'}</span>*/}
              {/*<span className="label">&gt;&nbsp;&nbsp;&nbsp;&nbsp;{this.props.DelistContainer.storeBreadcrumb?this.props.DelistContainer.storeBreadcrumb:'Overview'}</span>*/}

              {/*</div>*/}

              <h2 className="pageModuleMainTitle">SALES IMPACT</h2>


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
                if (this.state.activeKey == '1') {

                  week_chart_cgm_chart = week_13_chart_cgm_chart;
                  week_chart_cgm_tot_transfer = week_13_chart_cgm_tot_transfer;
                  week_chart_cgm_tot_transfer_impact = week_13_chart_cgm_tot_transfer_impact;
                  week_chart_cts_chart = week_13_chart_cts_chart;
                  week_chart_cts_tot_transfer = week_13_chart_cts_tot_transfer;
                  week_chart_cts_tot_transfer_impact = week_13_chart_cts_tot_transfer_impact;
                  week_chart_sales_chart = week_13_chart_sales_chart;
                  week_chart_sales_tot_transfer = week_13_chart_sales_tot_transfer;
                  week_chart_sales_tot_transfer_impact = week_13_chart_sales_tot_transfer_impact;
                  week_chart_vols_chart = week_13_chart_vols_chart;
                  week_chart_vol_tot_transfer = week_13_chart_vol_tot_transfer;
                  week_chart_vol_tot_transfer_impact = week_13_chart_vol_tot_transfer_impact;
                  week_supplier_table = week_13_supplier_table;
                  week_delist_table = week_13_delist_table
                } else if (this.state.activeKey == '2') {
                  week_chart_cgm_chart = week_26_chart_cgm_chart;
                  week_chart_cgm_tot_transfer = week_26_chart_cgm_tot_transfer;
                  week_chart_cgm_tot_transfer_impact = week_26_chart_cgm_tot_transfer_impact;
                  week_chart_cts_chart = week_26_chart_cts_chart;
                  week_chart_cts_tot_transfer = week_26_chart_cts_tot_transfer;
                  week_chart_cts_tot_transfer_impact = week_26_chart_cts_tot_transfer_impact;
                  week_chart_sales_chart = week_26_chart_sales_chart;
                  week_chart_sales_tot_transfer = week_26_chart_sales_tot_transfer;
                  week_chart_sales_tot_transfer_impact = week_26_chart_sales_tot_transfer_impact;
                  week_chart_vols_chart = week_26_chart_vols_chart;
                  week_chart_vol_tot_transfer = week_26_chart_vol_tot_transfer;
                  week_chart_vol_tot_transfer_impact = week_26_chart_vol_tot_transfer_impact;
                  week_supplier_table = week_26_supplier_table;
                  week_delist_table = week_26_delist_table
                } else {
                  week_chart_cgm_chart = week_52_chart_cgm_chart;
                  week_chart_cgm_tot_transfer = week_52_chart_cgm_tot_transfer;
                  week_chart_cgm_tot_transfer_impact = week_52_chart_cgm_tot_transfer_impact;
                  week_chart_cts_chart = week_52_chart_cts_chart;
                  week_chart_cts_tot_transfer = week_52_chart_cts_tot_transfer;
                  week_chart_cts_tot_transfer_impact = week_52_chart_cts_tot_transfer_impact;
                  week_chart_sales_chart = week_52_chart_sales_chart;
                  week_chart_sales_tot_transfer = week_52_chart_sales_tot_transfer;
                  week_chart_sales_tot_transfer_impact = week_52_chart_sales_tot_transfer_impact;
                  week_chart_vols_chart = week_52_chart_vols_chart;
                  week_chart_vol_tot_transfer = week_52_chart_vol_tot_transfer;
                  week_chart_vol_tot_transfer_impact = week_52_chart_vol_tot_transfer_impact;
                  week_supplier_table = week_52_supplier_table;
                  week_delist_table = week_52_delist_table
                }
                if (this.props.RangingViewDelistScenarioPage.data && week_chart_sales_chart && week_chart_vols_chart) {
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
                                                 data={ week_chart_sales_chart }/>
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
                                      if (week_chart_sales_tot_transfer_impact > 0) {
                                        return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                      }
                                      else if (week_chart_sales_tot_transfer_impact < 0) {
                                        return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                      } else {
                                        return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                      }
                                    })()}>&nbsp;
                                    {week_chart_sales_tot_transfer_impact}%
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
                                  Total Demand Transfer:

                                  <span
                                    className={(() => {
                                      if (week_chart_sales_tot_transfer > 0) {
                                        {/*alert(this.props.RangingViewDelistScenarioPage.waterfallValue.bc_sales_contri)*/
                                        }
                                        {/*alert(this.props.RangingViewDelistScenarioPage.waterfallValue.bc_sales_contri)*/
                                        }
                                        return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                      }
                                      else if (week_chart_sales_tot_transfer < 0) {
                                        return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                      } else {
                                        return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                      }
                                    })()}>&nbsp;
                                    {week_chart_sales_tot_transfer}%
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
                                                 data={ week_chart_vols_chart }/>
                              </div>
                            </div>

                            {/*impact number*/}
                            <div className="col-xs-5 impactNumbers" style={{float: 'left'}}>

                              <Panel>
                                <div>
                                  Impact to Buying Controller:

                                  <span
                                    className={(() => {
                                      if (week_chart_vol_tot_transfer_impact > 0) {
                                        return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                      }
                                      else if (week_chart_vol_tot_transfer_impact < 0) {
                                        return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                      } else {
                                        return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                      }
                                    })()}>&nbsp;
                                    {week_chart_vol_tot_transfer_impact} %
                              </span>
                                </div>
                              </Panel>

                            </div>
                            <div className="col-xs-5 impactNumbers" style={{float: 'right'}}>

                              <Panel>
                                <div>
                                  Total Demand Transfer:

                                  <span
                                    className={(() => {
                                      if (week_chart_vol_tot_transfer > 0) {
                                        return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                      }
                                      else if (week_chart_vol_tot_transfer < 0) {
                                        return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                      } else {
                                        return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                      }
                                    })()}>&nbsp;
                                    {week_chart_vol_tot_transfer} %
                              </span>
                                </div>
                              </Panel>

                            </div>

                          </div>


                        </div>
                      </div>


                    </div>



                  )
                } else if (this.props.RangingViewDelistScenarioPage.waterfallSpinner == 2) {
                  return (
                    <div>
                      <h2 className="text-center">Something went wrong. Please reload the page....!</h2>
                    </div>
                  )
                }
                else {
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
                if (this.state.activeKey == '1') {

                  week_chart_cgm_chart = week_13_chart_cgm_chart;
                  week_chart_cgm_tot_transfer = week_13_chart_cgm_tot_transfer;
                  week_chart_cts_chart = week_13_chart_cts_chart;
                  week_chart_cts_tot_transfer = week_13_chart_cts_tot_transfer;
                  week_chart_sales_chart = week_13_chart_sales_chart;
                  week_chart_sales_tot_transfer = week_13_chart_sales_tot_transfer;
                  week_chart_vols_chart = week_13_chart_vols_chart;
                  week_chart_vol_tot_transfer = week_13_chart_vol_tot_transfer;
                  week_supplier_table = week_13_supplier_table;
                  week_delist_table = week_13_delist_table
                } else if (this.state.activeKey == '2') {
                  week_chart_cgm_chart = week_26_chart_cgm_chart;
                  week_chart_cgm_tot_transfer = week_26_chart_cgm_tot_transfer;
                  week_chart_cts_chart = week_26_chart_cts_chart;
                  week_chart_cts_tot_transfer = week_26_chart_cts_tot_transfer;
                  week_chart_sales_chart = week_26_chart_sales_chart;
                  week_chart_sales_tot_transfer = week_26_chart_sales_tot_transfer;
                  week_chart_vols_chart = week_26_chart_vols_chart;
                  week_chart_vol_tot_transfer = week_26_chart_vol_tot_transfer;
                  week_supplier_table = week_26_supplier_table;
                  week_delist_table = week_26_delist_table
                } else {
                  week_chart_cgm_chart = week_52_chart_cgm_chart;
                  week_chart_cgm_tot_transfer = week_52_chart_cgm_tot_transfer;
                  week_chart_cts_chart = week_52_chart_cts_chart;
                  week_chart_cts_tot_transfer = week_52_chart_cts_tot_transfer;
                  week_chart_sales_chart = week_52_chart_sales_chart;
                  week_chart_sales_tot_transfer = week_52_chart_sales_tot_transfer;
                  week_chart_vols_chart = week_52_chart_vols_chart;
                  week_chart_vol_tot_transfer = week_52_chart_vol_tot_transfer;
                  week_supplier_table = week_52_supplier_table;
                  week_delist_table = week_52_delist_table
                }
                if (this.props.RangingViewDelistScenarioPage.data && week_chart_cgm_chart && week_chart_cts_chart && week_chart_cgm_tot_transfer && week_chart_cts_tot_transfer) {
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
                                                 data={ week_chart_cgm_chart }/>
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
                                    if (week_chart_cgm_tot_transfer_impact > 0) {
                                      return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                    }
                                    else if (week_chart_cgm_tot_transfer_impact < 0) {
                                      return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                    } else {
                                      return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                    }
                                  })()}>&nbsp;
                                  {week_chart_cgm_tot_transfer_impact}%
                            </span>
                              </Panel>
                            </div>

                            <div className="col-xs-5 impactNumbers" style={{float: 'right'}}>
                              <Panel>
                                <div>
                                  Total Demand Transfer:
                                </div>
                                <span
                                  className={(() => {
                                    if (week_chart_cgm_tot_transfer > 0) {
                                      return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                    }
                                    else if (week_chart_cgm_tot_transfer < 0) {
                                      return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                    } else {
                                      return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                    }
                                  })()}>&nbsp;
                                  {week_chart_cgm_tot_transfer}%
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
                                                 total_text='total1'
                                                 data={ week_chart_cts_chart }/>
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
                                    if (week_chart_cts_tot_transfer_impact > 0) {
                                      return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                    }
                                    else if (week_chart_cts_tot_transfer_impact < 0) {
                                      return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                    } else {
                                      return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                    }
                                  })()}>&nbsp;
                                  {week_chart_cts_tot_transfer_impact}%
                              </span>

                              </Panel>
                            </div>
                            <div className="col-xs-5 impactNumbers" style={{float: 'right'}}>
                              <Panel>
                                <div>
                                  Total Demand Transfer:
                                </div>
                                <span
                                  className={(() => {
                                    if (week_chart_cts_tot_transfer > 0) {
                                      return "glyphicon glyphicon-chevron-up waterfallCalloutsPositive"
                                    }
                                    else if (week_chart_cts_tot_transfer < 0) {
                                      return "glyphicon glyphicon-chevron-down waterfallCalloutsNegative"
                                    } else {
                                      return "glyphicon glyphicon-minus-sign waterfallCalloutsNeutral"
                                    }
                                  })()}>&nbsp;
                                  {week_chart_cts_tot_transfer}%
                              </span>

                              </Panel>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  )
                } else if (this.props.RangingViewDelistScenarioPage.waterfallVolumeSpinner == 2) {
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

                      if (this.state.activeKey == '1') {

                        week_chart_cgm_chart = week_13_chart_cgm_chart;
                        week_chart_cgm_tot_transfer = week_13_chart_cgm_tot_transfer;
                        week_chart_cts_chart = week_13_chart_cts_chart;
                        week_chart_cts_tot_transfer = week_13_chart_cts_tot_transfer;
                        week_chart_sales_chart = week_13_chart_sales_chart;
                        week_chart_sales_tot_transfer = week_13_chart_sales_tot_transfer;
                        week_chart_vols_chart = week_13_chart_vols_chart;
                        week_chart_vol_tot_transfer = week_13_chart_vol_tot_transfer;
                        week_supplier_table = week_13_supplier_table;
                        week_delist_table = week_13_delist_table
                      } else if (this.state.activeKey == '2') {
                        week_chart_cgm_chart = week_26_chart_cgm_chart;
                        week_chart_cgm_tot_transfer = week_26_chart_cgm_tot_transfer;
                        week_chart_cts_chart = week_26_chart_cts_chart;
                        week_chart_cts_tot_transfer = week_26_chart_cts_tot_transfer;
                        week_chart_sales_chart = week_26_chart_sales_chart;
                        week_chart_sales_tot_transfer = week_26_chart_sales_tot_transfer;
                        week_chart_vols_chart = week_26_chart_vols_chart;
                        week_chart_vol_tot_transfer = week_26_chart_vol_tot_transfer;
                        week_supplier_table = week_26_supplier_table;
                        week_delist_table = week_26_delist_table
                      } else {
                        week_chart_cgm_chart = week_52_chart_cgm_chart;
                        week_chart_cgm_tot_transfer = week_52_chart_cgm_tot_transfer;
                        week_chart_cts_chart = week_52_chart_cts_chart;
                        week_chart_cts_tot_transfer = week_52_chart_cts_tot_transfer;
                        week_chart_sales_chart = week_52_chart_sales_chart;
                        week_chart_sales_tot_transfer = week_52_chart_sales_tot_transfer;
                        week_chart_vols_chart = week_52_chart_vols_chart;
                        week_chart_vol_tot_transfer = week_52_chart_vol_tot_transfer;
                        week_supplier_table = week_52_supplier_table;
                        week_delist_table = week_52_delist_table
                      }

                      if (this.props.RangingViewDelistScenarioPage.data && week_supplier_table) {

                        return (
                          <div>

                            <BootstrapTable
                              data={week_supplier_table}
                              options={options}
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

                      if (this.state.activeKey == '1') {

                        week_chart_cgm_chart = week_13_chart_cgm_chart;
                        week_chart_cgm_tot_transfer = week_13_chart_cgm_tot_transfer;
                        week_chart_cts_chart = week_13_chart_cts_chart;
                        week_chart_cts_tot_transfer = week_13_chart_cts_tot_transfer;
                        week_chart_sales_chart = week_13_chart_sales_chart;
                        week_chart_sales_tot_transfer = week_13_chart_sales_tot_transfer;
                        week_chart_vols_chart = week_13_chart_vols_chart;
                        week_chart_vol_tot_transfer = week_13_chart_vol_tot_transfer;
                        week_supplier_table = week_13_supplier_table;
                        week_delist_table = week_13_delist_table
                      } else if (this.state.activeKey == '2') {
                        week_chart_cgm_chart = week_26_chart_cgm_chart;
                        week_chart_cgm_tot_transfer = week_26_chart_cgm_tot_transfer;
                        week_chart_cts_chart = week_26_chart_cts_chart;
                        week_chart_cts_tot_transfer = week_26_chart_cts_tot_transfer;
                        week_chart_sales_chart = week_26_chart_sales_chart;
                        week_chart_sales_tot_transfer = week_26_chart_sales_tot_transfer;
                        week_chart_vols_chart = week_26_chart_vols_chart;
                        week_chart_vol_tot_transfer = week_26_chart_vol_tot_transfer;
                        week_supplier_table = week_26_supplier_table;
                        week_delist_table = week_26_delist_table
                      } else {
                        week_chart_cgm_chart = week_52_chart_cgm_chart;
                        week_chart_cgm_tot_transfer = week_52_chart_cgm_tot_transfer;
                        week_chart_cts_chart = week_52_chart_cts_chart;
                        week_chart_cts_tot_transfer = week_52_chart_cts_tot_transfer;
                        week_chart_sales_chart = week_52_chart_sales_chart;
                        week_chart_sales_tot_transfer = week_52_chart_sales_tot_transfer;
                        week_chart_vols_chart = week_52_chart_vols_chart;
                        week_chart_vol_tot_transfer = week_52_chart_vol_tot_transfer;
                        week_supplier_table = week_52_supplier_table;
                        week_delist_table = week_52_delist_table
                      }

                      if (this.props.RangingViewDelistScenarioPage.data && week_delist_table) {


                        return (
                          <div>
                            <BootstrapTable
                              data={week_delist_table}
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
                              <TableHeaderColumn dataField="per_value_transfer" dataFormat={addingPercentage}
                                                 dataSort={true} dataAlign="center">Value Transfer</TableHeaderColumn>
                              <TableHeaderColumn dataField="per_vol_transfer" dataFormat={addingPercentage}
                                                 dataSort={true} dataAlign="center">Volume Transfer</TableHeaderColumn>
                              <TableHeaderColumn dataField="psg_value_impact" dataSort={true} dataAlign="center">Product
                                Sub Group Value Impact(%)</TableHeaderColumn>
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

            </div>
          </div>

        </div>
      </div>
    );
  }
}

RangingViewDelistScenarioPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  RangingViewDelistScenarioPage: makeSelectRangingViewDelistScenarioPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onWaterfallValueChart: (e) => dispatch(WaterfallValueChart(e)),
    urlparameters: (e) => dispatch(urlparameters(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingViewDelistScenarioPage);
