const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .alias('version', 'v')
    .argv;

var lookupAddress = encodeURIComponent(argv.address);

var geocodeUrl =  `http://www.mapquestapi.com/geocoding/v1/address?key=AnbVZxxBp8MCMGNvSYkqgxToZ6j2dOks&location=${lookupAddress}`;

axios.get(geocodeUrl).then((response) => {

    if (response.data.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
        throw new Error('Unable to find that address.');
    }

    var latitude = response.data.results[0].locations[0].latLng.lat;
    var longitude  = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.forecast.io/forecast/ee75b441c7398af58aff79fe24715ebc/${latitude},${longitude}`;

    const street = response.data.results[0].locations[0].street;
    const city = response.data.results[0].locations[0].adminArea5;
    const state = response.data.results[0].locations[0].adminArea3;
    const zip = response.data.results[0].locations[0].postalCode;
    const country = response.data.results[0].locations[0].adminArea1;
    console.log(`${street}, ${city}, ${state}, ${zip}, ${country}`);

    return axios.get(weatherUrl);
}).then((response) => {

    var temperature = response.data.currently.temperature;
    var apparentTemperature =  response.data.currently.apparentTemperature;

    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);

}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});
