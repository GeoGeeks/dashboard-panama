// var DataFrame = dfjs.DataFrame;
// // var myData;
// //
// // function getEarthquakeData () {
// //
// //     var earthquakes;
// //
// //     DataFrame.fromCSV('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
// //         .then(df => { callback(df) });
// //
// //     // console.log(earthquakes);
// // }
// //
// // function callback(data) {
// //     myData = data;
// // }
// //
// // getEarthquakeData();
// // console.log(myData);


var DataFrame = dfjs.DataFrame;

// var promises = [];
//
//
//     DataFrame.fromCSV('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv')
//         .then(df => { promises.push(df) });



function getData () {

    promises = [];

    promises.push(DataFrame.fromCSV('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv'));
    promises.push(DataFrame.fromCSV('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.csv'));

    return Promise.all(promises)
}

getData()
    .then(arrs => {
        console.log(arrs[0]);
    });


