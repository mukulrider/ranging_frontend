/**
 *
 * SelectorNegotiation
 *
 */

import React from 'react';
// import styled from 'styled-components';
import {browserHistory} from 'react-router';
import style from './style.scss';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';
import Button from 'components/button';


class SelectorNegotiation2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  updateUrl = (category) => {
    // console.log('updateUrl');
    let newUrl = this.props.location.pathname;
    let x = '';
    // let queryParams = this.props.location.query;
    // console.log(this.refs.selector);
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        console.log(obj);
        let category = obj.name.split('__');
        // console.log(category);
        x = x + `${category[0]}=${category.pop()}&`;
      }
    });
    const queryString = x.substring(0, x.length - 1);
    // APPEND URL PARAMS
    this.props.onGenerateUrlParamsString(queryString);
    this.props.onGenerateUrlParamsData();
  };

  componentDidMount = () => {
    console.log('location->>> ');
    this.props.onGenerateUrlParamsString(this.props.location.search.substring(1, this.props.location.search.length));
  };
  // componentDidUpdate = () => {
  //   const urlParams = this.props.location.query;
  //   // console.log(urlParams);
  //   this.props.onGenerateUrlParams(urlParams);
  //   this.props.onURLRequest(urlParams);
  //
  // };


  applyButtonFunctionality = (sideFilterFunc) => {
    this.props.onGenerateTable();
    this.props.onFetchGraph();

  };

  render() {


    return (

      <div ref={'selector'}>
        {(() => {
          return (
            <div >
              {this.props.sideFilter.checkbox_list.map(item => {
                return (
                  <Panel key={Math.random() + Date.now()}>
                    <div className="panel">
                      <div className="panel-heading"
                           style={{
                             fontWeight: '700',
                             fontSize: '16px',
                             borderBottom: '1px solid #ddd'
                           }}>
                        <h4 className="text-capitalize">{item.title.replace(/_/g, ' ')}</h4>
                      </div>
                      <div className="panel-body" style={{maxHeight: '250px', overflowX: 'hidden'}}>
                        {item.items.map(obj => {
                          if (obj.highlighted) {
                            return <Checkbox id={item.id + '_' + obj.title} label={obj.title}
                                             valid={true}
                                             key={item.id + '_' + obj.title}
                                             name={item.title + '__' + obj.title}
                                             onChange={() => {
                                               this.updateUrl(item.id)
                                             }}
                                             checked={obj.resource.selected}
                                             isDisabled={!obj.highlighted}/>
                          }
                        })}
                        {item.items.map(obj => {
                          if (!obj.highlighted) {
                            return <Checkbox id={item.id + '_' + obj.title}
                                             label={obj.title} valid={true}
                                             key={item.id + '_' + obj.title}
                                             name={item.title + '__' + obj.title}
                                             onChange={() => {
                                               this.updateUrl(item.id)
                                             }}
                                             checked={obj.resource.selected}
                                             isDisabled={!obj.highlighted}/>
                          }
                        })}
                      </div>
                    </div>
                  </Panel>
                )
              })}
              <Button
                onClick={() => {

                  this.applyButtonFunctionality(this.props.onSaveSideFilterParam);

                }}>Apply Filters</Button>

              <Button
                onClick={() => {
                  this.props.onGenerateUrlParamsString('');
                  this.props.onGenerateUrlParamsData();
                }}>Clear all</Button>
            </div>
          )
        })()}
      </div>
    );
  }
}

SelectorNegotiation2.propTypes = {};

export default SelectorNegotiation2;
