# Energy Data Visualizer
Web-app that converts raw data from the 27 countries of the European Union about energy production, access and environmental repercussions into Timelines(also referred as Line Charts), Bar Charts and Scatter Plots.

## Motivation
The app was developed for the purposes of an undergraduate class in Computer Science and Engineering Department of University of Ioannina and it aims to gain valuable information about loads of raw data without having to read thousands of numbers and indicators.

## Requirements
+ [Node.js](https://nodejs.org/)
+ [Angular](https://angular.io)
+ [D3.js](https://d3js.org/)
+ [Pandas](https://pandas.pydata.org/)

## Description
The server part of the app is implemented in Node.js 16.14.2. The server gets from the client-side the data that the user wants to visualize and return them to the client after quering the database that stores raw data.
The client part of the app (charts-generator) is implemented in Angular 13.3.2. Charts-generator gets input from the users about what type of graph and data they want to create a graph for, retrieves the data from the server via Fetch API and constructs the graph using D3.js.
ETL scripts were used for data extraction and transformation from xlsx to txt format in ETL directory.
Data contains the .csv files that were loaded in the database.
Data for extraction contains the original data files and the extracted information for the indicators we wanted.
In ETL directory, the database schema is also available.
Delivarable are in greek for the class' purposes.

## Usage
To run the app in your machine:
1. You need to install npm in charts-generator directory to be able to run the app because they are not available to save some space(check .gitignore).
2. To run the server: \
    cd server/src\
    node index.js
3. To run the client:\
    cd charts-generator/src\
    ng serve --open(the browser opens automatically)
 
## Notes
Google Chrome was used as main browser.

## Contributor
+ [Marios Iakovidis](https://github.com/mariosjkb)
