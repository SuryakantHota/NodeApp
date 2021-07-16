const request = require("request");

const geoCodeAddress = ( address, cb ) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic3VyeWFrYW50MSIsImEiOiJja3IwcmhjZGIwMGY5MzFwdDloeWFmNWdqIn0.LvzZmqvTu_ykPBoG3e5ioA&limit=1";

    request({   
        url: url,
        json: true
    }, ( error, response ) => {
        if ( error ) {
            cb("Unable to connect to location services !", undefined);
        } else if ( response && response.body && response.body.features.length === 0 ) {
            cb("Unable to find location, try another search", undefined);
        } else {
            const {body} = response;
            cb(undefined, {
                lat: body.features[0]["center"][1],
                lng: body.features[0]["center"][0],
                location: body.features[0]["place_name"]
            });
        }
    });
}

const getCurrentWeather = ( query, cb) => {
    const url = "http://api.weatherstack.com/current?access_key=e41ab35f82b9b331370b405337ae4bd0&query=" + encodeURIComponent(query);

    request({ 
        url: url,
        json: true
    }, ( error, response ) => {
        if ( error ) {
            cb("Unable to connect to weather service !", undefined);
        } else if ( !response.body || !response.body.current ) {
            cb("Unable to get weather condition, try another", undefined);
        } else {
            const {body} = response;
            cb(undefined, {
                "description": body.current.weather_descriptions[0],
                "temperature": body.current.temperature,
                "feelsLike": body.current.feelsLike
            });
        }
    });
}

module.exports = {
    geoCodeAddress,
    getCurrentWeather
};