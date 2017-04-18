/**
 *
 * BubbleChart2
 *
 */

import React from 'react';
import * as d3 from 'd3';
import {browserHistory} from 'react-router';


class BubbleChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data2, path, bubbleFunc, makeChart, makeTable) => {
    let dataBubbleUrlParams = '';
    let productSelected= '';

    //Chart configurations

    let margin = {top: 20, right: 20, bottom: 40, left: 30};
    let width = 700 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    let svg = d3.select('#svgg');

    let colorArray = ['darkolivegreen','steelblue'];
    let opacity = [1,0.2];

    svg.selectAll("*").remove();
    //Adjusting position of the svg area
    let chart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

    let yScale = d3.scaleLinear().domain([0,100]).range([height, 0]);

    let rScale = d3.scaleLinear().domain([0, d3.max(data2, function (d) {
      return d.rate_of_sale;
    })]).range([5, 20]);


    let xAxis = d3.axisBottom(xScale)
      .tickFormat(function (d) {
        return (Math.round(d * 10) / 10);
      });

    let yAxis = d3.axisLeft(yScale)
      .tickFormat(function (d) {
        return (Math.round(d * 10) / 10);
      });

    // ---------- Appending AXIS to chart -----------------
    chart.append("g")
      .attr("transform", "translate(" + margin.left + ", " + height + ")")
      .classed("axis", true)
      .call(xAxis);

    chart.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .classed("axis", true)
      .call(yAxis);


    // ------------- Adding data points-----------------
    chart.selectAll('circle')
      .data(data2)
      .enter()
      .append('circle')
      .attr("cx", function (d) {

        return (margin.left + xScale(d.cps));
      })
      .attr("cy", function (d) {
        return (yScale(d.pps));
      })
      .on('click', function (d) {
        let dataBubbleUrlParams = "base_product_number=" + d.base_product_number;
        let prodArr = [];
        prodArr.push(dataBubbleUrlParams)

        let productSelected = d.base_product_number;
        console.log("bubble url", dataBubbleUrlParams);
        console.log("printing product selected", productSelected);
        console.log("consoling if condition", d.base_product_number == productSelected);
        console.log("consoling prod array", prodArr);

        bubbleFunc(dataBubbleUrlParams);
        makeChart();
        makeTable();
        // // chart.style("opacity", function () {
        //   console.log("in_opacity_function", productSelected);
        //   if (d.base_product_number == productSelected) {
        //     return opacity[0];
        //   }
        //   else {
        //     return opacity[1];
        //   }
        // })
      })
      .attr("r", 0)
      .transition()
      .duration(1000)
      .attr("r", function (d) {
        return (rScale(d.rate_of_sale));
      })
      // .style("opacity", function (d) {
      //   console.log("in_opacity_function",dataBubbleUrlParams);
      //   if (d.base_product_number == productSelected) {
      //     return opacity[0];
      //   }
      //   else {
      //     return opacity[1];
      //   }
      // })
      .style("fill", function (d) {
        console.log("in_color_function", colorArray[0]);
        if (d.brand_ind == "Brand") {
          return colorArray[1];
        }
        else {
          return colorArray[0];
        }
      });

    //This is for getting the axis labels
    chart.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," + (height + (margin.top * 1.75)) + ")")
      .style("text-anchor", "middle")
      .text("CPS percentile");

    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Profit per store percentile (CGM)");

    let series_type_values=["OL","Brand"];

    let legend = chart.append("g")
      .attr("font-family", "Tesco")
      .attr("font-size", 10).attr("text-anchor", "end")
      .selectAll("g")
      .data(series_type_values)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 25 + ")";
      });

    legend.append("rect")
      .attr("x", 700 )
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d,i) {
          return colorArray[i];
        }
      );

    legend.append("text")
      .attr("x", 735)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d;
      });

    // let color = d3.scaleLinear().range(d3.schemeCategory20b);




  };

  componentDidMount = () => {
    this.createChart(this.props.data, this.props.path, this.props.onSaveBubbleParam, this.props.onFetchGraph, this.props.onGenerateTable)

  };

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.path, this.props.onSaveBubbleParam, this.props.onFetchGraph, this.props.onGenerateTable);
    //  this.props.onSaveBubbleParam(databubbleUrlParams);
  };

  render() {


    return (
      <div>
        <svg id="svgg" width="800" height="600" fontFamily="sans-serif" fontSize="10"
             textAnchor="middle"></svg>
      </div>
    );
  }
}

BubbleChart2.propTypes = {};

export default BubbleChart2;
