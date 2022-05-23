//MARIOS IAKOVIDIS

// use express API to handle the database
const express = require("express");
// use CORS to establish cross origin communication between server and client
const cors = require("cors");
// use mysql as our DBMS
const mysql = require("mysql2");
// initialize an express API
const app = express();
// set the port that the server is listening for requests
const port = "8000";

// set express API to use a cross-origin protocol
app.use(cors());

// create connection
const database = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "password",
  database: "stats_database",
});

// connect to database
database.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Database is connected");
});

// create a query to get the chart data that the client requested via the URL parameters
app.route("/chart/input:values").get((req, res) => {
  let values = req.params["values"].substring(1);
  let splittedValues = values.split("+");
  let country = splittedValues[0];
  let indicator = splittedValues[1];
  let startYear = splittedValues[2];
  let endYear = splittedValues[3];

  // replace characters that are not valid in HTTP protocol
  indicator = indicator.replace("_", "%");
  indicator = indicator.replaceAll("*", " ");
  indicator = indicator.replaceAll("''","/");

  let sql = `SELECT measurement,measurement_year AS measurement_x_value FROM MEASUREMENTS WHERE country = '${country}' AND indicator = '${indicator}' AND measurement_year >= '${startYear}' AND measurement_year <= '${endYear}';`;
  database.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log("I just served data to a client");
    // send results back to client
    res.send(results);
  });
});

// create a query to get the five year average chart data that the client requested via the URL parameters
app.route("/chartaggregatefiveyears/input:values").get((req, res) => {
  let values = req.params["values"].substring(1);
  let splittedValues = values.split("+");
  let country = splittedValues[0];
  let indicator = splittedValues[1];
  let startYear = splittedValues[2];
  let endYear = splittedValues[3];

  // replace characters that are not valid in HTTP protocol
  indicator = indicator.replace("_", "%");
  indicator = indicator.replaceAll("*", " ");
  indicator = indicator.replaceAll("''","/");

  let sql = `SELECT AVG(measurement) AS measurement,five_year_period AS measurement_x_value FROM MEASUREMENTS JOIN YEARS ON measurement_year = year WHERE country = '${country}' AND indicator = '${indicator}' AND measurement_year >= '${startYear}' AND measurement_year <= '${endYear}'GROUP BY five_year_period;`;
  database.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      "I just served data aggregated to a five-year period"
    );
    // send results back to client
    res.send(results);
  });
});

// create a query to get the ten year average chart data that the client requested via the URL parameters
app.route("/chartaggregatetenyears/input:values").get((req, res) => {
  let values = req.params["values"].substring(1);
  let splittedValues = values.split("+");
  let country = splittedValues[0];
  let indicator = splittedValues[1];
  let startYear = splittedValues[2];
  let endYear = splittedValues[3];

  // replace characters that are not valid in HTTP protocol
  indicator = indicator.replace("_", "%");
  indicator = indicator.replaceAll("*", " ");
  indicator = indicator.replaceAll("''","/");

  let sql = `SELECT AVG(measurement) AS measurement,decade AS measurement_x_value FROM MEASUREMENTS JOIN YEARS ON measurement_year = year WHERE country = '${country}' AND indicator = '${indicator}' AND measurement_year >= '${startYear}' AND measurement_year <= '${endYear}' GROUP BY decade;`;
  database.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      "I just served data aggregated to a ten-year period"
    );
    // send results back to client
    res.send(results);
  });
});

// create a query to get the twenty year average chart data that the client requested via the URL parameters
app.route("/chartaggregatetwentyyears/input:values").get((req, res) => {
  let values = req.params["values"].substring(1);
  let splittedValues = values.split("+");
  let country = splittedValues[0];
  let indicator = splittedValues[1];
  let startYear = splittedValues[2];
  let endYear = splittedValues[3];

  // replace characters that are not valid in HTTP protocol
  indicator = indicator.replace("_", "%");
  indicator = indicator.replaceAll("*", " ");
  indicator = indicator.replaceAll("''","/");

  let sql = `SELECT AVG(measurement) AS measurement,twenty_year_period AS measurement_x_value FROM MEASUREMENTS JOIN YEARS ON measurement_year = year WHERE country = '${country}' AND indicator = '${indicator}' AND measurement_year >= '${startYear}' AND measurement_year <= '${endYear}' GROUP BY twenty_year_period;`;
  database.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log(
      "I just served data aggregated to a twenty-year period"
    );
    // send results back to client
    res.send(results);
  });
});

