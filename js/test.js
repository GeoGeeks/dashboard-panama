// define options
const options = {

    // Required: API key
    key: 'Hda2XFeROn7NWhHDEDWyoJqAdlTeiGO4',

    // Optional: Initial state of the map
    lat: 8.918,
    lon: -79.409,
    zoom: 8,
};

// Initialize Windy API
windyInit( options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const  { map }  = windyAPI;
    // .map is instance of Leaflet map


    var DataFrame = dfjs.DataFrame;

// bbox
    var left = -82.9657830472 - 2,
        bottom = 7.2205414901 - 2,
        right = -77.2425664944 + 2,
        top = 9.61161001224 + 2;

    var test;

    DataFrame.fromCSV('http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
        .then(df => {
            console.log(df);
            var df_pa;

            test = df;

            df_pa = df.filter(row => row.get('longitude') >= left && row.get('longitude') <= right);
            df_pa = df_pa.filter(row => row.get('latitude') >= bottom && row.get('latitude') <= top);
            console.log(df_pa);

            df_pa.map(row => {

                // obtener coordenadas (longitud y latitud)
                const x = row.get('longitude');
                const y = row.get('latitude');

                marker = L.marker([y, x])
                    .addTo(map);

                var popUpTemplate = `
                    Hello, World!
                `;

                marker.bindPopup(popUpTemplate);

            });
        });


});

