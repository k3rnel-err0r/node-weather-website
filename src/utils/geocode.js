const request = require("request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiY29ycHVzcGVjY2F0dW0iLCJhIjoiY2tmNzhvNDcwMDAwODMwbzdyb3pieXQ2ZyJ9.ZllEPRrzfj3H_0Xyo6q9zQ&limit=1`;

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined);
        } else if (body.features.length === 0) {
            callback('Enable to find city. Try another search', undefined);
        } else {
            const [longitude, latitude] = body.features[0].center;
            const location = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geocode;