/*
 *
 * RangingScenarioTrackerPage
 *
 */

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
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
import {
  fetchRangingAllScenarioData, tabChange
} from './actions';

export class RangingScenarioTrackerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount = () => {
    console.log("Mounted");
    this.props.onFetchRangingAllScenarioData();

  };

  componentDidUpdate = () => {
    // this.props.onFetchRangingAllScenarioData();
  };

  constructor(props) {
    super(props);
    this.state = {
      activeScenarioListTable: 1,
      activeKey:1,

    };

  }


  render() {
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
            this.props.onFetchRangingAllScenarioData();


          }}><span className="tab_label">NPD</span></NavItem>

          <NavItem className="tabsCustomList" eventKey="2" onClick={() => {
            this.setState({activeKey: "2"});
            let tab = "delist";

            this.props.onTabChange(tab);
            this.props.onFetchRangingAllScenarioData();


          }}><span className="tab_label">Delist</span></NavItem>


        </Nav>


        {(() => {
          if (this.props.RangingScenarioTrackerPage.allScenarioList) {
            document.body.style.cursor = 'default';

            return (
              <Panel>
                <div className="row">
                  <div className="col-xs-12">


                    {/*Heading and info button*/}
                    <div className="row" style={{marginBottom: '3%'}}>
                      <div className="col-xs-12">
                        <div className="scenarioTitle">Select the scenario to be viewed</div>
                      </div>

                    </div>


                    <div id="table">

                      {/*Search*/}
                      <div className="col-xs-12 col-xs-5" style={{marginBottom: "10px"}}>
                        <InputField type={'string'}
                                    placeholder="Search scenario name"
                                    value={this.props.RangingScenarioTrackerPage.scenarioName}
                                    onChange={(e) => {
                                      {/*this.props.onSaveTable1SearchParam(e);*/
                                      }
                                      {/*this.props.onDataFetchCanniProdTable();*/
                                      }
                                    }}
                        />
                      </div>


                      {/*table*/}
                      <table className="table table-hover table-bordered " width="100%">
                        <thead>
                        <tr className="table-header-format"
                            style={{fontSize: "16px", fontFamily: "Tesco"}}>
                          <th>Date</th>
                          {/*<th>Event Name</th>*/}
                          <th>Scenario Name</th>
                          <th></th>
                          <th></th>
                        </tr>
                        </thead>
                        <tbody className="table-body-format">
                        {(() => {
                          if (this.props.RangingScenarioTrackerPage.allScenarioList) {

                            return this.props.RangingScenarioTrackerPage.allScenarioList.map(obj => {

                              return (
                                <tr key={Math.random() + Date.now()}>
                                  {/*<td>{obj.brand_name}</td>*/}
                                  <td style={{width: '20%'}}>{obj.system_time}</td>
                                  {/*<td style={{width:'30%'}}>{obj.event_name}</td>*/}
                                  <td style={{width: '40%'}}>{obj.scenario_name}</td>
                                  <td style={{width: '20%'}}>

                                    <Button onClick={() => {
                                      let page, attributes;
                                      if (this.props.RangingScenarioTrackerPage.selectedTab === "npd") {
                                        page = '/ranging/view-scenario?';

                                        attributes = 'user_id=sachin123' + "&scenario_name=" + obj.scenario_name;


                                      } else {
                                        page = '/ranging/view-scenario_delist?';
                                        attributes = 'user_id=Tanaya' + "&scenario_name=" + obj.scenario_name;

                                      }
                                      let objString = page + attributes;
                                      window.location = objString;
                                    }}>View</Button></td>
                                  <td style={{width: '20%'}}><Button>Delete</Button></td>
                                </tr>
                              )

                            })
                          }

                        })()}
                        </tbody>
                      </table>

                      {/*pagination*/}

                      {(() => {

                        if (this.props.RangingScenarioTrackerPage.allScenarioList && this.props.RangingScenarioTrackerPage.allScenarioList.count) {

                          return <Pagination
                            prev
                            next
                            first
                            last
                            ellipsis
                            boundaryLinks
                            items={this.props.RangingScenarioTrackerPage.allScenarioList.pagination_count}
                            maxButtons={5}
                            activeScenarioListTable={this.state.activeScenarioListTable}
                            onSelect={(e) => {
                              alert(e);

                              this.setState({activeScenarioListTable: e})

                              let dataTablePageUrlParamsNew = "page=" + e;
                              alert(dataTablePageUrlParamsNew);

                              {/*this.props.onSaveTable1PageParam(dataTable1PageUrlParamsNew);*/
                              }
                              {/*this.props.onDataFetchCanniProdTable();*/
                              }

                            }}
                          />

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
                {/*{(() => {*/}
                  {/*document.body.style.cursor = 'wait';*/}

                  {/*let dots = window.setInterval(function () {*/}
                    {/*let wait = document.getElementById("wait");*/}
                    {/*if (wait.innerHTML.length > 9)*/}
                      {/*wait.innerHTML = "Loading";*/}
                    {/*else*/}
                      {/*wait.innerHTML += ".";*/}
                  {/*}, 1500);*/}

                {/*})()}*/}


                {/*<Spinner/>*/}
                <div id="wait" style={{marginLeft: '47%'}}>Loading...</div>

              </div>
            )

          }
        })()}


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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RangingScenarioTrackerPage);
