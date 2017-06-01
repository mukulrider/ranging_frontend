/*
 *
 * RangingScenarioTrackerPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {FormattedMessage} from 'react-intl';
import {createStructuredSelector} from 'reselect';
import makeSelectRangingScenarioTrackerPage from './selectors';
import messages from './messages';

import './style.scss';
import Panel from 'components/panel';
import Spinner from 'components/spinner';
import Button from 'components/button';
import InputField from 'components/input_field';
import {Modal, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap';
import {Pagination, Accordion} from 'react-bootstrap';
require('react-bootstrap-table/css/react-bootstrap-table.css')

import {
  fetchRangingAllScenarioData, tabChange,deleteScenario,updateLoadingIndicationStatus,updateLoadingIndicationText,
} from './actions';

export class RangingScenarioTrackerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    console.log("Mounted");
    this.props.onFetchRangingAllScenarioData();

  };

  componentDidUpdate = () => {
    // this.props.onFetchRangingAllScenarioData();
  };

  cellButton=(cell, row,enumObject, rowIndex)=>{
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() =>{
          let page, attributes;
          if (this.props.RangingScenarioTrackerPage.selectedTab === "npd") {
            page = '/ranging/view-scenario?';
            {/*let user_id=this.props.RangingScenarioTrackerPage.user_id;*/}

            attributes = "&scenario_name=" + row.scenario_name+"&scenario_tag=" + row.scenario_tag;


          } else {
            page = '/ranging/view-delist-scenario?';
            attributes = "&scenario_name=" + row.scenario_name;

          }
          let objString = page + attributes;
          window.location = objString;
        }}
      >
        View
      </button>
    )
  }

  cellButton2=(cell,row)=>{
    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() =>{
          if (this.props.RangingScenarioTrackerPage.selectedTab === "npd") {
            let scenario_details = "&scenario_name=" + row.scenario_name + "&scenario_tag=" + row.scenario_tag+"&delete=1";
            this.props.onDeleteScenario(scenario_details);
            this.props.onFetchRangingAllScenarioData();
          }else{

            let scenario_details = "&scenario_name=" + row.scenario_name+"&delete=1";
            this.props.onDeleteScenario(scenario_details);
            this.props.onFetchRangingAllScenarioData();
          }
        }}><span className="glyphicon glyphicon-trash"/>
      </button>
    )

  }
  constructor(props) {
    super(props);
    this.state = {
      activeScenarioListTable: 1,
      activeKey:1,

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


        let formatName=(scenario_detail)=>{
          scenario_detail = scenario_detail.replace("_*_", "'");
        return scenario_detail;
        }
    return (
      <div>
        <Helmet
          title="RangingScenarioTrackerPage"
          meta={[
            {name: 'description', content: 'Description of RangingScenarioTrackerPage'},
          ]}
        />

        {/*Page title*/}
        <div className="pageTitle" style={{marginBottom: '1%'}}>Scenario Tracker</div>

        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
             className="tabsCustom">

          <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
            this.setState({activeKey: "1"});
            let tab = "npd";

            this.props.onTabChange(tab);
            this.props.onUpdateLoadingIndicationText("Loading saved scenarios from NPD...")
            this.props.onUpdateLoadingIndicationStatus(true)

            this.props.onFetchRangingAllScenarioData();


          }}><span className="tab_label">NPD</span></NavItem>

          <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
            this.setState({activeKey: "2"});
            let tab = "delist";

            this.props.onTabChange(tab);
            this.props.onUpdateLoadingIndicationText("Loading saved scenarios from Delist...")
            this.props.onUpdateLoadingIndicationStatus(true)

            this.props.onFetchRangingAllScenarioData();



          }}><span className="tab_label">Delist</span></NavItem>


        </Nav>


        {(() => {
          if (this.props.RangingScenarioTrackerPage.allScenarioList) {
            document.body.style.cursor = 'default';

            return (
              <Panel>

                {(()=>{
                  if(this.props.RangingScenarioTrackerPage.showLoading){
                    return(
                      <div className="loadingAfterApply">

                        {(()=>{
                          document.body.style.cursor='wait';
                        })()}

                        <div>
                          <div id="tabChangeLoading" style={{marginLeft: '35%', position: 'fixed'}}>{this.props.RangingScenarioTrackerPage.loadingText}</div>
                        </div>
                      </div>
                    )
                  }else{
                    document.body.style.cursor='default';
                  }

                })()}

                <div className="row">
                  <div className="col-xs-12">


                    {/*Heading and info button*/}
                    <div className="row" style={{marginBottom: '3%'}}>
                      <div className="col-xs-10">
                        <div className="scenarioTitle">Select the scenario to be viewed</div>
                      </div>
                      <div className="col-xs-2">
                        <div className="scenarioTitle" float="right">
                          <button className="btn btn-warning" style={{marginLeft:'-2%'}}
                                  onClick={() =>{
                                    let page;
                                    if (this.props.RangingScenarioTrackerPage.selectedTab === "npd") {
                                      page = '/ranging/npd?';
                                    } else {
                                      page = '/ranging/negotiation?';
                                    }

                                    window.location = page;
                                  }}>
                            Create new Scenario <span className="glyphicon glyphicon-plus"/>
                        </button>
                        </div>
                      </div>

                    </div>
                    <div>
                      {
                        (() => {

                            if (this.props.RangingScenarioTrackerPage.selectedTab === "npd") {
                              return (
                                <div>
                                  <BootstrapTable
                                    data={this.props.RangingScenarioTrackerPage.allScenarioList} options={options}
                                    striped={true}
                                    hover
                                    condensed
                                    pagination={ true }
                                    search={true}
                                    exportCSV={true}
                                  >
                                    <TableHeaderColumn dataField="system_time" isKey={true} dataSort={true}
                                                       dataAlign="center" width="20%">Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField="scenario_name" dataSort={true} dataFormat={formatName} dataAlign="center"
                                                       width="40%">Scenario Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField="scenario_tag" dataFormat={formatName}dataSort={true} dataAlign="center"
                                                       width="40%">Scenario Tag</TableHeaderColumn>
                                    <TableHeaderColumn dataFormat={this.cellButton} dataSort={true} dataAlign="center"
                                                       width="20%"></TableHeaderColumn>
                                    <TableHeaderColumn dataFormat={this.cellButton2} dataSort={true} dataAlign="center"
                                                       width="20%"></TableHeaderColumn>
                                  </BootstrapTable>

                                </div>
                              )
                            }else{
                              return(
                              <div>
                                <BootstrapTable
                                  data={this.props.RangingScenarioTrackerPage.allScenarioList} options={options}
                                  striped={true}
                                  hover
                                  condensed
                                  pagination={ true }
                                  search={true}
                                  exportCSV={true}
                                >
                                  <TableHeaderColumn dataField="system_time" isKey={true} dataSort={true}
                                                     dataAlign="center" width="20%">Date</TableHeaderColumn>
                                  <TableHeaderColumn dataField="scenario_name" dataSort={true} dataAlign="center"
                                                     width="40%" dataFormat={formatName}>Scenario Name</TableHeaderColumn>
                                  <TableHeaderColumn dataFormat={this.cellButton} dataSort={true} dataAlign="center"
                                                     width="20%"></TableHeaderColumn>
                                  <TableHeaderColumn dataFormat={this.cellButton2} dataSort={true} dataAlign="center"
                                                     width="20%"></TableHeaderColumn>
                                </BootstrapTable>

                              </div>
                              )
                            }



                        })()}

                    </div>




                  </div>
                </div>
              </Panel>

            )
          } else {
            return (
              <div className="loading-scenario">

                {/*<Spinner/>*/}
                <div id="wait" style={{marginLeft: '47%'}}>Loading...</div>

              </div>
            )

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
          boxShadow: '0px -4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        }}>
          <Button buttonType={'primary'} style={{margin: '5px'}}
                  onClick={() => {
                    let page = '/scenario/compare';
                    window.location = page;
                  }}>
            Compare Scenario <b></b>
          </Button>
        </div>
      </div>



    );
  }
}

RangingScenarioTrackerPage.propTypes = {};

const mapStateToProps = createStructuredSelector({
  RangingScenarioTrackerPage: makeSelectRangingScenarioTrackerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchRangingAllScenarioData: (e) => dispatch(fetchRangingAllScenarioData(e)),
    onTabChange: (e) => dispatch(tabChange(e)),
    onDeleteScenario: (e) => dispatch(deleteScenario(e)),
    onUpdateLoadingIndicationStatus: (e) => dispatch(updateLoadingIndicationStatus(e)),
    onUpdateLoadingIndicationText: (e) => dispatch(updateLoadingIndicationText(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingScenarioTrackerPage);
