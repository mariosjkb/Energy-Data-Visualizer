// MARIOS IAKOVIDIS
// Typescript file that builds scatter plots

import {
  Component,
  OnChanges,
  Input,
} from '@angular/core';
import * as d3 from 'd3';
import { Colors } from '../service/colors';
import { Measurement } from '../types/measurements';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css'],
})

// This component implements NgOnChanges interface
export class ScatterplotComponent implements OnChanges {
  chartGroup: any;
  margin: any;
  width: any;
  height: any;

  // get information from main app componenet as input via HTML file
  @Input() scatterDataToPlot!: Measurement[][];
  @Input() country!: string;
  @Input() indicators!: string[];
  @Input() year!: string;
  @Input() fixedYear!: boolean;

  // map that match each country to a color
  coloring!: Map<string, string>;

  // constuctor that fills the color map
  constructor(private colors: Colors) {
    this.coloring = colors.coloring;
  }

  // implementation of OnChanges interface. Build the graph when data to be plotted are changed
  ngOnChanges(): void {
    if (this.scatterDataToPlot) {
      this.buildChart();
    }
  }

  // function that builds scatter plots charts
  buildChart() {

    // remove the graph that was previously created for presentation purposes
    d3.select('svg').remove();

    // initialize SVG parameters
    this.margin = { top: 80, right: 20, bottom: 80, left: 50 };
    this.width = 1500 - this.margin.left - this.margin.right;
    this.height = 800 - this.margin.top - this.margin.bottom;

    // get first set of data to be plotted
    var dataToPlot = this.scatterDataToPlot[0];

    // get the color of the country of the plotted data
    var color = this.coloring.get(this.country) as string;

    // find max measurement value to be the maximum range of y-axis and x-axis
    var maxMeasurement_y = d3.max(this.scatterDataToPlot[0], function (d) {
      return d.measurement;
    }) as number;
    var maxMeasurement_x = d3.max(this.scatterDataToPlot[0], function (d) {
      return d.measurement_x_value;
    }) as number;

    // set up x-axis
    var x = d3
      .scaleLinear()
      .domain([0, maxMeasurement_x])
      .range([0, this.width]);

    // set up y-axis
    var y = d3
      .scaleLinear()
      .domain([0, maxMeasurement_y])
      .range([this.height, 0]);

    // create x-axis and add ticks for every year
    var xAxis = d3.axisBottom(x);

    // create y-axis
    var yAxis = d3.axisLeft(y);

    // create an SVG element
    var svg = d3
      .select('#svgcontainer')
      .append('svg')
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('width', this.width + this.margin.left + this.margin.right);

    // SVG element transformation
    var chartGroup = svg.append('g').attr('transform', 'translate(50,30)');

    // draw points in scatter plot
    chartGroup
      .append('g')
      .selectAll('dot')
      .data(dataToPlot)
      .enter()
      .append('circle')
      .attr('cx', function (d) {
        return x(d.measurement_x_value);
      })
      .attr('cy', function (d) {
        return y(d.measurement);
      })
      .attr('r', 4)
      .attr('fill', color);

    // draw x-axis
    chartGroup
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    // draw y-axis
    chartGroup.append('g').attr('class', 'y axis').call(yAxis);

    // add indicator name in x-axis
    chartGroup
      .append('g')
      .append('text')
      .attr('x', this.width / 2)
      .attr('y', this.height + 40)
      .style('text-anchor', 'middle')
      .text(this.indicators[1]);

    // add indicator name in y-axis
    chartGroup
      .append('g')
      .append('text')
      .attr('x', 0)
      .attr('y', -40)
      .attr('transform', 'rotate(-90)')
      .style('text-anchor', 'end')
      .text(this.indicators[0]);

    if (this.fixedYear) {
      // add title
      chartGroup
        .append('g')
        .append('text')
        .attr('x', this.width / 2)
        .attr('y', 0)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(
          'Scatter plot for the EU countries that have available data for given indicators in year ' +
            this.year
        );
    } else {
      // add title
      chartGroup
        .append('g')
        .append('text')
        .attr('x', this.width / 2)
        .attr('y', -10)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(
          'Scatter plot for ' +
            this.country +
            ' in all years that there are available data for given indicators'
        );
    }
  }
}
