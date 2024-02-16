d3.csv("aqi_csv").then(function (data) {
    console.log(data)
    let features = statesData.features.map(feature => {
        let stateData = data.filter(state => state["State Name"] == feature.properties.name)
        if (stateData.length > 0) {
            feature.properties.CO = stateData[0].CO;
            feature.properties.Ozone = stateData[0].Ozone;
            feature.properties.NO2 = stateData[0].NO2;
            feature.properties.SO2 = stateData[0].SO2;
            feature.properties["PM 2.5"] = stateData[0]["PM 2.5"];
        }
        return feature

        
    })
    statesData.features = features;
    console.log(statesData)
    
    
    const map = L.map('map', {
        center: [37.8, -96], 
        zoom: 4, 
        //layers: [tiles, co_geojson, no2_geojson, ozone_geojson, pm_2_5_geojson, so2_geojson]

    });

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // control that shows state info on hover
    const info = L.control();

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        const contents = props ? `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>` : 'Hover over a state';
        this._div.innerHTML = `<h4>Pollutant Data</h4>${contents}`;
    };

    info.addTo(map);


    // get color depending on population density value
    function getColor(d, type) {
        //let stateData = data.filter(state => state["State Name"] == d)
        if (type == "co") {
            let myValue = -1
            if (d.CO) {
                myValue = parseFloat(d.CO);
            }
            return myValue > 30.5 ? '#7D0425' :
                myValue > 15.5 ? '#8D4295' :
                    myValue > 12.5 ? '#FB0D1C' :
                        myValue > 9.5 ? '#FE7E23' :
                            myValue > 4.5 ? '#FFFD38' :
                                myValue > 0 ? '#24E228' : '#9E9E9E';

        }
        else if (type == "no2") {
            let myValue = -1
            if (d.NO2) {
                myValue = parseFloat(d.NO2);
            }
            return myValue > 1250 ? '#7D0425' :
                myValue > 650 ? '#8D4295' :
                    myValue > 361 ? '#FB0D1C' :
                        myValue > 101 ? '#FE7E23' :
                            myValue > 54 ? '#FFFD38' :
                                myValue > 0 ? '#24E228' : '#9E9E9E';

        }
        else if (type == "ozone") {
            let myValue = -1
            if (d.Ozone) {
                myValue = parseFloat(d.Ozone);
            }
            return myValue > 0.405 ? '#7D0425' :
                myValue > 0.205 ? '#8D4295' :
                    myValue > 0.165 ? '#FB0D1C' :
                        myValue > 0.125 ? '#FE7E23' :
                            myValue > .055 ? '#FFFD38' :
                                myValue > 0 ? '#24E228' : '#9E9E9E';

        }
        else if (type == "PM 2.5") {
            let myValue = -1
            if (d["PM 2.5"]) {
                myValue = parseFloat(d["PM 2.5"]);
            }
            return myValue > 250.5 ? '#7D0425' :
                myValue > 150.5 ? '#8D4295' :
                    myValue > 55.5 ? '#FB0D1C' :
                        myValue > 35.5 ? '#FE7E23' :
                            myValue > 12.1 ? '#FFFD38' :
                                myValue > 0 ? '#24E228' : '#9E9E9E';

        }
        else if (type == "so2") {
            let myValue = -1
            if (d.SO2) {
                myValue = parseFloat(d.SO2);
            }
            return myValue > 605 ? '#7D0425' :
                myValue > 305 ? '#8D4295' :
                    myValue > 186 ? '#FB0D1C' :
                        myValue > 76 ? '#FE7E23' :
                            myValue > 36 ? '#FFFD38' :
                                myValue > 0 ? '#24E228' : '#9E9E9E';

        }

    }
    function style(feature, type) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColor(feature, type)
        };
    }

    function highlightFeature(e) {
        const layer = e.target;

        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '',
            fillOpacity: 0.7
        });

        layer.bringToFront();

        info.update(layer.feature.properties);
    }

    /* global statesData */
    const co_geojson = L.geoJson(statesData, {
        style: function (feature) {
            return style(feature, "co")
        },
        onEachFeature
    }).bindPopup(function (layer) {
        return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max CO Value: ${layer.feature.properties.CO}</h3>`;
    }).addTo(map)
    const no2_geojson = L.geoJson(statesData, {
        style: function (feature) {
            return style(feature, "no2")
        },
        onEachFeature
    }).bindPopup(function (layer) {
        return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max NO2 Value: ${layer.feature.properties.NO2}</h3>`;
    }).addTo(map);

    const ozone_geojson = L.geoJson(statesData, {
        style: function (feature) {
            return style(feature, "Ozone")
        },
        onEachFeature
    }).bindPopup(function (layer) {
        return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max Ozone Value: ${layer.feature.properties.Ozone}</h3>`;
    }).addTo(map);

    const pm_2_5_geojson = L.geoJson(statesData, {
        style: function (feature) {
            return style(feature, "PM 2.5")
        },
        onEachFeature
    }).bindPopup(function (layer) {
        return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max PM 2.5 Value: ${layer.feature.properties["PM 2.5"]}</h3>`;
    }).addTo(map);

    const so2_geojson = L.geoJson(statesData, {
        style: function (feature) {
            return style(feature, "so2")
        },
        onEachFeature
    }).bindPopup(function (layer) {
        return `<h3>State: ${layer.feature.properties.name} <h3><h3>Max SO2 Value: ${layer.feature.properties.SO2}</h3>`;
    }).addTo(map);

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
        info.update();
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function onEachFeature(feature, layer) {
        layer.on({
            //mouseover: highlightFeature,
            //mouseout: resetHighlight,
            //click: zoomToFeature
        });
    }
    let overlayMaps = {
        "CO Readings": co_geojson, 
        "NO2 Readings": no2_geojson,
        "Ozone Readings": ozone_geojson, 
        "PM 2.5 Readings": pm_2_5_geojson, 
        "SO2 Readings": so2_geojson
    };
    L.control.layers(overlayMaps, {
        collapsed: false
      }).addTo(map);

    map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {

        const div = L.DomUtil.create('div', 'info legend');
        const grades = [0, 10, 20, 50, 100, 200, 500, 1000];
        const labels = [];
        let from, to;

        for (let i = 0; i < grades.length; i++) {
            from = grades[i];
            to = grades[i + 1];

            labels.push(`<i style="background:${getColor(from + 1)}"></i> ${from}${to ? `&ndash;${to}` : '+'}`);
        }

        div.innerHTML = labels.join('<br>');
        return div;
    };

    legend.addTo(map);

})