// create a query to get the scatter plot data for a given country that the client requested via the URL parameters
app.route("/scatterplotcountry/input:values").get((req, res) => {
  let values = req.params["values"].substring(1);
  let splittedValues = values.split("+");
  let country = splittedValues[0];
  let indicator1 = splittedValues[1];
  let indicator2 = splittedValues[2];

  // replace characters that are not valid in HTTP protocol
  indicator1 = indicator1.replace("_", "%");
  indicator1 = indicator1.replaceAll("*", " ");
  indicator1 = indicator1.replaceAll("''","/");

  indicator2 = indicator2.replace("_", "%");
  indicator2 = indicator2.replaceAll("*", " ");
  indicator2 = indicator2.replaceAll("''","/");

  let sql = `SELECT M1.measurement AS measurement, M2.measurement AS measurement_x_value FROM MEASUREMENTS AS M1 JOIN MEASUREMENTS AS M2 ON M1.measurement_year = M2.measurement_year WHERE M1.country = '${country}' AND M2.country = '${country}' AND M1.indicator = '${indicator1}' AND M2.indicator = '${indicator2}' ;`;
  database.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log("I just served scatter plot data for fixed country");
    // send results back to client
    res.send(results);
  });
});

// create a query to get the scatter plot five year average data for a given country that the client requested via the URL parameters
app
  .route("/scatterplotcountryaggregatefiveyears/input:values")
  .get((req, res) => {
    let values = req.params["values"].substring(1);
    let splittedValues = values.split("+");
    let country = splittedValues[0];
    let indicator1 = splittedValues[1];
    let indicator2 = splittedValues[2];

    // replace characters that are not valid in HTTP protocol
      indicator1 = indicator1.replace("_", "%");
      indicator1 = indicator1.replaceAll("*", " ");
      indicator1 = indicator1.replaceAll("''","/");
      
      indicator2 = indicator2.replace("_", "%");
      indicator2 = indicator2.replaceAll("*", " ");
      indicator2 = indicator2.replaceAll("''","/");

    // create a view in the DBMS to calculate some temp results to use for our main query. If this view exists drop it and re-create it
    let sql1 = `DROP VIEW IF EXISTS AGGREGATION5YEARS;`;
    database.execute(sql1);

    let sql2 = `CREATE VIEW AGGREGATION5YEARS AS SELECT M1.measurement AS measurement, M2.measurement AS measurement_x_value, five_year_period FROM MEASUREMENTS AS M1 JOIN MEASUREMENTS AS M2 ON M1.measurement_year = M2.measurement_year JOIN YEARS ON M1.measurement_year = year WHERE M1.country = '${country}' AND M2.country = '${country}' AND M1.indicator = '${indicator1}' AND M2.indicator = '${indicator2}' GROUP BY five_year_period;`;
    database.execute(sql2);

    let sql3 = `SELECT measurement,measurement_x_value FROM AGGREGATION5YEARS;`;
    database.query(sql3, (error, results) => {
      if (error) {
        throw error;
      }
      console.log("I just served scatter plot data aggregated to a five-year period");
      // send results back to client
      res.send(results);
    });
  });

// create a query to get the scatter plot ten year average data for a given country that the client requested via the URL parameters
app
  .route("/scatterplotcountryaggregatetenyears/input:values")
  .get((req, res) => {
    let values = req.params["values"].substring(1);
    let splittedValues = values.split("+");
    let country = splittedValues[0];
    let indicator1 = splittedValues[1];
    let indicator2 = splittedValues[2];

    // replace characters that are not valid in HTTP protocol
    indicator1 = indicator1.replace("_", "%");
    indicator1 = indicator1.replaceAll("*", " ");
    indicator1 = indicator1.replaceAll("''","/");
    
    indicator2 = indicator2.replace("_", "%");
    indicator2 = indicator2.replaceAll("*", " ");
    indicator2 = indicator2.replaceAll("''","/");

    // create a view in the DBMS to calculate some temp results to use for our main query. If this view exists drop it and re-create it
    let sql1 = `DROP VIEW IF EXISTS AGGREGATION10YEARS;`;
    database.execute(sql1);

    let sql2 = `CREATE VIEW AGGREGATION10YEARS AS SELECT M1.measurement AS measurement, M2.measurement AS measurement_x_value, decade FROM MEASUREMENTS AS M1 JOIN MEASUREMENTS AS M2 ON M1.measurement_year = M2.measurement_year JOIN YEARS ON M1.measurement_year = year WHERE M1.country = '${country}' AND M2.country = '${country}' AND M1.indicator = '${indicator1}' AND M2.indicator = '${indicator2}' GROUP BY decade;`;
    database.execute(sql2);

    let sql3 = `SELECT measurement,measurement_x_value FROM AGGREGATION10YEARS;`;
    database.query(sql3, (error, results) => {
      if (error) {
        throw error;
      }
      console.log("I just served scatter plot data aggregated to a ten-year period");
      // send results back to client
      res.send(results);
    });
  });

