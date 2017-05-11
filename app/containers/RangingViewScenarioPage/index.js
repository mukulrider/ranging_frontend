/*
 *
 * RangingViewScenarioPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingViewScenarioPage from './selectors';
import messages from './messages';
import Button from 'components/button';
import './style.scss';
import Panel from 'components/panel';
import Spinner from 'components/spinner';
import BubbleChartNpd from 'components/BubbleChartNpd';
import WaterFallChartNpd from 'components/WaterFallChartNpd';
import InputField from 'components/input_field';
import {Modal, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {Pagination, Accordion} from 'react-bootstrap';
require('react-bootstrap-table/css/react-bootstrap-table.css')

import {
  fetchRangingScenarioData,sendUrlParams
} from './actions';


export class RangingViewScenarioPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  componentDidMount = () => {
    console.log("Mounted");
    this.props.onSendUrlParams(this.props.location.query);
    this.props.onfetchRangingScenarioData();


  };

  componentDidUpdate = () => {

  };

  constructor(props) {
    super(props);
    this.state = {
      smShow: false,
      lgShow: false,
      showPreviousChanges: true,
      activeKey: '1',
      activePage: 1,

      showInfoModalFlag: false,
      infoModalHeader: '',
      infoModalHelpText: '',

    };

  }

  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '15', value: 15
      }, {
        text: 'All', value: 25
      } ], // you can change the dropdown list for size per page
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

    let formatSales = (cell) =>{
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

    let user_attributes,week_13_chart,week_26_chart,week_52_chart,week_13_table,week_26_table,week_52_table,chart_data_to_be_used,table_data_to_be_used;

    if(this.props.RangingViewScenarioPage.scenarioData) {

      user_attributes = this.props.RangingViewScenarioPage.scenarioData.user_attributes;
      user_attributes = user_attributes.replace(/'/g, '"');
      user_attributes = JSON.parse(user_attributes);

      week_13_chart = this.props.RangingViewScenarioPage.scenarioData.week_13.forecast_data;
      week_13_chart = week_13_chart.replace(/'/g, '"');
      week_13_chart = JSON.parse(week_13_chart);


      week_26_chart = this.props.RangingViewScenarioPage.scenarioData.week_26.forecast_data;
      week_26_chart = week_26_chart.replace(/'/g, '"');
      week_26_chart = JSON.parse(week_26_chart);


      week_52_chart = this.props.RangingViewScenarioPage.scenarioData.week_52.forecast_data;
      week_52_chart = week_52_chart.replace(/'/g, '"');
      week_52_chart = JSON.parse(week_52_chart);


      week_13_table = this.props.RangingViewScenarioPage.scenarioData.week_13.similar_products;
      week_13_table = week_13_table.replace(/'/g, '"');
      week_13_table = JSON.parse(week_13_table);


      week_26_table = this.props.RangingViewScenarioPage.scenarioData.week_26.similar_products;
      week_26_table = week_26_table.replace(/'/g, '"');
      week_26_table = JSON.parse(week_26_table);


      week_52_table = this.props.RangingViewScenarioPage.scenarioData.week_52.similar_products;
      week_52_table = week_52_table.replace(/'/g, '"');
      week_52_table = JSON.parse(week_52_table);

      console.log("-=-=-=user=",user_attributes);
    }


    return (
      <div>



        <Helmet
          title="RangingViewScenarioPage"
          meta={[
            {name: 'description', content: 'Description of RangingViewScenarioPage'},
          ]}
        />


        {(()=>{
          if(this.props.RangingViewScenarioPage.scenarioData){

            return (
              <div>

                {/*Page title*/}
                <div className="pageTitle">
                  Event
                  : {this.props.RangingViewScenarioPage.scenarioData.event_name} | Scenario
                  : {this.props.RangingViewScenarioPage.scenarioData.scenario_name} </div>

                {/*Breadcrumbs*/}
                <div className="row">
                  <div className="col-xs-2"><Button onClick={() => {
                    let page='/ranging/scenario-tracker?';
                    {/*let attributes='userid=sachin123'+"&scenario_name="+obj.scenario_name+"&event_name="+obj.event_name;*/}

                    let objString = page;
                    window.location = objString;

                  }}><span className="glyphicon glyphicon-arrow-left"/> Go back to Scenario tracker</Button></div>
                  <div className="col-xs-10 breadCrumbsScenario">{user_attributes.product_sub_group_description} > {user_attributes.brand_name} <b>|</b>  {user_attributes.till_roll_description} <b>|</b> {user_attributes.package_type} <b>|</b> {user_attributes.size}{user_attributes.measure_type}   </div>

                  {/*<div className="col-xs-2"><Button onClick={() => {*/}
                    {/*let page='/ranging/npd-impact?';*/}
                    {/*/!*let attributes='userid=sachin123'+"&scenario_name="+obj.scenario_name+"&event_name="+obj.event_name;*!/*/}

                    {/*let objString = page;*/}
                    {/*window.location = objString;*/}

                  {/*}}>NPD Opportunity<span className="glyphicon glyphicon-arrow-right"/></Button></div>*/}

                </div>

                {/*ASP,ACP & Size*/}

                <div className="row">


                  <div className="col-xs-3"></div>

                  {/*ASP*/}
                  <div className="col-xs-2 overview-blk">
                    <Panel>
                      <h4 className="overview-blk-heading" style={{textAlign: 'center'}}>ASP</h4>
                      <div
                        className="overview-blk-value">{user_attributes.asp}</div>
                    </Panel>
                  </div>


                  {/*ACP*/}
                  <div className="col-xs-2 overview-blk ">
                    <Panel>
                      <h4 className="overview-blk-heading" style={{textAlign: 'center'}}>ACP</h4>
                      <div
                        className="overview-blk-value">{user_attributes.acp}</div>
                    </Panel>
                  </div>

                  {/*Pack Size*/}
                  <div className="col-xs-2 overview-blk ">
                    <Panel>
                      <h4 className="overview-blk-heading" style={{textAlign: 'center'}}>PACK SIZE</h4>
                      <div
                        className="overview-blk-value">{user_attributes.size}</div>
                    </Panel>
                  </div>


                  {/*<div className="col-xs-2 overview-blk ">*/}
                    {/*<div style={{marginTop:'15%'}}>*/}
                      {/*<Button style={{marginTop: "5px"}}*/}
                              {/*onClick={() => {*/}

                              {/*}}>Edit    <span className="glyphicon glyphicon-edit"/></Button>*/}
                      {/*/!*<Button style={{marginTop: "5px"}}*!/*/}
                              {/*/!*onClick={() => {*!/*/}

                              {/*/!*}}>Refresh    <span className="glyphicon glyphicon-refresh"/></Button>*!/*/}
                    {/*</div>*/}


                  {/*</div>*/}



                </div>

                {/*Tabs*/}
                <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
                     className="tabsCustom">

                  <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                    this.setState({activeKey: "1"});
                  }}><span className="tab_label">13 Weeks</span></NavItem>

                  <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                    this.setState({activeKey: "2"});

                  }}><span className="tab_label">26 Weeks</span></NavItem>

                  <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                    this.setState({activeKey: "3"});

                  }}><span className="tab_label">52 Weeks</span></NavItem>

                </Nav>

                {/*Info Modal Declaration*/}
                <Modal show={this.state.showInfoModalFlag} bsSize="lg" style={{marginTop: '10%'}}
                       aria-labelledby="contained-modal-title-lg"
                >
                  <Modal.Header>
                    <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                                  <span className="pageModuleTitle"><b>{this.state.infoModalHeader}</b>
                                  <span style={{textAlign: 'right', float: 'right'}}
                                        onClick={() => {
                                          this.setState({showInfoModalFlag: false})
                                        }}>
                                  <b>X</b></span></span>
                      <div style={{textAlign: 'center'}}>
                        <div style={{textAlign: 'right'}}>
                        </div>
                      </div>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="infoModalText">
                    {this.state.infoModalHelpText}
                  </Modal.Body>
                </Modal>

                {/*Content*/}

                {(()=>{

                  if(this.state.activeKey=='1'){

                    chart_data_to_be_used=week_13_chart;
                    table_data_to_be_used=week_13_table;
                  }else if(this.state.activeKey=='2'){
                    chart_data_to_be_used=week_26_chart;
                    table_data_to_be_used=week_26_table;
                  }else{
                    chart_data_to_be_used=week_52_chart;
                    table_data_to_be_used=week_52_table;
                  }


                  if(true) {
                    return (
                      <Panel>
                        {/*Net Impact (Waterfall chart and impact numbers)*/}
                        <Panel>
                          <div className="row" style={{width: "100%"}}>
                            <div className="col-xs-12">
                              <div>

                                {/*Header and info modal*/}
                                <div className="row pageModuleMainTitle">
                                  <div className="col-xs-11">
                                    <div>NET IMPACT</div>
                                  </div>
                                  <div className="col-xs-1">
                        <span className="glyphicon glyphicon-info-sign pull-right infoButtonModuleMainTitle"
                              onClick={() => {
                                this.setState({showInfoModalFlag: true});
                                this.setState({infoModalHeader: "NET IMPACT"});
                                this.setState({infoModalHelpText: "Tesco’s outperformance wrt the Market at a Product Subgroup level"});
                              }}> </span>
                                  </div>
                                </div>


                                <div className="row" style={{width: "100%", marginLeft: '6%'}}>
                                  {/*Value*/}
                                  <div className="col-xs-5 ts-blk-proview">
                                    {/*<Panel>*/}

                                    {/*Subtitle*/}
                                    <div className="pageModuleSubTitle">
                                      <h4> VALUE </h4>
                                    </div>

                                    {/*Waterfall chart sales*/}
                                    <WaterFallChartNpd data={{
                                      chart_data: chart_data_to_be_used.sales_chart.data,
                                      chart_id: "net_impact_waterfall",
                                      chart_type: "value"
                                    }}/>

                                    {/*Impact numbers*/}
                                    <div className="row">
                                      <div className="col-xs-12 valueNumbers">

                                        <div className="col-xs-5 impactNumbers">

                                          <div>
                                            <h4 className="impactHeading">% CANNIBALIZATION</h4>
                                          </div>


                                          <div className="cannibalization-perc-number">
                                            {chart_data_to_be_used.sales_chart.impact.Cannibilization_perc}
                                            %
                                          </div>


                                        </div>
                                        <div className="col-xs-2"></div>

                                        <div className="col-xs-5 impactNumbers">

                                          <div>
                                            <h4 className="impactHeading"> % IMPACT IN PSG </h4>
                                          </div>


                                          <div className="cannibalization-perc-number">
                                            {chart_data_to_be_used.sales_chart.impact.perc_impact_psg}
                                            %
                                          </div>


                                        </div>
                                      </div>


                                    </div>

                                    {/*</Panel>*/}
                                  </div>

                                  <div className="col-xs-1"></div>

                                  {/*Volume*/}
                                  <div className="col-xs-5 ts-blk-proview">


                                    {/*heading*/}
                                    <div className="pageModuleSubTitle">
                                      <h4> VOLUME </h4>
                                    </div>

                                    {/*Waterfall chart*/}
                                    <WaterFallChartNpd data={{
                                      chart_data: chart_data_to_be_used.volume_chart.data,
                                      chart_id: "net_impact_waterfall_2",
                                      chart_type: "volume"
                                    }}/>

                                    {/*Impact numbers*/}
                                    <div className="row">
                                      <div className="col-xs-12 valueNumbers">

                                        <div className="col-xs-5 impactNumbers">

                                          <div>
                                            <h4 className="impactHeading"> % CANNIBALIZATION</h4>
                                          </div>

                                          <div className="cannibalization-perc-number">
                                            {chart_data_to_be_used.volume_chart.impact.Cannibilization_perc}
                                            %
                                          </div>
                                        </div>

                                        <div className="col-xs-2"></div>
                                        <div className="col-xs-5 impactNumbers">

                                          <div>
                                            <h4 className="impactHeading"> % IMPACT IN PSG </h4>
                                          </div>

                                          <div className="cannibalization-perc-number">
                                            {chart_data_to_be_used.volume_chart.impact.perc_impact_psg}
                                            %
                                          </div>

                                        </div>
                                      </div>

                                    </div>


                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>


                        </Panel>

                        {/*Cannibalization Table*/}
                        <Panel>
                          <div className="row">
                            <div className="col-xs-12">
                              <div className="net-cannibalized-prod">

                                <div className="row pageModuleMainTitle">
                                  <div className="col-xs-11">
                                    <div>CURRENT PRODUCTS THAT MIGHT BE CANNIBALIZED</div>
                                  </div>
                                  <div className="col-xs-1">
                        <span className="glyphicon glyphicon-info-sign pull-right infoButtonModuleMainTitle"
                              onClick={() => {
                                this.setState({showInfoModalFlag: true});
                                this.setState({infoModalHeader: "CURRENT PRODUCTS THAT MIGHT BE CANNIBALIZED"});
                                this.setState({infoModalHelpText: "Tesco’s outperformance wrt the Market at a Product Subgroup level"});
                              }}> </span>
                                  </div>
                                </div>
                                <div>
                                  {
                                    (() => {
                                      if (this.props.RangingViewScenarioPage.canniProdTableData) {
                                        console.log("this.props.RangingViewScenarioPage.canniProdTableData:",this.props.RangingViewScenarioPage.canniProdTableData)

                                        return (
                                          <div>
                                            <BootstrapTable
                                              data={this.props.RangingViewScenarioPage.canniProdTableData} options={options}
                                              striped={true}
                                              hover
                                              condensed
                                              pagination={ true }
                                              search={true}
                                              exportCSV={true}
                                            >
                                              <TableHeaderColumn dataField="productcode" isKey={true} dataSort={true} dataAlign="center">Brand Indicator</TableHeaderColumn>
                                              <TableHeaderColumn dataField="long_description" dataSort={true} dataAlign="center" width="9%">Products Description</TableHeaderColumn>
                                              <TableHeaderColumn dataField="predicted_volume" dataFormat={formatVolume} dataSort={true} dataAlign="center" width="9%">Volume</TableHeaderColumn>
                                              <TableHeaderColumn dataField="predicted_sales" dataFormat={formatSales} dataSort={true} dataAlign="center" width="8%">Sales Value</TableHeaderColumn>
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


                              </div>
                            </div>
                          </div>
                        </Panel>
                      </Panel>
                    )
                  }
                })()}






              </div>
            )

          }else{
            return(
              <div>
                {/*page title*/}
                <div className="pageTitle">View Scenario</div>

                <div className="loading-scenario">
                  {/*{(()=>{*/}
                    {/*document.body.style.cursor='wait';*/}

                    {/*let dots = window.setInterval( function() {*/}
                      {/*let wait = document.getElementById("wait");*/}
                      {/*if ( wait.innerHTML.length > 9 )*/}
                        {/*wait.innerHTML = "Loading";*/}
                      {/*else*/}
                        {/*wait.innerHTML += ".";*/}
                    {/*}, 1500);*/}

                  {/*})()}*/}

                  {/*<Spinner/>*/}
                  <div  id="wait" style={{marginLeft:'47%'}}>Loading...</div>

                </div>
              </div>
            )}
        })()}

      </div>
    );
  }
}

RangingViewScenarioPage.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  RangingViewScenarioPage: makeSelectRangingViewScenarioPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onfetchRangingScenarioData: (e) => dispatch(fetchRangingScenarioData(e)),
    onSendUrlParams: (e) => dispatch(sendUrlParams(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingViewScenarioPage);
