const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f0de032f1080c51aeb7673bbc8873aad&query=${latitude},${longitude}&units=m`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather', undefined)
        } else if (body.error) {
            callback(undefined, 'Unable to find location');
        } else {
            const {
                temperature,
                weather_descriptions,
                precip
            } = body.current;
            callback(undefined, `${weather_descriptions}. It is currently ${temperature} degress out. There is ${precip}% chance of rain.`, );
        }
    });
}

module.exports = forecast;