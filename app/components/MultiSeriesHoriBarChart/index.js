/**
 *
 * MultiSeriesHoriBarChart
 *
 */

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as d3 from 'd3';
import styles from './style.scss'


class MultiSeriesHoriBarChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (harddata) => {

    // console.log('harddata',harddata);

    //Wrap function
    let wrap = (text, width)=> {
      text.each(function() {
        let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
          line.push(word);
          tspan.text(line.join(" "));
          if (tspan.node().getComputedTextLength() > width) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
          }
        }
      });
    }


    //-----Formatting the data

    // Zip the series harddata together (first values, second values, etc.)
    let zippedData = [];
    for (let i=0; i<harddata.labels.length; i++) {
      for (let j=0; j<harddata.series.length; j++) {
        zippedData.push(harddata.series[j].values[i]);
      }
    }


    // console.log("-----Zipped data",zippedData)


    // Configuration measurements

    let margin = {top: 10, right: 10, bottom: 20, left: 10},
      width = 600,
      height = 320;

    let spaceForLabels   = 120,
      spaceForLegend   = 40,
      chartWidth= width-spaceForLabels,
      chartHeight = height-spaceForLegend,
      groupHeight= chartHeight / harddata.labels.length,
      barHeight=groupHeight/3,
      spaceForOuterDataLabels=25,
      gapBetweenGroups = barHeight*0.85;


    //------------- Axis
      let color = ["#7F297B","#009688"];


    let minDomain = (data) =>{

      if(d3.min(zippedData)<0){
        return d3.min(zippedData);
      }else{
        return 0;
      }

    };



    // x axis
    let x = d3.scaleLinear()
      // .domain([d3.min(zippedData), d3.max(zippedData)])
      .domain([minDomain(zippedData), d3.max(zippedData)])
      .range([spaceForLabels+spaceForOuterDataLabels, chartWidth-margin.right-spaceForOuterDataLabels]);

    let xAxis = d3.axisBottom(x)
      .tickFormat(function(d) {
        return (Math.round(d*100)/100);
      });

    // y axis
    let y = d3.scaleLinear()
      .range([chartHeight, 0]);

    let yAxis = d3.axisLeft(y)
      .tickFormat('')
      .tickSize(0);

    let bar_count_per_group = zippedData.length/harddata.labels.length;

    //------------- Chart
    let chart = d3.select("#chart");

    chart.selectAll("*").remove();

    chart.attr("width",  chartWidth)
      .attr("height", height)
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");



    // ------------ Create bars
    let bar = chart.selectAll("g")
      .data(zippedData)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate(0," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/bar_count_per_group))) + ")";
      });

// Create rectangles of the correct width
    bar.append("rect")
      .attr("fill", function(d,i) { return color[i % harddata.series.length]; })
      .attr("className", "bar")
      .attr("width", function(d){
        if(d>0)
          return -x(0)+x(d);
        else
          return x(0)-x(d);
      })
      .attr("x",function(d){
        if(d>0)
          return x(0);
        else
          return x(d);
      })
      .attr("height", barHeight - 1);

// Add text label in bar
    bar.append("text")
      .attr("className", "chartDataLabel")
      .attr("x", function(d) {
        if(d>=0)
        {
          // return x(d) - 20;
          return x(d) + 2;
        }
        else{
          // return x(d) +5;
          return x(d) -spaceForOuterDataLabels;
        }
        }
      )
      .attr("y", barHeight / 2)
      .attr("dy", ".25em")
      .text(function(d) { return d; });

  //--------------------- Y axis labels
    let label = bar.append("text")
      .attr("className", "chartYAxisLabel")
      .attr("x",0)
      .attr("y", groupHeight / 3)
      .attr("dy", ".35em")
      .text(function(d,i) {
        if (i % harddata.series.length === 0)
          return harddata.labels[Math.floor(i/harddata.series.length)];
        else
          return ""});

      // .selectAll('.chartYAxisLabel text')
      // .call(wrap,spaceForLabels/2);

      // .style("font-size","9px")
      // .style("font-family","Tesco");

    // chart.selectAll(".tick text")
    //   .style("font-size","9px")
    //   .style("font-family","Tesco");



    // label.selectAll('text .label')
    //   .call(wrap,spaceForLabels/2);
    //
    // bar.selectAll(".tick text")
    //   .call(wrap,spaceForLabels/2);


    // bar.selectAll('text .label')
    //   .call(wrap,spaceForLabels/2);




    // ------------------ Appending axis
    chart.append("g")
      .attr("transform", "translate(" + (x(0)) + ",0)" )
      .call(yAxis);

    chart.append("g")
      .attr("transform", "translate(0," + chartHeight + ")")
      .attr("class", "chartXAxisLabel")
      .call(xAxis);



    //--------------------Legend


    let legend = chart.append("g")
      .attr("className", "chartLegend")
      // .attr("font-family", "sans-serif")
      // .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(harddata.series)
      .enter().append("g")
      .attr("transform", function (d, i) {
        return "translate(0,0)";
      });


    legend.append("rect")
      .attr("x",
        function (d,i) {return (spaceForLabels+((chartWidth/2)*(i))+10);}
      )
      .attr("y", function (d,i) {return chartHeight+25;})
      .attr("width", 8)
      .attr("height", 8)
      .attr("fill",
        function (d, i) { return color[i]; }
      );

    legend.append("text")

      .attr("x",
        function (d,i) {return (spaceForLabels+((chartWidth/2)*(i))+120);}
      )
      .attr("y", function (d,i) {return chartHeight+30;})
      .attr("dy", "0.24em")
      .text(function (d) { return d.label; })
      .selectAll("text");
      // .call(wrap,width/10);



  };


  componentDidMount = () => {
    this.createChart(this.props.data)
  };

  componentDidUpdate = () => {
    this.createChart(this.props.data)
  };



  render() {
    return (

        <svg id="chart" className="multilineChart"></svg>

    );
  }
}

MultiSeriesHoriBarChart.propTypes = {

};

export default MultiSeriesHoriBarChart;
