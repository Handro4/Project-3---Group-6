document.addEventListener("DOMContentLoaded", function () {

    d3.csv("../Resources/max_aqi_csv.csv").then(function (data) {


        // Adds the AQI parameters to the States Data document
        let features = statesData.features.map(feature => {

            let stateData = data.filter(state => state["State Name"] == feature.properties.name)

            if (stateData.length > 0) {
                feature.properties.CO = stateData[0].CO;
                feature.properties.Ozone = stateData[0].Ozone;
                feature.properties.NO2 = stateData[0].NO2;
                feature.properties.SO2 = stateData[0].SO2;
                feature.properties["PM 2.5"] = stateData[0]["PM 2.5"];

            } // if statement adding new properties to statesData
            return feature

        }) // Closing bracket for map features function



        // Show that statesData has been updated
        console.log(statesData)

        // Define the map
        let map = L.map('map', {
            center: [37.8, -96],
            zoom: 4
        }); // map variable 

        // Set base map
        let tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        // Color functions take type (meaing the AQI parameter) and a value for that parameter to color the states based on the aqi value given a specific parameter
        function getColor(d, type) {

            let prop = d.properties
            let myValue = -1

            if (type == "CO") {
                // Sets default color to grey if the state doesn't have data
                if (prop.CO) {
                    // changes the parameter value to an integer
                    myValue = parseFloat(prop.CO);
                }


                return myValue > 30.5 ? '#7D0425' :
                    myValue > 15.5 ? '#8D4295' :
                        myValue > 12.5 ? '#FB0D1C' :
                            myValue > 9.5 ? '#FE7E23' :
                                myValue > 4.5 ? '#FFFD38' :
                                    myValue > 0 ? '#24E228' : '#9E9E9E';

            } // co if statement

            else if (type == "NO2") {
                let myValue = -1
                if (prop.NO2) {
                    myValue = parseFloat(prop.NO2);
                }
                return myValue > 1250 ? '#7D0425' :
                    myValue > 650 ? '#8D4295' :
                        myValue > 361 ? '#FB0D1C' :
                            myValue > 101 ? '#FE7E23' :
                                myValue > 54 ? '#FFFD38' :
                                    myValue > 0 ? '#24E228' : '#9E9E9E';

            } //  no2 if statement

            else if (type == "Ozone") {
                let myValue = -1
                if (prop.Ozone) {
                    myValue = parseFloat(prop.Ozone);
                }
                return myValue > 0.405 ? '#7D0425' :
                    myValue > 0.205 ? '#8D4295' :
                        myValue > 0.165 ? '#FB0D1C' :
                            myValue > 0.125 ? '#FE7E23' :
                                myValue > .055 ? '#FFFD38' :
                                    myValue > 0 ? '#24E228' : '#9E9E9E';

            } // ozone if statement

            else if (type == "PM 2.5") {
                let myValue = -1
                if (prop["PM 2.5"]) {
                    myValue = parseFloat(prop["PM 2.5"]);
                }
                return myValue > 250.5 ? '#7D0425' :
                    myValue > 150.5 ? '#8D4295' :
                        myValue > 55.5 ? '#FB0D1C' :
                            myValue > 35.5 ? '#FE7E23' :
                                myValue > 12.1 ? '#FFFD38' :
                                    myValue > 0 ? '#24E228' : '#9E9E9E';

            } // pm 2.5 if statement

            else if (type == "SO2") {
                let myValue = -1
                if (prop.SO2) {
                    myValue = parseFloat(prop.SO2);
                }
                return myValue > 605 ? '#7D0425' :
                    myValue > 305 ? '#8D4295' :
                        myValue > 186 ? '#FB0D1C' :
                            myValue > 76 ? '#FE7E23' :
                                myValue > 36 ? '#FFFD38' :
                                    myValue > 0 ? '#24E228' : '#9E9E9E';

            } // so2 if statement

        }; // getColor function

        // Colors the states
        function style(feature, type) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                fillColor: getColor(feature, type)
            };
        } // style function

        // Function to add the legend
        // Function to generate the legend HTML
        function createLegend() {
            const legend = L.control({ position: 'bottomleft' });

            legend.onAdd = function (map) {
                const div = L.DomUtil.create('div', 'info legend');
                const categories = ["Good", "Moderate", "Unhealthy for Sensitive Groups", "Unhealthy", "Very Unhealthy", "Hazardous"];
                const colors = ['#24E228', '#FFFD38', '#FE7E23', '#FB0D1C', '#8D4295', '#7D0425'];

                let labels = [];
                for (let i = 0; i < categories.length; i++) {
                    labels.push(
                        '<i style="background:' + colors[i] + '"></i> ' +
                        categories[i]
                    );
                }

                div.innerHTML = labels.join('<br>');
                return div;
            };

            return legend;
        }

        // CO Layer
        ///// justchanged this from statesData to features
        let co_geojson = L.geoJson(statesData, {
            style: function (feature) {
                return style(feature, "CO")
            }
        }).bindPopup(function (layer) {
            return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max CO Value: ${layer.feature.properties.CO}</h3>`;
        }).addTo(map)

        // NO2 Layer
        let no2_geojson = L.geoJson(statesData, {
            style: function (feature) {
                return style(feature, "NO2")
            }
        }).bindPopup(function (layer) {
            return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max NO2 Value: ${layer.feature.properties.NO2}</h3>`;
        }).addTo(map);

        // Ozone layer
        let ozone_geojson = L.geoJson(statesData, {
            style: function (feature) {
                return style(feature, "Ozone")
            }
        }).bindPopup(function (layer) {
            return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max Ozone Value: ${layer.feature.properties.Ozone}</h3>`;
        }).addTo(map);

        //PM2.5 Layer
        let pm_2_5_geojson = L.geoJson(statesData, {
            style: function (feature) {
                return style(feature, "PM 2.5")
            }
        }).bindPopup(function (layer) {
            return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max PM 2.5 Value: ${layer.feature.properties["PM 2.5"]}</h3>`;
        }).addTo(map);

        // SO2 Layer
        let so2_geojson = L.geoJson(statesData, {
            style: function (feature) {
                return style(feature, "SO2")
            }
        }).bindPopup(function (layer) {
            return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max SO2 Value: ${layer.feature.properties.SO2}</h3>`;
        }).addTo(map);

        // Call the createLegend function and add the legend to the map
        createLegend().addTo(map);

        // Function to create our markers based on the data
        function createMarkers(response) {
            let siteData = response;
            let siteMarkers = [];

            for (let index = 0; index < siteData.length; index++) {
                let site = siteData[index];
                let latitude = parseFloat(site['Latitude']);
                let longitude = parseFloat(site['Longitude']);

                // Check if latitude and longitude are valid numbers
                if (!isNaN(latitude) && !isNaN(longitude)) {
                    // Create marker only if latitude and longitude are valid
                    let siteMarker = L.circle([latitude, longitude])
                        .bindPopup("<h3>Site Number: " + site['Site Number'] + "</h3><h3>State: " + site['State'] + "</h3>");

                    siteMarkers.push(siteMarker);
                } else {
                    // Log error or handle invalid coordinates
                    console.error("Invalid latitude or longitude:", site['Latitude'], site['Longitude']);
                }
            }

            // Create a layer group with all the markers
            let markersLayer = L.layerGroup(siteMarkers);

            // Define overlay maps
            let overlayMaps = {
                "CO Readings": co_geojson,
                "NO2 Readings": no2_geojson,
                "Ozone Readings": ozone_geojson,
                "PM 2.5 Readings": pm_2_5_geojson,
                "SO2 Readings": so2_geojson,
                "Site Markers": markersLayer
            };

            // Makes it so that you can only select one parameter at once
            let exclusiveGroup = {
                "Air Quality Parameters": [co_geojson, no2_geojson, ozone_geojson, pm_2_5_geojson, so2_geojson]
            };

            // Add a control panel to toggle on and off AQI layers
            L.control.layers(overlayMaps, null, { collapsed: false, exclusiveGroups: exclusiveGroup }).addTo(map);
        }
        // Call the createMarkers function
        d3.json("../Resources/location_json.json").then(createMarkers);

        d3.csv("../Resources/aqi_cdi.csv").then(function (cdi_data) {

            function updatePlots(selectedTopic, selectedParameter) {
                // Filter data based on selected topic and parameter
                let filteredDataBar = cdi_data.filter(d => d.Topic === selectedTopic);

                // // Datavalue Definition
                // let dataDefinition = filteredData.map(d => d.Question)
                // let dataType = filteredData.map(d => d.DataValueType)

                // Sort the filtered data based on the data values in descending order
                filteredDataBar.sort((a, b) => b[selectedParameter] - a[selectedParameter]);

                // Extract x and y values based on selected parameter for the top 5 data points
                let top5Data = filteredDataBar.slice(0, 5).reverse();
                let xValuesBar = top5Data.map(d => d.DataValue);
                let yValuesBar = top5Data.map(d => d['State Name']);
                let dataValueType = top5Data.map(d => d.DataValueType);

                // Create trace for bar plot
                let trace1 = {
                    x: xValuesBar,
                    y: yValuesBar,
                    //text: stateNamesBar.map((state, index) => `State: ${state}<br>${selectedParameter}: ${xValues[index]}<br>DataValue: ${yValues[index]}`),
                    type: 'bar',
                    orientation: 'h'
                };

                // Create plot data array
                let plotDataBar = [trace1];

                // Define layout
                let layoutBar = {
                    title: `<b>Top 5 Polluted States for ${selectedParameter}<b>`,
                    titlefont: {
                        family: 'Arial, sans-serif',
                        size: 20,
                        color: '#333'
                    },
                    xaxis: {
                        title: `<b>${dataValueType[0]}<b>`,
                        titlefont: {
                            family: 'Arial, sans-serif',
                            size: 16,
                            color: '#333',
                            automargin: true
                        }
                    }
                };

                // Plotly function to update the scatter plot
                Plotly.newPlot('bar', plotDataBar, layoutBar);

                // // Function to update scatter plot
                // function updateScatterPlot(selectedTopic, selectedParameter) {

                // Filter data based on selected topic and parameter
                let filteredData = cdi_data.filter(d => d.Topic === selectedTopic);

                // Extract x and y values based on selected parameter
                let xValues = filteredData.map(d => d.DataValue);
                let yValues = filteredData.map(d => d[selectedParameter]);
                let stateNames = filteredData.map(d => d["State Name"]);

                ///// Linear Regression /////
                let linearRegression = d3.regressionLinear()
                    .x((d, i) => xValues[i])
                    .y((d, i) => yValues[i]);

                let regressionLine = linearRegression(filteredData);

                let corrCoefficient = regressionLine.rSquared


                // Create trace for scatter plot
                let trace2 = {
                    x: xValues,
                    y: yValues,
                    mode: 'markers',
                    type: 'scatter',
                    marker: { size: 8 },
                    hoverinfo: 'text',
                    text: stateNames.map((state, index) => `State: ${state}<br>${selectedParameter}: ${yValues[index]}<br>DataValue: ${xValues[index]}`),
                    name: "State"
                };

                let regressionTrace = {
                    x: regressionLine.map(d => d[0]),
                    y: regressionLine.map(d => d[1]),
                    mode: 'lines',
                    type: 'scatter',
                    line: {
                        color: 'red',
                        width: 2
                    },
                    name: 'Regression Line'
                }

                // Create plot data array
                let plotData = [trace2, regressionTrace];

                let annotation = {
                    x: 0.10,
                    y: 0.85,
                    xref: 'paper',
                    yref: 'paper',
                    text: `<b>R: ${corrCoefficient.toFixed(2)}<b>`,
                    showarrow: false,
                    font: {
                        size: 18,
                        color: 'black'
                    }
                }

                // Datavalue Definition
                let dataDefinition = filteredData.map(d => d.Question)
                let dataType = filteredData.map(d => d.DataValueType)
                // Define layout
                let layout = {
                    title: `<b>Effect of ${selectedParameter} on ${selectedTopic} Prevalence<b>`,
                    titlefont: {
                        family: 'Arial, sans-serif',
                        size: 20,
                        color: '#333'
                    },
                    xaxis: {
                        title: `<b>${dataDefinition[0]} <br> ${dataType[0]} <br> <br><b>`,
                        titlefont: {
                            family: 'Arial, sans-serif',
                            size: 16,
                            color: '#333',
                            automargin: true
                        },
                        tickfont: {
                            family: 'Arial, sans-serif',
                            size: 11,
                            color: '#333'
                        }
                    },
                    yaxis: {
                        title: `<b> ${selectedParameter} </b>`,
                        titlefont: {
                            family: 'Arial, sans-serif',
                            size: 16,
                            color: '#333',
                            automargin: true
                        },
                        tickfont: {
                            family: 'Arial, sans-serif',
                            size: 11,
                            color: '#333'
                        }
                    },
                    textAlign: 'center',
                    annotations: [annotation]
                };

                // Plotly function to update the scatter plot
                Plotly.newPlot('scatterPlot', plotData, layout);
            }
            // Print data to console to review
            console.log(cdi_data)
            // Set variable for the dropdown menus and to hold the data were looking for
            let topicDropdown = d3.select("#topicDropdown");
            let parameterDropdown = d3.select("#parameterDropdown");
            //Extract unique topics and parameters
            let uniqueTopics = ['Asthma', 'Cardiovascular Disease', 'Chronic Obstructive Pulmonary Disease'];
            let uniqueParameters = ['Ozone', 'NO2', 'SO2', 'CO', 'PM 2.5'];
            // Populate dropdowns with necessary data
            uniqueTopics.forEach((topic, index) => {
                topicDropdown.append("option").text(topic).property("value", topic);
                if (index === 0) { // Select the first topic by default
                    topicDropdown.property("value", topic);
                }
            });
            uniqueParameters.forEach((parameter, index) => {
                parameterDropdown.append("option").text(parameter).property("value", parameter);
                if (index === 0) { // Select the first parameter by default
                    parameterDropdown.property("value", parameter);
                }
            });


            // Event handler for topic dropdown change
            topicDropdown.on("change", function () {
                let selectedTopic = this.value;//topicDropdown.property("this.value");
                let selectedParameter = parameterDropdown.property("value");
                updatePlots(selectedTopic, selectedParameter);
                //updateBarPlot(selectedTopic, selectedParameter);
            });

            // Event handler for parameter dropdown change
            parameterDropdown.on("change", function () {
                let selectedTopic = topicDropdown.property("value");
                let selectedParameter = this.value;
                updatePlots(selectedTopic, selectedParameter);
                //updateBarPlot(selectedTopic, selectedParameter);
            });


            // Initial plots
            updatePlots(uniqueTopics[0], uniqueParameters[0]);
        });
    });

});