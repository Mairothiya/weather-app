// const request = require('request')

// const geocode = (address , callback) =>{
//     const url ="https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWFpcm90aGl5YSIsImEiOiJja2V4MTBja2wzbmpsMnptcW80enRoazNpIn0.NKMQ8C3yQhn4kt6TlJKSJw&limit=1"
// //https://api.mapbox.com/geocoding/v5/mapbox.places/agra.json?access_token=pk.eyJ1IjoibWFpcm90aGl5YSIsImEiOiJja2V4MTBja2wzbmpsMnptcW80enRoazNpIn0.NKMQ8C3yQhn4kt6TlJKSJw&limit=1
//     request({ url: url , json: true}, (error , response) =>
//     {
//         if(error){
//             callback('Unable to connect service!', undefined)
//         }else if(error,response.body.features.length === 0){
//             callback('Unable to find Location!!! Try again with the new search.',undefined)
//         }else{
//             callback(undefined , ({
//                 latitude : response.body.features[0].center[1],
//                 longitude : response.body.features[0].center[0],
//                 location :  response.body.features[0].place_name,
//             }))
//         }
//     })
// }

// module.exports = geocode


  
const request = require('request')

const geocode = (address,callback) =>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoibWFpcm90aGl5YSIsImEiOiJja2V4MTBja2wzbmpsMnptcW80enRoazNpIn0.NKMQ8C3yQhn4kt6TlJKSJw&limit=1"   
    // const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoibWloaXJzYWhhaSIsImEiOiJja2QwbXJhYmgwdjZrMzFwZ3RzMmt5djZnIn0.5gmNZ7vYGdWjIDrpsi2hTQ&limit=1"
    
    request({url,json:true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to location service', undefined)
        }
        else if(body.features.length===0)
        {
            callback('Unable to find location.',undefined)
        }
        else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode