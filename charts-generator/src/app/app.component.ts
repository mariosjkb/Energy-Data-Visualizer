// MARIOS IAKOVIDIS
// Typescript file that set up everything the app needs to create a graph

import { Component } from '@angular/core';
import { Measurement } from './types/measurements';
import { DataService } from './service/DataService';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'Energy Data Visualizer';
  // has a graph been created since the boot of the client? 
  noGraphCreated: boolean = true;

  // create form to pick graph type
  graphType = new FormControl();
  availableGraphTypes = [
    'Line Chart',
    'Bar Chart',
    'Scatter Plot (for a given country)',
    'Scatter Plot (for a given year)',
  ];

  // create form to pick countries
  country = new FormControl();
  availableCountries = [
    'Austria',
    'Belgium',
    'Bulgaria',
    'Croatia',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Estonia',
    'Finland',
    'France',
    'Germany',
    'Greece',
    'Hungary',
    'Ireland',
    'Italy',
    'Latvia',
    'Lithuania',
    'Luxembourg',
    'Malta',
    'Netherlands',
    'Poland',
    'Portugal',
    'Romania',
    'Slovak Republic',
    'Slovenia',
    'Spain',
    'Sweden',
  ];

  // create form to pick indicators
  indicator = new FormControl();
  availableIndicators = [
    'Access to clean fuels and technologies for cooking (% of population)',
    'Access to electricity  rural (% of rural population)',
    'Access to electricity  urban (% of urban population)',
    'Access to electricity (% of population)',
    'Alternative and nuclear energy (% of total energy use)',
    'Bird species  threatened (number)',
    'CO2 emissions (kg per 2015 US$ of GDP)',
    'CO2 emissions (kg per 2017 PPP $ of GDP)',
    'CO2 emissions (kg per PPP $ of GDP)',
    'CO2 emissions (kt)',
    'CO2 emissions (metric tons per capita)',
    'CO2 emissions from electricity and heat production  total (% of total fuel combustion)',
    'CO2 emissions from gaseous fuel consumption (% of total)',
    'CO2 emissions from gaseous fuel consumption (kt)',
    'CO2 emissions from liquid fuel consumption (% of total)',
    'CO2 emissions from liquid fuel consumption (kt)',
    'CO2 emissions from manufacturing industries and construction (% of total fuel combustion)',
    'CO2 emissions from other sectors  excluding residential buildings and commercial and public services (% of total fuel combustion)',
    'CO2 emissions from residential buildings and commercial and public services (% of total fuel combustion)',
    'CO2 emissions from solid fuel consumption (% of total)',
    'CO2 emissions from solid fuel consumption (kt)',
    'CO2 emissions from transport (% of total fuel combustion)',
    'CO2 intensity (kg per kg of oil equivalent energy use)',
    'Combustible renewables and waste (% of total energy)',
    'Disaster risk reduction progress score (1-5 scale; 5=best)',
    'Droughts  floods  extreme temperatures (% of population  average 1990-2009)',
    'Electric power consumption (kWh per capita)',
    'Electric power transmission and distribution losses (% of output)',
    'Electricity production from coal sources (% of total)',
    'Electricity production from hydroelectric sources (% of total)',
    'Electricity production from natural gas sources (% of total)',
    'Electricity production from nuclear sources (% of total)',
    'Electricity production from oil  gas and coal sources (% of total)',
    'Electricity production from oil sources (% of total)',
    'Electricity production from renewable sources  excluding hydroelectric (% of total)',
    'Electricity production from renewable sources  excluding hydroelectric (kWh)',
    'Energy imports  net (% of energy use)',
    'Energy intensity level of primary energy (MJ/$2011 PPP GDP)',
    'Energy use (kg of oil equivalent per capita)',
    'Energy use (kg of oil equivalent) per $1 000 GDP (constant 2017 PPP)',
    'Fish species  threatened (number)',
    'GDP per unit of energy use (constant 2017 PPP $ per kg of oil equivalent)',
    'GDP per unit of energy use (PPP $ per kg of oil equivalent)',
    'GHG net emissions/removals by LUCF (Mt of CO2 equivalent)',
    'Mammal species  threatened (number)',
    'Plant species (higher)  threatened (number)',
    'Population density (people per sq. km of land area)',
    'Renewable electricity output (% of total electricity output)',
    'Renewable energy consumption (% of total final energy consumption)',
  ];

  // create forms to pick start year and end year
  startYearTemp = new FormControl();
  endYearTemp = new FormControl();
  availableYears = [
    '1960',
    '1961',
    '1962',
    '1963',
    '1964',
    '1965',
    '1966',
    '1967',
    '1968',
    '1969',
    '1970',
    '1971',
    '1972',
    '1973',
    '1974',
    '1975',
    '1976',
    '1977',
    '1978',
    '1979',
    '1980',
    '1981',
    '1982',
    '1983',
    '1984',
    '1985',
    '1986',
    '1987',
    '1988',
    '1989',
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
  ];

  // create form to pick aggregation type
  aggregation = new FormControl();
  availableAggregations = [
    'None',
    '5 Year Period Aggregation',
    '10 Year Period Aggregation',
    '20 Year Period Aggregation',
  ];

  // temp variables to handle in the app component so the child component not to be activated in moments we dont want it to
  lineDataToPlot!: Measurement[][];
  lineDataToPlotTemp: Measurement[][] = [];
  lineChartCountries!: string[];
  lineChartIndicators!: string[];
  lineChartStartYear!: string;
  lineChartEndYear!: string;
  lineChartFiveYearsAggregation: boolean = false;
  lineChartTenYearsAggregation: boolean = false;
  lineChartTwentyYearsAggregation: boolean = false;

  barDataToPlotTemp: Measurement[][] = [];
  barDataToPlot!: Measurement[][];
  barChartCountries!: string[];
  barChartIndicators!: string[];
  barChartStartYear!: string;
  barChartEndYear!: string;
  barChartFiveYearsAggregation: boolean = false;
  barChartTenYearsAggregation: boolean = false;
  barChartTwentyYearsAggregation: boolean = false;

  scatterDataToPlotTemp: Measurement[][] = [];
  scatterDataToPlot!: Measurement[][];
  scatterPlotIndicators!: string[];
  scatterPlotYear!: string;
  scatterPlotCountry!: string;

  fiveYearsAggregationTemp: boolean = false;
  tenYearsAggregationTemp: boolean = false;
  twentyYearsAggregationTemp: boolean = false;

  // variable to be used to send data to scatterplot child component
  countries: any = [];
  indicators: any = [];
  fixedYear: boolean = false;

  // initialize DataService and SnackBar 
  constructor(
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  // get the data necessery to create an line chart and pass them to the child component
  async createLineChart() {
    this.lineChartCountries = this.country.value;
    this.lineChartIndicators = this.indicator.value;
    this.lineDataToPlotTemp = [];
    // if there are multiple countries and indicators get the data one by one to be able to distinct them
    for (let i = 0; i < this.lineChartCountries.length; i++) {
      for (let j = 0; j < this.lineChartIndicators.length; j++) {
        var country = this.lineChartCountries[i];
        var indicator = this.lineChartIndicators[j];
        if (this.fiveYearsAggregationTemp) {
          await this.dataService
            .getChartDataFiveYearsPeriod(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.lineDataToPlotTemp.push(data);
            });
        } else if (this.tenYearsAggregationTemp) {
          await this.dataService
            .getChartDataTenYearsPeriod(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.lineDataToPlotTemp.push(data);
            });
        } else if (this.twentyYearsAggregationTemp) {
          await this.dataService
            .getChartDataTwentyYearsPeriod(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.lineDataToPlotTemp.push(data);
            });
        } else {
          await this.dataService
            .getChartData(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.lineDataToPlotTemp.push(data);
            });
        }
      }
    }
    // change the variable that are input to the linechart child component to make it create a line chart
    this.lineDataToPlot = this.lineDataToPlotTemp;
    this.lineChartFiveYearsAggregation = this.fiveYearsAggregationTemp;
    this.lineChartTenYearsAggregation = this.tenYearsAggregationTemp;
    this.lineChartTwentyYearsAggregation = this.twentyYearsAggregationTemp;
    this.lineChartStartYear = this.startYearTemp.value;
    this.lineChartEndYear = this.endYearTemp.value;
  }

  // get the data necessery to create an scatter plot for a given country and pass them to the child component
  async createScatterPlot() {
    this.scatterPlotCountry = this.country.value;
    this.scatterPlotIndicators = this.indicator.value;
    this.scatterDataToPlotTemp = [];
    if (this.fiveYearsAggregationTemp) {
      await this.dataService
        .getScatterPlotDataFixedCountryFiveYearsPeriod(
          this.scatterPlotCountry,
          this.scatterPlotIndicators[0],
          this.scatterPlotIndicators[1]
        )
        .then((res) => res.json())
        .then((data) => {
          this.scatterDataToPlotTemp.push(data);
        });
    } else if (this.tenYearsAggregationTemp) {
      await this.dataService
        .getScatterPlotDataFixedCountryTenYearsPeriod(
          this.scatterPlotCountry,
          this.scatterPlotIndicators[0],
          this.scatterPlotIndicators[1]
        )
        .then((res) => res.json())
        .then((data) => {
          this.scatterDataToPlotTemp.push(data);
        });
    } else if (this.twentyYearsAggregationTemp) {
      await this.dataService
        .getScatterPlotDataFixedCountryTwentyYearsPeriod(
          this.scatterPlotCountry,
          this.scatterPlotIndicators[0],
          this.scatterPlotIndicators[1]
        )
        .then((res) => res.json())
        .then((data) => {
          this.scatterDataToPlotTemp.push(data);
        });
    } else {
      await this.dataService
        .getScatterPlotDataFixedCountry(
          this.scatterPlotCountry,
          this.scatterPlotIndicators[0],
          this.scatterPlotIndicators[1]
        )
        .then((res) => res.json())
        .then((data) => {
          this.scatterDataToPlotTemp.push(data);
        });
    }
     // change the variable that are input to the linechart child component to make it create a line chart
    this.scatterDataToPlot = this.scatterDataToPlotTemp;
    this.countries = this.scatterPlotCountry;
    this.indicators = this.scatterPlotIndicators;
    this.fixedYear = false;
  }

  // get the data necessery to create an scatter chart for a given year and pass them to the child component
  async createScatterPlotYear() {
    this.scatterPlotIndicators = this.indicator.value;
    this.scatterDataToPlotTemp = [];
    await this.dataService
      .getScatterPlotDataFixedYear(
        this.startYearTemp.value,
        this.scatterPlotIndicators[0],
        this.scatterPlotIndicators[1]
      )
      .then((res) => res.json())
      .then((data) => {
        this.scatterDataToPlotTemp.push(data);
      });
     // change the variable that are input to the linechart child component to make it create a line chart
    this.scatterDataToPlot = this.scatterDataToPlotTemp;
    this.indicators = this.scatterPlotIndicators;
    this.fixedYear = true;
    this.scatterPlotYear = this.startYearTemp.value;
  }

  // get the data necessery to create an bar chart and pass them to the child component
  async createBarChart() {
    this.barChartCountries = this.country.value;
    this.barChartIndicators = this.indicator.value;
    this.barDataToPlotTemp = [];
    // if there are multiple countries and indicators get the data one by one to be able to distinct them
    for (let i = 0; i < this.barChartCountries.length; i++) {
      for (let j = 0; j < this.barChartIndicators.length; j++) {
        var country = this.barChartCountries[i];
        var indicator = this.barChartIndicators[j];
        if (this.fiveYearsAggregationTemp) {
          await this.dataService
            .getChartDataFiveYearsPeriod(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.barDataToPlotTemp.push(data);
            });
        } else if (this.tenYearsAggregationTemp) {
          await this.dataService
            .getChartDataTenYearsPeriod(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.barDataToPlotTemp.push(data);
            });
        } else if (this.twentyYearsAggregationTemp) {
          await this.dataService
            .getChartDataTwentyYearsPeriod(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.barDataToPlotTemp.push(data);
            });
        } else {
          await this.dataService
            .getChartData(
              country,
              indicator,
              this.startYearTemp.value,
              this.endYearTemp.value
            )
            .then((res) => res.json())
            .then((data) => {
              this.barDataToPlotTemp.push(data);
            });
        }
      }
    }
     // change the variable that are input to the linechart child component to make it create a line chart
    this.barDataToPlot = this.barDataToPlotTemp;
    this.barChartFiveYearsAggregation = this.fiveYearsAggregationTemp;
    this.barChartTenYearsAggregation = this.tenYearsAggregationTemp;
    this.barChartTwentyYearsAggregation = this.twentyYearsAggregationTemp;
    this.barChartStartYear = this.startYearTemp.value;
    this.barChartEndYear = this.endYearTemp.value;
  }

  // retrieve the data the user enter and check if they are correct
  async checkInput() {
    /* these checks contain null and empty value checks, if start year is larger than end year, if there are so many countries
      and indicators that the graph is unreadable, if there is an aggregation starts from a year that it shouldn and
      in the case of scatter plots some fields can be null but indicators must be of length 2 always. If the input is
      not correct the app is reloading*/ 
    if (this.graphType.value == null || this.graphType.value.length === 0) {
      alert('ERROR!!!Pick graph type\nPage is reloading...');
      window.location.reload();
    } else if (
      (this.country.value === null ||  this.country.value.length === 0) &&
      this.graphType.value !== 'Scatter Plot (for a given year)'
    ) {
      alert('ERROR!!!Pick countries to create a chart!\nPage is reloading...');
      window.location.reload();
    } else if (this.indicator.value === null ||  this.indicator.value.length === 0) {
      alert('ERROR!!!Pick indicators to create a chart!\nPage is reloading...');
      window.location.reload();
    } else if (
      this.startYearTemp.value === null &&
      this.graphType.value !== 'Scatter Plot (for a given country)'
    ) {
      alert('ERROR!!!Pick start year to create a graph\nPage is reloading...');
      window.location.reload();
    } else if (
      this.endYearTemp.value === null &&
      this.graphType.value !== 'Scatter Plot (for a given country)' &&
      this.graphType.value !== 'Scatter Plot (for a given year)'
    ) {
      alert('ERROR!!!Pick end year to create a graph\nPage is reloading...');
      window.location.reload();
    } else if (
      this.aggregation.value === null
    ) {
      alert(
        'ERROR!!!Pick an aggregation type to create a graph\nPage is reloading...'
      );
      window.location.reload();
    } else if (
      this.startYearTemp.value > this.endYearTemp.value &&
      this.graphType.value !== 'Scatter Plot (for a given year)'
    ) {
      alert(
        'ERROR!!!Start year can not be larger than end year!\nPage is reloading...'
      );
      window.location.reload();
    } else if (this.indicator.value.length > 3) {
      alert(
        'ERROR!!!Max limit of indicators is 3 for one graph\nPage is reloading...'
      );
      window.location.reload();
    } else if (this.graphType.value === 'Line Chart') {
      if (this.country.value.length * this.indicator.value.length > 12) {
        alert(
          'ERROR!!!You have select too much data that the graph will be messy\nMax number for Line Charts is 12 lines and you have selected ' +
            (
              this.country.value.length * this.indicator.value.length
            ).toString() +
            '\nPage is reloading...'
        );
        window.location.reload();
      }
    } else if (this.graphType.value === 'Bar Chart') {
      if (this.country.value.length * this.indicator.value.length > 4) {
        alert(
          'ERROR!!!You have select too much data that the graph will be messy\nMax number for Bar Charts is 4 bars and you have selected ' +
            (
              this.country.value.length * this.indicator.value.length
            ).toString() +
            '\nPage is reloading...'
        );
        window.location.reload();
      }
    } else if (
      this.graphType.value === 'Scatter Plot (for a given country)' &&
      (this.country.value.length != 1 || this.indicator.value.length != 2)
    ) {
      alert(
        'ERROR!!!You have to pick 1 country and 2 indicators to create the scatter plot\nPage is reloading...'
      );
      window.location.reload();
    } else if (
      this.graphType.value === 'Scatter Plot (for a given year)' &&
      this.indicator.value.length != 2
    ) {
      alert(
        'ERROR!!!You have to pick 2 indicators to create the scatter plot\nPage is reloading...'
      );
      window.location.reload();
    } else if (
      this.aggregation.value === '5 Year Period Aggregation' &&
      parseInt(this.startYearTemp.value) % 5 != 0 &&
      this.graphType.value !== 'Scatter Plot (for a given country)'
    ) {
      alert(
        'ERROR!!!Start year must be the beginning of a 5 year period(ie 1960 or 1965)\nPage is reloading...'
      );
      window.location.reload();
    } else if (
      this.aggregation.value === '10 Year Period Aggregation' &&
      parseInt(this.startYearTemp.value) % 10 != 0 &&
      this.graphType.value !== 'Scatter Plot (for a given country)'
    ) {
      alert(
        'ERROR!!!Start year must be the beginning of a 10 year period(ie 1960)\nPage is reloading...'
      );
      window.location.reload();
    } else if (
      this.aggregation.value === '20 Year Period Aggregation' &&
      parseInt(this.startYearTemp.value) % 20 != 0 &&
      this.graphType.value !== 'Scatter Plot (for a given country)'
    ) {
      alert(
        'ERROR!!!Start year must be the beginning of a 20 year period(ie 1960 or 1980 or 2000)\nPage is reloading...'
      );
      window.location.reload();
    } else if (
      this.aggregation.value !== "None" &&
      this.graphType.value === 'Scatter Plot (for a given year)'
    ) {
      alert(
        'ERROR!!!Aggregation in not available in this type of graph\nPage is reloading...'
      );
      window.location.reload();
    }
  }

  // the function that runs when the button is pressed
  async prepareGraph() {
    // set up temp boolean values based on user's choice
    this.fiveYearsAggregationTemp = false;
    this.tenYearsAggregationTemp = false;
    this.twentyYearsAggregationTemp = false;

    if (this.aggregation.value == '5 Year Period Aggregation') {
      this.fiveYearsAggregationTemp = true;
    } else if (this.aggregation.value == '10 Year Period Aggregation') {
      this.tenYearsAggregationTemp = true;
    } else if (this.aggregation.value == '20 Year Period Aggregation') {
      this.twentyYearsAggregationTemp = true;
    }

    // check input
    this.checkInput();

    // create the chart the user requested
    if (this.graphType.value == 'Line Chart') {
      this.createLineChart();
    } else if (this.graphType.value == 'Bar Chart') {
      this.createBarChart();
    } else if (this.graphType.value == 'Scatter Plot (for a given country)') {
      this.createScatterPlot();
    } else if (this.graphType.value == 'Scatter Plot (for a given year)') {
      this.createScatterPlotYear();
    }

    // when the chart is ready scroll down to show it to the user or if it's the first graph he requested show the snack bar
    var element = document.getElementById('charts');
    if (this.noGraphCreated == true) {
      this.noGraphCreated = false;
      this.snackBar.open('Scroll down to see graph', 'OK');
    }
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
