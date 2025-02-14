const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoidml2ZWsxMDAiLCJhIjoiY2s5cmVuOTdmMGFxYTNncGk5cWx2ZjF1MSJ9.0rrdCQbmCBkeA-G29YDmew&limit=1'

    request({url,json: true},(error,response) => {
        if(error){
            callback('unable to connect to '+error.hostname+', error code: '+error.code, undefined)
        }else if(response.body.features.length ===0){
            callback('No results found try another name', undefined)
        }else{
            callback(undefined,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }

    })
}

module.exports = geocode