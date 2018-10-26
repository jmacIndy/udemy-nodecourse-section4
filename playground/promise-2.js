const request = require('request');

var geocodeAddress = (address) => {

    return new Promise((resolve, reject) => {

        const lookupAddress = encodeURIComponent(address);

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=AnbVZxxBp8MCMGNvSYkqgxToZ6j2dOks&location=${lookupAddress}`,
            json: true
        }, (error, response, body) => {

            if (error) {
                reject('Unable to connect to MapQuest servers');
            } else if (body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
                reject('Unable to find that address');
            } else if (body.info.statuscode === 0) {

                const street = body.results[0].locations[0].street;
                const city = body.results[0].locations[0].adminArea5;
                const state = body.results[0].locations[0].adminArea3;
                const zip = body.results[0].locations[0].postalCode;
                const country = body.results[0].locations[0].adminArea1;

                resolve({
                    address: `${street}, ${city}, ${state}, ${zip}, ${country}`,
                    latitude: body.results[0].locations[0].latLng.lat,
                    longitude: body.results[0].locations[0].latLng.lng
                });
            }  
        });

    });
};

geocodeAddress('46151').then((location) => {
    console.log(JSON.stringify(location, undefined, 4));
}, (errorMessage) => {
    console.log(errorMessage);
});
