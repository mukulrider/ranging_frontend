/**
*
* MultiLineChart2
*
*/

import React from 'react';
import * as d3 from 'd3';
import styles from './style.scss';



class MultiLineChart2 extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
    createChart = (data2,chart_id,axis_prefix, y_axis_title) => {


        let combined=data2;
        let margin = {top: 5, right: 20, bottom: 60, left: 60},
            width = 550 - margin.left - margin.right,
            height = 300 - margin.top - margin.bottom;

        let svg = d3.select('#'+chart_id);
      svg.selectAll("*").remove();

      let chart = svg.append("g")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .attr("transform","translate(" + margin.left + "," + margin.top + ")");


        // To find the y axis lower limit
        let minDomainValue = ()=> {
          if((d3.min(combined, function(d) { return d.value;})-50)>0){
            // console.log(chart_id,"Domain",(d3.min(combined, function(d) { return d.value;})-50));
            return (d3.min(combined, function(d) { return d.value;})-50);}
          else{
            // console.log(chart_id,"Domain",0);
            return 0;
        }
      };

        // Adding scales
        let xScale = d3.scaleTime().range([0, width]).domain(d3.extent(combined, function(d) {
          return d.Date;}));
        let yScale = d3.scaleLinear().domain([
                        (minDomainValue()),
                        (d3.max(combined, function(d) { return d.value;}))])
                        .range([height, 50]);
        let color = d3.scaleLinear().range(d3.schemeCategory20b);




        let xAxis = d3.axisBottom(xScale)
                      .tickFormat(d3.timeFormat("%d-%b-%Y"));


        let yAxis = d3.axisLeft(yScale)
            .tickFormat(function(d) {
              if(d>=1000)
                return axis_prefix+((Math.round(d*10)/10)/1000)+' K';
              else
                return axis_prefix+(Math.round(d*1000)/1000);
            });


        chart.append("g")
            .attr("transform", "translate(0," + height + ")")
            .classed("axis xaxis", true)
            .call(xAxis)
              .selectAll("text")
              .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", ".15em")
              .attr("transform", function(d) {
                return "rotate(-25)"
              });


        chart.append("g")
            .classed("axis yaxis", true)
            .call(yAxis);


        // Group the data based on client
        let dataGroup = d3.nest()
            .key(function(d) {
                return d.Type;
            })
            .entries(combined);

      let color_hash = ["#3375b2", "#cc3333"];
      // console.log('color_hash',color_hash);

      let legendSpace = width/dataGroup.length; // spacing for legend


      let lineFun = d3.line()
        // .curve(d3.curveBasis)
            .x(function(d) {
                return xScale(d.Date);})
            .y(function(d) {
                return yScale(d.value); });

        // Adding the lines
        dataGroup.forEach(function(d,i) {
          // console.log('i number value',i);
          // console.log('d value',d);
            let colour_no=color_hash[i];
            // console.log('colour_no',colour_no);

            chart.append('path')
                .attr("stroke-width",2)
                .attr("stroke",colour_no)
                // .attr("style", function(d.values,i){
                //   console.log('i',i,'d',d);
                //   return "stroke: " + color_hash[i];
              // })
              .attr("d",lineFun(d.values))
              .attr("fill","none")
        });


       // Axis titles
      chart.append("text")
            .attr("transform","translate(" + (width/2) + " ," +(height + margin.top + 50) + ")")
            .style("text-anchor", "middle")
            .text("Date");


      chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(y_axis_title);

      // Legend

      let legend = chart.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
        .data(['Baseline metric', 'Metric'])
        .enter().append("g")
        .attr("transform", function (d, i) {
          return "translate(0," + i * 20 + ")";
        });

        legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", function (d, i) {
          return color_hash[i];
        });

      legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function (d) {
          return d;
        });

    };

    componentDidMount = () => {
        // console.log('Component Mount -> ', this.props.data);
        this.createChart(this.props.data[0],this.props.data[1],this.props.data[2], this.props.data[3])
    };

    componentDidUpdate = () => {
        this.createChart(this.props.data[0],this.props.data[1],this.props.data[2], this.props.data[3])
    };

    render() {
        return (
            <div>
              <svg id={this.props.data[1]} width="600" height="300" fontFamily="sans-serif" fontSize="10"> </svg>
            </div>
        );
    }
}

MultiLineChart2.propTypes = {

};

export default MultiLineChart2;