// create a query to get the scatter plot twenty year average data for a given country that the client requested via the URL parameters
app
  .route("/scatterplotcountryaggregatetwentyyears/input:values")
  .get((req, res) => {
    let values = req.params["values"].substring(1);
    let splittedValues = values.split("+");
    let country = splittedValues[0];
    let indicator1 = splittedValues[1];
    let indicator2 = splittedValues[2];

    // replace characters that are not valid in HTTP protocol
    indicator1 = indicator1.replace("_", "%");
    indicator1 = indicator1.replaceAll("*", " ");
    indicator1 = indicator1.replaceAll("''","/");
    
    indicator2 = indicator2.replace("_", "%");
    indicator2 = indicator2.replaceAll("*", " ");
    indicator2 = indicator2.replaceAll("''","/");

    // create a view in the DBMS to calculate some temp results to use for our main query. If this view exists drop it and re-create it
    let sql1 = `DROP VIEW IF EXISTS AGGREGATION20YEARS;`;
    database.execute(sql1);

    let sql2 = `CREATE VIEW AGGREGATION20YEARS AS SELECT M1.measurement AS measurement, M2.measurement AS measurement_x_value, twenty_year_period FROM MEASUREMENTS AS M1 JOIN MEASUREMENTS AS M2 ON M1.measurement_year = M2.measurement_year JOIN YEARS ON M1.measurement_year = year WHERE M1.country = '${country}' AND M2.country = '${country}' AND M1.indicator = '${indicator1}' AND M2.indicator = '${indicator2}' GROUP BY twenty_year_period;`;
    database.execute(sql2);

    let sql3 = `SELECT measurement,measurement_x_value FROM AGGREGATION20YEARS;`;
    database.query(sql3, (error, results) => {
      if (error) {
        throw error;
      }
      console.log("I just served scatter plot data aggregated to a twenty-year period");
      // send results back to client
      res.send(results);
    });
  });

// create a query to get the scatter plot data for a given year that the client requested via the URL parameters
app.route("/scatterplotyear/input:values").get((req, res) => {
  let values = req.params["values"].substring(1);
  let splittedValues = values.split("+");
  let measurement_year = splittedValues[0];
  let indicator1 = splittedValues[1];
  let indicator2 = splittedValues[2];

  // replace characters that are not valid in HTTP protocol
  indicator1 = indicator1.replace("_", "%");
  indicator1 = indicator1.replaceAll("*", " ");
  indicator1 = indicator1.replaceAll("''","/");
  
  indicator2 = indicator2.replace("_", "%");
  indicator2 = indicator2.replaceAll("*", " ");
  indicator2 = indicator2.replaceAll("''","/");

  let sql = `SELECT M1.measurement AS measurement, M2.measurement AS measurement_x_value FROM MEASUREMENTS AS M1 JOIN MEASUREMENTS AS M2 ON M1.country = M2.country WHERE M1.measurement_year = '${measurement_year}' AND M2.measurement_year = '${measurement_year}' AND M1.indicator = '${indicator1}' AND M2.indicator = '${indicator2}' ;`;
  database.query(sql, (error, results) => {
    if (error) {
      throw error;
    }
    console.log("I just served scatter plot data for fixed year");
    // send results back to client
    res.send(results);
  });
});

// set server to listen to localhost:8000
app.listen(port, () => {
  console.log("Server is up and running on port 8000");
});
