/*
 *
 * RangingNpdImpactPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingNpdImpactPage from './selectors';
import messages from './messages';
// -----------------------------------------
import {browserHistory} from 'react-router';
import Button from 'components/button';
import './style.scss';
import Panel from 'components/panel';
import Spinner from 'components/spinner';
import BubbleChartNpd from 'components/BubbleChartNpd';
import WaterFallChartNpd from 'components/WaterFallChartNpd';
import InputField from 'components/input_field';
import {Modal, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {Pagination, Accordion} from 'react-bootstrap';
import {
  dataFetchOnPageLoad, dataFetchOnBubbleData, dataFetchCanniProdTable, dataFetchOnWaterFallChart,
  sendUrlParams, generateSideFilter, generateUrlParams, generateUrlParamsString,
  saveWeekParam, checkboxChange,
  pageLoadSelectFilterIndicator,showApplyButtonLoadingIndication,showTabChangeLoadingIndication,showPageContentAfterLoading,
  saveTable2SearchParam, saveTable1SearchParam, saveTable2PageParam, saveTable1PageParam,
  saveAspFilterData, saveAcpFilterData, saveSizeFilterData, saveFilterSelectionsTillNow, updateBreadCrumbs
} from './actions';
import CascadedFilterNpdImpact from 'components/CascadedFilterNpdImpact';


export class RangingNpdImpactPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  componentDidMount = () => {
    this.props.onSendUrlParams(this.props.location.query);
    // this.props.onDataFetchOnBubbleData();
    // this.props.onDataFetchCanniProdTable();
    // this.props.onDataFetchOnPageLoad();

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
      activePageSupTable: 1,
      showInfoModalFlag: false,
      infoModalHeader: '',
      infoModalHelpText: '',
    };

  }


  setCookie = (filter_selections) => {

    document.cookie = filter_selections;
  };

  render() {


    //For url parameters
    let dataWeekUrlParams = this.props.RangingNpdImpactPage.dataWeekUrlParams;
    let dataPageUrlParams = this.props.RangingNpdImpactPage.dataPageUrlParams;
    let dataFilterUrlParams = this.props.RangingNpdImpactPage.urlParamsString;
    let dataTable1PageUrlParams = this.props.RangingNpdImpactPage.dataTable1PageUrlParams;
    let dataTable2PageUrlParams = this.props.RangingNpdImpactPage.dataTable2PageUrlParams;


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
        let rounded = Math.round(i / 1000)
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(i));
      }


    };


    return (
      <div>

        {/*Page title*/}
        <div className="pageTitle">NPD Impact</div>


        <div className="flextcontent">

          {/*Filters*/}
          <div className="flexleft">
            <Panel>

              <CascadedFilterNpdImpact sideFilter={this.props.RangingNpdImpactPage.sideFilter}
                                       location={this.props.location}

                                       onGenerateUrlParams={this.props.onGenerateUrlParams}
                                       onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                       onSendUrlParams={this.props.onSendUrlParams}

                                       onDataFetchOnBubbleData={this.props.onDataFetchOnBubbleData}
                                       onDataFetchCanniProdTable={this.props.onDataFetchCanniProdTable}
                                       onDataFetchOnPageLoad={this.props.onDataFetchOnPageLoad}

                                       dataWeekUrlParams={dataWeekUrlParams}
                                       dataFilterUrlParams={dataFilterUrlParams}

                                       previous_selection={this.props.RangingNpdImpactPage.filter_selection}
                                       urlParamsString={this.props.RangingNpdImpactPage.urlParamsString}
                                       onCheckboxChange={this.props.onCheckboxChange}
                                       onGenerateSideFilter={this.props.onGenerateSideFilter}

                                       onUpdateBreadCrumbs={this.props.onUpdateBreadCrumbs}
                                       onUpdateApplyButtonLoadingIndication={this.props.onUpdateApplyButtonLoadingIndication}
                                       onPageLoadSelectFilterIndicator={this.props.onPageLoadSelectFilterIndicator}


                                       onSaveAspFilterData={this.props.onSaveAspFilterData}
                                       onSaveAcpFilterData={this.props.onSaveAcpFilterData}
                                       onSaveSizeFilterData={this.props.onSaveSizeFilterData}
                                       onSaveFilterSelectionsTillNow={this.props.onSaveFilterSelectionsTillNow}

                                       ASP_field_entry={this.props.RangingNpdImpactPage.ASP_field_entry}
                                       ACP_field_entry={this.props.RangingNpdImpactPage.ACP_field_entry}
                                       Size_field_entry={this.props.RangingNpdImpactPage.Size_field_entry}
                                       filterSelectionsTillNow={this.props.RangingNpdImpactPage.filterSelectionsTillNow}

              />

            </Panel>
          </div>


          {/*Content*/}

          <div className="flexright">

            {(() => {

              if (this.props.RangingNpdImpactPage.showSelectFilterIndicator) {

                return (

                  <div className="selectAttributeIndicator">
                    <div>
                      <div style={{marginTop: '25%'}}> ----- Please select the attributes ------</div>
                    </div>
                  </div>

                )
              }else if(this.props.RangingNpdImpactPage.showApplyButtonLoading){
               return(
                 <div className="selectAttributeIndicator">
                   <div style={{marginTop: '25%'}}>
                     <Spinner/>
                   </div>
                   <div>
                     <div style={{marginTop: '1%'}}> Loading...</div>
                   </div>
                 </div>

               )
              }else if (this.props.RangingNpdImpactPage.showPageAfterLoading) {


                  return (

                    <div style={{width: '100%'}}>

                      {(()=>{
                        if(this.props.RangingNpdImpactPage.showTabChangeLoading){
                          console.log("div executed");
                          return (
                        <div>
                            <div className="loadingAfterApply">

                            <div>
                              {/*<Spinner/>*/}
                              <div style={{marginLeft:'35%',position:'fixed'}}> Loading...</div>
                            </div>
                          </div>


                          <div className="content-wrap">


                            <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
                                 className="tabsCustom">

                              <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                                this.setState({activeKey: "1"});
                                dataWeekUrlParams = "week_flag=Latest 13 Weeks";

                                this.props.onUpdateTabChangeLoadingIndication(true);
                                this.props.onSaveWeekParam(dataWeekUrlParams);
                                this.props.onDataFetchCanniProdTable();
                                this.props.onDataFetchOnPageLoad();
                                this.props.onDataFetchOnBubbleData();

                              }}><span className="tab_label">13 Weeks</span></NavItem>

                              <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                                this.setState({activeKey: "2"});
                                dataWeekUrlParams = "week_flag=Latest 26 Weeks";

                                this.props.onUpdateTabChangeLoadingIndication(true);
                                this.props.onSaveWeekParam(dataWeekUrlParams);
                                this.props.onDataFetchCanniProdTable();
                                this.props.onDataFetchOnPageLoad();
                                this.props.onDataFetchOnBubbleData();

                              }}><span className="tab_label">26 Weeks</span></NavItem>

                              <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                                dataWeekUrlParams = "week_flag=Latest 52 Weeks";

                                this.setState({activeKey: "3"});
                                this.props.onUpdateTabChangeLoadingIndication(true);
                                this.props.onSaveWeekParam(dataWeekUrlParams);
                                this.props.onDataFetchCanniProdTable();
                                this.props.onDataFetchOnPageLoad();
                                this.props.onDataFetchOnBubbleData();


                              }}><span className="tab_label">52 Weeks</span></NavItem>


                            </Nav>

                            {/*BreadCrumbs*/}
                            {(() => {
                              if (this.props.breadCrumbs !== '') {
                                return (
                                  <div className="breadCrumbs">
                                    {this.props.RangingNpdImpactPage.breadCrumbs}
                                  </div>
                                )
                              }
                            })()}


                            {/*Edit forecast modal*/}
                            <Modal show={this.state.lgShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
                              <Modal.Body>
                                <div>
                                  <div className="row">
                                    <div className="col-xs-12">

                                      <div className="col-xs-6 center-this">
                                        <Panel>
                                          <div>
                                            <h4>PREDICTED FORECAST</h4>
                                          </div>

                                          {(() => {
                                            if (this.props.RangingNpdImpactPage.waterFallChartData) {

                                              return (
                                                <div className="cannibalization-perc-number">
                                                  {/*{this.props.RangingNpdImpactPage.waterFallChartData.impact.Cannibilized_volume} %*/}
                                                </div>
                                              )
                                            }
                                          })()}

                                        </Panel>
                                      </div>

                                      <div className="col-xs-6 center-this">
                                        <Panel>
                                          <div>
                                            <h4>EDIT FORECAST</h4>
                                          </div>
                                          <InputField type="text"
                                                      placeholder="Enter Forecast Value"
                                                      value={this.props.newForecastName}
                                            // onChange={(e) => {
                                            // this.props.onGenerateForecastName(e.target.value)}}
                                          />
                                          <br/>

                                        </Panel>
                                      </div>
                                    </div>


                                  </div>
                                  <br/>
                                  {/*<a href="/pricing/scenario-tracker/">*/}
                                  <Button
                                    onClick={() => {
                                      this.props.onGenerateNewScenario2();
                                      this.setState({lgShow: true})
                                    }}
                                    style={{display: 'block', margin: '0 auto'}}>
                                    Generate Forecast
                                  </Button>
                                  {/*</a>*/}
                                  <br/>
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
                                          <Panel>

                                            {/*Subtitle*/}
                                            <div className="pageModuleSubTitle">
                                              <h4> VALUE </h4>
                                            </div>

                                            {/*Waterfall chart*/}
                                            {(() => {
                                              if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                                return (
                                                  <WaterFallChartNpd data={{
                                                    chart_data: this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.data,
                                                    chart_id: "net_impact_waterfall",
                                                    chart_type: "value"
                                                  }}/>
                                                )
                                              } else {
                                                return (
                                                  <div>
                                                    <h2 className="text-center"><Spinner />Please Wait a Moment....!</h2>
                                                  </div>
                                                )
                                              }
                                            })()}

                                            {/*Impact numbers*/}
                                            <div className="row">
                                              <div className="col-xs-12 valueNumbers">

                                                <div className="col-xs-5 impactNumbers">
                                                  <Panel>
                                                    <div>
                                                      <h4 className="impactHeading">% CANNIBALIZATION</h4>
                                                    </div>

                                                    {(() => {
                                                      if (this.props.RangingNpdImpactPage.canniProdTableData) {

                                                        return (
                                                          <div className="cannibalization-perc-number">
                                                            {this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.impact.Cannibilization_perc}
                                                            %
                                                          </div>
                                                        )
                                                      }
                                                    })()}

                                                  </Panel>
                                                </div>
                                                <div className="col-xs-2"></div>

                                                <div className="col-xs-5 impactNumbers">
                                                  <Panel>
                                                    <div>
                                                      <h4 className="impactHeading"> % IMPACT IN PSG </h4>
                                                    </div>

                                                    {(() => {
                                                      if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                                        return (
                                                          <div className="cannibalization-perc-number">
                                                            {this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.impact.perc_impact_psg}
                                                            %
                                                          </div>
                                                        )
                                                      }
                                                    })()}
                                                  </Panel>
                                                </div>
                                              </div>


                                            </div>
                                          </Panel>
                                        </div>

                                        <div className="col-xs-1"></div>

                                        {/*Volume*/}
                                        <div className="col-xs-5 ts-blk-proview">
                                          <Panel>
                                            <div className="pageModuleSubTitle">
                                              <h4> VOLUME </h4>
                                            </div>

                                            {/*Waterfall chart*/}
                                            {(() => {
                                              if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                                return (
                                                  <WaterFallChartNpd data={{
                                                    chart_data: this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.data,
                                                    chart_id: "net_impact_waterfall_2",
                                                    chart_type: "volume"
                                                  }}/>
                                                )
                                              } else {
                                                return (
                                                  <div>
                                                    <h2 className="text-center"><Spinner />Please Wait a Moment....!</h2>
                                                  </div>
                                                )
                                              }
                                            })()}

                                            {/*Impact numbers*/}
                                            <div className="row">
                                              <div className="col-xs-12 valueNumbers">

                                                <div className="col-xs-5 impactNumbers">
                                                  <Panel>
                                                    <div>
                                                      <h4 className="impactHeading"> % CANNIBALIZATION</h4>
                                                    </div>

                                                    {(() => {
                                                      if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                                        {/*console.log('this.props.RangingNpdImpactPage.waterFallChartData',this.props.RangingNpdImpactPage.waterFallChartData);*/
                                                        }
                                                        return (
                                                          <div className="cannibalization-perc-number">
                                                            {this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.impact.Cannibilization_perc}
                                                            %
                                                          </div>
                                                        )
                                                      }
                                                    })()}
                                                  </Panel>
                                                </div>

                                                <div className="col-xs-2"></div>
                                                <div className="col-xs-5 impactNumbers">
                                                  <Panel>
                                                    <div>
                                                      <h4 className="impactHeading"> % IMPACT IN PSG </h4>
                                                    </div>

                                                    {(() => {
                                                      if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                                        return (
                                                          <div className="cannibalization-perc-number">
                                                            {this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.impact.perc_impact_psg}
                                                            %
                                                          </div>
                                                        )
                                                      }
                                                    })()}
                                                  </Panel>
                                                </div>
                                              </div>

                                            </div>

                                          </Panel>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <Button
                                  onClick={() => this.setState({lgShow: true})}
                                  style={{display: 'block', marginTop: '5px'}}>
                                  EDIT VOLUME FORECAST
                                </Button>

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


                                      <div id="table">

                                        {/*Search*/}
                                        <div className="col-xs-12 col-xs-5" style={{marginBottom: "10px"}}>
                                          <InputField type={'string'}
                                                      placeholder="Search Product Description"
                                                      value={this.props.searchTable1}
                                                      onChange={(e) => {
                                                        this.props.onSaveTable1SearchParam(e);
                                                        this.props.onDataFetchCanniProdTable();
                                                      }}
                                          />
                                        </div>

                                        <div className="col-xs-0 col-xs-7 " style={{textAlign: "right"}}>
                                          {/*<a style={{fontSize:"15px",verticalAlign:"centre"}} onClick={()=>{*/}
                                          {/*this.props.onGenerateTextBoxQueryString('');*/}
                                          {/*this.props.onUnmatchedProdTable();*/}
                                          {/*}}> Clear </a>*/}
                                        </div>


                                        {/*table*/}
                                        <table className="table table-hover table-bordered " width="100%">
                                          <thead>
                                          <tr className="table-header-format"
                                              style={{fontSize: "16px", fontFamily: "Tesco"}}>
                                            {/*<th>Branded Name</th>*/}
                                            <th>Brand Indicator</th>
                                            <th>Products Description</th>
                                            <th>Volume</th>
                                            <th>Sales Value</th>
                                          </tr>
                                          </thead>
                                          <tbody className="table-body-format">
                                          {(() => {
                                            if (this.props.RangingNpdImpactPage.canniProdTableData) {

                                              return this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.df.map(obj => {

                                                return (
                                                  <tr key={Math.random() + Date.now()}>
                                                    {/*<td>{obj.brand_name}</td>*/}
                                                    <td>{obj.brand_indicator}</td>
                                                    <td>{obj.long_description}</td>
                                                    <td>{formatVolume(obj.predicted_volume)}</td>
                                                    <td>{formatSales(obj.predicted_sales)}</td>
                                                  </tr>
                                                )

                                              })
                                            }

                                          })()}
                                          </tbody>
                                        </table>

                                        {/*pagination*/}

                                        {(() => {

                                          if (this.props.RangingNpdImpactPage.canniProdTableData && this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.count) {

                                            return <Pagination
                                              prev
                                              next
                                              first
                                              last
                                              ellipsis
                                              boundaryLinks
                                              items={this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.pagination_count}
                                              maxButtons={5}
                                              activePageSupTable={this.state.activePageSupTable}
                                              onSelect={(e) => {
                                                alert(e);

                                                this.setState({activePageSupTable: e})

                                                let dataTable1PageUrlParamsNew = "page=" + e;
                                                alert(dataTable1PageUrlParamsNew);
                                                {/*console.log("printing pagination for bubble table", dataTable2PageUrlParamsNew);*/
                                                }
                                                this.props.onSaveTable1PageParam(dataTable1PageUrlParamsNew);
                                                this.props.onDataFetchCanniProdTable();

                                              }}
                                            />

                                          }


                                        })()}

                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </Panel>

                              {/*Supplier Impact(Table and bubble chart*/}
                              <Panel>
                                <div className="row">
                                  <div className="col-xs-12">
                                    <div className="supplier-performance">

                                      <div className="row pageModuleMainTitle">
                                        <div className="col-xs-11">
                                          <div>SUPPLIER PERFORMANCE IN PAST</div>
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


                                      {/*Bubble Chart*/}
                                      <div className="col-xs-6 ">
                                        {(() => {
                                          if (this.props.RangingNpdImpactPage.npd_bubble_chart_data) {
                                            {/*console.log("Entered the bubble function in index");*/
                                            }
                                            return (
                                              <BubbleChartNpd
                                                data={[this.props.RangingNpdImpactPage.npd_bubble_chart_data, "bubble_chart_npd", "cps_quartile", "pps_quartile", "rate_of_sale"]}/>
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

                                      </div>

                                      {/*Bubble Table*/}
                                      <div className="col-xs-6">
                                        <div id="table">


                                          {/*Search*/}
                                          <div className="col-xs-12 col-xs-5" style={{marginBottom: "10px"}}>
                                            <InputField type={'string'}
                                                        dataTable2PageUrlParamsNew="page1=1"
                                                        placeholder="Search Product Description"
                                                        value={this.props.searchTable2}
                                                        onChange={(e) => {

                                                          this.props.onSaveTable2SearchParam(e);
                                                          this.props.onDataFetchOnPageLoad();
                                                          this.props.onSaveTable2PageParam(dataTable2PageUrlParamsNew);
                                                        }}
                                            />
                                          </div>
                                          <div className="col-xs-0 col-xs-7 " style={{textAlign: "right"}}>
                                            {/*<a style={{fontSize:"15px",verticalAlign:"centre"}} onClick={()=>{*/}
                                            {/*this.props.onGenerateTextBoxQueryString('');*/}
                                            {/*this.props.onUnmatchedProdTable();*/}
                                            {/*}}> Clear </a>*/}
                                          </div>

                                          {/*Table*/}
                                          <table className="table table-hover table-bordered " width="100%">
                                            <thead>
                                            <tr className="table-header-format"
                                                style={{fontSize: "16px", fontFamily: "Tesco", textAlign: 'center'}}
                                                key={Math.random() + Date.now()}>
                                              <th>BPN</th>
                                              <th>Description</th>
                                              <th>CPS</th>
                                              <th>Profit / Store</th>
                                            </tr>
                                            </thead>
                                            <tbody className="table-body-format">
                                            {(() => {
                                              if (this.props.RangingNpdImpactPage.npd_bubble_table_data) {
                                                return this.props.RangingNpdImpactPage.npd_bubble_table_data.table.map(obj => {

                                                  return (
                                                    <tr key={Math.random() + Date.now() + Math.random()}>
                                                      <td>{obj.base_product_number}</td>
                                                      <td>{obj.long_description}</td>
                                                      <td>{obj.cps}</td>
                                                      <td>{obj.pps}</td>
                                                    </tr>
                                                  )
                                                })
                                              }
                                            })()}
                                            </tbody>
                                          </table>

                                          {/*pagination*/}


                                          {(() => {
                                            if (this.props.RangingNpdImpactPage.npd_bubble_table_data && this.props.RangingNpdImpactPage.npd_bubble_table_data.count) {

                                              return <Pagination
                                                prev
                                                next
                                                first
                                                last
                                                ellipsis
                                                boundaryLinks
                                                items={this.props.RangingNpdImpactPage.npd_bubble_table_data.pagination_count}
                                                maxButtons={5}
                                                activePage={this.state.activePage}
                                                onSelect={(e) => {

                                                  this.setState({activePage: e})

                                                  let dataTable2PageUrlParamsNew = "page1=" + e;
                                                  {/*console.log("printing pagination for bubble table", dataTable2PageUrlParamsNew);*/
                                                  }
                                                  this.props.onSaveTable2PageParam(dataTable2PageUrlParamsNew);
                                                  this.props.onDataFetchOnPageLoad();


                                                }}
                                              />

                                            }
                                          })()}


                                        </div>
                                      </div>

                                    </div>
                                  </div>
                                </div>
                              </Panel>

                            </Panel>

                          </div>

                        </div>
                          )
                        }else{
                          return(
                        <div className="content-wrap">

                        {(()=>{

                          console.log("Executed render");
                        })()}

                        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
                        className="tabsCustom">

                        <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                        this.setState({activeKey: "1"});
                        dataWeekUrlParams = "week_flag=Latest 13 Weeks";

                        this.props.onUpdateTabChangeLoadingIndication(true);
                        this.props.onSaveWeekParam(dataWeekUrlParams);
                        this.props.onDataFetchCanniProdTable();
                        this.props.onDataFetchOnPageLoad();
                        this.props.onDataFetchOnBubbleData();

                      }}><span className="tab_label">13 Weeks</span></NavItem>

                        <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                        this.setState({activeKey: "2"});
                        dataWeekUrlParams = "week_flag=Latest 26 Weeks";

                        this.props.onUpdateTabChangeLoadingIndication(true);
                        this.props.onSaveWeekParam(dataWeekUrlParams);
                        this.props.onDataFetchCanniProdTable();
                        this.props.onDataFetchOnPageLoad();
                        this.props.onDataFetchOnBubbleData();

                      }}><span className="tab_label">26 Weeks</span></NavItem>

                        <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                        dataWeekUrlParams = "week_flag=Latest 52 Weeks";

                        this.setState({activeKey: "3"});
                        this.props.onUpdateTabChangeLoadingIndication(true);
                        this.props.onSaveWeekParam(dataWeekUrlParams);
                        this.props.onDataFetchCanniProdTable();
                        this.props.onDataFetchOnPageLoad();
                        this.props.onDataFetchOnBubbleData();


                      }}><span className="tab_label">52 Weeks</span></NavItem>


                        </Nav>

                        {/*BreadCrumbs*/}
                        {(() => {
                          if (this.props.breadCrumbs !== '') {
                            return (
                              <div className="breadCrumbs">
                                {this.props.RangingNpdImpactPage.breadCrumbs}
                              </div>
                            )
                          }
                        })()}


                        {/*Edit forecast modal*/}
                        <Modal show={this.state.lgShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
                        <Modal.Body>
                        <div>
                        <div className="row">
                        <div className="col-xs-12">

                        <div className="col-xs-6 center-this">
                        <Panel>
                        <div>
                        <h4>PREDICTED FORECAST</h4>
                        </div>

                        {(() => {
                          if (this.props.RangingNpdImpactPage.waterFallChartData) {

                            return (
                              <div className="cannibalization-perc-number">
                                {/*{this.props.RangingNpdImpactPage.waterFallChartData.impact.Cannibilized_volume} %*/}
                              </div>
                            )
                          }
                        })()}

                        </Panel>
                        </div>

                        <div className="col-xs-6 center-this">
                        <Panel>
                        <div>
                        <h4>EDIT FORECAST</h4>
                        </div>
                        <InputField type="text"
                        placeholder="Enter Forecast Value"
                        value={this.props.newForecastName}
                        // onChange={(e) => {
                        // this.props.onGenerateForecastName(e.target.value)}}
                        />
                        <br/>

                        </Panel>
                        </div>
                        </div>


                        </div>
                        <br/>
                        {/*<a href="/pricing/scenario-tracker/">*/}
                        <Button
                        onClick={() => {
                        this.props.onGenerateNewScenario2();
                        this.setState({lgShow: true})
                      }}
                        style={{display: 'block', margin: '0 auto'}}>
                        Generate Forecast
                        </Button>
                        {/*</a>*/}
                        <br/>
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
                        <Panel>

                        {/*Subtitle*/}
                        <div className="pageModuleSubTitle">
                        <h4> VALUE </h4>
                        </div>

                        {/*Waterfall chart*/}
                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {
                            return (
                              <WaterFallChartNpd data={{
                                chart_data: this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.data,
                                chart_id: "net_impact_waterfall",
                                chart_type: "value"
                              }}/>
                            )
                          } else {
                            return (
                              <div>
                                <h2 className="text-center"><Spinner />Please Wait a Moment....!</h2>
                              </div>
                            )
                          }
                        })()}

                        {/*Impact numbers*/}
                        <div className="row">
                        <div className="col-xs-12 valueNumbers">

                        <div className="col-xs-5 impactNumbers">
                        <Panel>
                        <div>
                        <h4 className="impactHeading">% CANNIBALIZATION</h4>
                        </div>

                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {

                            return (
                              <div className="cannibalization-perc-number">
                                {this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.impact.Cannibilization_perc}
                                %
                              </div>
                            )
                          }
                        })()}

                        </Panel>
                        </div>
                        <div className="col-xs-2"></div>

                        <div className="col-xs-5 impactNumbers">
                        <Panel>
                        <div>
                        <h4 className="impactHeading"> % IMPACT IN PSG </h4>
                        </div>

                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {
                            return (
                              <div className="cannibalization-perc-number">
                                {this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.impact.perc_impact_psg}
                                %
                              </div>
                            )
                          }
                        })()}
                        </Panel>
                        </div>
                        </div>


                        </div>
                        </Panel>
                        </div>

                        <div className="col-xs-1"></div>

                        {/*Volume*/}
                        <div className="col-xs-5 ts-blk-proview">
                        <Panel>
                        <div className="pageModuleSubTitle">
                        <h4> VOLUME </h4>
                        </div>

                        {/*Waterfall chart*/}
                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {
                            return (
                              <WaterFallChartNpd data={{
                                chart_data: this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.data,
                                chart_id: "net_impact_waterfall_2",
                                chart_type: "volume"
                              }}/>
                            )
                          } else {
                            return (
                              <div>
                                <h2 className="text-center"><Spinner />Please Wait a Moment....!</h2>
                              </div>
                            )
                          }
                        })()}

                        {/*Impact numbers*/}
                        <div className="row">
                        <div className="col-xs-12 valueNumbers">

                        <div className="col-xs-5 impactNumbers">
                        <Panel>
                        <div>
                        <h4 className="impactHeading"> % CANNIBALIZATION</h4>
                        </div>

                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {
                            {/*console.log('this.props.RangingNpdImpactPage.waterFallChartData',this.props.RangingNpdImpactPage.waterFallChartData);*/
                            }
                            return (
                              <div className="cannibalization-perc-number">
                                {this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.impact.Cannibilization_perc}
                                %
                              </div>
                            )
                          }
                        })()}
                        </Panel>
                        </div>

                        <div className="col-xs-2"></div>
                        <div className="col-xs-5 impactNumbers">
                        <Panel>
                        <div>
                        <h4 className="impactHeading"> % IMPACT IN PSG </h4>
                        </div>

                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {
                            return (
                              <div className="cannibalization-perc-number">
                                {this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.impact.perc_impact_psg}
                                %
                              </div>
                            )
                          }
                        })()}
                        </Panel>
                        </div>
                        </div>

                        </div>

                        </Panel>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>

                        <Button
                        onClick={() => this.setState({lgShow: true})}
                        style={{display: 'block', marginTop: '5px'}}>
                        EDIT VOLUME FORECAST
                        </Button>

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


                        <div id="table">

                        {/*Search*/}
                        <div className="col-xs-12 col-xs-5" style={{marginBottom: "10px"}}>
                        <InputField type={'string'}
                        placeholder="Search Product Description"
                        value={this.props.searchTable1}
                        onChange={(e) => {
                        this.props.onSaveTable1SearchParam(e);
                        this.props.onDataFetchCanniProdTable();
                      }}
                        />
                        </div>

                        <div className="col-xs-0 col-xs-7 " style={{textAlign: "right"}}>
                        {/*<a style={{fontSize:"15px",verticalAlign:"centre"}} onClick={()=>{*/}
                        {/*this.props.onGenerateTextBoxQueryString('');*/}
                        {/*this.props.onUnmatchedProdTable();*/}
                        {/*}}> Clear </a>*/}
                        </div>


                        {/*table*/}
                        <table className="table table-hover table-bordered " width="100%">
                        <thead>
                        <tr className="table-header-format"
                        style={{fontSize: "16px", fontFamily: "Tesco"}}>
                        {/*<th>Branded Name</th>*/}
                        <th>Brand Indicator</th>
                        <th>Products Description</th>
                        <th>Volume</th>
                        <th>Sales Value</th>
                        </tr>
                        </thead>
                        <tbody className="table-body-format">
                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {

                            return this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.df.map(obj => {

                              return (
                                <tr key={Math.random() + Date.now()}>
                                  {/*<td>{obj.brand_name}</td>*/}
                                  <td>{obj.brand_indicator}</td>
                                  <td>{obj.long_description}</td>
                                  <td>{formatVolume(obj.predicted_volume)}</td>
                                  <td>{formatSales(obj.predicted_sales)}</td>
                                </tr>
                              )

                            })
                          }

                        })()}
                        </tbody>
                        </table>

                        {/*pagination*/}

                        {(() => {

                          if (this.props.RangingNpdImpactPage.canniProdTableData && this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.count) {

                            return <Pagination
                              prev
                              next
                              first
                              last
                              ellipsis
                              boundaryLinks
                              items={this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.pagination_count}
                              maxButtons={5}
                              activePageSupTable={this.state.activePageSupTable}
                              onSelect={(e) => {
                                alert(e);

                                this.setState({activePageSupTable: e})

                                let dataTable1PageUrlParamsNew = "page=" + e;
                                alert(dataTable1PageUrlParamsNew);
                                {/*console.log("printing pagination for bubble table", dataTable2PageUrlParamsNew);*/
                                }
                                this.props.onSaveTable1PageParam(dataTable1PageUrlParamsNew);
                                this.props.onDataFetchCanniProdTable();

                              }}
                            />

                          }


                        })()}

                        </div>

                        </div>
                        </div>
                        </div>
                        </Panel>

                        {/*Supplier Impact(Table and bubble chart*/}
                        <Panel>
                        <div className="row">
                        <div className="col-xs-12">
                        <div className="supplier-performance">

                        <div className="row pageModuleMainTitle">
                        <div className="col-xs-11">
                        <div>SUPPLIER PERFORMANCE IN PAST</div>
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


                        {/*Bubble Chart*/}
                        <div className="col-xs-6 ">
                        {(() => {
                          if (this.props.RangingNpdImpactPage.npd_bubble_chart_data) {
                            {/*console.log("Entered the bubble function in index");*/
                            }
                            return (
                              <BubbleChartNpd
                                data={[this.props.RangingNpdImpactPage.npd_bubble_chart_data, "bubble_chart_npd", "cps_quartile", "pps_quartile", "rate_of_sale"]}/>
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

                        </div>

                        {/*Bubble Table*/}
                        <div className="col-xs-6">
                        <div id="table">


                        {/*Search*/}
                        <div className="col-xs-12 col-xs-5" style={{marginBottom: "10px"}}>
                        <InputField type={'string'}
                        dataTable2PageUrlParamsNew="page1=1"
                        placeholder="Search Product Description"
                        value={this.props.searchTable2}
                        onChange={(e) => {

                        this.props.onSaveTable2SearchParam(e);
                        this.props.onDataFetchOnPageLoad();
                        this.props.onSaveTable2PageParam(dataTable2PageUrlParamsNew);
                      }}
                        />
                        </div>
                        <div className="col-xs-0 col-xs-7 " style={{textAlign: "right"}}>
                        {/*<a style={{fontSize:"15px",verticalAlign:"centre"}} onClick={()=>{*/}
                        {/*this.props.onGenerateTextBoxQueryString('');*/}
                        {/*this.props.onUnmatchedProdTable();*/}
                        {/*}}> Clear </a>*/}
                        </div>

                        {/*Table*/}
                        <table className="table table-hover table-bordered " width="100%">
                        <thead>
                        <tr className="table-header-format"
                        style={{fontSize: "16px", fontFamily: "Tesco", textAlign: 'center'}}
                        key={Math.random() + Date.now()}>
                        <th>BPN</th>
                        <th>Description</th>
                        <th>CPS</th>
                        <th>Profit / Store</th>
                        </tr>
                        </thead>
                        <tbody className="table-body-format">
                        {(() => {
                          if (this.props.RangingNpdImpactPage.npd_bubble_table_data) {
                            return this.props.RangingNpdImpactPage.npd_bubble_table_data.table.map(obj => {

                              return (
                                <tr key={Math.random() + Date.now() + Math.random()}>
                                  <td>{obj.base_product_number}</td>
                                  <td>{obj.long_description}</td>
                                  <td>{obj.cps}</td>
                                  <td>{obj.pps}</td>
                                </tr>
                              )
                            })
                          }
                        })()}
                        </tbody>
                        </table>

                        {/*pagination*/}


                        {(() => {
                          if (this.props.RangingNpdImpactPage.npd_bubble_table_data && this.props.RangingNpdImpactPage.npd_bubble_table_data.count) {

                            return <Pagination
                              prev
                              next
                              first
                              last
                              ellipsis
                              boundaryLinks
                              items={this.props.RangingNpdImpactPage.npd_bubble_table_data.pagination_count}
                              maxButtons={5}
                              activePage={this.state.activePage}
                              onSelect={(e) => {

                                this.setState({activePage: e})

                                let dataTable2PageUrlParamsNew = "page1=" + e;
                                {/*console.log("printing pagination for bubble table", dataTable2PageUrlParamsNew);*/
                                }
                                this.props.onSaveTable2PageParam(dataTable2PageUrlParamsNew);
                                this.props.onDataFetchOnPageLoad();


                              }}
                            />

                          }
                        })()}


                        </div>
                        </div>

                        </div>
                        </div>
                        </div>
                        </Panel>

                        </Panel>

                        </div>
                        )
                        }
                      })()}

                    </div>

                  );

              }
              else {

              }
            })()}


          </div>
        </div>
      </div>
    );
  }
}

