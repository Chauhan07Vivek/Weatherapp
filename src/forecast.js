const request = require('request')
const forecast = (lat,long,callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(lat)+'&lon='+encodeURIComponent(long)+'&units=metric&exclude=hourly&appid=0dbc7179cdda5c110eae148b5c7d2b63'

    request({url, json:true},(error,response) =>{
        if(error){
            callback('unable to connect to '+error.hostname+', error code:'+error.code,undefined)
        }else if(response.body.cod){
            callback('unable to find location\n error:'+response.body.message,undefined)
        }else{
            callback(undefined,{
                temp: response.body.current.temp,
                humidity: response.body.current.humidity,
                feels_like: response.body.current.feels_like,
                pressure: response.body.current.pressure,
                dew_point: response.body.current.dew_point,
                uvi: response.body.current.uvi,
                clouds:response.body.current.clouds,
                wind_speed : response.body.current.wind_speed,
                summary :  response.body.current.weather[0].description, 

            })
        }
    })
}
module.exports = forecast