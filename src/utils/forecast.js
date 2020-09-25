const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=23552a60ccd6eaa66b0c10ad0fc63d2c&query='+latitude + ',' + longitude + '&units=f'

    request({url, json: true}, (error, { body }) => {
        if(error){
            console.log('Unable to connect Service!',undefined)
        }else if(body.error){
            console.log('Unable to find location!! try again with thw new search',undefined)
        }else {
            console.log(undefined,'it is currently'+ body.current.weather_descriptions[0] + '. it feels like ' + body.current.feelslike)
        }
    })
}

module.exports = forecast