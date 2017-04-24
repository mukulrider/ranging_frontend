/*
 *
 * RangingNpdPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Helmet from 'react-helmet';
// import messages from './messages';
import {browserHistory} from 'react-router';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingNpdPage from './selectors';
import Button from 'components/button';
import MultiseriesBarChart2 from 'components/MultiseriesBarChart2';
import MultiSeriesHoriBarChart from 'components/MultiSeriesHoriBarChart';
import MultilineOrdinalChart from 'components/MultilineOrdinalChart';
import InputField from 'components/input_field';

import './style.scss';
import Panel from 'components/panel';
import {Modal, Pagination,Accordion} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {NavItem} from 'react-bootstrap';

import {
  unmatchedProdTable,skuChartFetch,outPerformanceChartFetch,priceGravityFetch,
  sendUrlParams, saveWeekParam,savePageParam,generateTextBoxQueryString,
  // generateSideFilter,generateUrlParams, generateUrlParamsString,
} from './actions';
import SelectorNpd from 'components/SelectorNpd';
import CascadedFilterNpd from 'components/CascadedFilterNpd';

import {
  generateSideFilter, generateUrlParams, generateUrlParamsString, checkboxChange
} from './actions';
// import {
//   makeSideFilter, makeUrlParams, makeUrlParamsString
// } from './selectors';

export class RangingNpdPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    this.props.onSendUrlParams(this.props.location.query);

    //   let selection=this.props.RangingNpdPage.urlParamsString;
    // this.setCookie(selection);
    // let x = document.cookie;
    // console.log("printing coooooooooookkkkiiiiiiieeeeeessssssss",x);


    this.props.onUnmatchedProdTable();
    this.props.onSkuChartFetch();
    this.props.onOutPerformanceChartFetch();
    this.props.onPriceGravityFetch();
    this.props.onGenerateSideFilter();
  };

  componentDidUpdate = () => {
    this.props.onSendUrlParams(this.props.location.query);


    // let selection=this.props.RangingNpdPage.urlParamsString;
    // this.setCookie(selection);
    // let x = document.cookie;
    // console.log("printing coooooooooookkkkiiiiiiieeeeeessssssss",x);
    //


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
      activeKey2: "11",
      activePage: 1,
    };
  }

  setCookie =(filter_selections)=>{

    document.cookie = filter_selections;
  };



  render() {

    const price_gravity_axis_bands= this.props.RangingNpdPage.price_gravity_data.price_bucket;
    const price_gravity_data= this.props.RangingNpdPage.price_gravity_data.data;
    const price_gravity_comp_color= this.props.RangingNpdPage.price_gravity_data.colors;


    //For url parameters
    let dataWeekUrlParams=this.props.RangingNpdPage.dataWeekUrlParams;
    let dataPageUrlParams=this.props.RangingNpdPage.dataPageUrlParams;
    let dataFilterUrlParams=this.props.RangingNpdPage.urlParamsString;
// console.log('previous selection',this.props.RangingNpdPage.filter_selection);


  return (
      <div>

        {/*Page title*/}
        <div className="pageTitle">NPD Opportunity</div>

        {/*Filters and content*/}
        <div className="flextcontent">

          <div className="flexleft"  style={{ flexBasis: '300px',marginTop:"24px"}}>

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
                        />
          </div>

          {/*Content*/}
          {/*<div className="col-xs-10">*/}
          <div className="flexright" style={{marginLeft: "1%",marginTop:"24px"}}>

                <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect} className="tabsCustom"  style={{marginBottom:"-30px"}}>
                  <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
                    this.setState({activeKey: "1"});
                    dataWeekUrlParams="week_flag=Latest 13 Weeks";

                    this.props.onSaveWeekParam(dataWeekUrlParams);

                    if (dataFilterUrlParams!==''&& dataPageUrlParams!=='') {
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams+"&"+dataFilterUrlParams+"&"+dataPageUrlParams);
                    } else if (dataFilterUrlParams!==''|| dataPageUrlParams!=='') {
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams+"&"+dataFilterUrlParams+dataPageUrlParams);
                    }
                    else{
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams);
                    }


                  }}><span className="tab_label">13 Weeks</span></NavItem>

                  <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
                    this.setState({activeKey: "2"});
                    browserHistory.push(this.props.location.pathname + "?week_flag=Latest 26 Weeks")

                    dataWeekUrlParams="week_flag=Latest 26 Weeks";
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    if (dataFilterUrlParams!==''&& dataPageUrlParams!=='') {
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams+"&"+dataFilterUrlParams+"&"+dataPageUrlParams);
                    } else if (dataFilterUrlParams!==''|| dataPageUrlParams!=='') {
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams+"&"+dataFilterUrlParams+dataPageUrlParams);
                    }
                    else{
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams);
                    }


                  }}><span className="tab_label">26 Weeks</span></NavItem>

                  <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
                    this.setState({activeKey: "3"});
                    {/*browserHistory.push(this.props.location.pathname + "?week_flag=Latest 52 Weeks")*/}

                    dataWeekUrlParams="week_flag=Latest 52 Weeks";
                    this.props.onSaveWeekParam(dataWeekUrlParams);
                    if (dataFilterUrlParams!==''&& dataPageUrlParams!=='') {
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams+"&"+dataFilterUrlParams+"&"+dataPageUrlParams);
                    } else if (dataFilterUrlParams!==''|| dataPageUrlParams!=='') {
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams+"&"+dataFilterUrlParams+dataPageUrlParams);
                    }
                    else{
                      browserHistory.push(this.props.location.pathname+"?"+dataWeekUrlParams);
                    }

                  }}><span className="tab_label">52 Weeks</span></NavItem>
                </Nav>

                {/*<div className="breadcrumb">*/}
                  {/*<span className="label">&nbsp;13 Weeks</span>*/}

                {/*</div>*/}

               <Panel>


              {/*Outperformance and SKU distribution*/}
              <div className="row">

                {/*Outperformance*/}
                <div className="col-xs-12 col-md-6">
                  <div className="ts-blk-proview">
                    <h4 className="pageModuleTitle">Product sub-group sales outperformance</h4>


                      {/*<MultiSeriesHoriBarChart data={this.props.RangingNpdPage.multiHoriBarChartData}/>*/}

                      {(() => {
                        if (this.props.RangingNpdPage.multiHoriBarChartData) {
                          return(
                            <MultiSeriesHoriBarChart data={this.props.RangingNpdPage.multiHoriBarChartData}/>
                          )
                        }
                      })()}
                  </div>
                </div>

                {/*SKU distribution*/}
                <div className="col-xs-12 col-md-6">
                  <div className="ts-blk-proview">
                    <h4 className="pageModuleTitle">SKU distribution across retailers</h4>
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
                    <h4 className="pageModuleTitle">Price gravity across retailers</h4>

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
                    <h4 className="pageModuleTitle">Unmatched products with retailers </h4>
                    <div id="table">

                    {/*Search*/}
                      <div className="col-xs-12 col-xs-5" style={{marginBottom:"10px"}}>
                        <InputField type={'string'}
                                    placeholder="Search Retailer"
                                    value={this.props.textBoxQueryString}
                                    onChange={(e)=>{
                                      this.props.onGenerateTextBoxQueryString(e);
                                      this.props.onUnmatchedProdTable();
                                    }}
                        />
                      </div>
                      <div className="col-xs-0 col-xs-7 " style={{textAlign:"right"}}>
                        {/*<a style={{fontSize:"15px",verticalAlign:"centre"}} onClick={()=>{*/}
                          {/*this.props.onGenerateTextBoxQueryString('');*/}
                          {/*this.props.onUnmatchedProdTable();*/}
                          {/*}}> Clear </a>*/}
                      </div>


                      {/*table*/}
                      <table className="table table-hover table-bordered " width="100%">
                        <thead>
                        <tr>
                          <th className="table-header-format">Product description</th>
                          <th className="table-header-format">Retailer</th>
                          <th className="table-header-format">ASP</th>
                        </tr>
                        </thead>
                        <tbody className="table-body-format">
                        {(() => {
                          if (this.props.RangingNpdPage.data) {
                            return this.props.RangingNpdPage.data.table.map(obj => {

                              return (
                                <tr key={Math.random() + Date.now()}>
                                  <td>{obj.competitor_product_desc}</td>
                                  <td>{obj.retailer}</td>
                                  <td>£{obj.asp}</td>
                                </tr>
                              )
                            })
                          }
                        })()}
                        </tbody>

                      </table>

                      {/*pagination*/}

                      {(() => {
                          if (this.props.RangingNpdPage.data && this.props.RangingNpdPage.data.count) {

                            return <Pagination
                              prev
                              next
                              first
                              last
                              ellipsis
                              boundaryLinks
                              items={this.props.RangingNpdPage.data.pagination_count}
                              maxButtons={5}
                              activePage={this.state.activePage}
                              onSelect={(e) => {

                                this.setState({activePage: e})

                                dataPageUrlParams = "page=" + e;
                                this.props.onSavePageParam(dataPageUrlParams);
                                {/**/
                                }
                                if (dataFilterUrlParams !== '' && dataWeekUrlParams !== '') {
                                  browserHistory.push(this.props.location.pathname + "?" + dataWeekUrlParams + "&" + dataFilterUrlParams + "&" + dataPageUrlParams);
                                } else if (dataFilterUrlParams !== '' || dataWeekUrlParams !== '') {
                                  browserHistory.push(this.props.location.pathname + "?" + dataWeekUrlParams + dataFilterUrlParams + "&" + dataPageUrlParams);
                                }
                                else {
                                  browserHistory.push(this.props.location.pathname + "?" + dataPageUrlParams);
                                }
                              }}
                            />

                          }
                        }
                      )()}



                    </div>
                  </div>
                </div>

             </div>

              {/*NPD impact view navigation button*/}
              <div style={{textAlign:"right"}}>
                 <Button buttonType={'primary'}
                         style={{marginTop:"5px"}}
                         onClick={() => {

                           let objString = '/ranging/npd-impact';
                            window.location = objString;

                         }}>Click to add new products</Button>
              </div>

            </Panel>

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



  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingNpdPage);
