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

        <div className="row">

          {/*Filter*/}
          <div className="col-xs-2">
            {/*----------------Filters---------------------*/}
            {/*<SelectorNpd sideFilter={this.props.RangingNpdPage.sideFilter}*/}
                         {/*location={this.props.location}*/}
                         {/*onSkuChartFetch={this.props.onSkuChartFetch}*/}
                         {/*onOutPerformanceChartFetch={this.props.onOutPerformanceChartFetch}*/}
                         {/*onPriceGravityFetch={this.props.onPriceGravityFetch}*/}
                         {/*onUnmatchedProdTable={this.props.onUnmatchedProdTable}*/}
                         {/*onGenerateUrlParams={this.props.onGenerateUrlParams}*/}
                         {/*onSendUrlParams={this.props.onSendUrlParams}*/}
                         {/*onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}*/}
                         {/*dataWeekUrlParams={dataWeekUrlParams}*/}
                         {/*dataPageUrlParams={dataPageUrlParams}*/}
                         {/*dataFilterUrlParams={dataPageUrlParams}*/}
                        {/*/>*/}

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
          <div className="col-xs-10">
            <Panel>

              {/*Buttons*/}
              <div>
                <Button key={Date.now() + Math.random()}
                        onClick={() => {

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


                        }}>13 Weeks</Button>
                <Button key={Date.now() + Math.random()}
                        onClick={() => {
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


                        }}>26 Weeks</Button>
                <Button key={Date.now() + Math.random()}
                      onClick={() => {
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

                      }}>52 Weeks</Button>
            </div>

              {/*Outperformance and SKU distribution*/}
              <div className="row">

                {/*Outperformance*/}
                <div className="col-xs-12 col-md-6">
                  <div className="ts-blk-proview">
                    <h4 className="ts-blk-proview-subhead">Product Sub-group Sales Outperformance</h4>


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
                    <h4 className="ts-blk-proview-subhead">SKU distribution across Retailers</h4>
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
                    <h4 className="ts-blk-proview-subhead">Price gravity across Retailers</h4>

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
                    <h4 className="ts-blk-proview-subhead">Unmatched Products with Retailers </h4>
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
                      <table className="table table-hover table-striped table-bordered " width="100%">
                        <thead>
                        <tr style={{fontSize:"16px",fontFamily:"Tesco"}}>
                          <th>Product description</th>
                          <th>Retailer</th>
                          <th>ASP</th>
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
                      <nav aria-label="Page navigation example" style={{marginTop:"-35px"}}>
                        <ul className="pagination pagination-lg">
                          {(() => {

                            if (this.props.RangingNpdPage.data && this.props.RangingNpdPage.data.count) {
                              let x = [];
                              let start_index = this.props.RangingNpdPage.data.start_index;
                              let page = this.props.RangingNpdPage.data.page;
                              let end_index = this.props.RangingNpdPage.data.end_index;
                              let pagination_count = this.props.RangingNpdPage.data.pagination_count;
                              let selected_page = 1;

                              {/*if (this.props.location.query.startRow) {*/}
                                {/*selected_page = this.props.location.query.startRow;*/}
                              {/*}*/}


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

                              return x.map(obj => {
                                return (
                                  <li className="page-item"
                                      onClick={() => {
                                        dataPageUrlParams = "page=" + obj;
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
                                      }}><a className="page-link" href="#">{obj}
                                  </a></li>
                                )
                              })
                            }
                          })()}
                        </ul>
                      </nav>


                    </div>
                  </div>
                </div>

             </div>

              {/*NPD impact view navigation button*/}
              <a href="http://localhost:3000/ranging/npd-impact" style={{fontSize:"18px",color:"black"}}
                  >Click to view NPD impact</a>


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
