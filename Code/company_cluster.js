function cluster_map(){
    var url = 'http://127.0.0.1:5000/companies'

    // Please enter your Mapbox API key in the config.js file before you proceed.
    L.mapbox.accessToken = API_KEY

    var myMap = L.mapbox.map('map').setView([0,0],1)
        .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11')); //.fitWorld();


//The cluster map with company names
    fetch(url).then(response => response.json()).then(json => {

        console.log(json);
        var markers = L.markerClusterGroup();

        for (var i = 0; i < json.length; i++) {
            var a = json[i];
            var title = a['Company']
                    
            
            var marker = L.marker(new L.LatLng(a['Latitude'], a['Longitude']), {
                icon: L.mapbox.marker.icon({'marker-symbol': 'post', 'marker-color': '0044FF'}),
                title: title
            });
            
            marker.bindPopup(title);
            markers.addLayer(marker);
        }

        myMap.addLayer(markers);
    });
}

cluster_map();