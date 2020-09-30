const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=37b89f72bc071dc5d13623a69d9bb0e2&query='+latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,`it is currently ${body.current.temperature} degs out & it feels like ${body.current.feelslike} degs out and humidity is ${body.current.humidity}%`)
        }
    })
}

module.exports = forecast
