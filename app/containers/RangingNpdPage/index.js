/*
 *
 * RangingNpdPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Helmet from 'react-helmet';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import messages from './messages';
require('react-bootstrap-table/css/react-bootstrap-table.css')

import {browserHistory} from 'react-router';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingNpdPage from './selectors';
import Button from 'components/button';
import MultiseriesBarChart2 from 'components/MultiseriesBarChart2';
import MultiSeriesHoriBarChart from 'components/MultiSeriesHoriBarChart';
import MultilineOrdinalChart from 'components/MultilineOrdinalChart';
import InputField from 'components/input_field';
import {saveImage,saveDataAsCSV} from './../../utils/exportFunctions';

import './style.scss';
import Panel from 'components/panel';
import { Pagination,Accordion} from 'react-bootstrap';
import { Modal,Nav,NavItem,DropdownButton, MenuItem } from 'react-bootstrap';

import {
  unmatchedProdTable,skuChartFetch,outPerformanceChartFetch,priceGravityFetch,
  sendUrlParams, saveWeekParam,savePageParam,generateTextBoxQueryString,pageLoadSelectFilterIndicator,updateBreadCrumbs
  // generateSideFilter,generateUrlParams, generateUrlParamsString,
} from './actions';
import SelectorNpd from 'components/SelectorNpd';
import CascadedFilterNpd from 'components/CascadedFilterNpd';

import {
  generateSideFilter, generateUrlParams, generateUrlParamsString, checkboxChange
} from './actions';

export class RangingNpdPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.onSendUrlParams(this.props.location.query);
    this.props.onGenerateSideFilter();
  };

  componentDidUpdate = () => {
    this.props.onSendUrlParams(this.props.location.query);


  };

  constructor(props) {
    super(props);
    this.state = {
      activeKey: "1",
      activePage: 1,
      showInfoModalFlag:false,
      infoModalHeader:'',
      infoModalHelpText:'',


    };
  }



  render() {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      } ], // you can change the dropdown list for size per page
      sizePerPage: 5,  // which size per page you want to locate as default
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

    if(this.props.RangingNpdPage.price_gravity_data) {
      const price_gravity_axis_bands = this.props.RangingNpdPage.price_gravity_data.price_bucket;
      const price_gravity_data = this.props.RangingNpdPage.price_gravity_data.data;
      const price_gravity_comp_color = this.props.RangingNpdPage.price_gravity_data.colors;
    }

    //For url parameters
    let dataWeekUrlParams=this.props.RangingNpdPage.dataWeekUrlParams;
    let dataPageUrlParams=this.props.RangingNpdPage.dataPageUrlParams;
    let dataFilterUrlParams=this.props.RangingNpdPage.urlParamsString;
// console.log('previous selection',this.props.RangingNpdPage.filter_selection);

    let formatSales = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000);
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
      }

      else {
        return ('£ ' + Math.round(i));
      }
    };

  return (
      <div>

        {/*Page title*/}
        <div className="pageTitle">NPD Opportunity</div>

        {/*Filters and content*/}
        <div className="">

          <div style={{height: '100%',
            position: 'fixed',
            width:'19%',
            overflowX: 'hidden'
            }}>

          {/*----------------Filters---------------------*/}
            <CascadedFilterNpd sideFilter={this.props.RangingNpdPage.sideFilter}
                              location={this.props.location}

                         onSkuChartFetch={this.props.onSkuChartFetch}
                         onOutPerformanceChartFetch={this.props.onOutPerformanceChartFetch}
                         onPriceGravityFetch={this.props.onPriceGravityFetch}
                         onUnmatchedProdTable={this.props.onUnmatchedProdTable}
                         onGenerateUrlParams={this.props.onGenerateUrlParams}
                         onSendUrlParams={this.props.onSendUrlParams}
                         onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}

                         previous_selection={this.props.RangingNpdPage.filter_selection}
                         onCheckboxChange={this.props.onCheckboxChange}
                         onGenerateSideFilter={this.props.onGenerateSideFilter}

                         dataWeekUrlParams={dataWeekUrlParams}
                         dataPageUrlParams={dataPageUrlParams}
                         dataFilterUrlParams={dataPageUrlParams}

                         onPageLoadSelectFilterIndicator={this.props.onPageLoadSelectFilterIndicator}
                         onUpdateBreadCrumbs={this.props.onUpdateBreadCrumbs}
            />
          </div>

          {/*Content*/}

          {(()=>{

            if(this.props.RangingNpdPage.showSelectFilterIndicator){
              return(

                <div style={{width:'78%',
                  marginLeft:'22%'}}>

                <div className="selectAttrituteIndicator">
                  <div>
                    <div style={{lineHeight: '20'}}> ----- Please select the attributes ------</div>
                  </div>
                </div>

                </div>
              )
            }
            else{
              return(

                <div style={{width:'78%',
                  marginLeft:'22%'}}>

                  <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect} className="tabsCustom" >
                    <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                      this.setState({activeKey: "1"});
                      dataWeekUrlParams="week_flag=Latest 13 Weeks";

                      this.props.onSaveWeekParam(dataWeekUrlParams);

                      this.props.onUnmatchedProdTable();
                      this.props.onSkuChartFetch();
                      this.props.onOutPerformanceChartFetch();
                      this.props.onPriceGravityFetch();



                    }}><span className="tab_label">13 Weeks</span></NavItem>

                    <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                      this.setState({activeKey: "2"});


                      dataWeekUrlParams="week_flag=Latest 26 Weeks";
                      this.props.onSaveWeekParam(dataWeekUrlParams);

                      this.props.onUnmatchedProdTable();
                      this.props.onSkuChartFetch();
                      this.props.onOutPerformanceChartFetch();
                      this.props.onPriceGravityFetch();


                    }}><span className="tab_label">26 Weeks</span></NavItem>

                    <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                      this.setState({activeKey: "3"});
                      {/*browserHistory.push(this.props.location.pathname + "?week_flag=Latest 52 Weeks")*/}

                      dataWeekUrlParams="week_flag=Latest 52 Weeks";
                      this.props.onSaveWeekParam(dataWeekUrlParams);

                      this.props.onUnmatchedProdTable();
                      this.props.onSkuChartFetch();
                      this.props.onOutPerformanceChartFetch();
                      this.props.onPriceGravityFetch();


                    }}><span className="tab_label">52 Weeks</span></NavItem>
                  </Nav>

                  {/*BreadCrumbs*/}
                  {(()=> {
                      if(this.props.RangingNpdPage.breadCrumbs!=='')
                      { return (
                        <div className="breadCrumbs">
                          {this.props.RangingNpdPage.breadCrumbs}
                        </div>
                      )
                      }
                    }
                  )()}


                  {/*Info Modal*/}
                  <Modal show={this.state.showInfoModalFlag} bsSize="lg" style={{marginTop:'10%'}}
                         aria-labelledby="contained-modal-title-lg"
                  >
                    <Modal.Header>

                      <Modal.Title id="contained-modal-title-sm" className="pageModuleTitle">
                        <span className="pageModuleTitle"><b>{this.state.infoModalHeader}</b>
                         <span style={{textAlign: 'right', float: 'right'}}
                              onClick={() =>
                              {this.setState({showInfoModalFlag: false})
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

                  <Panel>


                    {/*Outperformance and SKU distribution*/}
                    <div className="row">

                      {/*Outperformance*/}
                      <div className="col-xs-12 col-md-6">
                        <div className="ts-blk-proview">

                          {/*Heading and info button*/}
                          <div className="row">
                           <div className="col-xs-11">
                            <h4 className="pageModuleTitle">Product sub-group sales outperformance</h4>
                            </div>
                            <div className="col-xs-1">
                              <span className="glyphicon glyphicon-info-sign pull-right infoButton"

                                onClick={() => {
                                  this.setState({showInfoModalFlag: true});
                                  this.setState({infoModalHeader: "Product sub-group sales outperformance"});
                                  this.setState({infoModalHelpText: "Tesco’s outperformance wrt the Market at a Product Subgroup level"});
                                }}> </span>
                            </div>
                          </div>


                          {/*<MultiSeriesHoriBarChart data={this.props.RangingNpdPage.multiHoriBarChartData}/>*/}

                          {(() => {
                            if (this.props.RangingNpdPage.multiHoriBarChartData) {
                              return(
                                <div>
                                  <MultiSeriesHoriBarChart ref='MultiSeriesHoriBarChart' data={this.props.RangingNpdPage.multiHoriBarChartData}/>
                                  {/*<div style={{float:"right"}}>*/}
                                    {/*<DropdownButton title="Save Image/CSV" style={{backgroundColor:"#449d44", borderColor:"#398439",color:"#fff"}} id="dropButtonId">*/}
                                        {/*<MenuItem onClick={() => {*/}
                                        {/*saveImage(this.refs.MultiSeriesHoriBarChart.refs.outPerformance,"line_chart")*/}
                                      {/*}*/}
                                    {/*}>Save As JPEG</MenuItem>*/}
                                      {/*<MenuItem onClick={() => {*/}
                                        {/*saveDataAsCSV(this.props.RangingNpdPage.data.multiHoriBarChartData,"multiHoriBarChartData.csv")*/}
                                      {/*}*/}
                                    {/*}>Download CSV</MenuItem>*/}
                                      {/*</DropdownButton>*/}
                                      {/*</div>*/}
                                </div>
                              )
                            }
                          })()}
                        </div>
                      </div>

                      {/*SKU distribution*/}
                      <div className="col-xs-12 col-md-6">
                        <div className="ts-blk-proview">


                          {/*Heading and info button*/}
                          <div className="row">
                            <div className="col-xs-11">
                              <h4 className="pageModuleTitle">SKU distribution across retailers</h4>
                            </div>
                            <div className="col-xs-1">
                              <span className="glyphicon glyphicon-info-sign pull-right infoButton"

                                    onClick={() => {
                                      this.setState({showInfoModalFlag: true});
                                      this.setState({infoModalHeader: "SKU distribution across retailers"});
                                      this.setState({infoModalHelpText: "Comparison of the number of products in each product subgroup between Tesco and its competitors"});
                                    }}> </span>
                            </div>
                          </div>


                        <div id="table">
                            {(() => {
                              if (this.props.RangingNpdPage.multiBarChartData) {
                                return(
                                  <MultiseriesBarChart2 data={this.props.RangingNpdPage.multiBarChartData }/>
                                )
                              }
                            })()}

                            {/*<MultiseriesBarChart2 data={this.props.RangingNpdPage.multiBarChartData }/>*/}
                          </div>
                        </div>
                      </div>

                    </div>


                    {/*price gravity and Table*/}
                    <div className="row">

                      {/*Price gravity*/}
                      <div className="col-xs-12 col-md-6">
                        <div className="ts-blk-proview">


                          {/*Heading and info button*/}
                          <div className="row">
                            <div className="col-xs-11">
                              <h4 className="pageModuleTitle">Price gravity across retailers</h4>
                            </div>
                            <div className="col-xs-1">
                              <span className="glyphicon glyphicon-info-sign pull-right infoButton"

                                    onClick={() => {
                                      this.setState({showInfoModalFlag: true});
                                      this.setState({infoModalHeader: "Price gravity across retailers"});
                                      this.setState({infoModalHelpText: "Comparison of the number of products in each price bucket between Tesco and its competitors, for the selected product subgroup"});
                                    }}> </span>
                            </div>
                          </div>


                          <div id="table">
                            {(() => {
                              if (this.props.RangingNpdPage.price_gravity_data) {
                                return(
                                  <MultilineOrdinalChart data={[{chart_data:price_gravity_data,xaxis_col_name:'price_gravity',yaxis_col_name:'sku_gravity',series_col_name:'id',xaxis_bands:price_gravity_axis_bands,color_order:price_gravity_comp_color},"id2",'£ ']}/>
                                )
                              }
                            })()}




                          </div>

                        </div>
                      </div>

                      {/*table*/}
                      <div className="col-xs-12 col-md-6">
                        <div className="ts-blk-proview">


                          {/*Heading and info button*/}
                          <div className="row">
                            <div className="col-xs-11">
                              <h4 className="pageModuleTitle">Unmatched products with retailers </h4>
                            </div>
                            <div className="col-xs-1">
                              <span className="glyphicon glyphicon-info-sign pull-right infoButton"

                                    onClick={() => {
                                      this.setState({showInfoModalFlag: true});
                                      this.setState({infoModalHeader: "Unmatched products with retailers"});
                                      this.setState({infoModalHelpText: "List of Similar products (based on Buying controller, Buyer, Junior Buyer and Product subgroup selected) that are not present in Tesco’s current assortment, but are present in competitor stores"});
                                    }}> </span>
                            </div>
                          </div>
                          <div>
                            {
                              (() => {
                                if (this.props.RangingNpdPage.data) {


                                  return (
                                    <div>
                                      <BootstrapTable
                                        data={this.props.RangingNpdPage.data.table} options={options}
                                        striped={true}
                                        hover
                                        condensed
                                        pagination={ true }
                                        search={true}
                                        exportCSV={true}
                                      >
                                        <TableHeaderColumn dataField="competitor_product_desc" width="50%" thStyle={{fontSize:'14px'}} tdStyle={{whiteSpace:'normal',fontSize:'12px'}} isKey={true} dataSort={true} dataAlign="left" headerAlign="center">Product Description</TableHeaderColumn>
                                        <TableHeaderColumn dataField="retailer" width="25%" dataSort={true} dataAlign="center">Retailer</TableHeaderColumn>
                                        <TableHeaderColumn dataField="asp" width="25%" dataFormat={formatSales} dataSort={true} dataAlign="center">ASP</TableHeaderColumn>
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

                    {/*NPD impact view navigation button*/}
                    {/*<div style={{textAlign:"right"}}>*/}
                      {/*<Button buttonType={'primary'}*/}
                              {/*style={{marginTop:"5px"}}*/}
                              {/*onClick={() => {*/}

                                {/*let objString = '/ranging/npd-impact';*/}
                                {/*window.location = objString;*/}

                              {/*}}>Click to add new products</Button>*/}
                    {/*</div>*/}

                  </Panel>

                </div>

              );
            }

          })()}

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
                      let urlParamsString=this.props.RangingNpdPage.urlParamsString;

                      if(urlParamsString!==''){
                        document.cookie = `NPDfilterPreSelection=${urlParamsString};domain=localhost;path=/;`;
                      }


                      let objString = '/ranging/npd-impact';
                      window.location = objString;

                    }}>Click to add new products</Button>
          </div>


        </div>
    </div>
    );
  }
}

RangingNpdPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  RangingNpdPage: makeSelectRangingNpdPage(),

});

function mapDispatchToProps(dispatch) {
  return {
    onUnmatchedProdTable: (e) => dispatch(unmatchedProdTable(e)),
    onSkuChartFetch: (e) => dispatch(skuChartFetch(e)),
    onOutPerformanceChartFetch: (e) => dispatch(outPerformanceChartFetch(e)),
    onPriceGravityFetch: (e) => dispatch(priceGravityFetch(e)),
    onSendUrlParams: (e) => dispatch(sendUrlParams(e)),
    // onTabSelect: (e) => dispatch(TabSelect(e)),

    //----Pagination----
    // onPaginationButtonClick: (e) => dispatch(PaginationButtonClick(e)),

    //----Filter----
    onGenerateSideFilter: (e) => dispatch(generateSideFilter(e)),
    // onGenerateTable: (e) => dispatch(generateTable(e)),
    onGenerateUrlParams: (e) => dispatch(generateUrlParams(e)),
    onGenerateUrlParamsString: (e) => dispatch(generateUrlParamsString(e)),

    onCheckboxChange: (e) => dispatch(checkboxChange(e)),
    onGenerateTextBoxQueryString: (e) => dispatch(generateTextBoxQueryString(e.target.value)),


    onSaveWeekParam: (e) => dispatch(saveWeekParam(e)),
    onSavePageParam: (e) => dispatch(savePageParam(e)),

    onPageLoadSelectFilterIndicator: (e) => dispatch(pageLoadSelectFilterIndicator(e)),
    onUpdateBreadCrumbs: (e) => dispatch(updateBreadCrumbs(e)),


  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNpdPage);
