/**
 *
 * MultiseriesBarChart2
 *
 */

import React from 'react';
// import styled from 'styled-components';

import {FormattedMessage} from 'react-intl';
import messages from './messages';
import * as d3 from 'd3';
import styles from './style.scss'


class MultiseriesBarChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  createChart = (graphdata) => {

    let data = graphdata.data;
    let keys=graphdata.labels;
    let colors=graphdata.colors;


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


    // let keys = Object.keys(data[0]).slice(1);
    // console.log(keys);
    // keys=["Aldi","Asda","Lidl","Morrisons","Tesco","Waitrose","JS"];
    // let keys=["Aldi","Asda","JS","Tesco","Morrisons"];

    let svg = d3.select("#npdMultiSeriesGraph"),
          margin = {top: 20, right: 15, bottom: 40, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;


     svg.selectAll("*").remove();
     let g = svg.append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let spaceForLegends=65;
    let x0 = d3.scaleBand().rangeRound([0, width-spaceForLegends]).paddingInner(0.1),
      x1 = d3.scaleBand().rangeRound([height, 0]),
      y = d3.scaleLinear().rangeRound([height, 0]),
      // z = d3.scaleOrdinal().range(["#b2b2b2", "#7fb256", "#c288d6", "#896219", "#f60909", "#e5f213", "#0931f6"]);
      z = d3.scaleOrdinal().range(colors);

    // Mapping domains
      x0.domain(data.map(function (d) {
        return d.psg;
      }));

      x1.domain(keys)
        .rangeRound([0, x0.bandwidth()]);

      y.domain([0, d3.max(data, function (d) {
        return d3.max(keys, function (key) {
          return d[key];
        });
      })]).nice();


      // GRAPH
      g.append("g")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d) {


          return "translate(" + x0(d.psg) + ",0)";
        })
        .selectAll("rect")
        .data(function (d) {
          return keys.map(function (key) {
            return {key: key, value: d[key]};
          });
        })
        .enter().append("rect")
        .attr("x", function (d) {
          return x1(d.key);
        })
        .attr("y", function (d) {
          return y(d.value);
        })
        .attr("width", x1.bandwidth())
        .attr("height", function (d) {
          return height - y(d.value);
        })
        .attr("fill", function (d) {
          return z(d.key);
        });

    g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x0))
        .selectAll(".tick text")
        .call(wrap, x0.bandwidth())
        .style("font-size","10px")
        .style("font-family","Tesco");

      g.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(y))

      //AXIS TITLES
       g.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0-45)
        .attr("x",0 - (height / 2))
        .attr("dy", "2em")
        // .style("text-anchor", "middle")
        .style("font-size","10px")
        .style("font-family","Tesco")
        .text("# of SKU");


        // g.append("text")
        //   .attr("y",height )
        //   .attr("x",0 - (width / 2))
        //   .style("text-anchor", "middle")
          // .text("CHECk");


    // LEGENDS
      let legend = g.append("g")
        .attr("font-family", "Tesco")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(keys.slice())
        .enter().append("g")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 20 + ")";
        });

      legend.append("rect")
        .attr("x", width - 5)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", z);

      legend.append("text")
        .attr("x", width - 10)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
          return d;
        });
    // });



  };


  componentDidMount = () => {
    this.createChart(this.props.data)
  };

  componentDidUpdate = () => {
    // console.log(this.props.data);
    this.createChart(this.props.data)
  };


  render() {
    return (
      <div>
        <svg id="npdMultiSeriesGraph" width="500" height="330"></svg>
      </div>
    );
  }
}

MultiseriesBarChart2.propTypes = {};

export default MultiseriesBarChart2;
