var map = L.map('map').setView([8.918, -79.409], 8);
var layer = L.esri.basemapLayer('Topographic').addTo(map);
var layerLabels;

function setBasemap(basemap) {
    if (layer) {
        map.removeLayer(layer);
    }

    layer = L.esri.basemapLayer(basemap);

    map.addLayer(layer);

    if (layerLabels) {
        map.removeLayer(layerLabels);
    }

    if (basemap === 'ShadedRelief'
        || basemap === 'Oceans'
        || basemap === 'Gray'
        || basemap === 'DarkGray'
        || basemap === 'Terrain'
    ) {
        layerLabels = L.esri.basemapLayer(basemap + 'Labels');
        map.addLayer(layerLabels);
    } else if (basemap.includes('Imagery')) {
        layerLabels = L.esri.basemapLayer('ImageryLabels');
        map.addLayer(layerLabels);
    }
}

function changeBasemap(basemaps){
    var basemap = basemaps.value;
    setBasemap(basemap);
}