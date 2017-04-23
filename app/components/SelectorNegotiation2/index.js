/**
 *
 * SelectorNegotiation
 *
 */

import React from 'react';
// import styled from 'styled-components';
import {browserHistory} from 'react-router';
import style from './style.scss';
// import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import {Accordion,PanelGroup, Panel} from 'react-bootstrap';


class SelectorNegotiation2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  updateUrl = (category) => {
    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        console.log(obj);
        let category = obj.id.split('__');


        // if (category[0] === 'buying_controller') {
        //   this.props.onGenerateBuyingController(category[category.length - 1])
        // }
        // if (category[1] === 'category_director') {
        //   // this.props.onGenerateBuyingController(category[category.length - 1])
        //   this.props.onGenerateCategoryDirector(category[category.length - 2])
        // }
        queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
      }
    });
    queryString = queryString.substring(0, queryString.length - 1);
    // APPEND URL PARAMS

    this.props.onGenerateUrlParamsString(queryString);
    console.log("printing querystring",queryString);
    this.props.onGenerateUrlParamsData();
    // this.props.onGenerateSideFilter
    // this.updateNewState(newUrl + '?' + queryString);
    // browserHistory.push(newUrl + '?' + queryString);
  };

  componentDidMount = () => {
    console.log('location->>> ');
    this.props.onGenerateUrlParamsString(this.props.location.search.substring(1, this.props.location.search.length));
    // this.props.onGenerateTable();
  };
  componentDidUpdate = () => {
    // console.log('NewSelector componentDidUpdate', this.props.location);
    // this.props.onGenerateTable();
    // this.props.onGenerateSideFilter();
  };



  applyButtonFunctionality = () => {
    this.props.onGenerateTable();
    this.props.onFetchGraph();

  };

  clearFilter = ()=>{
    this.props.onGenerateUrlParamsString('');
    this.props.onGenerateUrlParamsData();
  };

  render() {

    return (

      <div ref={'selector'}>
        {(() => {
          return (
            <div id="style-7" style={{
              height: '90%',
              width: '18%',
              position: 'fixed',
              overflow: 'scroll',
              paddingRight: '5px',
              overflowX: 'hidden',
              borderTop: '1px solid #ccc',
            }}>

              <PanelGroup defaultActiveKey="1" accordion>
                {console.log('this.props.sideFilter.checkbox_list',this.props.sideFilter.checkbox_list)}
              {this.props.sideFilter.checkbox_list.map((item,key) => {
                var panelHeader = (
                <div  className="text-capitalize">
                  {item.title.replace(/_/g, ' ')}&nbsp;{item.required ? <span style={{color: 'red'}}>*</span> : ''} &nbsp;
                  <span className="accordion-toggle" style={{float: 'right'}}></span>
                </div>);
                return (
                        <Panel header={panelHeader} eventKey={++key}>
                          <div className="panel selector">
                        {/*<input type="text" value={this.props.filterSearch}*/}
                               {/*onChange={(e) => {*/}
                                 {/*// console.log(e);*/}
                                 {/*let search = e.target.value.toLowerCase();*/}
                                 {/*if (!search) return*/}

                                 {/*let parent = e.target.parentNode;*/}
                                 {/*while (parent.classList.contains('selector')) {*/}
                                   {/*parent = parent.parentNode;*/}
                                 {/*}*/}
                                 {/*parent = parent.parentNode;*/}
                                 {/*let inputText = parent.querySelectorAll(`input[name*=${search}]`);*/}
                                 {/*// console.log(inputText);*/}

                                 {/*// inputText.map(obj=>{*/}
                                 {/*//   obj.setAttribute('hidden')*/}
                                 {/*// })*/}

                                 {/*// for (let i = 0; i < inputText.length; i++) {*/}
                                 {/*//   inputText[i].setAttribute("hidden", true)*/}
                                 {/*// }*/}
                               {/*}}/>*/}


                      <div className="panel-body style-7"
                           style={{maxHeight: '250px', overflowX: 'hidden'}}>
                        {item.items.map(obj => {
                          if (obj.highlighted) {
                            if (item.input_type == 'RadioButton') {
                              return <RadioButton id={item.id + '__' + item.category_director + '__' + obj.title}
                                                  label={obj.title}
                                                  valid={true}
                                                  key={item.id + '__' + obj.title}
                                                  name={obj.title.toLowerCase() }
                                                  onChange={() => {
                                                    this.updateUrl(item.id)
                                                  }}
                                                  checked={obj.resource.selected}
                                                  isDisabled={!obj.highlighted}
                              />
                            }
                            return <Checkbox id={item.id + '__' + item.category_director + '__' + obj.title}
                                             label={obj.title}
                                             valid={true}
                                             key={item.id + '__' + obj.title}
                                             name={obj.title.toLowerCase()}
                                             onChange={() => {
                                               this.updateUrl(item.id)
                                             }}
                                             checked={obj.resource.selected}
                                             isDisabled={!obj.highlighted}
                            />
                          }
                        })}
                        <hr/>
                        {item.items.map(obj => {
                          if (!obj.highlighted) {
                            if (item.input_type == 'RadioButton') {
                              return <RadioButton id={item.id + '__' + item.category_director + '__' + obj.title}
                                                  label={obj.title}
                                                  valid={true}
                                                  key={item.id + '__' + obj.title}
                                                  name={obj.title.toLowerCase() }
                                                  onChange={() => {
                                                    this.updateUrl(item.id)
                                                  }}
                                                  checked={obj.resource.selected}
                                                  isDisabled={!obj.highlighted}
                              />
                            }
                            return <Checkbox id={item.id + '__' + item.category_director + '__' + obj.title}
                                             label={obj.title} valid={true}
                                             key={item.id + '__' + obj.title}
                                             name={obj.title.toLowerCase() }
                                             onChange={() => {
                                               this.updateUrl(item.category_director)
                                             }}
                                             checked={obj.resource.selected}
                                             isDisabled={!obj.highlighted}
                            />
                          }
                        })}
                      </div>
                    </div>
                  </Panel>)
                })
              }

              </PanelGroup>

              <Button style={{marginLeft:"40px"}}
                onClick={() => {

                  this.applyButtonFunctionality();

                }}>Apply Filters</Button>

              <Button style={{marginTop:"4px", marginLeft:"40px"}}
                onClick={() => {
                  this.props.onGenerateUrlParamsString('');
                  this.props.onGenerateUrlParamsData();
                }}>Clear Filters Selection</Button>
            </div>
          )
        })()}
      </div>
    );
  }
}

SelectorNegotiation2.propTypes = {};

export default SelectorNegotiation2;
