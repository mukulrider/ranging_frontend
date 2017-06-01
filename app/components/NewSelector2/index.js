/**
 *
 * NewSelector2
 *
 */

import React from 'react';
import {browserHistory} from 'react-router';
import Checkbox from 'components/checkbox';
import RadioButton from 'components/radio_button';
// import Panel from 'components/panel';
import {Accordion, PanelGroup, Panel, Modal} from 'react-bootstrap';
import Button from 'components/button';
// import styled from 'styled-components';
import styles from './style.scss';

class NewSelector2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  updateUrl = (category) => {
    let queryString = '';
    [...this.refs.selector.querySelectorAll('input')].map(obj => {
      if (obj.checked == true) {
        let category = obj.id.split('__');

      if (category[0] === 'long_description') {

          let product_code=category[2].slice(-8);
          queryString = queryString + `base_product_number=${product_code}&`;
        }else {
          queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
        }
        // queryString = queryString + `${category[0]}=${category[category.length - 1]}&`;
        }

    });
    queryString = queryString.substring(0, queryString.length - 1);


    // APPEND URL PARAMS
    this.props.onGenerateUrlParamsString(queryString);
    this.props.onGenerateFilterParamsString(queryString);
  };

  componentDidMount = () => {

  };
  componentDidUpdate = () => {

  };

  constructor(props) {
    super(props);
    this.state = {alertShow: false,alertmsg:"Please Select the Mandatory Filter - 'Buying Controller' & 'Long Description'."};

  }

  clearFilter = () => {
    this.props.onGenerateFilterParamsString('');
    this.props.onGenerateUrlParamsString('');
    // this.props.onGenerateUrlParamsData();
  };

  render() {
    return (

      <div ref={'selector'}>
        {(() => {
          return (
            <div id="style-7" style={{

            }}>
              {/*<div id="style-7" style={{*/}
              {/*height: '52%',*/}
              {/*width: '19%',*/}
              {/*position: 'fixed',*/}
              {/*overflow: 'scroll',*/}
              {/*paddingRight: '5px',*/}
              {/*overflowX: 'hidden',*/}
              {/*borderTop: '1px solid #ccc',*/}
              {/*}}>*/}

              <PanelGroup defaultActiveKey="1" accordion>
                {this.props.sideFilter.checkbox_list.map((item, key) => {
                  var panelHeader = (
                    <div className="text-capitalize">
                      {item.title.replace(/_/g, ' ')}&nbsp;{item.required ?
                      <span style={{color: 'red'}}>*</span> : '' } &nbsp;
                      <span className="accordion-toggle" style={{float: 'right'}}></span>
                    </div>
                  );
                  return (

                    <Panel header={panelHeader} eventKey={++key}>
                      <div className="panel selector">
                        {/*<div className="panel-heading">*/}
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
                        {/*</div>*/}
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
                              return <Checkbox style="font-size:12px;"
                                               id={item.id + '__' + item.category_director + '__' + obj.title}
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
                              return <Checkbox style="font-size:12px,width:230px;"
                                               id={item.id + '__' + item.category_director + '__' + obj.title}
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
                    </Panel>
                  )
                })}
              </PanelGroup>

              <Modal show={this.state.alertShow} bsSize="large" aria-labelledby="contained-modal-title-sm">
                <Modal.Header>
                <Modal.Title id="contained-modal-title-sm"
                             style={{textAlign: 'center', fontSize: '18px'}}><span
                  style={{textAlign: 'center', fontSize: '14px'}}><b>Mandatory Filter Selection Missing</b><span
                  style={{textAlign: 'right', float: 'right'}}
                  onClick={() => this.setState({alertShow: false})}><b>X</b></span></span>
                  <div style={{textAlign: 'center'}}>
                    <div style={{textAlign: 'right'}}>
                    </div>
                  </div>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <div className="row">
                    <div className="col-xs-12 alertMadatoryFilter" style={{fontSize: '14px',  textAlign: 'center'}}>
                      {this.state.alertmsg}
                    </div>
                  </div>


                </Modal.Body>
                {/*<Modal.Footer>*/}
                  {/*<Button*/}
                    {/*onClick={() => {*/}
                      {/*this.setState({alertShow: false})*/}
                    {/*}}*/}
                    {/*style={{display: 'block', margin: '0 auto'}}>Close</Button>*/}
                {/*</Modal.Footer>*/}
              </Modal>

              <div className="text-center">
                <Button onClick={() => {
                  let filterData = this.props.filterUrlParamString;
                  console.log('filterData',filterData);
                  if(!(typeof(filterData) == "undefined")){
                  if (filterData.includes("buying_controller") && filterData.includes("base_product_number") ) {
                    this.props.onwaterfallSpinner(0);
                    this.props.onwaterfallProfitSpinner(0);
                    this.props.onSupplierImpactTableSpinner(0);
                    this.props.onDelistProductTableSpinner(0);
                    this.props.onDelistDefaultView(1);
                    this.props.onWaterfall();
                  } }else {
                    this.setState({alertShow: true});
                  }
                }}>Apply</Button></div>
              <div style={{height:'15px'}}></div>

              <div className="text-center">
              <Button onClick={() => {
              this.props.onDelistDefaultView(0);
              this.clearFilter();
              }}>Reset Filters</Button>&nbsp;&nbsp;
              </div>
            </div>
          )
        })()}
      </div>

    );
  }
}

NewSelector2.propTypes = {};

export default NewSelector2;
