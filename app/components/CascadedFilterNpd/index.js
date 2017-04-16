/**
*
* CascadedFilterNpd
*
*/

import React from 'react';
// import styled from 'styled-components';
import Checkbox from 'components/checkbox';
import Button from 'components/button';
import {browserHistory} from 'react-router';


class CascadedFilterNpd extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount = () => {
    // console.log("----inside selector----",this.props);
    this.props.onGenerateSideFilter();

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



  applyButtonFunctionality = () => {

    let newUrl = this.props.location.pathname;
    let x = '';
  //
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {

        let split=obj.id.split('__');

        x = x + split[1]+"="+split[0]+"&";

      }
    });
  //
    const queryString = x.substring(0, x.length - 1);
    // console.log(queryString);
    this.props.onGenerateUrlParamsString(queryString);

  //   console.log("-=-=-==-==-=-=",queryString)
  //   browserHistory.push(newUrl + '?' + queryString);

    if (this.props.dataPageUrlParams!==''&& this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+"&"+queryString+"&"+this.props.dataPageUrlParams);
    } else if (this.props.dataPageUrlParams!==''|| this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+this.props.dataPageUrlParams+"&"+queryString);
    }
    else{
      browserHistory.push(newUrl + '?' + queryString);
    }


  };

  resetButtonFunctionality = () => {


//To remove the parameters from the url
    let newUrl = this.props.location.pathname;

    const queryString ='';
    this.props.onGenerateUrlParamsString(queryString);
    if (this.props.dataPageUrlParams!==''&& this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+"&"+queryString+"&"+this.props.dataPageUrlParams);
    } else if (this.props.dataPageUrlParams!==''|| this.props.dataWeekUrlParams!=='') {
      browserHistory.push(newUrl+"?"+this.props.dataWeekUrlParams+this.props.dataPageUrlParams+"&"+queryString);
    }
    else{
      browserHistory.push(newUrl);
    }



  }

  render() {
    // console.log("inside the cascaded filter",this.props.previous_selection)
    return (
      <div>

        <div className="row" ref={'selector'}>
          <div className="col-xs-12">
            {(() => {
              if (this.props.sideFilter) {
                return (
                this.props.sideFilter.map(obj => {
                  return (
                    <div className="panel text-capitalize" key={Date.now() + Math.random()}>
                      {/*<div className="panel-heading">*/}
                      {/*{obj.name}*/}
                      {/*</div>*/}
                      <div className="panel-heading"
                           style={{
                             fontWeight: '700',
                             fontSize: '16px',
                             borderBottom: '1px solid #ddd'
                           }}>{obj.name.replace(/_/g, ' ')} <span style={{color:"red"}}>*</span></div>

                      <div className="panel-body" style={{maxHeight: '250px', overflowX: 'scroll', overflowX: 'hidden'}}>
                        {(() => {
                          let finalCheckbox =[];

                            {obj.items.map(obj2 => {
                              finalCheckbox.push(
                                <Checkbox id={obj2.name + '__' + obj.name}
                                        label={obj2.name}
                                        style={{fontSize: '10px'}}
                                        checked={(() => {
                                          return obj2.selected
                                        })()}
                                        onChange={() => {

                                          let previous_selection=this.props.previous_selection;
                                          let selection=obj.name+"="+obj2.name;
                                          //For enabling un checking
                                          {/*console.log('previous_selection',previous_selection);*/}
                                          {/*console.log('selection',selection);*/}
                                          if(previous_selection==selection)
                                          {
                                            selection='';
                                          }
                                          this.props.onCheckboxChange(selection);
                                          this.props.onGenerateSideFilter();
                                        }}
                                        isDisabled={obj2.disabled}
                                        valid={true}
                                          key={Date.now() + Math.random()}
                              />
                            )
                          })}

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
                          return finalled

                        })()}
                          </div>
                    </div>
                  )
                })
                )
              }
            })()}
          </div>
        </div>

        <Button style={{marginTop:"5px"}}
          onClick={() => {

            this.applyButtonFunctionality();

          }}>Apply Filters</Button>

        <Button style={{marginTop:"5px"}}
          onClick={() => {
            //To un check all the buttons
            let selection='';
            this.props.onCheckboxChange(selection);
            this.props.onGenerateSideFilter();

            {/*this.resetButtonFunctionality();*/}

          }}>Clear Filter Selections</Button>

        <Button style={{marginTop:"5px"}}
          onClick={() => {
            //To un check all the buttons
            {/*let selection='';*/}
            {/*this.props.onCheckboxChange(selection);*/}
            {/*this.props.onGenerateSideFilter();*/}

            this.resetButtonFunctionality();

          }}>Load Default view</Button>


      </div>


    );
  }
}

CascadedFilterNpd.propTypes = {

};

export default CascadedFilterNpd;
