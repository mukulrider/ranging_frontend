/**
 *
 * Selector
 *
 */

import React from 'react';
// import styled from 'styled-components';
import {FormattedMessage} from 'react-intl';
import messages from './messages';
import {browserHistory} from 'react-router';
import style from './style.scss';
import Panel from 'components/panel';
import Checkbox from 'components/checkbox';

class SelectorNpd extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  // -------------------------------------------UNCOMMENT WHEN DATA IS READY---------------------------------------------------

  generateKeys = (obj) => {


    let buyer = [];
    let junior_buyer = [];
    let product_subgroup = [];

    Object.keys(obj).forEach(i => {
      Object.keys(obj[i]).forEach(j => {
           buyer.push(j);
        Object.keys(obj[i][j]).forEach(k => {
          junior_buyer.push(k);
          (obj[i][j][k]).forEach(l => {
            product_subgroup.push(l);
          })
        })
      })
    });

    return {
      buying_controller: Object.keys(obj),
      buyer: buyer,
      junior_buyer: junior_buyer,
      product_sub_group_description: product_subgroup,
    };

  };

  // -------------------------------------------------------------------------------------------------------------

  updateUrl2 = (evt, category) => {
    let newUrl = this.props.location.pathname;
    let x = '';
    // let queryParams = this.props.location.query;
    // console.log(this.refs.selector);
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        x = x + `${obj.name.split('__')[1]}=${obj.value}&`;
      }
    });

    const queryString = x.substring(0, x.length - 1);
    this.props.onGenerateUrlParamsString(queryString);

    // browserHistory.push(newUrl + '?' + queryString);

    if (this.props.dataPageUrlParams!==''&& this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+"&"+queryString+"&"+this.props.dataPageUrlParams);
    } else if (this.props.dataPageUrlParams!==''|| this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+this.props.dataPageUrlParams+"&"+queryString);
    }
    else{
      browserHistory.push(newUrl + '?' + queryString);
    }



  };

  updateUrl = (evt, category) => {
    evt.target.checked = !!evt.target.checked;
    this.updateUrl2(evt, category);
  };

  componentDidUpdate = () => {
    const urlParams = this.props.location.query;
    this.props.onGenerateUrlParams(urlParams);
    this.props.onSendUrlParams(urlParams);


    this.props.onUnmatchedProdTable();
    this.props.onSkuChartFetch();
    this.props.onOutPerformanceChartFetch();
    this.props.onPriceGravityFetch();

  };

  render() {
    return (
      <div ref={'selector'}>
        {(() => {
          if (this.props.sideFilter) {
            const filterKeysList = this.generateKeys(this.props.sideFilter);
            return Object.keys(filterKeysList).map(category => {
              return (
                <Panel>
                  <div key={Date.now() + Math.random()}
                       ref={'selector__' + category}
                       className=" text-capitalize">
                    <div className="panel-heading"
                         style={{
                           fontWeight: '700',
                           fontSize: '16px',
                           borderBottom: '1px solid #ddd'
                         }}>{category.replace(/_/, ' ')}</div>
                    <div className="panel-body"
                         style={{maxHeight: '250px', overflowX: 'scroll', overflowX: 'hidden'}}>
                      {filterKeysList[category].map(data2 => {
                        return (
                          <Checkbox value={data2.toLowerCase()}
                                    name={`selector__${category}__${data2}`.toLowerCase()}
                                    id={`selector__${category}__${data2}`.toLowerCase()}
                                    onChange={(evt) => this.updateUrl(evt, category)}
                                    valid={true}
                                    label={data2}
                                    style={{fontSize: '14px'}}
                                    checked={(() => {
                                      let params = Object.values(this.props.location.query);
                                      let newParams = [];
                                      {/*console.log('params', params);*/}
                                      params.map(obj => {
                                        if (typeof obj == 'string') {
                                          newParams.push(obj.toLowerCase())
                                        } else {
                                          obj.map(obj2 => {
                                            newParams.push(obj2.toLowerCase())
                                          })
                                        }
                                      });
                                      {/*console.log('newParams', newParams);*/}
                                      {/*console.log('data2', data2);*/}
                                      if (newParams.indexOf(data2.toLowerCase()) > -1) {
                                        return true
                                      }
                                      return false;
                                    })()}/>
                        )
                      })}
                    </div>
                  </div>
                </Panel>
              )
            });
          } else {
            return (
              <div>
                {[1, 2, 3].map(() => {
                  return (
                    <div key={Date.now() + Math.random()} className="panel panel-default ">
                      <div className="panel-heading"
                           style={{height: '30px'}}></div>
                      <div className="panel-body"
                           style={{height: '100px'}}></div>
                    </div>
                  )
                })}
              </div>
            )
          }
        })()}
      </div>
    );
  }
}

SelectorNpd.propTypes = {};

export default SelectorNpd;
