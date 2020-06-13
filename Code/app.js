
// Return an Array of profit
function buildProfits(country, data) {

    return country == '' ? data.map(item => item.Profits) :
        data.filter(item => item.Country == country).map(item => item.Profits);
};

// Return an Array of revenue
function buildRevenues(country, data) {

    return country == '' ? data.map(item => item.Revenue) :
        data.filter(item => item.Country == country).map(item => item.Revenue)
};

// Return an Array of MarketCap
function buildMarketCap(country, data) {

    return country == '' ? data.map(item => item.MarketValue) :
        data.filter(item => item.Country == country).map(item => item.MarketValue)
};

// Return an Array of Companies
function getCompanies(country, data) {

    return country == '' ? data.map(item => item.Company) :
        data.filter(item => item.Country == country).map(item => item.Company)
};

// Return an Object containing No. of companies per sector
// function getCompaniesPerSector(country, data) {
//     var filteredData = country == '' ? data : data.filter(item => item.Country == country);

//     // declare variable to hold counts per sector
//     var sectorCounts = {};
//     var sector;

//     filteredData.forEach(item => {
//         sector = item.Sector;

//         if (sector in sectorCounts) {
//             sectorCounts[sector] += 1;
//         }
//         else if (sector == null) { }
//         else {
//             sectorCounts[sector] = 1;
//         };
//     });

//     return sectorCounts;
// };

// Return an Array of Sectors
function getSectors(country, data) {

    return country == '' ? data.map(item => item.Sector) :
        data.filter(item => item.Country == country).map(item => item.Sector);
};

function getCountryData(country, data) {
    return country == '' ? data.map(item => item) :
        data.filter(item => item.Country == country).map(item => item);
};

// Function for Scatter plots
function plotScatterForProfits(country, data) {
    // Call functions to get profits,revenues and marketcap arrays
    var profits = buildProfits(country, data);
    var revenues = buildRevenues(country, data);
    var marketCap = buildMarketCap(country, data);
    var companies = getCompanies(country, data);

    // Build the plot
    var trace1 = {
        x: profits,
        y: revenues,
        mode: 'markers',
        type: 'scatter',
        text: companies
    };

    var data = [trace1];

    var layout = {
        title: 'Profit vs Revenue',
        xaxis: {
            title: 'Profit(in billions)'
        },
        yaxis: {
            title: 'Revenue(in billions)'
        }
    };

    Plotly.newPlot('scatter1', data, layout);

    // Build the plot
    var trace1 = {
        x: profits,
        y: marketCap,
        mode: 'markers',
        type: 'scatter',
        text: companies
    };

    var data = [trace1];

    var layout = {
        title: 'Profit vs MarketCap',
        xaxis: {
            title: 'Profit(in billions)'
        },
        yaxis: {
            title: 'MarketCap(in billions)'
        }
    };

    Plotly.newPlot('scatter2', data, layout);

};

// Function for Histogram
function plotHist(country, data) {
    var sectors = getSectors(country, data);

    var trace1 = {
        histfunc: "count",
        x: sectors,
        type: 'histogram'
    };

    var data = [trace1];

    var layout = {
        title: 'No. of Companies in each Sector',
        xaxis: {
            title: 'Sector',
            automargin: true
        },
        yaxis: {
            title: 'Count'
        }
    };

    Plotly.newPlot('histogram', data, layout);
};

// Function to generate heatmap
// function heat_map(json) {

//     L.mapbox.accessToken = API_KEY;

//     var myMap = L.mapbox.map('map').setView([0, 0], 1)
//         .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

//     var markers = L.markerClusterGroup();

//     for (var i = 0; i < json.length; i++) {
//         var a = json[i];
//         var title = a['Company']

//         var marker = L.marker(new L.LatLng(a['Latitude'], a['Longitude']), {
//             icon: L.mapbox.marker.icon({ 'marker-symbol': 'post', 'marker-color': '0044FF' }),
//             title: title
//         });

//         marker.bindPopup(title);
//         markers.addLayer(marker);
//     }

//     myMap.addLayer(markers);

//     // The heatmap with assets
//     var myMap2 = L.mapbox.map('heat-map').setView([0, 0], 1)
//         .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/light-v10'));

//     var heatData = [];
//     for (var i = 0; i < json.length; i++) {
//         heatData.push([json[i]['Latitude'], json[i]['Longitude'], json[i]['Assets']]);
//     }

//     var heat = L.heatLayer(heatData, { radius: 20 }).addTo(myMap2);
// };

