/**
 *
 * WaterFallChart2
 *
 */

import React from 'react';
// import styled from 'styled-components';

import * as d3          from 'd3';
import styles from './style.scss';

import {FormattedMessage} from 'react-intl';
import messages from './messages';

class WaterFallChartNpd extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  // createChart = (data, id) => {
  createWaterFallChart = (data,id,chart_type) => {

    let yaxis_title="Amount(£)";

    let formatSales = (i) => {
      if(i>=1000 || i<=-1000) {
      let rounded=Math.round(i /1000);
      return ('£ ' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');
    }
    else{
      return ('£ ' + Math.round(i));
    }
    };


    let formatVolume = (i) => {
      if(i>=1000 || i<=-1000)
      { let rounded=Math.round(i /1000);
        return (rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + 'K');

      }else{
        return (Math.round(i));
      }


    }


    // Transform data (i.e., finding cumulative values and total) for easier charting
    let cumulative = 0;

    for (let i = 0; i < 2; i++) {
      data[i].start = cumulative;
      cumulative += data[i].value;
      data[i].end = cumulative;

      data[i].class = ( data[i].value >= 0 ) ? 'positive' : 'negative'
    }

    data.push({
      name: 'Net Gain/Loss',
      end: cumulative,
      start: 0,
      class: ( cumulative>= 0 ) ? 'positive' : 'negative',
      value: cumulative
    });

    let calculate_domain =() =>{

      let max = d3.max(data, function (d) {
        return d.end;
      });

      if(max>0){
      //function to calculate the value by adding 20% more
      let add = max + (max * 20 / 100);

      //function to round the value to the nearest whole number
      let newRound = (Math.round(add*1000)/1000);

      return newRound;}
      else{
        return 0;
      }
    };


    //--------------Configurations & Axis definitions

    //Configurations
    let margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 500 - margin.left - margin.right ,
      height = 300 - margin.top - margin.bottom,
      padding = 0.3;

    //Axis
    let x = d3.scaleBand()
              .rangeRound([0, width])
              .domain(data.map(function (d) {
                return d.name;
              }));

    let y = d3.scaleLinear()
              .range([height, 0])
              .domain([0, calculate_domain()]);

    let xAxis = d3.axisBottom(x);

    let yAxis = d3.axisLeft(y)
                .tickFormat(function (d) {

                  if(chart_type=="value"){
                    return formatSales(d);
                  }else{
                    return formatVolume(d);
                  }

                });

    //---------- Adding the chart(svg)

    let chart = d3.select(`#${id}`);

    chart.selectAll("*").remove();

    chart = d3.select('#' + id)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(yAxis);


    //---------- Adding the the bar
    let bar = chart.selectAll(".bar")
                    .data(data)
                    .enter().append("g")
                    .attr("class", function (d) {
                            return "bar " + d.class
                          })
                    .attr("transform", function (d) {
                            return "translate(" + (x(d.name)+40) + ",0)";
                          });


    //---------- Adding the text and connector lines
      bar.append("rect")
        .attr("y", function (d) {
          return y(Math.max(d.start, d.end));
        })
        .attr("height", function (d) {
          return Math.abs(y(d.start) - y(d.end));
        })
        .attr("width", (x.bandwidth()-60));


      bar.append("text")
        .attr("x", (x.bandwidth() / 2 - 30))
        .attr("y", function (d) {
          return y(d.end) + 5;
        })
        .attr("dy", function (d) {
          return ((d.class == 'negative') ? '-' : '') + ".75em"
        })
        .text(function (d) {
          if(chart_type=="value"){
            return formatSales((d.end - d.start));
          }else{
            return formatVolume((d.end - d.start));
          }
     // return (d.end - d.start);
        });



      bar.filter(function (d) {
        return d.class != "total"
      }).append("line")
        .attr("class", "connector")
        .attr("x1", x.bandwidth() - 60)
        .attr("y1", function (d) {
          return y(d.end)
        })
        .attr("x2", x.bandwidth() / ( 1 - padding))
        .attr("y2", function (d) {
          return y(d.end)
        });


    //---------- Adding the axis titles

    //X axis
    // chart.append("text")
    //   .attr("transform","translate(" + (width/2) + " ," +(height + margin.top+(margin.bottom/2)) + ")")
    //   .style("text-anchor", "middle")
    //   .text(xaxis_title);

    //Y axis
    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (margin.left)+10)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yaxis_title);

    data=0;
  };

  componentDidMount = () => {
    // this.createChart(this.props.data, this.props.id)
    // console.log("Waterfall chart",this.props.data);
    this.createWaterFallChart(this.props.data.chart_data,this.props.data.chart_id,this.props.data.chart_type)
  };

  componentDidUpdate = () => {
    // this.createWaterFallChart()
    this.createWaterFallChart(this.props.data.chart_data,this.props.data.chart_id,this.props.data.chart_type)
  };

  render() {
    return (
      <div>
        {/*<svg id={this.props.id}></svg>*/}
        <svg id={this.props.data.chart_id}></svg>
      </div>
    );
  }
}

WaterFallChartNpd.propTypes = {};

export default WaterFallChartNpd;
