const request = require('request');

var getWeather = (latitude, longitude, callback) => {

    request({
        url: `https://api.forecast.io/forecast/ee75b441c7398af58aff79fe24715ebc/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {

        if (error) {
            callback('Unable to connect to forecast.io servers');
        } else if (response.statusCode === 404) {
            callback('Unable to fetch weather');
        }
        else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};

module.exports = {
    getWeather
};
