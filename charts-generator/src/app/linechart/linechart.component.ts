// MARIOS IAKOVIDIS
// Typescript file that builds line charts

import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import * as d3 from 'd3';
import { Measurement } from '../types/measurements';
import { Colors } from '../service/colors';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css'],
})

// This component implements NgOnChanges interface
export class LinechartComponent implements OnChanges {
  chartGroup: any;
  margin: any;
  width: any;
  height: any;

  // get information from main app componenet as input via HTML file
  @Input() lineDataToPlot!: Measurement[][];
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
  indicatorColors: string[] = ['white', 'black'];

  // constuctor that fills the color map
  constructor(private colors: Colors) {
    this.coloring = colors.coloring;
  }

  // implementation of OnChanges interface. Build the graph when data to be plotted are changed
  ngOnChanges() {
    if (this.lineDataToPlot) {
      this.buildChart();
    }
  }

  // function that builds line charts
  buildChart() {
    // remove the graph that was previously created for presentation purposes
    d3.select('svg').remove();

    // initialize SVG parameters and some useful variables
    this.margin = { top: 30, right: 20, bottom: 100, left: 50 };
    this.width = 1500 - this.margin.left - this.margin.right;
    this.height = 600 - this.margin.top - this.margin.bottom;
    var numOfIndicators = this.indicators.length;
    var numOfLines = this.countries.length * numOfIndicators;
    var numOfTicks = 1;
    var indexIndicators = 0;
    var indexCountries = 0;
    var shiftIndicator = true;

    // fix the bottom margin of the svg depanding on the number of lines
    if (numOfLines >= 5 && numOfLines <= 8) {
      this.margin.bottom = 200;
    } else if (numOfLines > 8) {
      this.margin.bottom = 250;
    }

    // get first set of data to be plotted
    var dataToPlot = this.lineDataToPlot[0];

    // get the color of the country of the plotted data
    var color = this.coloring.get(this.countries[0]) as string;

    // convert string of measurement_x_value to Date type
    let parseDate = d3.timeParse('%Y');
    dataToPlot.forEach((d) => {
      if (
        this.fiveYearsAggregation ||
        this.tenYearsAggregation ||
        this.twentyYearsAggregation
      ) {
        d.measurement_x_value = d.measurement_x_value.toString().split('-');
        d.measurement_x_value = parseDate(d.measurement_x_value[0].toString());
      } else {
        d.measurement_x_value = parseDate(d.measurement_x_value.toString());
      }
    });

    // find max measurement value to be the maximum range of y-axis
    var maxMeasurement = d3.max(dataToPlot, function (d) {
      return d.measurement;
    }) as number;
    this.lineDataToPlot.forEach((data) => {
      var maxMeasurementTemp = d3.max(data, function (d) {
        return d.measurement;
      }) as number;
      if (maxMeasurementTemp > maxMeasurement) {
        maxMeasurement = maxMeasurementTemp;
      }
    });

    // convert startDate and endDate to Date type
    var startDate = parseDate(this.startYear) as Date;
    var endDate = parseDate(this.endYear) as Date;

    // set up x-axis
    var x = d3.scaleTime().domain([startDate, endDate]).range([0, this.width]);

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

    // initialize the line to be plotted
    var line = d3
      .line<Measurement>()
      .x(function (d) {
        return x(d.measurement_x_value);
      })
      .y(function (d) {
        return y(d.measurement);
      });

    // draw line in line chart
    chartGroup
      .append('path')
      .attr('d', line(dataToPlot))
      .attr('fill', 'none')
      .attr('stroke-width', '2px')
      .attr('stroke', color);

    // draw x-axis
    chartGroup
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(xAxis);

    // draw y-axis
    chartGroup.append('g').attr('class', 'y axis').call(yAxis);

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
          'Aggregated Line Chart with ' +
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
          'Line Chart with ' +
            this.countries.length +
            ' countries and ' +
            this.indicators.length +
            ' indicator(s) for available data between ' +
            this.startYear +
            '-' +
            this.endYear
        );
    }

    // add dots to each data point
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
      .attr('r', 3)
      .attr('fill', color);

    // add x-axis label
    if (
      this.fiveYearsAggregation ||
      this.tenYearsAggregation ||
      this.twentyYearsAggregation
    ) {
      chartGroup
        .append('g')
        .append('text')
        .attr('class', 'x label')
        .attr('text-anchor', 'end')
        .attr('x', this.width)
        .attr('y', this.height + 28)
        .text(numOfTicks.toString() + '-year span');
    } else {
      chartGroup
        .append('g')
        .append('text')
        .attr('class', 'x label')
        .attr('text-anchor', 'end')
        .attr('x', this.width)
        .attr('y', this.height + 28)
        .text('years');
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

    // add colored dots to act as an indicator legend
    chartGroup
      .append('g')
      .append('circle')
      .attr('cx', 15)
      .attr('cy', this.height + 35)
      .attr('r', 5)
      .attr('fill', color);

    // add country name next to colored rectangles and dots with the country name and indicator each color represents
    chartGroup
      .append('g')
      .append('text')
      .attr('class', 'label')
      .attr('text-anchor', 'start')
      .attr('font-size', 'small')
      .attr('x', 25)
      .attr('y', this.height + 40)
      .text(this.countries[indexCountries] + "'s " + this.indicators[0]);

    // if more than one datasets has to be plotted
    for (let i = 1; i < this.lineDataToPlot.length; i++) {
      dataToPlot = this.lineDataToPlot[i];

      // if there are more than one indicators change color when the country changes
      if (i % numOfIndicators == 0) {
        indexCountries++;
        shiftIndicator = false;
        indexIndicators = 0;

        // get new color
        color = this.coloring.get(
          this.countries[i / numOfIndicators]
        ) as string;

        // add colored rectangles to act as a legend
        chartGroup
          .append('g')
          .append('rect')
          .attr('x', 0)
          .attr('y', this.height + 30 + 15 * i)
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', color);

        // add colored dots to act as an indicator legend
        chartGroup
          .append('g')
          .append('circle')
          .attr('cx', 15)
          .attr('cy', this.height + 35 + 15 * i)
          .attr('r', 5)
          .attr('fill', color);

        // add country name next to colored rectangles with the country name each color represents
        chartGroup
          .append('g')
          .append('text')
          .attr('class', 'label')
          .attr('text-anchor', 'start')
          .attr('font-size', 'small')
          .attr('x', 25)
          .attr('y', this.height + 40 + 15 * i)
          .text(
            this.countries[indexCountries] +
              "'s " +
              this.indicators[indexIndicators]
          );
      }

      // convert string to Date type
      dataToPlot.forEach((d) => {
        if (
          this.fiveYearsAggregation ||
          this.tenYearsAggregation ||
          this.twentyYearsAggregation
        ) {
          d.measurement_x_value = d.measurement_x_value.toString().split('-');
          d.measurement_x_value = parseDate(
            d.measurement_x_value[0].toString()
          );
        } else {
          d.measurement_x_value = parseDate(d.measurement_x_value.toString());
        }
      });
      // draw line in the graph
      chartGroup
        .append('path')
        .attr('d', line(dataToPlot))
        .attr('fill', 'none')
        .attr('stroke-width', '2px')
        .attr('stroke', color);

      // if the indicator changed,change the color of the dots
      if (shiftIndicator) {
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
          .attr('r', 3)
          .attr('fill', this.indicatorColors[indexIndicators]);

        indexIndicators++;

        // add colored rectangles to act as a legend
        chartGroup
          .append('g')
          .append('rect')
          .attr('x', 0)
          .attr('y', this.height + 30 + 15 * i)
          .attr('width', 10)
          .attr('height', 10)
          .attr('fill', color);

        // add colored dots to act as an indicator legend
        chartGroup
          .append('g')
          .append('circle')
          .attr('cx', 15)
          .attr('cy', this.height + 35 + 15 * i)
          .attr('r', 5)
          .attr('fill', this.indicatorColors[indexIndicators - 1]);

        // add country name next to colored rectangles with the country name each color represents
        chartGroup
          .append('g')
          .append('text')
          .attr('class', 'label')
          .attr('text-anchor', 'start')
          .attr('font-size', 'small')
          .attr('x', 25)
          .attr('y', this.height + 40 + 15 * i)
          .text(
            this.countries[indexCountries] +
              "'s " +
              this.indicators[indexIndicators]
          );
      } else {
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
          .attr('r', 3)
          .attr('fill', color);

        shiftIndicator = true;
      }
    }
  }
}
