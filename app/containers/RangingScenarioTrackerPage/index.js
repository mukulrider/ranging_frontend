/*
 *
 * RangingScenarioTrackerPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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
import LinearProgress from 'material-ui/LinearProgress';

import {
  fetchRangingAllScenarioData,
  fetchPricingAllScenarioData,
  tabChange,
  deleteScenario,
  updateLoadingIndicationStatus,
  updateLoadingIndicationText,
  fetchRangingAllScenarioDataSuccess,
} from './actions';

export class RangingScenarioTrackerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    let ScenarioTrackerTabPreselection=getCookie('ScenarioTrackerTabPreselection');

    if(ScenarioTrackerTabPreselection){
      document.cookie = 'ScenarioTrackerTabPreselection'+'=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=localhost;path=/;';
      if(ScenarioTrackerTabPreselection==="npd"){
        this.setState({activeKey: "1"});
        this.setState({currentTab: "NPD"});

        let tab = "npd";

        this.props.onTabChange(tab);
        this.props.onFetchRangingAllScenarioData();

      }else if(ScenarioTrackerTabPreselection==="delist"){
        this.setState({activeKey: "2"});
        this.setState({currentTab: "Delist"});

        let tab = "delist";

        this.props.onTabChange(tab);
        this.props.onFetchRangingAllScenarioData();

      }
    }

    this.props.onFetchRangingAllScenarioData();

  };

  componentDidUpdate = () => {
    // this.props.onFetchRangingAllScenarioData();
  };

  cellButton = (cell, row, enumObject, rowIndex) => {
    return (
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          let page, attributes;
          if (this.props.RangingScenarioTrackerPage.selectedTab === "npd") {
            page = '/ranging/view-scenario?';
            {/*let user_id=this.props.RangingScenarioTrackerPage.user_id;*/
            }

            attributes = "&scenario_name=" + row.scenario_name + "&scenario_tag=" + row.scenario_tag;


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

  cellButton2 = (cell, row) => {
    return (
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => {
          if (this.props.RangingScenarioTrackerPage.selectedTab === "npd") {
            let scenario_details = "&scenario_name=" + row.scenario_name + "&scenario_tag=" + row.scenario_tag + "&delete=1";
            this.props.onDeleteScenario(scenario_details);

          } else {

            let scenario_details = "&scenario_name=" + row.scenario_name + "&delete=1";
            this.props.onDeleteScenario(scenario_details);

          }
          this.setState({deleteConfirmationShow: true})
        }}><span className="glyphicon glyphicon-trash"/>
      </button>
    )

  }

  constructor(props) {
    super(props);
    this.state = {
      activeScenarioListTable: 1,
      activeKey: '1',
      smShow: false, lgShow: false,
      currentTab:'NPD',
      deleteConfirmationShow:false
    };

  }


  pricingCellButton = (cell, row) => {
    // console.log("Row:", row);
    // console.log("Cell:", cell);
    let page, attribute;
    page = '/pricing/forecast-scenario-2/';
    attribute = row.event_name.replace(/ /g, '-') + '-' + row.a_id + '/' + row.scenario_buyer_id + '-' + row.b_id;
    let windowRedirectUrl = page + attribute;

    if (row.status == true)
      return (
        <a href={windowRedirectUrl} className="btn btn-primary btn-lg text-center">View</a>
      )
    else
      return (
        <span>Pending <Spinner/></span>
      )
  }

  pricingCellButton2 = (cell, row) => {
    return (
      <button
        className="btn btn-danger"
        onClick={() => {
          // console.log("Inside Delete Button:");
          this.setState({lgShow: true})
          this.props.onDeleteKey(row.scenario_buyer_id)
        }}>
        <span className="glyphicon glyphicon-trash"> </span>

      </button>
    )
  }

  weeks = (row, cell) => {
    console.log('row', row);
    console.log('cell', cell);
    console.log(parseInt(cell.weeks / 12))
    return (
      <div>
        {cell.weeks}
        <br/>
        <LinearProgress mode="determinate" value={parseInt(cell.weeks * 100 / 12)}/>

      </div>
    )
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


    let formatName = (scenario_detail) => {
      scenario_detail = scenario_detail.replace("_*_", "'");
      return scenario_detail;
    }

    let formatVolume = (i) => {
      if (i >= 1000 || i <= -1000) {
        let rounded = Math.round(i / 1000)
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      } else {
        return (Math.round(i));
      }


    };


    let arr = []


    if (this.props.RangingScenarioTrackerPage.pricingScenarioStatus) {
      this.props.RangingScenarioTrackerPage.pricingScenarioStatus.map((obj_a, x) => {
        let storevar = obj_a.event;
        {/*console.log("storevar", storevar);*/
        }
        return storevar.map((obj_b, q) => {
          {/*console.log("bb", obj_b);*/
          }
          if (obj_b.status !== 0 && obj_b.display_scenario === 1) {

            let s_no = x + 1;
            arr.push({
              s_no: s_no,
              a_id: obj_a.id,
              b_id: obj_b.id,
              event_name: obj_a.event_name,
              scenario_name: obj_b.scenario_name,
              start_date: new Intl.DateTimeFormat("en-GB").format(new Date(obj_a.start_date)),
              created_date: new Intl.DateTimeFormat("en-GB").format(new Date(obj_a.created_on)),
              weeks: obj_a.weeks,
              store_format: obj_a.store_format,
              scenario_buyer_id: obj_b.scenario_buyer_id,
              status: (() => {
                if ([4, 5, 6].includes(obj_b.status)) {
                  return true
                } else {
                  return false
                }
              })()

            })

          }
        })
      });
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


        {/*Delete confirmation modal*/}
        <Modal show={this.state.deleteConfirmationShow} onHide={() => {
          this.setState({deleteConfirmationShow: false})
        }} bsSize="large" aria-labelledby="contained-modal-title-sm">
          <Modal.Body>

            <div className="row">
              <div className="col-xs-12 alertModalStyle">
                Are you sure you want to delete this event?
              </div>
            </div>


          </Modal.Body>
          <Modal.Footer>
            <div className="row">
              <div className="col-xs-6">
                <Button buttonType='secondary'
                        onClick={() => {
                          this.props.onDeleteScenario('');
                          this.setState({deleteConfirmationShow: false})
                        }}
                        style={{display: 'block', margin: '0 auto'}}>Cancel</Button>
              </div>
              <div className="col-xs-6">
                <Button buttonType='primary'
                        onClick={() => {
                          this.props.onFetchRangingAllScenarioData();
                          this.setState({deleteConfirmationShow: false})
                          this.props.onUpdateLoadingIndicationText("Deleting the scenario")
                          this.props.onUpdateLoadingIndicationStatus(true)

                        }}
                        style={{display: 'block', margin: '0 auto'}}>Delete</Button>
              </div>

            </div>

          </Modal.Footer>
        </Modal>


        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.handleSelect}
             className="tabsCustom">

          <NavItem className="tabsCustomList" eventKey="1" onClick={() => {
            this.setState({activeKey: "1"});
            this.setState({currentTab: "NPD"});

            this.props.onFetchRangingAllScenarioDataSuccess(false)

            let tab = "npd";

            this.props.onTabChange(tab);
            this.props.onUpdateLoadingIndicationText("Loading saved scenarios from NPD...")
            this.props.onUpdateLoadingIndicationStatus(true)

            this.props.onFetchRangingAllScenarioData();


          }}><span className="tab_label">NPD</span></NavItem>

          <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
            this.setState({activeKey: "2"});
            this.setState({currentTab: "Delist"});

            this.props.onFetchRangingAllScenarioDataSuccess(false)

            let tab = "delist";


            this.props.onTabChange(tab);
            this.props.onUpdateLoadingIndicationText("Loading saved scenarios from Delist...")
            this.props.onUpdateLoadingIndicationStatus(true)

            this.props.onFetchRangingAllScenarioData();


          }}><span className="tab_label">Delist</span></NavItem>

          <NavItem className="tabsCustomList" eventKey="3" onClick={() => {
            this.setState({activeKey: "3"});
            this.setState({currentTab: "Pricing"});
            let tab = "pricing";

            this.props.onTabChange(tab);
            this.props.onUpdateLoadingIndicationText("Loading saved scenarios from Pricing...")
            this.props.onUpdateLoadingIndicationStatus(true)

            this.props.onFetchPricingAllScenarioData();


          }}><span className="tab_label">Pricing</span></NavItem>


        </Nav>


        {(() => {
          if (this.props.RangingScenarioTrackerPage.allScenarioList || this.props.RangingScenarioTrackerPage.pricingScenarioStatus && !this.props.RangingScenarioTrackerPage.showLoading) {
            document.body.style.cursor = 'default';

            return (
              <Panel>

                {(() => {
                  if (this.props.RangingScenarioTrackerPage.showLoading) {
                    return (
                      <div className="loadingAfterApply">

                        {(() => {
                          document.body.style.cursor = 'wait';
                        })()}

                        <div>
                          <div id="tabChangeLoading" style={{
                            marginLeft: '35%',
                            position: 'fixed'
                          }}>{this.props.RangingScenarioTrackerPage.loadingText}</div>
                        </div>
                      </div>
                    )
                  } else {
                    document.body.style.cursor = 'default';
                  }

                })()}

                <div className="row">
                  <div className="col-xs-12">


                    {/*Heading and info button*/}
                    <div className="row" style={{marginBottom: '3%'}}>
                      <div className="col-xs-10">
                        {/*<div className="scenarioTitle">{this.state.currentTab}</div>*/}
                        <div className="scenarioTitle">Select the scenario to be viewed:</div>
                      </div>
                      <div className="col-xs-2">
                        <div className="scenarioTitle">
                          <button className="btn btn-warning" style={{marginLeft: '-2%'}}
                                  onClick={() => {
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
                                  <TableHeaderColumn dataField="scenario_name" dataSort={true} dataFormat={formatName}
                                                     dataAlign="center"
                                                     width="40%">Scenario Name</TableHeaderColumn>
                                  <TableHeaderColumn dataField="scenario_tag" dataFormat={formatName} dataSort={true}
                                                     dataAlign="center"
                                                     width="40%">Product Description</TableHeaderColumn>
                                  <TableHeaderColumn dataFormat={this.cellButton} dataSort={true} dataAlign="center"
                                                     width="20%"></TableHeaderColumn>
                                  <TableHeaderColumn dataFormat={this.cellButton2} dataSort={true} dataAlign="center"
                                                     width="20%"></TableHeaderColumn>
                                </BootstrapTable>

                              </div>
                            )
                          } else if (this.props.RangingScenarioTrackerPage.selectedTab === "pricing") {
                            this.props.onUpdateLoadingIndicationStatus(false);

                            return (
                              <div>
                                <Modal show={this.state.lgShow}
                                       onHide={() => {
                                         this.setState({lgShow: false})
                                       }} bsSize="small" aria-labelledby="contained-modal-title-sm">
                                  <Modal.Header closeButton>
                                    <Modal.Title id="contained-modal-title-sm text-center">Delete Scenario</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <div className="text-center">
                                      Are you sure you want to delete scenario ?
                                      <br/>
                                      <br/>
                                      <button className="btn btn-danger" onClick={() => {
                                        console.log(this.state.deleteKey);
                                        this.props.onDeleteScenario(this.props.RangingScenarioTrackerPage.deleteKey)
                                      }}>
                                        Delete
                                      </button>
                                    </div>
                                  </Modal.Body>
                                </Modal>
                                <BootstrapTable
                                  data={ arr }
                                  exportCSV={ true }
                                  search={ true }
                                  pagination striped hover condensed>
                                  <TableHeaderColumn dataField='s_no' width='5%' dataAlign='center' headerAlign='center'
                                                     dataSort isKey>Sl.
                                    No.</TableHeaderColumn>
                                  <TableHeaderColumn dataField='event_name' dataAlign='center' headerAlign='center'
                                                     dataSort>Event
                                    Name</TableHeaderColumn>
                                  <TableHeaderColumn dataField='scenario_name' dataAlign='center' headerAlign='center'
                                                     dataSort>Scenario
                                    Name</TableHeaderColumn>
                                  <TableHeaderColumn dataField='created_date' dataAlign='center' headerAlign='center'
                                                     dataSort>Event Created
                                    Date</TableHeaderColumn>
                                  <TableHeaderColumn dataField='start_date' dataAlign='center' headerAlign='center'
                                                     dataSort>Start
                                    Date</TableHeaderColumn>
                                  <TableHeaderColumn dataFormat={this.weeks} dataAlign='center' headerAlign='center'>Forecast
                                    Weeks</TableHeaderColumn>
                                  <TableHeaderColumn dataField='store_format' dataAlign='center' headerAlign='center'
                                                     dataSort>Store
                                    Format</TableHeaderColumn>
                                  <TableHeaderColumn dataFormat={this.pricingCellButton} dataAlign='center'
                                                     headerAlign='center'>Status</TableHeaderColumn>
                                  <TableHeaderColumn dataFormat={this.pricingCellButton2} dataAlign='center'
                                                     headerAlign='center'>Delete</TableHeaderColumn>
                                </BootstrapTable>
                              </div>
                            )
                          } else {
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
                                  <TableHeaderColumn dataField="scenario_name" dataSort={true} dataAlign="center"
                                                     width="40%" dataFormat={formatName}>Scenario
                                    Name</TableHeaderColumn>
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
            <div>

              <div className="loading-scenario">

                {(() => {
                document.body.style.cursor = 'wait';
                })()}


                {/*<Spinner/>*/}
                <div id="wait" style={{height:this.props.RangingScenarioTrackerPage.allScenarioList || this.props.RangingScenarioTrackerPage.pricingScenarioStatus?'100%':'500px'}}>{this.props.RangingScenarioTrackerPage.loadingText}</div>
                </div>

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
    onFetchRangingAllScenarioDataSuccess: (e) => dispatch(fetchRangingAllScenarioDataSuccess(e)),
    onFetchPricingAllScenarioData: (e) => dispatch(fetchPricingAllScenarioData(e)),
    onTabChange: (e) => dispatch(tabChange(e)),
    onDeleteScenario: (e) => dispatch(deleteScenario(e)),
    onUpdateLoadingIndicationStatus: (e) => dispatch(updateLoadingIndicationStatus(e)),
    onUpdateLoadingIndicationText: (e) => dispatch(updateLoadingIndicationText(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingScenarioTrackerPage);
