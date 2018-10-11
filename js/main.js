// Charts ==============================================================================================================
new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
        labels: ["Terremotos", "Incendios", "Huracanes", "Volcanes activos"],
        datasets: [
            {
                label: "Population (millions)",
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: [4, 24, 3, 2]
            }
        ]
    },
    options: {
        legend: { display: false },
        title: {
            display: true,
            text: 'Eventos naturales'
        }
    }
});

// =====================================================================================================================


// Local time ==========================================================================================================
moment.locale('es');

$(document).ready(function() {
    var interval = setInterval(function() {
        var momentNow = moment();
        $('#time').html(momentNow.format('HH:mm'));
        $('#date').html(momentNow.format('LLLL').slice(0, -14))
    }, 100);
});
// =====================================================================================================================


// Map =================================================================================================================

// define options
const options = {

    // Required: API key
    key: 'Hda2XFeROn7NWhHDEDWyoJqAdlTeiGO4',

    // Optional: Initial state of the map
    lat: 8.918,
    lon: -79.409,
    zoom: 6,
};

// Initialize Windy API
windyInit( options, windyAPI => {
    // windyAPI is ready, and contain 'map', 'store',
    // 'picker' and other usefull stuff

    const  { map }  = windyAPI;
    // .map is instance of Leaflet map

    console.log(map);

    var DataFrame = dfjs.DataFrame;

    // bbox
    var left = -82.9657830472 - 2,
        bottom = 7.2205414901 - 2,
        right = -77.2425664944 + 2,
        top = 9.61161001224 + 2;

    var overlayMaps = {};

    function getEarthquakes () {
        DataFrame.fromCSV('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
            .then(df => {
                console.log(df);
                var df_pa;

                df_pa = df.filter(row => row.get('longitude') >= left && row.get('longitude') <= right);
                df_pa = df_pa.filter(row => row.get('latitude') >= bottom && row.get('latitude') <= top);

                var eqArray = [];

                df_pa.map(row => {

                    // template pop up
                    var popUpTemplate = `
                    <div class="earthquake-popup">
                        <span class="bold">Magnitud</span>:   ${row.get('mag')}   <br>
                        <span class="bold">Fecha</span>:      ${row.get('time')}  <br>
                        <span class="bold">Lugar</span>:      ${row.get('place')} <br>
                    </div>
                `;

                    // obtener coordenadas (longitud y latitud)
                    const x = row.get('longitude');
                    const y = row.get('latitude');

                    marker = L.marker([y, x])
                        .bindPopup(popUpTemplate);

                    eqArray.push(marker);
                });

                overlayMaps['Terremotos'] =  L.layerGroup(eqArray);
                console.log(overlayMaps);
                // overlayMaps['Terremotos'].addTo(map);
                L.control.layers(null, overlayMaps).addTo(map);

            });
    }

    getEarthquakes();




});

// =====================================================================================================================

