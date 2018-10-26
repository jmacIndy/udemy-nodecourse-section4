const request = require('request');

var geocodeAddress = (address, callback) => {

    const lookupAddress = encodeURIComponent(address);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=AnbVZxxBp8MCMGNvSYkqgxToZ6j2dOks&location=${lookupAddress}`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to MapQuest servers');
        } else if (body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
            callback('Unable to find that address');
        } else if (body.info.statuscode === 0) {

            const street = body.results[0].locations[0].street;
            const city = body.results[0].locations[0].adminArea5;
            const state = body.results[0].locations[0].adminArea3;
            const zip = body.results[0].locations[0].postalCode;
            const country = body.results[0].locations[0].adminArea1;

            callback(undefined, {
                address: `${street}, ${city}, ${state}, ${zip}, ${country}`,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
        }  
    });
};

module.exports = {
    geocodeAddress
};
