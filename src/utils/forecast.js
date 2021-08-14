const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ddfbc904c6c47e8aa876d7f0a1f53485&query=' + latitude + ',' + longitude
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("There is a Problem with connecting to the Weather Server!", undefined)
        } else if (response.body.error) {
            callback("unable to find the location", undefined)
        } else {
            const {temperature, feelslike, weather_descriptions} = response.body.current
            callback(undefined, {
                temperature,
                feelslike,
                weatherDescription: weather_descriptions[0],
                localTime: response.body.location.localtime
            })
        }
    })

}

module.exports = forecast
