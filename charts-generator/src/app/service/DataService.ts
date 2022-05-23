// MARIOS IAKOVIDIS
// Typescript file that is used to send data requests to the server and return the results to the client

import { Injectable } from "@angular/core";

// use DataService as an Injectable and set it as root provider
@Injectable({providedIn: 'root'})

export class DataService {
    
    // url that the servel is listening for requests
    private serverURL = "http://localhost:8000";

    constructor(){};

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back the results
    getChartData(country:string,indicator:string,startYear:string,endYear:string){
        // replace characters that are not valid in the HTTP protocol
        indicator = indicator.replaceAll(" ","*")
        indicator = indicator.replaceAll("/","''")
        indicator = indicator.replace("%","_")
    
        let url = `${this.serverURL}/chart/input:${country}+${indicator}+${startYear}+${endYear}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back the 5-year average results 
    getChartDataFiveYearsPeriod(country:string,indicator:string,startYear:string,endYear:string){
        // replace characters that are not valid in the HTTP protocol
        indicator = indicator.replaceAll(" ","*")
        indicator = indicator.replaceAll("/","''")
        indicator = indicator.replace("%","_")

        let url = `${this.serverURL}/chartaggregatefiveyears/input:${country}+${indicator}+${startYear}+${endYear}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back the 10-year average results
    getChartDataTenYearsPeriod(country:string,indicator:string,startYear:string,endYear:string){
        // replace characters that are not valid in the HTTP protocol
        indicator = indicator.replaceAll(" ","*")
        indicator = indicator.replaceAll("/","''")
        indicator = indicator.replace("%","_")

        let url = `${this.serverURL}/chartaggregatetenyears/input:${country}+${indicator}+${startYear}+${endYear}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back the 20-year average results
    getChartDataTwentyYearsPeriod(country:string,indicator:string,startYear:string,endYear:string){
        // replace characters that are not valid in the HTTP protocol
        indicator = indicator.replaceAll(" ","*")
        indicator = indicator.replaceAll("/","''")
        indicator = indicator.replace("%","_")

        let url = `${this.serverURL}/chartaggregatetwentyyears/input:${country}+${indicator}+${startYear}+${endYear}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back results
    getScatterPlotDataFixedCountry(country:string,indicator1:string,indicator2:string){
        // replace characters that are not valid in the HTTP protocol
        indicator1 = indicator1.replaceAll(" ","*")
        indicator1 = indicator1.replaceAll("/","''")
        indicator1 = indicator1.replace("%","_")

        indicator2 = indicator2.replaceAll(" ","*")
        indicator2 = indicator2.replaceAll("/","''")
        indicator2 = indicator2.replace("%","_")

        let url = `${this.serverURL}/scatterplotcountry/input:${country}+${indicator1}+${indicator2}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back the 5-year average results
    getScatterPlotDataFixedCountryFiveYearsPeriod(country:string,indicator1:string,indicator2:string){
        // replace characters that are not valid in the HTTP protocol
        indicator1 = indicator1.replaceAll(" ","*")
        indicator1 = indicator1.replaceAll("/","''")
        indicator1 = indicator1.replace("%","_")

        indicator2 = indicator2.replaceAll(" ","*")
        indicator2 = indicator2.replaceAll("/","''")
        indicator2 = indicator2.replace("%","_")

        let url = `${this.serverURL}/scatterplotcountryaggregatefiveyears/input:${country}+${indicator1}+${indicator2}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back the 10-year average results
    getScatterPlotDataFixedCountryTenYearsPeriod(country:string,indicator1:string,indicator2:string){
        // replace characters that are not valid in the HTTP protocol
        indicator1 = indicator1.replaceAll(" ","*")
        indicator1 = indicator1.replaceAll("/","''")
        indicator1 = indicator1.replace("%","_")

        indicator2 = indicator2.replaceAll(" ","*")
        indicator2 = indicator2.replaceAll("/","''")
        indicator2 = indicator2.replace("%","_")

        let url = `${this.serverURL}/scatterplotcountryaggregatetenyears/input:${country}+${indicator1}+${indicator2}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back the 20-year average results
    getScatterPlotDataFixedCountryTwentyYearsPeriod(country:string,indicator1:string,indicator2:string){
        // replace characters that are not valid in the HTTP protocol
        indicator1 = indicator1.replaceAll(" ","*")
        indicator1 = indicator1.replaceAll("/","''")
        indicator1 = indicator1.replace("%","_")

        indicator2 = indicator2.replaceAll(" ","*")
        indicator2 = indicator2.replaceAll("/","''")
        indicator2 = indicator2.replace("%","_")

        let url = `${this.serverURL}/scatterplotcountryaggregatetwentyyears/input:${country}+${indicator1}+${indicator2}`;
        return fetch(url)
    }

    // prepare a URL with the params of the query, send it to server and fetch the data the server will send back results
    getScatterPlotDataFixedYear(year:string,indicator1:string,indicator2:string){
        // replace characters that are not valid in the HTTP protocol
        indicator1 = indicator1.replaceAll(" ","*")
        indicator1 = indicator1.replaceAll("/","''")
        indicator1 = indicator1.replace("%","_")

        indicator2 = indicator2.replaceAll(" ","*")
        indicator2 = indicator2.replaceAll("/","''")
        indicator2 = indicator2.replace("%","_")

        let url = `${this.serverURL}/scatterplotyear/input:${year}+${indicator1}+${indicator2}`;
        return fetch(url)
    }
}