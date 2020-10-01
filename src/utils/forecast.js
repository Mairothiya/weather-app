const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=23552a60ccd6eaa66b0c10ad0fc63d2c&query='+latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect Service!',undefined)
        }else if(body.error){
            callback('Unable to find location!! Try again with the new search',undefined)
        }else {
            callback(undefined,'It is currently'+ body.current.weather_descriptions[0] + '. It feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast
