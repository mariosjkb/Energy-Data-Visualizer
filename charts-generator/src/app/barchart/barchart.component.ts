// MARIOS IAKOVIDIS 
// Typescript file that builds Bar Charts

import { Component, Input, OnChanges } from '@angular/core';
import * as d3 from 'd3';
import { Colors } from '../service/colors';
import { Measurement } from '../types/measurements';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
})

// This component implements NgOnChanges interface
export class BarchartComponent implements OnChanges {
  chartGroup: any;
  margin: any;
  width: any;
  height: any;

  // get information from main app componenet as input via HTML file
  @Input() barDataToPlot!: Measurement[][];
  @Input() countries!: string[];
  @Input() indicators!: string[];
  @Input() fiveYearsAggregation!: boolean;
  @Input() tenYearsAggregation!: boolean;
  @Input() twentyYearsAggregation!: boolean;
  @Input() startYear!: string;
  @Input() endYear!: string;

  // map that match each country to a color
  coloring!: Map<string, string>;

  // extra colors to show different indicators in graph
  indicatorColors: string[] = ['black', 'silver'];

  // constuctor that fills the color map
  constructor(private colors: Colors) {
    this.coloring = colors.coloring;
  }

  // implementation of OnChanges interface. Build the graph when data to be plotted are changed
  ngOnChanges() {
    if (this.barDataToPlot) {
      this.buildChart();
    }
  }

  // function that builds bar charts
  buildChart() {
    // remove the graph that was previously created for presentation purposes
    d3.select('svg').remove();

    // initialize SVG parameters and some useful variables
    this.margin = { top: 30, right: 20, bottom: 100, left: 50 };
    this.width = 1500 - this.margin.left - this.margin.right;
    this.height = 600 - this.margin.top - this.margin.bottom;
    var numOfIndicators = this.indicators.length;
    var indexIndicators = 0;
    var indexCountries = 0;
    var shiftIndicator = true;
    var largestDatasetSize = 0;
    var largestDataset!: Measurement[];
    var numOfTicks = 1;
    var barOffset = 0;
    var indexIndicatorColors = 0;
    var x_values: string[] = [];

    // get first set of data to be plotted
    var dataToPlot = this.barDataToPlot[0];

    // get the color of the country of the plotted data
    var color = this.coloring.get(this.countries[0]) as string;

    // calculate the number of bars that the chart will have
    var numOfBars = this.countries.length * this.indicators.length;

    // if it exceeds the 5 bars increase the bottom margin of the svg element
    if (numOfBars > 5) {
      this.margin.bottom = 200;
    }

    // convert measurement_x_value to string
    dataToPlot.forEach((d) => {
      if (
        this.fiveYearsAggregation ||
        this.tenYearsAggregation ||
        this.twentyYearsAggregation
      ) {
        d.measurement_x_value = d.measurement_x_value.split('-');
        d.measurement_x_value = d.measurement_x_value[0].toString();
      } else {
        d.measurement_x_value = d.measurement_x_value.toString();
      }
    });

    // find the max value of measurement_x_values in all datasets and enter each value to x_values array
    this.barDataToPlot.forEach(function (d) {
      if (d.length > largestDatasetSize) {
        largestDataset = d;
      }
    });
    largestDataset.forEach((d) => {
      if (
        this.fiveYearsAggregation ||
        this.tenYearsAggregation ||
        this.twentyYearsAggregation
      ) {
        d.measurement_x_value = d.measurement_x_value.split('-');
        d.measurement_x_value = d.measurement_x_value[0].toString();
        x_values.push(d.measurement_x_value);
      } else {
        d.measurement_x_value = d.measurement_x_value.toString();
        x_values.push(d.measurement_x_value);
      }
    });

    // find max measurement value to be the maximum range of y-axis
    var maxMeasurement = d3.max(dataToPlot, function (d) {
      return d.measurement;
    }) as number;
    this.barDataToPlot.forEach((data) => {
      var maxMeasurementTemp = d3.max(data, function (d) {
        return d.measurement;
      }) as number;
      if (maxMeasurementTemp > maxMeasurement) {
        maxMeasurement = maxMeasurementTemp;
      }
    });

    // set up x-axis
    var x = d3.scaleBand().range([0, this.width]).domain(x_values).padding(0.4);

    // set up y-axis
    var y = d3
      .scaleLinear()
      .domain([0, maxMeasurement])
      .range([this.height, 0]);

    // if there is aggreagation change the number of ticks accordingly
    if (this.fiveYearsAggregation) {
      numOfTicks = 5;
    } else if (this.tenYearsAggregation) {
      numOfTicks = 10;
    } else if (this.twentyYearsAggregation) {
      numOfTicks = 20;
    }

    // calculate the offset between the bars
    barOffset = 3 + x.bandwidth() / numOfBars;

    // create x-axis and add ticks
    var xAxis = d3.axisBottom(x).ticks(d3.timeYear.every(numOfTicks));

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

    // plot the bars
    chartGroup
      .append('g')
      .selectAll('.bar')
      .data(this.barDataToPlot[0])
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.measurement_x_value) as unknown as string)
      .attr('y', function (d) {
        return y(d.measurement);
      })
      .attr('width', x.bandwidth() / numOfBars)
      .attr('height', (d) => this.height - y(d.measurement))
      .attr('fill', color);

    // draw x-axis
    chartGroup
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    // draw y-axis
    chartGroup.append('g').attr('class', 'y axis').call(yAxis);

    // add x-axis label
    chartGroup
      .append('g')
      .append('text')
      .attr('class', 'x label')
      .attr('text-anchor', 'end')
      .attr('x', this.width)
      .attr('y', this.height + 30)
      .text(numOfTicks.toString() + '-year span');

    // add title
    if (
      this.fiveYearsAggregation ||
      this.tenYearsAggregation ||
      this.twentyYearsAggregation
    ) {
      chartGroup
        .append('g')
        .append('text')
        .attr('x', this.width / 2)
        .attr('y', -10)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(
          'Aggregated Bar Chart with ' +
            this.countries.length +
            ' countries and ' +
            this.indicators.length +
            ' indicator(s) for available data in ' +
            numOfTicks.toString() +
            '-year span(' +
            this.startYear +
            '-' +
            this.endYear +
            ')'
        );
    } else {
      chartGroup
        .append('g')
        .append('text')
        .attr('x', this.width / 2)
        .attr('y', -15)
        .style('text-anchor', 'middle')
        .style('font-weight', 'bold')
        .text(
          'Bar Chart with ' +
            this.countries.length +
            ' countries and ' +
            this.indicators.length +
            ' indicator(s) for available data between ' +
            this.startYear +
            '-' +
            this.endYear
        );
    }

    // add colored rectangles to act as a legend
    chartGroup
      .append('g')
      .append('rect')
      .attr('x', 0)
      .attr('y', this.height + 30)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', color);

    // add country name next to colored rectangles with the country name each color represents
    chartGroup
      .append('g')
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'start')
      .attr('font-size', 'small')
      .attr('x', 15)
      .attr('y', this.height + 40)
      .text(this.countries[indexCountries] + "'s " + this.indicators[0]);

    // if more than one datasets has to be plotted
    for (let i = 1; i < this.barDataToPlot.length; i++) {
      dataToPlot = this.barDataToPlot[i];
      x_values = [];
      var dataIndex = i;

      // if there are more than one indicators change color when the country changes
      if (i % numOfIndicators == 0) {
        indexIndicators = 0;
        indexCountries++;
        shiftIndicator = false;

        // get new color
        color = this.coloring.get(
          this.countries[i / numOfIndicators]
        ) as string;
      }

      // convert data and fill x_values with the new values
      dataToPlot.forEach((d) => {
        if (
          this.fiveYearsAggregation ||
          this.tenYearsAggregation ||
          this.twentyYearsAggregation
        ) {
          d.measurement_x_value = d.measurement_x_value.split('-');
          d.measurement_x_value = d.measurement_x_value[0].toString();
          x_values.push(d.measurement_x_value);
        } else {
          d.measurement_x_value = d.measurement_x_value.toString();
          x_values.push(d.measurement_x_value);
        }
      });

       // if the indicator changed,change the color of the bar
      if (shiftIndicator) {
        chartGroup
          .append('g')
          .selectAll('.bar')
          .data(dataToPlot)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr(
            'x',
            (d) =>
              (x(d.measurement_x_value) as unknown as string) +
              dataIndex * barOffset
          )
          .attr('y', function (d) {
            return y(d.measurement);
          })
          .attr('width', x.bandwidth() / numOfBars)
          .attr('height', (d) => this.height - y(d.measurement))
          .attr('fill', this.indicatorColors[indexIndicatorColors]);

        // add colored rectangles to act as a legend
        chartGroup
          .append('g')
          .append('rect')
          .attr('x', 0)
          .attr('y', this.height + 30 + 15 * i)
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', this.indicatorColors[indexIndicatorColors]);

        // add country name next to colored rectangles with the country name each color represents
        chartGroup
          .append('g')
          .append('text')
          .attr('class', 'label')
          .attr('text-anchor', 'start')
          .attr('font-size', 'small')
          .attr('x', 15)
          .attr('y', this.height + 40 + 15 * i)
          .text(
            this.countries[indexCountries] +
              "'s " +
              this.indicators[indexIndicators + 1]
          );

        indexIndicators++;
        indexIndicatorColors++;
      } else {
        chartGroup
          .append('g')
          .selectAll('.bar')
          .data(dataToPlot)
          .enter()
          .append('rect')
          .attr('class', 'bar')
          .attr(
            'x',
            (d) =>
              (x(d.measurement_x_value) as unknown as string) +
              dataIndex * barOffset
          )
          .attr('y', function (d) {
            return y(d.measurement);
          })
          .attr('width', x.bandwidth() / numOfBars)
          .attr('height', (d) => this.height - y(d.measurement))
          .attr('fill', color);

        // add colored rectangles to act as a legend
        chartGroup
          .append('g')
          .append('rect')
          .attr('x', 0)
          .attr('y', this.height + 30 + 15 * i)
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', color);

        // add country name next to colored rectangles with the country name each color represents
        chartGroup
          .append('g')
          .append('text')
          .attr('class', 'label')
          .attr('text-anchor', 'start')
          .attr('font-size', 'small')
          .attr('x', 15)
          .attr('y', this.height + 40 + 15 * i)
          .text(
            this.countries[indexCountries] +
              "'s " +
              this.indicators[indexIndicators]
          );
        shiftIndicator = true;
      }
    }
  }
}
