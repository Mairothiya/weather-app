const path =require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 4000

// define path for express config.
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Piyush Gupta'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Piyush Gupta'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        helptext: 'this is some helpful text',
        title: 'Want Help',
        name: 'Piyush Gupta'
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title: "404",
        name: "Piyush Gupta",
        errormessage: "404 page not found"
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error : 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude,location} = {}) =>{
        if(error){
        return res.send({error})
        }

        forecast(latitude,longitude, (error,forecastData) => {
            if(error){
            return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })
})
 
app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error : 'you must provide a search item'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title: "404",
        name: "Piyush Gupta",
        errorMessage: "404 page not found"
    })
})

app.listen(port, () =>{
    console.log('Server is on port '+ port)
})
