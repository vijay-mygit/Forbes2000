function heat_map(){
    var url = 'http://127.0.0.1:5000/companies'

    // Please enter your Mapbox API key in the config.js file before you proceed.
    L.mapbox.accessToken = API_KEY
       
// The heatmap with assets
    var myMap2 = L.mapbox.map('heat-map2').setView([0,10],2)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/dark-v10'));


    fetch(url).then(response => response.json()).then(data=>{
                console.log (data);        
                    
                var heatData = [];
                    for (var i=0; i<data.length; i++) {
                        heatData.push( [ data[i]['Latitude'], data[i]['Longitude'],data[i]['Revenue']] );
                    }
                console.log (heatData);
                var heat = L.heatLayer(heatData, {radius:25}).addTo(myMap2);
    });
}

heat_map();
