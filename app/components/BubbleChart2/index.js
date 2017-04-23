/**
 *
 * BubbleChart2
 *
 */

import React from 'react';
import * as d3 from 'd3';
import Button from 'components/button';
import {browserHistory} from 'react-router';


class BubbleChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (data2, path, selprod, bubbleFunc, bubbleFunc2, makeTable, dataUrlParams2) => {
    console.log('create chart called');
    let dataBubbleUrlParams = '';
    let productSelected = '';
    let prodArr = [];
    let prodArr2 = [];

    //Chart configurations
    console.log("in d3 code printing array of selected products", selprod);
    //Removing '' from the array
    let margin = {top: 20, right: 20, bottom: 40, left: 30};
    let width = 750 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    let svg = d3.select('#svgg');

    let colorArray = ['#00838f', '#33691e'];
    let opacity = [1, 0.2];

    svg.selectAll("*").remove();
      //Adjusting position of the svg area
    let chart = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    let xScale = d3.scaleLinear().domain([0, 100]).range([0, width]);

    let yScale = d3.scaleLinear().domain([0, 100]).range([height, 0]);

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
        // let productSelected = d.base_product_number;
        prodArr.push(dataBubbleUrlParams);
        console.log("product selected", dataBubbleUrlParams);
        console.log("consoling prod array", prodArr);
        var myJSON = JSON.stringify(prodArr);
        bubbleFunc(myJSON);
        // console.log('dataUrlParams2>>>>>>>>>>>>>>>>>>>>>>>', dataUrlParams2);
        // let myJson2 = JSON.parse(dataUrlParams2);
        // myJson2.push(d.base_product_number);
        // bubbleFunc2(JSON.stringify(myJson2));
        makeTable();
        d3.select(this)
          .style("opacity", 1);
        // d3.select(this)
        // .style("opacity", function () {
        //   console.log("in_opacity_function",productSelected);
        //   if (d.base_product_number == productSelected) {
        //     return opacity[0];
        //   }
        //   else {
        //     return opacity[1];
        //   }
        // })
        //makeChart();
        //makeTable();
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
      .style("opacity", 0.4)
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

    let series_type_values = ["OL", "Brand"];

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
      .attr("x", 800)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", function (d, i) {
          return colorArray[i];
        }
      );

    legend.append("text")
      .attr("x", 770)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .style("text-anchor", "middle")
      .text(function (d) {
        return d;
      });
    // let color = d3.scaleLinear().range(d3.schemeCategory20b);
  };

  componentDidMount = () => {
    this.createChart(this.props.data, this.props.path, this.props.selectedBubble, this.props.onSaveBubbleParam, this.props.onSaveBubbleParam2,
      this.props.onGenerateTable,this.props.selectedBubble2)

  };

  componentDidUpdate = () => {
    this.createChart(this.props.data, this.props.path, this.props.selectedBubble, this.props.onSaveBubbleParam, this.props.onSaveBubbleParam2,
      this.props.onGenerateTable, this.props.selectedBubble2);
    console.log('component Did Update', this.props.selectedBubble2);
  };

  render() {


    return (
      <div>
        <svg id="svgg" width="900" height="600" fontFamily="sans-serif" fontSize="10"
             textAnchor="middle"></svg>
        {/*<Button onClick={() => {*/}
        {/*/!*this.props.onSaveBubbleParam(prodArr);*!/*/}
        {/*this.props.onFetchGraph();*/}
        {/*this.props.onGenerateTable();*/}
        {/*}}>Update chart</Button>*/}
      </div>
    );
  }
}

BubbleChart2.propTypes = {};

export default BubbleChart2;