function plotTopCompanies(country, data) {
    var json = getCountryData(country, data);

    json.forEach(function (row) {
        row.Profits = +row.Profits;
        row.MarketValue = +row.MarketValue;
        row.Revenue = +row.Revenue;
        row.Assets = +row.Assets;
        row.Rank = +row.Rank;
    });

    var top10 = json.slice(0, 10)//.reverse()

    pyvalues = top10.map(d => d.Profits)
    myvalues = top10.map(d => d.MarketValue)
    ayvalues = top10.map(d => d.Assets)
    ryvalues = top10.map(d => d.Revenue)
    xvalues = top10.map(d => d.Company)

    //Bar Plot
    var trace = {
        x: xvalues,
        y: pyvalues,
        //text : text,
        name: "Profits ($B)",
        type: "bar",
        //orientation : "h",
        marker: {
            color: "Blue",
            opacity: 0.8
        }
    }
    var trace1 = {
        x: xvalues,
        y: ryvalues,
        name: "Revenues ($B)",
        type: "bar",
        marker: {
            color: "Red",
            opacity: 0.8
        }
    }

    var layout = {
        title: "Top 10 Rankings",
        automargin: true,
        barmode: "group",
        xaxis: {
            autotick: true,
            ticks: 'outside',
            tick0: 0,
            tickangle: -45,
            tickfont: {
                family: 'Berlin Sans FB',
                size: 14
            },
            automargin: true
        },
        yaxis: {
            ticks: 'outside',
            tick0: 0,
            automargin: true
        }
    };

    var data = [trace, trace1]
    Plotly.newPlot("bar", data, layout);

    //Line Chart
    var trace2 = {
        type: "scatter",
        x: xvalues,
        y: ayvalues,
        mode: "lines",
        name: "Assests ($B)",
        line: {
            color: "OrangeRed",
            width: 4
        }
    };

    var trace3 = {
        type: "scatter",
        x: xvalues,
        y: myvalues,
        mode: "lines",
        name: "Market Capitalisation ($B)",
        line: {
            color: "Green",
            width: 1
        }
    };

    var layout1 = {
        title: "Top 10 Rankings",
        xaxis: {
            tick0: 0,
            tickangle: -45,
            tickfont: {
                family: 'Berlin Sans FB',
                size: 14
            },
            automargin: true
        },
        yaxis: {
            ticks: 'outside',
            tick0: 0,
            automargin: true
        }
    };

    var data1 = [trace2, trace3]
    Plotly.newPlot("gauge", data1, layout1);

    metaData = json[0]

    var meta_info = d3.select("#sample-metadata")
    meta_info.html("<h5><strong> Company : </strong>" + json[0].Company + "<br>" +
        "<strong> Market Value : </strong>" + json[0].MarketValue + "<br>" +
        "<strong> Profits : </strong>" + json[0].Profits + "<br>" +
        "<strong> Assets : </strong>" + json[0].Assets + "<br>" +
        "<strong> Revenue : </strong>" + json[0].Revenue + "<br>" +
        "<strong> Overall Rank : </strong>" + json[0].Rank + "<br>" +
        "<strong> Sector : </strong>" + json[0].Sector + "<br>" +
        "<strong> CEO : </strong>" + json[0].CEO)
};

// Function ot handle the change in drop down selection
function optionChanged(val) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            // Call function to build scatter plots
            if (val == 'World') {
                val = ''
            };

            plotScatterForProfits(val, json);
            plotHist(val, json);
            plotTopCompanies(val, json);
            // heat_map(json);
        });
};

function init() {

    // Call the flask API to retrieve the JSON data
    fetch(url)
        .then(response => response.json())
        .then(json => {

            // Fetch countries to be used in the drop down
            // var arrCountries = ['World'];
            var arrCountries = json.map(item => item.Country);

            var arrUniqueCountries = arrCountries.filter(function (item, pos) {
                return arrCountries.indexOf(item) == pos;
            }).sort();

            // Add World to Unique countries list
            arrUniqueCountries.splice(0, 0, 'World');

            // Add the countries to the drop down

            var options = selObj.selectAll("option")
                .data(arrUniqueCountries) // Array of individual IDs
                .enter() // Used when the joined array is longer than the selection
                .append("option")
                .attr('value', (v => v))
                .text((t => t));

            // Fetch country for the default plot
            // var country = arrUniqueCountries[0];
            var country = '';

            // Call function to build scatter plots
            plotScatterForProfits(country, json);
            plotHist(country, json);
            plotTopCompanies(country, json);
            // heat_map(json);
        });

};

const url = 'http://127.0.0.1:5000/companies';

// Select the dropdown object
var selObj = d3.select('#selDataset');

init();