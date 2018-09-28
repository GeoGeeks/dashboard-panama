require([
    "esri/core/urlUtils",

    "esri/Map",
    "esri/views/MapView",

    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",

    "dojo/domReady!"
], function(
    urlUtils,
    Map, MapView,
    Expand, BasemapGallery
) {

    // Authenticate application
    urlUtils.addProxyRule({
        urlPrefix: "route.arcgis.com", // specify resource location
        proxyUrl: "/sproxy/" // specify location of proxy file
    });

    // Create map
    var map = new Map({
        basemap: "topo"
    });

    // Create view
    var view = new MapView({
        container: "mapDiv",
        map: map,
        zoom: 8,
        center: [-79.409, 8.918],
        constraints: {
            rotationEnabled: false
        }
    });


    // Create Basemap Gallery Widget
    var basemapGallery = new BasemapGallery({
        view: view,
        container: document.createElement("div")
    });

    // Create Expand widget with the previuos widget and add it to the UI
    var bgExpand = new Expand({
        view: view,
        content: basemapGallery
    });
    view.ui.add(bgExpand, "top-right");

});