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
import {Modal,NavItem, Pagination} from 'react-bootstrap';


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
  RadioChecked,
  openModal,
  updateLoadingIndicationStatus,updateLoadingIndicationText
} from './actions';
import {
  urlDataSuccess, WeekClick
} from './actions';

export class RangingNegotiationPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    //For sending and saving url params

    let getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    };

    //for preselection of filters--edit scenario
    let bubblePreselection = getCookie('bubblePreselection');

    if (bubblePreselection) {
      let bubblePreselectionData = getCookie('bubblePreselectionData');


      document.cookie = 'bubblePreselectionData' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      document.cookie = 'bubblePreselection' + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';

      this.props.onSaveBubbleParam2(bubblePreselectionData);

    }

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
      noDataforChart: 0,
      showDelistConfirmationModalFlag: false,
    };
  }


  componentDidUpdate = () => {
    //this.props.onURLRequest(this.props.location.query);
  };


  inputUpdate = (checked, base_product_number) => {
    console.log('inputupdates', base_product_number);
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

    console.log("selected performance quartile "+dataPerformanceUrlParams )

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

          {/*Delete confirmation modal*/}
          <Modal show={this.state.showDelistConfirmationModalFlag} style={{marginTop:'20%'}} onHide={() => {
            this.setState({showDelistConfirmationModalFlag: false})
          }} bsSize="large" aria-labelledby="contained-modal-title-sm">
            <Modal.Body>

              <div className="row">
                <div className="col-xs-12 alertModalStyle">
                  Please select atleast one product to delist
                </div>
              </div>


            </Modal.Body>

          </Modal>


          {/*Fitlers*/}
          <div style={{height: '100%',
            position: 'fixed',
            width:'20%',
            /* padding-right: 5px; */
            overflowX: 'hidden',
            overflowY: 'scroll'}}>

            {(() => {
              if (this.props.RangingNegotiationPage.sideFilter) {
                return (
                  <SelectorNegotiation2 sideFilter={this.props.RangingNegotiationPage.sideFilter}
                                        onGenerateTable={this.props.onGenerateTable}
                                        onFetchGraph={this.props.onFetchGraph}
                                        onSavePFilterParam={this.props.onSavePFilterParam}
                                        onSaveBubbleParam2={this.props.onSaveBubbleParam2}
                                        onSavePageParam={this.props.onSavePageParam}

                                        onGenerateUrlParams={this.props.onGenerateUrlParams}
                                        onURLRequest={this.props.onURLRequest}
                                        onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
                                        location={this.props.location}
                                        onGenerateUrlParamsData={this.props.onGenerateSideFilter}
                                        onUpdateLoadingIndicationStatus={this.props.onUpdateLoadingIndicationStatus}
                                        onUpdateLoadingIndicationText={this.props.onUpdateLoadingIndicationText}

                  />

                )
              } else {
                return (<div>Loading</div>)
              }
            })()}

          </div>


          <div  style={{width:'78%',
            marginLeft:'22%'}}>

            <div className="row">
              <div className="col-md-12 content-wrap">

                {/*Week tabs*/}
                <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect} className="tabsCustom">
                  <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                    this.setState({activeKey: "1"});
                    {/*let text = "WEEK : Last 13 weeks";;*/
                    }
                    {/*this.updateText(text);*/
                    }
                    this.props.onUpdateLoadingIndicationText("Loading data for last 13 weeks...")
                    this.props.onUpdateLoadingIndicationStatus(true)

                    dataWeekUrlParams = "time_period=Last 13 weeks"
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();

                  }}><span className="tab_label">Last 13 Weeks</span></NavItem>


                  <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                    this.setState({activeKey: "2"});

                    this.props.onUpdateLoadingIndicationText("Loading data for last 26 weeks...")
                    this.props.onUpdateLoadingIndicationStatus(true)



                    dataWeekUrlParams = "time_period=Last 26 weeks"
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}><span className="tab_label">Last 26 Weeks</span></NavItem>


                  <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                    this.setState({activeKey: "3"});

                    this.props.onUpdateLoadingIndicationText("Loading data for last 52 weeks...")
                    this.props.onUpdateLoadingIndicationStatus(true)



                    dataWeekUrlParams = "time_period=Last 52 weeks"
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}><span className="tab_label">Last 52 Weeks</span></NavItem>


                </Nav>

                <div style={{height:'0px',width:'100%'}}>&nbsp;</div>

                {/*Store tabs*/}
                <Nav bsStyle="tabs" className="tabsCustom" activeKey={this.state.activeKey2}
                     onSelect={this.handleSelect}>
                  <NavItem className="tabsCustomList" eventKey="4" onClick={() => {
                    this.setState({activeKey2: "4"});
                    dataStoreUrlParams = "store_type=Main Estate"

                    this.props.onUpdateLoadingIndicationText("Loading data for Main Estate...")
                    this.props.onUpdateLoadingIndicationStatus(true)


                    this.props.onSaveStoreParam(dataStoreUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                  }}><span className="tab_label">Main Estate</span></NavItem>
                  <NavItem className="tabsCustomList" eventKey="5" onClick={() => {
                    this.setState({activeKey2: "5"});

                    this.props.onUpdateLoadingIndicationText("Loading data for Express...")
                    this.props.onUpdateLoadingIndicationStatus(true)



                    dataStoreUrlParams = "store_type=Express"
                    this.props.onSaveStoreParam(dataStoreUrlParams);
                    this.props.onFetchGraph();
                    this.props.onGenerateTable();
                    // browserHistory.push(this.props.location.pathname + "?store_type=Express")
                  }}><span className="tab_label">Express</span></NavItem>


                </Nav>


                {(()=>{
                  if(this.props.RangingNegotiationPage.showLoading){
                    return(
                      <div className="loadingAfterApply">

                        {(()=>{
                         console.log("---check")
                          document.body.style.cursor='wait';
                        })()}

                        <div>
                          {/*<Spinner/>*/}
                          {(()=>{
                            console.log("---check"+this.props.RangingNegotiationPage.loadingText);
                          })()}

                          <div id="tabChangeLoading" style={{marginLeft: '35%', position: 'fixed'}}>{this.props.RangingNegotiationPage.loadingText}</div>
                        </div>
                      </div>
                    )
                  }else{
                    document.body.style.cursor='default';
                  }

                })()}

                <div className="row negoHeading" style={{marginLeft:'1%',marginTop:'1%'}}>
                  <div> Please select a negotiation strategy below to filter 'Negotiation Opportunity' chart and table
                  </div>
                </div>

                <div className="row" style={{marginTop:'1%',marginLeft:'1%'}}>

                  {/*Low CPS/Low Profit*/}
                  <div className="col-xs-2 center-this input">
                    <label style={{fontSize:"18px",fontFamily:'tesco',color:'#c74a52',width:'100%'}}>
                      <input type="checkbox"
                             id="PQ1"
                             style={{marginRight:'5%'}}
                             onChange={() => {
                        let pqCurrentSelection="Low CPS/Low Profit";
                        let deselect=0;
                        let pqApendUrl='';
                        let newSelections='';


                        if(dataPerformanceUrlParams !==''){
                        dataPerformanceUrlParams="start&"+dataPerformanceUrlParams;
                        let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                        for(let i=1;i<pqSelections.length;i++){

                        if(pqSelections[i]!==pqCurrentSelection){

                      {/*console.log(pqSelections[i] +"==="+pqCurrentSelection)*/}

                        newSelections=newSelections+"&performance_quartile="+pqSelections[i];
                      }else{

                        deselect=1;

                      }
                      }

                        if(deselect==0){

                        newSelections=newSelections+"&performance_quartile="+pqCurrentSelection;

                      }

                        let pq_ajax_param = newSelections.replace('&', '');
                        this.props.onSavePFilterParam(pq_ajax_param);
                      }
                        else{

                        let pq_ajax_param = "performance_quartile="+pqCurrentSelection;
                        this.props.onSavePFilterParam(pq_ajax_param);
                      }

                        this.props.onUpdateLoadingIndicationText("Applying Selections...");
                        this.props.onUpdateLoadingIndicationStatus(true)

                        this.props.onFetchGraph();
                        this.props.onGenerateTable();
                             }}
                      />
                      <span className="tooltip">Delist Products</span>
                       Low CPS/Low Profit
                    </label>
                  </div>

                  {/*Low CPS/High Profit*/}
                  <div className="col-xs-2 center-this input">
                    <label style={{fontSize:"18px",fontFamily:'tesco',color:'#6e6767',width:'100%'}}>
                      <input type="checkbox"
                             id="PQ2"
                             style={{marginRight:'5%'}}
                             onChange={() => {
                               let pqCurrentSelection="Low CPS/High Profit";
                               let deselect=0;
                               let pqApendUrl='';
                               let newSelections='';


                               if(dataPerformanceUrlParams !==''){
                                 dataPerformanceUrlParams="start&"+dataPerformanceUrlParams;
                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                 for(let i=1;i<pqSelections.length;i++){

                                   if(pqSelections[i]!==pqCurrentSelection){

                                     {/*console.log(pqSelections[i] +"==="+pqCurrentSelection)*/}

                                     newSelections=newSelections+"&performance_quartile="+pqSelections[i];
                                   }else{

                                     deselect=1;

                                   }
                                 }

                                 if(deselect==0){

                                   newSelections=newSelections+"&performance_quartile="+pqCurrentSelection;

                                 }

                                 let pq_ajax_param = newSelections.replace('&', '');
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }
                               else{

                                 let pq_ajax_param = "performance_quartile="+pqCurrentSelection;
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }

                               this.props.onUpdateLoadingIndicationText("Applying Selections...");
                               this.props.onUpdateLoadingIndicationStatus(true)

                               this.props.onFetchGraph();
                               this.props.onGenerateTable();
                             }}
                      />
                      <span className="tooltip">Hard Bargaining’ for stronger profits – Low importance to customers</span>
                      Low CPS/High Profit
                    </label>

                  </div>

                  {/*Med CPS/Med Profit*/}
                  <div className="col-xs-2 center-this input">
                    <label style={{fontSize:"18px",fontFamily:'tesco',color:'#ffa626',width:'100%'}}>
                      <input type="checkbox"
                             id="PQ3"
                             style={{marginRight:'5%'}}
                             onChange={() => {
                               let pqCurrentSelection='Med CPS/Med Profit';
                               let deselect=0;
                               let pqApendUrl='';
                               let newSelections='';


                               if(dataPerformanceUrlParams !==''){
                                 dataPerformanceUrlParams="start&"+dataPerformanceUrlParams;
                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                 for(let i=1;i<pqSelections.length;i++){

                                   if(pqSelections[i]!==pqCurrentSelection){

                                     {/*console.log(pqSelections[i] +"==="+pqCurrentSelection)*/}

                                     newSelections=newSelections+"&performance_quartile="+pqSelections[i];
                                   }else{

                                     deselect=1;

                                   }
                                 }

                                 if(deselect==0){

                                   newSelections=newSelections+"&performance_quartile="+pqCurrentSelection;

                                 }

                                 let pq_ajax_param = newSelections.replace('&', '');
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }
                               else{

                                 let pq_ajax_param = "performance_quartile="+pqCurrentSelection;
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }

                               this.props.onUpdateLoadingIndicationText("Applying Selections...");
                               this.props.onUpdateLoadingIndicationStatus(true)

                               this.props.onFetchGraph();
                               this.props.onGenerateTable();
                             }}
                      />
                      <span className="tooltip">Area of opportunity. Concession trading – Subs/Ranging/Price. Reduce range to drive</span>
                      Med CPS/Med Profit
                    </label>

                  </div>

                  {/*High CPS/Low Profit*/}
                  <div className="col-xs-2 center-this input">
                    <label style={{fontSize:"18px",fontFamily:'tesco',color:'#69b24a',width:'100%'}}>
                      <input type="checkbox"
                             id="PQ4"
                             style={{marginRight:'5%'}}
                             onChange={() => {
                               let pqCurrentSelection='High CPS/Low Profit';
                               let deselect=0;
                               let pqApendUrl='';
                               let newSelections='';


                               if(dataPerformanceUrlParams !==''){
                                 dataPerformanceUrlParams="start&"+dataPerformanceUrlParams;
                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                 for(let i=1;i<pqSelections.length;i++){

                                   if(pqSelections[i]!==pqCurrentSelection){

                                     {/*console.log(pqSelections[i] +"==="+pqCurrentSelection)*/}

                                     newSelections=newSelections+"&performance_quartile="+pqSelections[i];
                                   }else{

                                     deselect=1;

                                   }
                                 }

                                 if(deselect==0){

                                   newSelections=newSelections+"&performance_quartile="+pqCurrentSelection;

                                 }

                                 let pq_ajax_param = newSelections.replace('&', '');
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }
                               else{

                                 let pq_ajax_param = "performance_quartile="+pqCurrentSelection;
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }

                               this.props.onUpdateLoadingIndicationText("Applying Selections...");
                               this.props.onUpdateLoadingIndicationStatus(true)

                               this.props.onFetchGraph();
                               this.props.onGenerateTable();
                             }}
                      />
                      <span className="tooltip">Win-Win relationship with supplier to share further profit gains</span>
                      High CPS/Low Profit
                    </label>


                  </div>

                  {/*High CPS/High Profit*/}
                  <div className="col-xs-2 center-this input">
                    <label style={{fontSize:"18px",fontFamily:'tesco',color:'#2B7294',width:'100%'}}>
                      <input type="checkbox"
                             id="PQ5"
                             style={{marginRight:'5%'}}
                             onChange={() => {
                               let pqCurrentSelection='High CPS/High Profit';
                               let deselect=0;
                               let pqApendUrl='';
                               let newSelections='';


                               if(dataPerformanceUrlParams !==''){
                                 dataPerformanceUrlParams="start&"+dataPerformanceUrlParams;
                                 let pqSelections = dataPerformanceUrlParams.split('&performance_quartile=');

                                 for(let i=1;i<pqSelections.length;i++){

                                   if(pqSelections[i]!==pqCurrentSelection){

                                     {/*console.log(pqSelections[i] +"==="+pqCurrentSelection)*/}

                                     newSelections=newSelections+"&performance_quartile="+pqSelections[i];
                                   }else{

                                     deselect=1;

                                   }
                                 }

                                 if(deselect==0){

                                   newSelections=newSelections+"&performance_quartile="+pqCurrentSelection;

                                 }

                                 let pq_ajax_param = newSelections.replace('&', '');
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }
                               else{

                                 let pq_ajax_param = "performance_quartile="+pqCurrentSelection;
                                 this.props.onSavePFilterParam(pq_ajax_param);
                               }

                               this.props.onUpdateLoadingIndicationText("Applying Selections...");
                               this.props.onUpdateLoadingIndicationStatus(true)

                               this.props.onFetchGraph();
                               this.props.onGenerateTable();
                             }}
                      />
                      <span className="tooltip">Work collaboratively to jointly solve low profitability</span>
                      High CPS/High Profit
                    </label>

                  </div>

                  <div className="col-xs-2 center-this">
                    <Button buttonType={'secondary'}
                            onClick={() => {
                      this.props.onUpdateLoadingIndicationText("Clearing selections...")
                      this.props.onUpdateLoadingIndicationStatus(true)


                      this.props.onSavePFilterParam('');
                      this.props.onSaveBubbleParam2('[]');
                      this.props.onSavePageParam("page=1");

                      document.getElementById("PQ1").checked = false;
                      document.getElementById("PQ2").checked = false;
                      document.getElementById("PQ3").checked = false;
                      document.getElementById("PQ4").checked = false;
                      document.getElementById("PQ5").checked = false;
                      this.props.onFetchGraph();
                      this.props.onGenerateTable();
                    }}
                            style={{marginTop:'-4%',marginLeft:'-7%'}}>Reset Selections</Button>
                  </div>


                </div>


              <div>
               {/*Chart & Performance quartile*/}
                <div className="row">

                  {/*Chart*/}
                  {/*<div className="col-xs-9 col-md-9" style={{marginTop: '2%',width:'800px',overflow:'scroll'}}>*/}
                  <div className="col-xs-8 col-md-8" style={{marginTop: '2%'}}>

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
                                  onUpdateLoadingIndicationStatus={this.props.onUpdateLoadingIndicationStatus}
                                  onUpdateLoadingIndicationText={this.props.onUpdateLoadingIndicationText}
                    />

                    <i style={{fontSize: '12px'}}>*Size of the bubble corresponds to Rate of Sale</i><br/>

                  </div>

                  {(() => {
                    if(this.props.RangingNegotiationPage.openModal == 1){
                      console.log("bubble data--",(JSON.stringify(this.props.RangingNegotiationPage.chartData) === '[]'));
                      this.setState({noDataforChart: 1});
                    } else {
                      console.log("bubble2 data",(JSON.stringify(this.props.RangingNegotiationPage.chartData) === '[]'));
                      this.setState({noDataforChart: 0});
                    }

                  })()}

                  <Modal show={this.state.noDataforChart} bsSize="lg"
                         aria-labelledby="contained-modal-title-lg"
                  >
                    <Modal.Header>

                      <Modal.Title id="contained-modal-title-sm"
                                   style={{textAlign: 'center', fontSize: '14px'}}><span
                        style={{textAlign: 'center', fontSize: '14px'}}><b>Negotiation Chart and Table Data Info</b><span
                        style={{textAlign: 'right', float: 'right'}}
                        onClick={() =>{
                          this.props.openModal(0);
                          this.setState({noDataforChart: 0}); }
                        }><b>X</b></span></span>
                        <div style={{textAlign: 'center'}}>
                          <div style={{textAlign: 'right'}}>
                          </div>
                        </div>
                      </Modal.Title>

                    </Modal.Header>
                    <Modal.Body style={{fontSize: '14px'}}>
                      There is no data for "Negotiation Chart and Table" to displayed
                    </Modal.Body>
                  </Modal>

                </div>



                {/*Bubble Table*/}
                <Panel>
                  <div>

                    {/*Search*/}
                    <div className="col-xs-5" style={{marginBottom: "10px", marginLeft: "-14px"}}>


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


                    {/*table*/}
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
                        <th style={{textAlign: 'center'}}>Product Sub Group Value Impact(%)</th>
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
                                            onChange={() => {

                                              let selected=this.props.RangingNegotiationPage.prodArrayOpacity;
                                              let forOpacity = JSON.parse(selected);
                                            //console.log("-=-=-=current selection"+forOpacity);

                                              let selectedRow = obj.base_product_number;
                                              let deselectBubFlag = 0;
                                              let latestUpdatedArray = [];


                                              // Will be used to just store the product number to decide the opacity
                                              for (let i = 0; i < forOpacity.length; i++) {
                                                if (forOpacity[i] !== selectedRow) {

                                                  latestUpdatedArray.push(forOpacity[i]);
                                                }
                                                else {
                                                //console.log("DESELECTION OF BUBBLE")
                                                  deselectBubFlag = 1;
                                                }
                                              }

                                              if (deselectBubFlag === 0) {
                                                latestUpdatedArray.push(selectedRow);
                                              }

                                            //console.log("------",latestUpdatedArray)
                                              let jsonSelection = JSON.stringify(latestUpdatedArray);

                                              this.props.onUpdateLoadingIndicationText("Updating the selections...")
                                              this.props.onUpdateLoadingIndicationStatus(true)


                                              this.props.onSaveBubbleParam2(jsonSelection)
                                              {/*this.props.onFetchGraph();*/}
                                              this.props.onGenerateTable();

                                              {/*this.inputUpdate(e.target.checked, obj.base_product_number)*/}
                                              {/*this.tableProductUpdate(e.target.checked,obj.base_product_number);*/}

                                            }}
                                            checked={(() => {

                                              let selected=this.props.RangingNegotiationPage.prodArrayOpacity;
                                              let forOpacity = JSON.parse(selected);
                                              let checkedOrNot=false;

                                              for(let i=0;i<forOpacity.length;i++){
                                                if(forOpacity[i]==obj.base_product_number){
                                                  checkedOrNot=true;
                                                }
                                              }
                                              return checkedOrNot;


                                              {/*let checked = false;*/}
                                              {/*let base_product_number = obj.base_product_number.toString();*/}
                                              {/*this.props.RangingNegotiationPage.checkedList.map(obj2 => {*/}
                                                {/*if (obj2.checked) {*/}
                                                  {/*if (obj2.productId == base_product_number) {*/}
                                                    {/*checked = true*/}
                                                  {/*}*/}
                                                {/*}*/}
                                              {/*});*/}
                                              {/*return checked*/}
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
                                }}>{obj.rate_of_sale}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.store_count}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>£ {obj.rsp}</td>
                                <td style={{textAlign: 'center', verticalAlign: 'center'}}>{obj.psg_value_impact}</td>

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

                    {/*<div className="delistButton"*/}
                    {/*style={{marginTop:"5%"}}>*/}
                      {/*<Button buttonType={'primary'}*/}
                              {/*onClick={() => {*/}

                                {/*let objString = '/ranging/delist?';*/}
                                {/*let selected=this.props.RangingNegotiationPage.prodArrayOpacity;*/}

                                {/*if(selected!=='[]'){*/}
                                    {/*let productSelections = JSON.parse(selected);*/}


                                    {/*for(let i=0;i<productSelections.length;i++){*/}
                                      {/*objString += 'base_product_number=' + productSelections[i] + '&'*/}
                                    {/*}*/}

                                    {/*objString = objString.slice(0, objString.length - 1);*/}

                                    {/*window.location = objString;*/}

                              {/*}else{*/}

                                  {/*alert("You have not selected any products to delist. Are you sure you want to see the delist impact?")*/}
                                {/*}*/}

                              {/*}}>SEND TO DE-LIST</Button>*/}
                    {/*</div>*/}
                  </div>

                </Panel>

              </div>

                {/*Fixed footer*/}
                <div style={{
                  width: '100%',
                  background: '#e5e5e5',
                  bottom: '0',
                  textAlign: 'center',
                  left: '0',
                  position: 'fixed',
                  zIndex: 100,
                  boxShadow: '0px -4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                  height:'55px'
                }}>
                  <Button buttonType={'primary'}
                          style={{marginTop:"7px"}}
                          onClick={() => {


                            let selected=this.props.RangingNegotiationPage.prodArrayOpacity;
                              let bpn_selection=''

                            if(selected!=='[]'){
                              let productSelections = JSON.parse(selected);
                            for(let i=0;i<productSelections.length;i++){
                              bpn_selection += 'base_product_number=' + productSelections[i] + '&'
                              }

                              bpn_selection = bpn_selection.slice(0, bpn_selection.length - 1);

                              let domain="localhost";
                              document.cookie = `PreselectionFromNego=1;domain=${domain};path=/;`;
                              document.cookie = `PreselectionFromNegoData=${bpn_selection};domain=${domain};path=/;`;

                              window.location = '/ranging/delist/';


                            }else{

                              this.setState({showDelistConfirmationModalFlag: true})
                            }

                          }}>SEND TO DE-LIST</Button>
                </div>

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
    openModal: (e) => dispatch(openModal(e)),
    onSaveSideFilterParam: (e) => dispatch(SaveSideFilterParam(e)),
    onGenerateTextBoxQueryString: (e) => dispatch(generateTextBoxQueryString(e.target.value)),
    onResetClickParam: (e) => dispatch(ResetClickParam(e)),
    onUpdateLoadingIndicationStatus: (e) => dispatch(updateLoadingIndicationStatus(e)),
    onUpdateLoadingIndicationText: (e) => dispatch(updateLoadingIndicationText(e)),
    onGenerateCheckedList: (a, b) => dispatch(generateCheckedList(a, b)),


  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNegotiationPage);
