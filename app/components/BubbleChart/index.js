/**
 *
 * BubbleChart
 *
 */

import React from 'react';
import * as d3          from 'd3';
// import styled from 'styled-components';


class BubbleChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  createChart = (id, data, myfunc) => {

    // console.log(myfunc);
    let svg = d3.select('#' + id);
    svg.attr('width', 500);
    svg.attr('height', 500);

    svg.append('g').append('circle')
      .attr('fill', 'red')
      .on('click', ()=>{
        console.log('done')
        myfunc(Date.now())
      })
      .attr('rx', 100)
      .attr('r', 100).attr('ry', 100)
  };

  componentDidMount = () => {
    console.log('componentDidMount', this.props.defaultAction);
    this.createChart(this.props.idx, this.props.data, this.props.defaultAction)
  };

  componentDidUpdate = () => {
    this.createChart(this.props.idx, this.props.data, this.props.defaultAction)
  };

  render() {
    return (
      <div>
        <svg id={this.props.idx}></svg>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100"/>
        </svg>
      </div>
    );
  }
}

BubbleChart.propTypes = {};

export default BubbleChart;