RangingNpdImpactPage.propTypes = {};


const mapStateToProps = createStructuredSelector({
  RangingNpdImpactPage: makeSelectRangingNpdImpactPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    // Component data fetch
    // For bubble table
    onDataFetchOnPageLoad: (e) => dispatch(dataFetchOnPageLoad(e)),
    onDataFetchOnBubbleData: (e) => dispatch(dataFetchOnBubbleData(e)),
    onDataFetchCanniProdTable: (e) => dispatch(dataFetchCanniProdTable(e)),
    // onDataFetchOnWaterFallChart: (e) => dispatch(dataFetchOnWaterFallChart(e)),


    //----Filter data----
    onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
    onGenerateTable: (e) => dispatch(generateTable(e)),


    onSendUrlParams: (e) => dispatch(sendUrlParams(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),


    onPageLoadSelectFilterIndicator: (e) => dispatch(pageLoadSelectFilterIndicator(e)),
    onUpdateApplyButtonLoadingIndication: (e) => dispatch(showApplyButtonLoadingIndication(e)),
    onUpdateTabChangeLoadingIndication: (e) => dispatch(showTabChangeLoadingIndication(e)),
    onUpdatePageContentAfterLoading: (e) => dispatch(showPageContentAfterLoading(e)),
    onUpdateBreadCrumbs: (e) => dispatch(updateBreadCrumbs(e)),



    onSaveWeekParam: (e) => dispatch(saveWeekParam(e)),
    onSaveTable2SearchParam: (e) => dispatch(saveTable2SearchParam(e.target.value)),
    onSaveTable1SearchParam: (e) => dispatch(saveTable1SearchParam(e.target.value)),
    onSaveTable2PageParam: (e) => dispatch(saveTable2PageParam(e)),
    onSaveTable1PageParam: (e) => dispatch(saveTable1PageParam(e)),

    //Filters selections
    onCheckboxChange: (e) => dispatch(checkboxChange(e)),
    onSaveAspFilterData: (e) => dispatch(saveAspFilterData(e.target.value)),
    onSaveAcpFilterData: (e) => dispatch(saveAcpFilterData(e.target.value)),
    onSaveSizeFilterData: (e) => dispatch(saveSizeFilterData(e.target.value)),
    onSaveFilterSelectionsTillNow: (e) => dispatch(saveFilterSelectionsTillNow(e)),

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNpdImpactPage);
