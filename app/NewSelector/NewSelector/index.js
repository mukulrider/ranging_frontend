/**
 *
 * NewSelector
 *
 */

import React from 'react';
import {browserHistory} from 'react-router';
import Checkbox from 'components/checkbox';

import Panel from 'components/panel';
class NewSelector extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  updateUrl = (category) => {
    console.log('updateUrl');
    let newUrl = this.props.location.pathname;
    let x = '';
    // let queryParams = this.props.location.query;
    // console.log(this.refs.selector);
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        let category = obj.name.split('__');
        console.log(category);
        x = x + `${category[0]}=${obj.name.split('__').pop()}&`;
      }
    });
    const queryString = x.substring(0, x.length - 1);
    // APPEND URL PARAMS
    this.props.onGenerateUrlParamsString(queryString);
    this.props.onGenerateUrlParamsData();
    // this.updateNewState(newUrl + '?' + queryString);
    browserHistory.push(newUrl + '?' + queryString);
  };

  componentDidMount = () => {
    // GENERATE DATA
    this.props.onGenerateTable();
  };

  componentDidUpdate = () => {
    console.log('NewSelector componentDidUpdate', this.props.location);
    this.props.onGenerateTable();
  };

  render() {
    let data = this.props.sideFilter, hierarchyList = [], selectedList = [];
    console.log(this.props.urlData);
    if (!data) {
      return (<div>LOADING</div>)
    }
    // data = data.toJS();
    console.log('data>>>>>', data, this.props.location.query);
    data.map(obj => {
      Object.keys(this.props.location.query).map(queryKey => {
        // if(queryKey.startsWith('page')) {
        //   return
        // }
        console.log('queryKey', queryKey, this.props.location.query[queryKey])
        if (obj.names == queryKey) {
          // console.log(queryKey);
          obj.items.map(item => {
            if (item.endsWith(this.props.location.query[queryKey])) { // change logic
              // console.log(item);
              selectedList.push(item);
              item = item.split('__');
              item.pop();
              item = item.join('__');
              console.log('iitem---------', item)
              hierarchyList.push(item);
            }
          })
        }
      })
    });
    // console.log(hierarchyList);
    let query = this.props.location.query;
    console.log('query>>', query, 'hierarchyList', hierarchyList, 'selectedList', selectedList);
    return (
      <div>
        <div className="row">
          <div className="col-xs-12" ref={'selector'}>
            {(() => {
              if (data) {
                console.log('>>>>>>>>>', typeof data, data);
                {/*let sidefilter = data;*/}
                {/*console.log('typeof', typeof sidefilter);*/}
                return data.map(parent => {
                  return (

                    <Panel>
                      <div className="panel" key={Math.random() + Date.now()}>
                        <div className="panel-heading" style={{
                          fontWeight: '700',
                          fontSize: '16px',
                          borderBottom: '1px solid #ddd'
                        }}>
                          <h3 className="text-capitalize">{parent.names.replace(/_/g, ' ')}</h3>
                          {/*<input type="text"/>*/}
                        </div>
                        <div className="panel-body" style={{maxHeight: '250px', overflowX: 'hidden'}}>
                          {(() => {
                            let finalCheckbox = [];
                            parent.items.map(item => {
                              finalCheckbox.push(
                                <Checkbox id={item}
                                          label={item.split('__').pop()}
                                          key={Math.random() + Date.now()}
                                          onChange={() => {
                                            this.updateUrl(parent.names)
                                          }}
                                          valid={true}
                                          name={parent.names + '__' + item}
                                          checked={(() => {
                                            let check = false;
                                            // CHECK PARENT
                                            let hierarchy = item.split('__');
                                            let lastName = hierarchy.pop();
                                            hierarchy = hierarchy.join('__');
                                            if (typeof  query[parent.names]) {
                                              if (typeof  query[parent.names] == 'string') { // checks for data type
                                                let obj3 = query[parent.names];
                                                console.log('chekc this> ',lastName, obj3, '|' + item, (hierarchy + '__' + obj3),  item == (hierarchy + '__' + obj3));
                                                if (lastName == obj3 || item == (hierarchy + '__' + obj3)) {
                                                  check = true
                                                }
                                              } else {
                                                if (query[parent.names]) { // checks if type object
                                                  query[parent.names].map(obj3 => {
                                                    if (lastName == obj3 || item == (hierarchy + '__' + obj3) ) {
                                                      check = true
                                                    }
                                                  })
                                                }
                                              }
                                            }
                                            return check;
                                          })()}

                                          isDisabled={(() => {
                                            let check = false;
                                            let disabled = false;
                                            // CHECK PARENT
                                            let newName = item.split('__'); // split with __
                                            newName = newName.join('__'); // actual name of item
                                            let allNames = [];
                                            Object.keys(query).map(obj => {
                                              obj = query[obj];
                                              if (typeof obj == 'string') {
                                                allNames.push(obj)
                                              } else {
                                                obj.map(obj2 => {
                                                  allNames.push(obj2)
                                                })
                                              }
                                            });

                                            allNames.map(obj => {
                                              if (item.includes(obj)) {
                                                disabled = false
                                              } else {
                                                disabled = true
                                              }
                                            });

                                            selectedList.map(objx => {
                                              if (objx.startsWith(item) || item.startsWith(objx)) {
                                                disabled = false
                                              } else {
                                                disabled = true
                                              }
                                            });

                                            return disabled;

                                            {/*let x = obj2.startsWith( this.props.PricingScenarioOverviewPage.hierarchy[0]);*/
                                            }

                                            {/*console.log(x);*/
                                            }
                                            {/*return !x*/
                                            }
                                          })()}
                                />
                              )
                            });
                            {/*console.log(finalCheckbox);*/
                            }
                            {/*let finaled = finalCheckbox.sort((x, y)=>{*/
                            }
                            {/*/!*return b.props.checked-a.props.checked;*!/*/
                            }

                            {/*return (x.props.checked === y.props.checked)? 0 : x.props.checked? -1 : 1;*/
                            }
                            {/*});*/
                            }

                            // for replacing enabled to top
                            let finalled = [];
                            finalCheckbox.map(obj => {
                              {/*console.log(obj.props.checked);*/
                              }
                              if (!obj.props.isDisabled) {
                                finalled.push(obj)
                              }
                            });
                            finalCheckbox.map(obj => {
                              {/*console.log(obj.props.checked);*/
                              }
                              if (obj.props.isDisabled) {
                                finalled.push(obj)
                              }
                            });
                            {/*console.log(finalled.length);*/
                            }
                            return finalled
                          })()}
                        </div>
                      </div>
                    </Panel>
                  )
                })
              } else {
                return (
                  <div>Loading</div>
                )
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}

NewSelector.propTypes = {};

export default NewSelector;
