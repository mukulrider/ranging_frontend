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
import {
  dataFetchOnPageLoad,dataFetchOnBubbleData,dataFetchCanniProdTable,dataFetchOnWaterFallChart,
  sendUrlParams,generateSideFilter, generateUrlParams, generateUrlParamsString,
  saveWeekParam,checkboxChange,loadFromNpdFirst,
  saveTable2SearchParam,saveTable1SearchParam,saveTable2PageParam,saveTable1PageParam,
  saveAspFilterData,saveAcpFilterData,saveSizeFilterData,saveFilterSelectionsTillNow
} from './actions';
import CascadedFilterNpdImpact from 'components/CascadedFilterNpdImpact';



export class RangingNpdImpactPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function



  componentDidMount = () => {
    this.props.onSendUrlParams(this.props.location.query);

    // if(document.cookie) {
    //   let selection_from_npd1 = document.cookie;
    //   selection_from_npd1 = "&"+selection_from_npd1;
    //   console.log("printing coooooooooookkkkiiiiiiieeeeeessssssss in npd impact", selection_from_npd1);
    //   this.props.onLoadFromNpdFirst(selection_from_npd1);
    // }
   //
    this.props.onDataFetchOnBubbleData();
    this.props.onDataFetchCanniProdTable();
    this.props.onDataFetchOnPageLoad();
    // this.props.onDataFetchOnWaterFallChart();

    //  this.props.onGenerateSideFilter();

  };

  componentDidUpdate = () => {
    // this.props.onSendUrlParams(this.props.location.query);

   //this.props.onDataFetchOnBubbleData;
    // this.setCookie('');

  };
  constructor(props) {
    super(props);
    this.state = {smShow: false, lgShow: false, showPreviousChanges: true, activeKey: '1'};
  }


  setCookie =(filter_selections)=>{

    document.cookie = filter_selections;
  };

  render() {


    //For url parameters
    let dataWeekUrlParams=this.props.RangingNpdImpactPage.dataWeekUrlParams;
    let dataPageUrlParams=this.props.RangingNpdImpactPage.dataPageUrlParams;
    let dataFilterUrlParams=this.props.RangingNpdImpactPage.urlParamsString;
    let dataTable1PageUrlParams=this.props.RangingNpdImpactPage.dataTable1PageUrlParams;
    let dataTable2PageUrlParams=this.props.RangingNpdImpactPage.dataTable2PageUrlParams;


    let formatSales = (i) => {
      if(i>=1000 || i<=-1000) {
        let rounded=Math.round(i /1000);
        return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
    }

    else{
      return ('£ ' + Math.round(i));
    }
    };

    let formatVolume = (i) => {
      if(i>=1000 || i<=-1000)
      { let rounded=Math.round(i /1000)
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      }else{
        return (Math.round(i));
      }


    };

    // console.log("----",this.props.RangingNpdImpactPage);



    return (
      <div>
        {console.log("this.props", this.props)}
        <Helmet
          title="RangingNpdImpactPage"
          meta={[
            {name: 'description', content: 'Description of RangingNpdImpactPage'},
          ]}
        />

        {/*Week Tabs*/}
        <div className="row">
          <Button onClick={() => {
            dataWeekUrlParams="week_flag=Last 13 Weeks";
            this.props.onSaveWeekParam(dataWeekUrlParams);
            this.props.onDataFetchCanniProdTable();
            this.props.onDataFetchOnPageLoad();
            this.props.onDataFetchOnBubbleData();

            {/*let browserPushStringWeek='';*/}

            {/*if(dataFilterUrlParams !== ''){*/}
              {/*browserPushStringWeek=dataWeekUrlParams+"&"+dataFilterUrlParams;*/}
            {/*}else{*/}
              {/*browserPushStringWeek=dataWeekUrlParams;*/}
            {/*}*/}
            {/*browserHistory.push(this.props.location.pathname + "?" +browserPushStringWeek);*/}

          }
          }>13 Weeks</Button>

          <Button onClick={() => {
            dataWeekUrlParams="week_flag=Last 26 Weeks";
            this.props.onSaveWeekParam(dataWeekUrlParams);
            this.props.onDataFetchCanniProdTable();
            this.props.onDataFetchOnPageLoad();
            this.props.onDataFetchOnBubbleData();
            {/*let browserPushStringWeek='';*/}

            {/*if(dataFilterUrlParams !== ''){*/}
              {/*browserPushStringWeek=dataWeekUrlParams+"&"+dataFilterUrlParams;*/}
            {/*}else{*/}
              {/*browserPushStringWeek=dataWeekUrlParams;*/}
            {/*}*/}

            {/*browserHistory.push(this.props.location.pathname + "?" +browserPushStringWeek);*/}


          }}>26 Weeks</Button>

          <Button onClick={() => {
            dataWeekUrlParams="week_flag=Last 52 Weeks";
            {/*this.props.onSendUrlParams(completeSelections);*/}
            this.props.onSaveWeekParam(dataWeekUrlParams);
            this.props.onDataFetchCanniProdTable();
            this.props.onDataFetchOnPageLoad();
            this.props.onDataFetchOnBubbleData();

            {/*let browserPushStringWeek='';*/}

            {/*if(dataFilterUrlParams !== ''){*/}
              {/*browserPushStringWeek=dataWeekUrlParams+"&"+dataFilterUrlParams;*/}
            {/*}else{*/}
              {/*browserPushStringWeek=dataWeekUrlParams;*/}
            {/*}*/}

            {/*browserHistory.push(this.props.location.pathname + "?" +browserPushStringWeek);*/}

          }}>52 Weeks</Button>
        </div>

        {/*Main Content*/}
        <div className="row">

          {/*Filters*/}
          <div className="col-xs-2">
            <Panel>

              <CascadedFilterNpdImpact sideFilter={this.props.RangingNpdImpactPage.sideFilter}
            location={this.props.location}

            onGenerateUrlParams={this.props.onGenerateUrlParams}
            onGenerateUrlParamsString={this.props.onGenerateUrlParamsString}
            onSendUrlParams={this.props.onSendUrlParams}
            onDataFetchOnBubbleData={this.props.onDataFetchOnBubbleData}

            onDataFetchCanniProdTable={this.props.onDataFetchCanniProdTable}
          //onDataFetchOnWaterFallChart={this.props.onDataFetchOnWaterFallChart}
            onDataFetchOnPageLoad={this.props.onDataFetchOnPageLoad}

            dataWeekUrlParams={dataWeekUrlParams}
            dataFilterUrlParams={dataFilterUrlParams}

           previous_selection={this.props.RangingNpdImpactPage.filter_selection}
           urlParamsString={this.props.RangingNpdImpactPage.urlParamsString}
           onCheckboxChange={this.props.onCheckboxChange}
           onGenerateSideFilter={this.props.onGenerateSideFilter}


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
          <div className="col-xs-10">
            <Modal show={this.state.lgShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
              <Modal.Body>
                <div>
                  {/*<InputField type="text"*/}
                              {/*placeholder="Enter Forecast Name"*/}
                              {/*value={this.props.newForecastName}*/}
                              {/*onChange={(e) => {*/}
                                {/*this.props.onGenerateForecastName(e.target.value)*/}
                              {/*}}/>*/}
                  {/*<br/>*/}
                  {/*<div style={{textAlign: 'center'}}>*/}
                    {/*{this.props.newScenarioSpinner ?*/}
                      {/*<Spinner style={{display: 'block', margin: '0 auto'}}/> : ''}*/}
                  {/*</div>*/}
                  <div className="row">
                    <div className="col-xs-12">

                      <div className="col-xs-6 center-this">
                        <Panel>
                          <div>
                            <h4>PREDICTED FORECAST</h4>
                          </div>

                          {(() => {
                            if (this.props.RangingNpdImpactPage.waterFallChartData) {
                              {/*console.log('this.props.RangingNpdImpactPage.waterFallChartData',this.props.RangingNpdImpactPage.waterFallChartData);*/}
                              return (
                                <div className="cannibalization-perc-number">
                                  {/*{this.props.RangingNpdImpactPage.waterFallChartData.impact.Cannibilized_volume} %*/}
                                </div>
                              )
                            }})()}

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
                          {/*{(() => {*/}
                            {/*if (this.props.RangingNpdImpactPage.waterFallChartData) {*/}
                              {/*return (*/}
                                {/*<div className="cannibalization-perc-number">*/}
                                  {/*{this.props.RangingNpdImpactPage.waterFallChartData.impact.perc_impact_psg} %*/}
                                {/*</div>*/}
                              {/*)*/}
                            {/*}})()}*/}
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
            <Panel>

              {/*Net Impact (Waterfall chart and impact numbers)*/}
              <Panel>
              <div className="row">
                <div className="col-xs-12">
                  <div className="net-impact-row">

                    <div>
                      <h4 className="ts-blk-proview-subhead"> NET IMPACT </h4>
                    </div>

                    {/*Value*/}
                    <div className="col-xs-6">
                        <Panel>
                          <div className="dashed-border center-this">
                            <h4> VALUE </h4>
                          </div>
                          {/*<h5>Water fall chart</h5>*/}

                           {/*Waterfall chart*/}
                          {(() => {
                            if (this.props.RangingNpdImpactPage.canniProdTableData) {
                              console.log("a1", this.props.RangingNpdImpactPage.canniProdTableData)
                              return (
                                <WaterFallChartNpd data={{chart_data:this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.data, chart_id:"net_impact_waterfall"}}/>
                              )
                            }})()}

                          {/*Impact numbers*/}
                          <div className="row">
                            <div className="col-xs-12">

                              <div className="col-xs-6 center-this">
                                <Panel>
                                  <div className="dashed-border">
                                    <h4> % CANNIBALIZATION</h4>
                                  </div>
                                {/*console.log("volume canni data",this.props.RangingNpdImpactPage.sales_chart.impact.Cannibilized_sales);*/}

                                {(() => {
                                    if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                      {/*console.log('this.props.RangingNpdImpactPage.waterFallChartData',this.props.RangingNpdImpactPage.sales_chart);*/}
                                      return (
                                        <div className="cannibalization-perc-number">
                                          {this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.impact.Cannibilization_perc} %
                                        </div>
                                      )
                                    }})()}

                                </Panel>
                              </div>

                              <div className="col-xs-6 center-this">
                                <Panel>
                                  <div className="dashed-border">
                                    <h4> % IMPACT IN PSG </h4>
                                  </div>

                                  {(() => {
                                    if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                      return (
                                        <div className="cannibalization-perc-number">
                                          {this.props.RangingNpdImpactPage.canniProdTableData.sales_chart.impact.perc_impact_psg} %
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

                    {/*Volume*/}
                    <div className="col-xs-6">
                      <Panel>
                        <div className="dashed-border center-this">
                          <h4> VOLUME </h4>
                        </div>

                     {/*Waterfall chart*/}
                        {(() => {
                          if (this.props.RangingNpdImpactPage.canniProdTableData) {
                            return (
                              <WaterFallChartNpd data={{chart_data:this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.data,chart_id:"net_impact_waterfall_2"}}/>
                            )
                          }})()}

                        {/*Impact numbers*/}
                        <div className="row">
                          <div className="col-xs-12">

                            <div className="col-xs-6 center-this">
                              <Panel>
                                <div className="dashed-border">
                                  <h4> % CANNIBALIZATION</h4>
                                </div>

                                {(() => {
                                  if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                    {/*console.log('this.props.RangingNpdImpactPage.waterFallChartData',this.props.RangingNpdImpactPage.waterFallChartData);*/}
                                    return (
                                      <div className="cannibalization-perc-number">
                                        {this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.impact.Cannibilization_perc} %
                                      </div>
                                    )
                                  }})()}

                              </Panel>
                            </div>

                            <div className="col-xs-6 center-this">
                              <Panel>
                                <div className="dashed-border">
                                  <h4> % IMPACT IN PSG </h4>
                                </div>

                                {(() => {
                                  if (this.props.RangingNpdImpactPage.canniProdTableData) {
                                    return (
                                      <div className="cannibalization-perc-number">
                                        {this.props.RangingNpdImpactPage.canniProdTableData.volume_chart.impact.perc_impact_psg} %
                                      </div>
                                    )
                                  }})()}
                              </Panel>
                            </div>
                          </div>

                        </div>

                      </Panel>
                    </div>
                  </div>
                </div>
              </div>

                <Button
                  onClick={() => this.setState({lgShow: true})}
                  style={{display: 'block', margin: '0 auto'}}>
                  EDIT VOLUME FORECAST
                </Button>

              </Panel>

              {/*Cannibalization Table*/}
              <Panel>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="net-cannibalized-prod">
                       <h4 className="ts-blk-proview-subhead">CURRENT PRODUCTS THAT MIGHT BE CANNIBALIZED</h4>
                          <div id="table">

                            {/*Search*/}
                            <div className="col-xs-12 col-xs-5" style={{marginBottom:"10px"}}>
                              <InputField type={'string'}
                                          placeholder="Search Retailer"
                                          value={this.props.searchTable1}
                                          onChange={(e)=>{
                                            this.props.onSaveTable1SearchParam(e);
                                            this.props.onDataFetchCanniProdTable();
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
                              console.log("a2",this.props.RangingNpdImpactPage.canniProdTableData.similar_product_table);
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
                            <nav aria-label="Page navigation example" style={{marginTop:"-35px"}}>
                              <ul className="pagination pagination-lg">
                                {(() => {

                                  if (this.props.RangingNpdImpactPage.canniProdTableData && this.props.RangingNpdImpactPage.canniProdTableData.count) {
                                    let x = [];
                                    let start_index = this.props.RangingNpdImpactPage.canniProdTableData.start_index;
                                    let page = this.props.RangingNpdImpactPage.canniProdTableData.page;
                                    let end_index = this.props.RangingNpdImpactPage.canniProdTableData.end_index;
                                    let pagination_count = this.props.RangingNpdImpactPage.canniProdTableData.pagination_count;
                                    let selected_page = 1;


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
                                        <li className="page-item" key={Math.random() + Date.now()}
                                            onClick={() => {
                                              let dataTable1PageUrlParamsNew = "page=" + obj;
                                              this.props.onSaveTable1PageParam(dataTable1PageUrlParamsNew );

                                              let browserPushString='';

                                              if(dataFilterUrlParams !== ''){
                                                browserPushString=browserPushString+"&"+dataFilterUrlParams;
                                              }
                                              if (dataWeekUrlParams !== ''){
                                                browserPushString=browserPushString+"&"+dataWeekUrlParams;
                                              }
                                              if(dataTable2PageUrlParams!==''){
                                                browserPushString=browserPushString+"&"+dataTable2PageUrlParams;
                                              }

                                              browserPushString=browserPushString+"&"+dataTable1PageUrlParamsNew ;
                                              browserPushString=browserPushString.replace('&','');

                                              browserHistory.push(this.props.location.pathname + "?" +browserPushString);

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
              </Panel>

              {/*Supplier Impact(Table and bubble chart*/}
              <Panel>
                <div className="row">
                  <div className="col-xs-12">
                    <div className="supplier-performance">
                      <h4 className="ts-blk-proview-subhead">SUPPLIER PERFORMANCE IN PAST</h4>

                      {/*Bubble Chart*/}
                      <div className="col-xs-6 ">
                        {(() => {
                          if (this.props.RangingNpdImpactPage.npd_bubble_chart_data) {
                            {/*console.log("Entered the bubble function in index");*/}
                            return (
                              <BubbleChartNpd
                                data={[this.props.RangingNpdImpactPage.npd_bubble_chart_data, "bubble_chart_npd", "cps_quartile", "pps_quartile", "rate_of_sale"]}/>
                            )
                          }})()}

                      </div>

                      {/*Bubble Table*/}
                      <div className="col-xs-6">
                        <div id="table">


                          {/*Search*/}
                          <div className="col-xs-12 col-xs-5" style={{marginBottom:"10px"}}>
                            <InputField type={'string'}
                                        dataTable2PageUrlParamsNew = "page1=1"
                                        placeholder="Search product"
                                        value={this.props.searchTable2}
                                        onChange={(e)=>{
                                          this.props.onSaveTable2SearchParam(e);
                                          this.props.onDataFetchOnPageLoad();
                                          this.props.onSaveTable2PageParam(dataTable2PageUrlParamsNew );
                                        }}
                            />
                          </div>
                          <div className="col-xs-0 col-xs-7 " style={{textAlign:"right"}}>
                            {/*<a style={{fontSize:"15px",verticalAlign:"centre"}} onClick={()=>{*/}
                            {/*this.props.onGenerateTextBoxQueryString('');*/}
                            {/*this.props.onUnmatchedProdTable();*/}
                            {/*}}> Clear </a>*/}
                          </div>

                          {/*Table*/}
                          <table className="table table-hover table-striped table-bordered " width="100%">
                            <thead>
                            <tr style={{fontSize:"16px",fontFamily:"Tesco"}} key={Math.random() + Date.now()}>
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
                              <tr key={Math.random() + Date.now()+Math.random()}>
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
                          <nav aria-label="Page navigation example" style={{marginTop:"-35px"}}>
                            <ul className="pagination pagination-lg">
                              {(() => {

                                if (this.props.RangingNpdImpactPage.npd_bubble_table_data && this.props.RangingNpdImpactPage.npd_bubble_table_data.count) {
                                  let x = [];
                                  let start_index = this.props.RangingNpdImpactPage.npd_bubble_table_data.start_index;
                                  let page = this.props.RangingNpdImpactPage.npd_bubble_table_data.page;
                                  let end_index = this.props.RangingNpdImpactPage.npd_bubble_table_data.end_index;
                                  let pagination_count = this.props.RangingNpdImpactPage.npd_bubble_table_data.pagination_count;
                                  let selected_page = 1;


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
                                      <li className="page-item" key={Math.random() + Date.now()}
                                          onClick={() => {
                                            let dataTable2PageUrlParamsNew = "page1=" + obj;
                                            console.log("printing pagination for bubble table",dataTable2PageUrlParamsNew);
                                            this.props.onSaveTable2PageParam(dataTable2PageUrlParamsNew );
                                            this.props.onDataFetchOnPageLoad();
                                            {/*let browserPushString2='';*/}

                                            {/*if(dataFilterUrlParams !== ''){*/}
                                              {/*browserPushString2=browserPushString2+"&"+dataFilterUrlParams;*/}
                                            {/*}*/}
                                            {/*if (dataWeekUrlParams !== ''){*/}
                                              {/*browserPushString2=browserPushString2+"&"+dataWeekUrlParams;*/}
                                            {/*}*/}
                                            {/*if(dataTable1PageUrlParams!==''){*/}
                                              {/*browserPushString2=browserPushString2+"&"+dataTable1PageUrlParams;*/}
                                            {/*}*/}

                                            {/*browserPushString2=browserPushString2+"&"+dataTable2PageUrlParamsNew ;*/}
                                            {/*browserPushString2=browserPushString2.replace('&','');*/}

                                            {/*browserHistory.push(this.props.location.pathname + "?" +browserPushString2);*/}

                                          }}><a className="page-link">{obj}
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
                </div>
              </Panel>

            </Panel>

          </div>

        </div>


      </div>
    );
  }
}

RangingNpdImpactPage.propTypes = {

};


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


    onLoadFromNpdFirst: (e) => dispatch(loadFromNpdFirst(e)),


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
