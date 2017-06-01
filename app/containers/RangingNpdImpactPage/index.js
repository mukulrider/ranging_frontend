/*
 *
 * RangingNpdImpactPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {FormattedMessage} from 'react-intl';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingNpdImpactPage from './selectors';
import messages from './messages';
require('react-bootstrap-table/css/react-bootstrap-table.css')
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
import RadioButton from 'components/radio_button';
import {
  dataFetchOnPageLoad,
  dataFetchOnBubbleData,
  dataFetchCanniProdTable,
  sendUrlParams,
  generateSideFilter,
  generateUrlParams,
  generateUrlParamsString,
  saveWeekParam,
  checkboxChange,
  pageLoadSelectFilterIndicator,
  showApplyButtonLoadingIndication,
  showTabChangeLoadingIndication,
  showPageContentAfterLoading,
  editScenarioOverWrite,
  saveAspFilterData,
  saveAcpFilterData,
  saveSizeFilterData,
  saveFilterSelectionsTillNow,
  updateBreadCrumbs,
  saveScenarioFlag,saveScenarioName,saveTagName,updateSaveScenarioResponse,
  saveModifiedVolumeForecast,saveEditForecastApi,saveEditForecastApiOnReset,saveModifiedFlag,

} from './actions';
import CascadedFilterNpdImpact from 'components/CascadedFilterNpdImpact';


export class RangingNpdImpactPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  componentDidMount = () => {
    console.log("Mounted");

    let  getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    };

    //for preselection of filters
    let Preselection=getCookie('Preselection');
    let NPDfilterPreSelection=getCookie('NPDfilterPreSelection');

    if(Preselection){
      this.setState({edit_scenario: true});
      let filterPreSelection=getCookie('filterPreSelection');
      let scenario_name_PreSelection=getCookie('scenario_name_PreSelection');
      let scenario_tag_PreSelection=getCookie('scenario_tag_PreSelection');
      let ASP_PreSelection=getCookie('ASP_PreSelection');
      let Size_PreSelection=getCookie('Size_PreSelection');
      let ACP_PreSelection=getCookie('ACP_PreSelection');

      this.props.onSaveFilterSelectionsTillNow(filterPreSelection);
      this.props.onUpdateOrClearScenarioName(scenario_name_PreSelection);
      this.props.onUpdateOrClearScenarioTag(scenario_tag_PreSelection);
      this.props.onUpdateOrClearAcp(ACP_PreSelection);
      this.props.onUpdateOrClearAsp(ASP_PreSelection);
      this.props.onUpdateOrClearSize(Size_PreSelection);
      this.props.onEditScenarioOverWrite("overwrite=1");

      document.cookie = 'filterPreSelection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      document.cookie = 'scenario_name_PreSelection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      document.cookie = 'scenario_tag_PreSelection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      document.cookie = 'ASP_PreSelection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      document.cookie = 'ACP_PreSelection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      document.cookie = 'Size_PreSelection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';

      this.props.onGenerateSideFilter()
    }

    if(NPDfilterPreSelection){
      this.props.onSaveFilterSelectionsTillNow(NPDfilterPreSelection);
      document.cookie = 'NPDfilterPreSelection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      this.props.onGenerateSideFilter()

    }

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

      saveScenarioStatus:'',
      showSaveScenarioSuccessModalFlag:false,
      showSaveScenarioModalFlag: false,
      showSaveScenarioOverwriteConfirmationModalFlag: false,
      afterScenarioOption:0,

      showEditForecastModal:false,
      showEditForecastSuccessModal:false,

      edit_scenario:false,

      edited_week:"Latest 13 weeks"


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

    //For url parameters
    let dataWeekUrlParams = this.props.RangingNpdImpactPage.dataWeekUrlParams;
    let dataFilterUrlParams = this.props.RangingNpdImpactPage.urlParamsString;

    console.log("rendered");
    console.log(this.state.edited_week);
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
        {/*<div className="pageTitle" style={{width:'78%',float:'right'}}>NPD Impact</div>*/}
        <div className="pageTitle" >NPD Impact</div>

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

            {/*Scenario name*/}
            {(()=>{
              if(this.state.edit_scenario){
              return(

                  <div className="row center-this">

                    <div className="col-xs-6">

                      <span style={{color:'#00539f',fontSize:'22px',fontWeight:'600'}}>Scenario Name : </span>
                      <span style={{color:'#333333',fontSize:'20px'}}>{this.props.RangingNpdImpactPage.scenarioName}</span>

                    </div>

                    <div className="col-xs-6">

                      <span style={{color:'#00539f',fontSize:'22px',fontWeight:'600'}}>Scenario Tag : </span>
                      <span style={{color:'#333333',fontSize:'20px'}}>{this.props.RangingNpdImpactPage.tagName}</span>

                    </div>

                    {/*<div className="col-xs-6">*/}

                      {/*<div className="col-xs-6">*/}
                        {/*Scenario Name:*/}
                      {/*</div>*/}
                      {/*<div className="col-xs-6">*/}
                        {/*/!*{this.props.RangingNpdImpactPage.scenarioName}*!/*/}
                        {/*Sample Scenario Name*/}
                      {/*</div>*/}

                    {/*</div>*/}

                    {/*<div className="col-xs-6">*/}
                      {/*<div className="col-xs-6">*/}
                        {/*Tag Name:*/}
                      {/*</div>*/}
                      {/*<div className="col-xs-6">*/}
                      {/*/!*{this.props.RangingNpdImpactPage.tagName}*!/*/}
                        {/*Sample Scenario Tag*/}
                      {/*</div>*/}
                    {/*</div>*/}

                  </div>
              )

              }else{
                return(

                    <div className="row formattedText">

                      {/*<div className="col-xs-1"></div>*/}
                      <div className="col-xs-6">

                        <div className="col-xs-6">
                          Scenario Name:
                        </div>
                        <div className="col-xs-6">
                          <InputField type="text"
                                      placeholder="Enter Scenario Name"
                                      value={this.props.RangingNpdImpactPage.scenarioName}
                                      onChange={(e) => {
                                        this.props.onSaveScenarioName(e);
                                      }}

                          />
                        </div>
                        {/*<div className="col-xs-2"></div>*/}
                      </div>

                      <div className="col-xs-6">
                        <div className="col-xs-6">
                          Tag Name:
                        </div>
                        <div className="col-xs-6">
                          <InputField type="text"
                                      placeholder="Enter tag"
                                      value={this.props.RangingNpdImpactPage.tagName}
                                      onChange={(e) => {
                                        this.props.onSaveTagName(e);
                                      }}

                          />
                        </div>
                      </div>

                      {/*<div className="col-xs-1"></div>*/}
                    </div>

                )
              }

            })()}

            {/*Button*/}
            <div className="row" style={{marginTop:'10px'}}>

              <Button onClick={() => {
                if(this.props.RangingNpdImpactPage.scenarioName===''){
                  alert("Enter scenario name!");
                }else{
                  document.body.style.cursor='wait';
                  this.props.onSaveScenarioFlag();
                }

              }}
                      style={{display: 'block', marginTop:"1%",marginLeft:'39%'}}>Save</Button>

            </div>

          </Modal.Body>
        </Modal>

        {/*Saving Success modal*/}
        <Modal show={this.state.showSaveScenarioSuccessModalFlag} bsSize="lg" style={{marginTop: '10%'}}
               aria-labelledby="contained-modal-title-lg">

          <Modal.Body className="infoModalText">

              {(()=>{
                if(this.state.edit_scenario){
                  return(
                    <div className="center-this" style={{color:'Green',fontSize:'20px',lineHeight:'28px'}}>
                    <i>Scenario '{this.props.RangingNpdImpactPage.scenarioName}' has been edited successfully!</i><br/>
                      <br/>
                      What do you wish to do next?

                    </div>

                  )

                }else{
                  return(
                    <div className="center-this" style={{color:'Green',fontSize:'20px',lineHeight:'28px'}}>
                      <i>Scenario '{this.props.RangingNpdImpactPage.scenarioName}' has been saved successfully!</i><br/>
                      <br/>
                      What do you wish to do next?

                    </div>

                  )
                }

              })()}




            <div className="row" style={{marginTop:'2%'}}>
              <div className="col-xs-6">
                <Button onClick={() => {
                  this.setState({edit_scenario:false});
                  document.cookie = 'Preselection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
                  this.props.onUpdateOrClearScenarioName('');
                  this.props.onUpdateOrClearScenarioTag('');
                  this.props.onEditScenarioOverWrite("overwrite=0");

                  this.setState({showSaveScenarioSuccessModalFlag: false});

                }}
                        style={{display: 'block', marginTop:"1%",marginLeft:'35%'}}>Create New Scenario</Button>
              </div>
              <div className="col-xs-6">
                <Button onClick={() => {

                  document.cookie = 'Preselection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';

                  let page='/ranging/scenario-tracker?';

                  let objString = page;
                  window.location = objString;

                }}
                        style={{display: 'block', marginTop:"1%",marginLeft:'28%'}}>Go to Scenario Tracker</Button>
              </div>
            </div>

          </Modal.Body>
        </Modal>

        {/*Saving under same name*/}
        <Modal show={this.state.showSaveScenarioOverwriteConfirmationModalFlag} bsSize="lg" style={{marginTop: '10%'}}
               aria-labelledby="contained-modal-title-lg">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                                  <span className="pageModuleTitle"><b>Scenario Already exists!</b>
                                  </span>
              <div style={{textAlign: 'center'}}>
                <div style={{textAlign: 'right'}}>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="infoModalText">

            {(()=>{
              document.body.style.cursor='default';
            })()}

            <div className="row">
              <div className="center-this" style={{color:'red',fontSize:'20px',lineHeight:'28px'}}>
                <b>Scenario '{this.props.RangingNpdImpactPage.scenarioName}' under '{this.props.RangingNpdImpactPage.tagName}' tag is already exist.Please save under another scenario name.</b><br/><br/>
                <i>If you want to review the existing scenario. Please check in the scenario tracker.</i>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-4">
                <Button onClick={() => {
                  this.props.onSaveScenarioResponse('rename');

                }}
              style={{display: 'block', marginTop:"1%",marginLeft:'13%'}}>Save As</Button>
              </div>
              <div className="col-xs-4">
                <Button onClick={() => {
                  this.props.onEditScenarioOverWrite("overwrite=1");
                  document.body.style.cursor='wait';
                  this.props.onSaveScenarioFlag();


                }}
                  style={{display: 'block', marginTop:"1%",marginLeft:'13%'}}>Overwrite</Button>
              </div>
              <div className="col-xs-4">
                <Button onClick={() => {
                  let page='/ranging/scenario-tracker?';
                  {/*let attributes='userid=sachin123'+"&scenario_name="+obj.scenario_name+"&tag_name="+obj.tag_name;*/}

                  let objString = page;
                  window.location = objString;

                }}
                style={{display: 'block', marginTop:"1%",marginLeft:'13%'}}>Scenario Tracker <span className="glyphicon glyphicon-arrow-right"/></Button>
              </div>
            </div>


          </Modal.Body>
        </Modal>

        {/*Edit Forecast*/}
        <Modal show={this.state.showEditForecastModal} bsSize="lg" style={{marginTop: '10%'}}
               aria-labelledby="contained-modal-title-lg">
          <Modal.Header>
            <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                                  <span className="pageModuleTitle"><b>Edit Forecast</b>
                                  <span style={{textAlign: 'right', float: 'right'}}
                                        onClick={() => {
                                          {/*this.props.onSaveScenarioName('');*/}
                                          this.setState({showEditForecastModal: false});

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
                  Volume Forecast:
                </div>
                <div className="col-xs-4">
                  <InputField type="text"
                              placeholder="Enter forecast"
                              value={this.props.RangingNpdImpactPage.modifiedVolumeForecast}
                              onChange={(e) => {
                                this.props.onSaveModifiedVolumeForecast(e);
                              }}

                  />
                </div>
                <div className="col-xs-2"></div>
              </div>

            </div>


            <div className="row" style={{marginTop:'10px'}}>

              <Button onClick={() => {
                if(this.props.RangingNpdImpactPage.modifiedVolumeForecast===''){
                  alert("Enter updated forecast!");
                }else{
                  {/*document.body.style.cursor='wait';*/}
                  let canni_perc=this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.impact.Cannibilization_perc/100;
                  let selected_week_api=this.props.RangingNpdImpactPage.dataWeekUrlParams;
                  let selected_week=selected_week_api.split('=');


                  let modified_api="modified_flag=1&modified_forecast="+this.props.RangingNpdImpactPage.modifiedVolumeForecast+"&Cannibalization_perc="+canni_perc+"&modified_week="+selected_week[1];
                  // alert(modified_api);
                  this.props.onUpdateApplyButtonLoadingIndication(true);
                  this.setState({showEditForecastModal: false});
                  this.props.onSaveEditForecastApi(modified_api);
                  this.props.onDataFetchOnBubbleData();
                  this.props.onDataFetchCanniProdTable();
                  this.props.onDataFetchOnPageLoad();


                }

              }}
                      style={{display: 'block', marginTop:"1%",marginLeft:'39%'}}>Compute</Button>

            </div>

          </Modal.Body>
        </Modal>

        {/*content*/}
        <div className="">

          {/*Filters*/}
          <div style={{height: '75%',
            position: 'fixed',
            width:'20%',
            /* padding-right: 5px; */
            overflowX: 'hidden',
            overflowY: 'scroll'}}>

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

                                       onSaveEditForecastApiOnReset={this.props.onSaveEditForecastApiOnReset}


                                       onSaveAspFilterData={this.props.onSaveAspFilterData}
                                       onSaveAcpFilterData={this.props.onSaveAcpFilterData}
                                       onSaveSizeFilterData={this.props.onSaveSizeFilterData}
                                       onSaveFilterSelectionsTillNow={this.props.onSaveFilterSelectionsTillNow}

                                       ASP_field_entry={this.props.RangingNpdImpactPage.ASP_field_entry}
                                       ACP_field_entry={this.props.RangingNpdImpactPage.ACP_field_entry}
                                       Size_field_entry={this.props.RangingNpdImpactPage.Size_field_entry}
                                       filterSelectionsTillNow={this.props.RangingNpdImpactPage.filterSelectionsTillNow}

              />

          </div>

          {/*Content*/}
          <div  style={{width:'78%',
            marginLeft:'22%'}}>

            {(() => {

              if (this.props.RangingNpdImpactPage.showSelectFilterIndicator) {

                return (

                  <div className="selectAttributeIndicator">
                    <div>
                      <div> ----- Please select the attributes ------</div>
                    </div>
                  </div>

                )
              } else if (this.props.RangingNpdImpactPage.showApplyButtonLoading) {
                return (
                  <div className="selectAttributeIndicator">
                    <div>
                      <Spinner/>
                    </div>
                    <div>
                      <div style={{marginTop: '1%'}}> Please do not refresh the page.<br/>
                        This might take a few minutes.</div>
                    </div>
                  </div>

                )
              } else if (this.props.RangingNpdImpactPage.showPageAfterLoading) {


                return (

                  <div>

                    {(() => {
                      if (this.props.RangingNpdImpactPage.showTabChangeLoading) {
                        console.log("div executed");
                        return (
                          <div>

                            {/*Overlay*/}
                            <div className="loadingAfterApply">

                              {(()=>{
                                document.body.style.cursor='wait';
                                })()}

                              <div>
                                {/*<Spinner/>*/}
                                <div id="tabChangeLoading" style={{marginLeft: '35%', position: 'fixed'}}>Loading...</div>
                              </div>
                            </div>

                            {/*Content*/}
                            <div className="content-wrap">


                              <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
                                   className="tabsCustom">

                                <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                                  this.setState({activeKey: "1"});
                                  this.setState({edited_week: "Latest 13 Weeks"});
                                  dataWeekUrlParams = "week_flag=Latest 13 Weeks";

                                  this.props.onUpdateTabChangeLoadingIndication(true);
                                  this.props.onSaveWeekParam(dataWeekUrlParams);
                                  this.props.onDataFetchCanniProdTable();
                                  this.props.onDataFetchOnPageLoad();
                                  this.props.onDataFetchOnBubbleData();

                                }}><span className="tab_label">13 Weeks</span></NavItem>

                                <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                                  this.setState({activeKey: "2"});
                                  this.setState({edited_week: "Latest 26 Weeks"});
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
                                  this.setState({edited_week: "Latest 52 Weeks"});
                                  this.props.onUpdateTabChangeLoadingIndication(true);
                                  this.props.onSaveWeekParam(dataWeekUrlParams);
                                  this.props.onDataFetchCanniProdTable();
                                  this.props.onDataFetchOnPageLoad();
                                  this.props.onDataFetchOnBubbleData();


                                }}><span className="tab_label">52 Weeks</span></NavItem>


                              </Nav>

                              <div className="row" style={{textAlign:'right',marginRight:'2%'}}>
                                <Button  style={{marginTop:'2%'}}>Save Scenario</Button>
                              </div>

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


                                        <div className="row" style={{width: "100%"}}>
                                          {/*Value*/}
                                          <div className="col-xs-5 ts-blk-proview" style={{marginLeft: "4%"}}>
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
                                                      <h2 className="text-center"><Spinner />Please Wait a Moment....!
                                                      </h2>
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
                                                      <h2 className="text-center"><Spinner />Please Wait a Moment....!
                                                      </h2>
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
                                              if (this.props.RangingNpdImpactPage.canniProdTableData) {


                                                return (
                                                  <div>
                                                    <BootstrapTable
                                                      data={this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.df} options={options}
                                                      striped={true}
                                                      hover
                                                      condensed
                                                      pagination={ true }
                                                      search={true}
                                                      exportCSV={true}
                                                    >
                                                      <TableHeaderColumn dataField="brand_indicator" isKey={true} dataSort={true} dataAlign="center">Brand Indicator</TableHeaderColumn>
                                                      <TableHeaderColumn dataField="long_description" dataSort={true} dataAlign="center">Products Description</TableHeaderColumn>
                                                      <TableHeaderColumn dataField="predicted_volume" dataFormat={formatVolume} dataSort={true} dataAlign="center">Volume</TableHeaderColumn>
                                                      <TableHeaderColumn dataField="predicted_sales" dataFormat={formatSales} dataSort={true} dataAlign="center">Sales Value</TableHeaderColumn>
                                                      <TableHeaderColumn dataField="similarity_score" dataSort={true} dataAlign="center">Similarity Score</TableHeaderColumn>
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
                                          {
                                            (() => {
                                              if (this.props.RangingNpdImpactPage.npd_bubble_table_data) {


                                                return (
                                                  <div>
                                                    <BootstrapTable
                                                      data={this.props.RangingNpdImpactPage.npd_bubble_table_data.table} options={options} /*tableStyle={ { width: '80%',marginLeft:'10%' }}*/
                                                      striped={true}
                                                      hover
                                                      condensed
                                                      pagination={ true }
                                                      search={true}
                                                      exportCSV={true}
                                                    >
                                                      <TableHeaderColumn dataField="base_product_number" isKey={true} dataSort={true} dataAlign="center">BPN</TableHeaderColumn>
                                                      <TableHeaderColumn dataField="long_description" dataSort={true} dataAlign="center">Description</TableHeaderColumn>
                                                      <TableHeaderColumn dataField="cps" dataSort={true} dataAlign="center">CPS</TableHeaderColumn>
                                                      <TableHeaderColumn dataField="pps" dataSort={true} dataAlign="center">Profit / Store</TableHeaderColumn>
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

                            </div>

                          </div>
                        )
                      } else {
                        return (
                          <div className="row">
                            <div className="col-md-12 content-wrap">

                            {/*Tabs*/}
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

                            {/*Save Scenario*/}
                            <div className="row" style={{textAlign:'right',marginRight:'2%'}}>
                              <Button  onClick={() => {
                                this.setState({showSaveScenarioModalFlag: true});
                              }}
                                       style={{marginTop:'2%'}}>Save Scenario</Button>
                            </div>


                            {/*Saving scenario modal call-conditions*/}
                            {(()=>{
                              if(this.props.RangingNpdImpactPage.saveScenarioResponse!=='') {
                                if (this.props.RangingNpdImpactPage.saveScenarioResponse.save_scenario === "SUCCESS") {
                                  this.props.onSaveScenarioResponse('');
                                  this.setState({showSaveScenarioOverwriteConfirmationModalFlag: false});
                                  this.setState({showSaveScenarioModalFlag: false});
                                  this.setState({showSaveScenarioSuccessModalFlag: true});

                                }//Already such a event exists
                                else if (this.props.RangingNpdImpactPage.saveScenarioResponse.save_scenario === "FAILURE") {
                                  this.setState({showSaveScenarioOverwriteConfirmationModalFlag: true});
                                  this.setState({showSaveScenarioModalFlag: false});
                                } else if(this.props.RangingNpdImpactPage.saveScenarioResponse=='rename') {
                                  this.setState({showSaveScenarioOverwriteConfirmationModalFlag: false});
                                  this.setState({showSaveScenarioModalFlag: true});
                                }
                              }



                            })()}

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
                                    <div >

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


                                      <div className="row" style={{width: "100%",marginLeft:'4%'}}>
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
                                                    <h2 className="text-center"><Spinner />Please Wait a Moment....!
                                                    </h2>
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
                                                    <h2 className="text-center"><Spinner />Please Wait a Moment....!
                                                    </h2>
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

                                    <Button onClick={() => {
                                      {/*this.setState({lgShow: true});*/}
                                      this.setState({showEditForecastModal: true});

                                    }} style={{display: 'block', marginTop:"1%",marginLeft:'81%'}}>Edit Forecast</Button>
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
                                            if (this.props.RangingNpdImpactPage.canniProdTableData) {


                                              return (
                                                <div>
                                                  <BootstrapTable
                                                    data={this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table.df} options={options} /*tableStyle={ { width: '80%',marginLeft:'10%' }}*/
                                                    striped={true}
                                                    hover
                                                    condensed
                                                    pagination={ true }
                                                    search={true}
                                                    exportCSV={true}
                                                  >
                                                    <TableHeaderColumn dataField="brand_indicator" isKey={true} dataSort={true} dataAlign="center">Brand Indicator</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="long_description" dataSort={true} dataAlign="center">Products Description</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="predicted_volume" dataFormat={formatVolume} dataSort={true} dataAlign="center">Volume</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="predicted_sales" dataFormat={formatSales} dataSort={true} dataAlign="center">Sales Value</TableHeaderColumn>
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
                                        {
                                          (() => {
                                            if (this.props.RangingNpdImpactPage.npd_bubble_table_data) {


                                              return (
                                                <div>
                                                  <BootstrapTable
                                                    data={this.props.RangingNpdImpactPage.npd_bubble_table_data.table} options={options} /*tableStyle={ { width: '80%',marginLeft:'10%' }}*/
                                                    striped={true}
                                                    hover
                                                    condensed
                                                    pagination={ true }
                                                    search={true}
                                                    exportCSV={true}
                                                  >
                                                    <TableHeaderColumn dataField="base_product_number" isKey={true} dataSort={true} dataAlign="center">BPN</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="long_description" dataSort={true} dataAlign="center">Description</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="cps" dataSort={true} dataAlign="center">CPS</TableHeaderColumn>
                                                    <TableHeaderColumn dataField="pps" dataSort={true} dataAlign="center">Profit / Store</TableHeaderColumn>
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

                          </div>
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



    //----Filter data----
    onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
    onSendUrlParams: (e) => dispatch(sendUrlParams(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),


    onPageLoadSelectFilterIndicator: (e) => dispatch(pageLoadSelectFilterIndicator(e)),
    onUpdateApplyButtonLoadingIndication: (e) => dispatch(showApplyButtonLoadingIndication(e)),
    onUpdateTabChangeLoadingIndication: (e) => dispatch(showTabChangeLoadingIndication(e)),
    onUpdatePageContentAfterLoading: (e) => dispatch(showPageContentAfterLoading(e)),
    onUpdateBreadCrumbs: (e) => dispatch(updateBreadCrumbs(e)),
    onSaveWeekParam: (e) => dispatch(saveWeekParam(e)),

    //Filters selections
    onCheckboxChange: (e) => dispatch(checkboxChange(e)),
    onSaveAspFilterData: (e) => dispatch(saveAspFilterData(e.target.value)),
    onSaveAcpFilterData: (e) => dispatch(saveAcpFilterData(e.target.value)),
    onSaveSizeFilterData: (e) => dispatch(saveSizeFilterData(e.target.value)),
    onSaveFilterSelectionsTillNow: (e) => dispatch(saveFilterSelectionsTillNow(e)),

    //Save scenario
    onSaveScenarioName: (e) => dispatch(saveScenarioName(e.target.value)),
    onSaveTagName: (e) => dispatch(saveTagName(e.target.value)),


    onUpdateOrClearScenarioName: (e) => dispatch(saveScenarioName(e)),
    onUpdateOrClearScenarioTag: (e) => dispatch(saveTagName(e)),
    onUpdateOrClearAcp: (e) => dispatch(saveAcpFilterData(e)),
    onUpdateOrClearAsp: (e) => dispatch(saveAspFilterData(e)),
    onUpdateOrClearSize: (e) => dispatch(saveSizeFilterData(e)),



    onSaveScenarioFlag: (e) => dispatch(saveScenarioFlag(e)),
    onSaveScenarioResponse: (e) => dispatch(updateSaveScenarioResponse(e)),

    // Edit forecast.
    onSaveModifiedVolumeForecast: (e) => dispatch(saveModifiedVolumeForecast(e.target.value)),
    onSaveEditForecastApi: (e) => dispatch(saveEditForecastApi(e)),
    onSaveEditForecastApiOnReset: (e) => dispatch(saveEditForecastApiOnReset(e)),
    onSaveModifiedFlag: (e) => dispatch(saveModifiedFlag(e)),

    onEditScenarioOverWrite: (e) => dispatch(editScenarioOverWrite(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNpdImpactPage);
