d3.csv("Resources/aqi_csv").then(function(data) {
    

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


    // Define overlay maps
    let overlayMaps = {
        "CO Readings": co_geojson, 
        "NO2 Readings": no2_geojson,
        "Ozone Readings": ozone_geojson, 
        "PM 2.5 Readings": pm_2_5_geojson, 
        "SO2 Readings": so2_geojson
    };

    // Makes it so that you can only select one parameter at once
    let exclusiveGroup = {
        "Air Quality Parameters": [co_geojson, no2_geojson, ozone_geojson, pm_2_5_geojson, so2_geojson]
    };

    // Add a control panel to toggle on and off AQI layers
    L.control.layers(overlayMaps, null, {collapsed: false, exclusiveGroups: exclusiveGroup}).addTo(map);


}); // CSV datacall 