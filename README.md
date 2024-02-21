# Comparing Air Quality across the United States and the prevalence of 3 chronic diseases using data from 2020

## An overview of the project and its purpose:

### Overview:

We utilized data from the US Department of Health, Chronic Disease Indicators (CDI) webpage and the US Environmental Protection Agency, Air Quality Systems API webpage to create our visualizations.

### Purpose:

The purpose of our project was to track air quality across the United States and compare the prevalence of 3 chronic diseases with air quality metrics using data from 2020. The goal was to analyze any possible correlation between local air quality per state and the prevalence of Asthma, COPD, and Cardiovascular Disease.

### US CDI Dataset: 

This dataset collects studies done in each state to track the measures of various chronic diseases. We filtered this dataset to only include Asthma, Cardiovascular Disease, and COPD as they were the diseases most affected by air pollution. We also filtered the prevalence of these diseases for the year 2020, to only include non stratified data, and to only include age adjusted data (above 18). This data was ran through postgres and stored. 

### EPA AQS Dataset: 

This dataset collects air quality metrics across the United States from various site locations. Different stations collected different parameters. This was filtered for 2020 metrics collected, and chose to omit data for Alaska, Nebraska, West Virginia, and South Carolina as they were incomplete. This information was collected via the AQS API posted on the EPA webpage for annualized summary data by state (https://aqs.epa.gov/aqsweb/documents/data_api.html#annual). This data averaged every sample per site location on an annualized basis. We chose to filter by max average readings per state/site, meaning we chose to display the sites with the highest readings. The API only accepted 5 pollutant parameters (Ozone, PM 2.5, CO, NO2, SO2) all within the same year. 

### Python Scripts: (housed under the python_scripts folder)

- cdi_csv_script.ipynb: reads in US CDI dataset and filtered data for usability and scope. Produces cdi_csv.csv.
- aqi_api.ipynb: reads in AQI data via API. Creates a dictionary of each state and the max annual mean by site. Produces max_aqi_csv. 
- aqs_site_loc.ipynb: reads in the AQI data via API. Creates a file containing the latitude and longitude of each site location. Produces location_csv.csv and location_json.json files. 
- scatter_plot.ipynb: merged AQI data and CDI data for scatterplots and bar charts. Produced aqi_cdi.csv file. 
- bar_charts.ipynb: initial visualizations of bar charts for exploratory purpose.

### Visualization code: (housed in the Dashboard folder)

- visualization_code.js: includes javascript code to populate our visualizations.
- state_data.js: defines the polygon boundries for each state.
- index.html: includes the html code for our visualization.

### Additional Javascript library:

- D3 Linear Regression Package: https://unpkg.com/d3-regression@1.3.10/dist/d3-regression.min.js

## Instructions on how to use and interact with the project

### Dashboard Link: 

- (https://handro4.github.io/Project-3---Group-6/Dashboard/index.html)

### Map: 

- Displays the max average readings per state, color coordinates according to the AQI index score. 
- Toggle the air pollutant options on the top right legend box of the map.
- Toggle on/off site locations to show where data was collected
- Click on individual states to display parameter readings for the state.
- Color scale is located on the lower left hand corner of the dashboard to indicate what each color means. 

### Scatterplot: 

- Displays chronic disease rate/prevalence (x-axis), against the air pollutant reading (y-axis) by state.
- Performs the linear regression and displays the R-squared value for each relationship. 
- Toggle the 'Topic' and 'Parameter' dropdown menus to select the disease and air pollutant readings to visualize on the scatter plot respectivley.
- Hover over each dot for state readings and values.

### Bar Chart:

- Displays the Top 5 highest polluted states by parameter and their chronic disease rate/prevalence along the x-axis (bars).
- Toggle the 'Topic' and 'Parameter' dropdown menus to select the disease and air pollutant readings to visualize on the scatter plot respectivley.
- Hover over bars to see individual state values. 

## At least one paragraph summarizing efforts for ethical considerations made in the project

- The data we used was only for the year 2020 for both chronic disease rates/prevalence (CDI Dataset) and air pollutant readings (EPA AQS Dataset) which was the lastest data collected. 
- Alaska, Nebraska, West Virginia, and South Carolina were ommited due to incomplete reading data in 2020.
- We chose to only analyze the rates of Asthma, Cardiovascular Disease, and COPD which appear to be the diseases most (in theory) affected by air pollution in the given chronic disease options displayed in the CDI Dataset.
- We chose to analyze readings for (Ozone, PM 2.5, CO, NO2, SO2) pollutants out of 8 total options, which can affect high risk individuals with our given chronic diseases.

## References for the data source(s):

- US CDI
  - https://catalog.data.gov/dataset/u-s-chronic-disease-indicators-cdi
    - This file was too large to store in github so we stored it in a google drive that should be publicly accessible (https://drive.google.com/file/d/16nbTaSTGDQNUv8J8JDMr_5unkdYlr2dU/view?usp=sharing)
- Visualization tool
    - https://nccd.cdc.gov/cdi/rdPage.aspx?rdReport=DPH_CDI.ExploreByTopic&islClass=&islTopic=ALC&islYear=
- US Environmental Protection Agency: Air Quality System (AQS) API
  - https://aqs.epa.gov/aqsweb/documents/data_api.html

## References for any code used that is not your own

- We used Chloropleth to plot our map and used a tutorial that highlighted the states in a certain color based on our data
    - https://leafletjs.com/examples/choropleth/
- ChatGPT was used to help us troubleshoot our code when we ran into issues
    - https://chat.openai.com/
- Choropleth documentation
    - https://leafletjs.com/examples/choropleth/
- Linear Regression Package
    - https://unpkg.com/d3-regression@1.3.10/dist/d3-regression.min.js
- Airnow Air Quality Index
    - https://www.airnow.gov/education/students/what-is-the-aqi/
