const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const port  = process.env.PORT || 3000;

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shiva kanyal'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shiva kanyal'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Shiva kanyal'
    })
})

app.get('/weather', (req, res) => {
    
    const address =req.query.address;

    if(!address){
        return res.send({
            error:'you must provide an address...'
        })
    }

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
           return res.send({
                error:'unable to find location try another search...'
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error:'unable to connect...'
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address
            })
        })
    });
})


app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send({
            error:'search field must be provided...'
        })
    }
    res.send({
        procucts:[]
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shiva kanyal',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port);
})