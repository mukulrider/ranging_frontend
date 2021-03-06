/**
 *
 * BubbleChart2
 *
 */

import React from 'react';
import * as d3 from 'd3';


class BubbleChartNpd extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

     createBubbleChart = (data) => {

      // Accessing the data parameters
        let data2=data[0];
        let chart_id=data[1];
        let xaxis_metric=data[2];
        let yaxis_metric=data[3];
        let radius_metric=data[4];

        //Chart configurations
        let margin = {top: 20, right: 20, bottom: 40, left: 30};
        let width = 550-margin.left-margin.right,
          height = 500-margin.top-margin.bottom;

      // let svg = d3.select('#'+chart_id);
      // svg.selectAll("*").remove();
      // let chart = svg.append("g")
      //   .attr("width", width + margin.left + margin.right)
      //   .attr("height", height + margin.top + margin.bottom)
      //   .attr("transform","translate(" + margin.left + "," + margin.top + ")");

       let colorArray = ['#00838f', '#33691e'];


      //Selecting svg element
        let svg = d3.select('#'+chart_id);
        svg.selectAll("*").remove();

        //Adjusting position of the svg area
        let chart = svg.append("g")
                        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // ------- AXIS -----------------
        let xScale = d3.scaleLinear()
                  .domain([0, d3.max(data2, function (d) {

                    return d[xaxis_metric];
                    })+10])
                  // .domain([0,1.1])
                  .range([0, width]);

        let yScale = d3.scaleLinear()
                      .domain([0, d3.max(data2, function (d) {
                              return d[yaxis_metric];
                        })+10])
                      // .domain([0,1])
                      .range([height, 0]);


       let rScale = d3.scaleLinear().domain([0, d3.max(data2, function (d) {
         return d[radius_metric];
       })+10]).range([5, 20]);


        let color = d3.scaleLinear().range(d3.schemeCategory20b);


        let xAxis = d3.axisBottom(xScale)
            .tickFormat(function (d) {
                return (Math.round(d*10)/10);
            });

        let yAxis = d3.axisLeft(yScale)
            .tickFormat(function (d) {
              return (Math.round(d*10)/10);
            });


      // ---------- Appending AXIS to chart -----------------
        chart.append("g")
            .attr("transform", "translate(" + margin.left + ", " + height  + ")")
            .classed("axis", true)
            .call(xAxis);

        chart.append("g")
            .attr("transform", "translate(" + margin.left + ",0)" )
            .classed("axis", true)
            .call(yAxis);


      // ------------- Adding data points-----------------
        chart.selectAll('circle')
            .data(data2)
            .enter()
            .append('circle')
            .attr("cx", function (d) {
                return (margin.left+xScale(d[xaxis_metric]));
            })
            .attr("cy", function (d) {
                return (yScale(d[yaxis_metric]));
            })
            .attr("r", 0)
            .transition()
            .duration(2000)
            .attr("r", function (d) {
                return (rScale(d[radius_metric]/100));
            })
          .style("fill", function (d) {
            // console.log("in_color_function", colorArray[0]);
            if (d.brand_indicator == "Brand") {
              return colorArray[1];
            }
            else {
              return colorArray[0];
            }
          });



      // ------------- Labels -----------------
        // X axis labels
        chart.append("text")
          .attr("transform","translate(" + (width/2) + " ," +(height + (margin.top*1.75)) + ")")
          .style("text-anchor", "middle")
          .text("CPS - Q");

        // Y axis labels
        chart.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("PPS - Q");


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
         .attr("x", 500)
         .attr("width", 19)
         .attr("height", 19)
         .attr("fill", function (d, i) {
             return colorArray[i];
           }
         );

       legend.append("text")
         .attr("x", 450)
         .attr("y", 9.5)
         .attr("dy", "0.32em")
         .style("text-anchor", "middle")
         .text(function (d) {
           return d;
         });

    };

    componentDidMount = () => {
        // console.log('printing inside bubble chart', this.props.data);
        this.createBubbleChart(this.props.data)
    };

    componentDidUpdate = () => {
      // console.log('printing inside bubble chart update function', this.props.data);
        this.createBubbleChart(this.props.data)
    };

    render() {
        return (
            <div>
                <svg id={this.props.data[1]} width="550" height="600" fontFamily="sans-serif" fontSize="10"
                     textAnchor="middle"> </svg>
            </div>
        );
    }
}

BubbleChartNpd.propTypes = {};

export default BubbleChartNpd;
