const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()

// config Path Directories
const viewsPathDirectory = path.join(__dirname, '../Templates/views')
const partialPathDirectory = path.join(__dirname, '../Templates/partials')
const publicPathDirectory = path.join(__dirname, './Public')

//config hbs Directories
app.set('view engine', 'hbs')
app.set('views', viewsPathDirectory)
hbs.registerPartials(partialPathDirectory)

app.use(express.static(publicPathDirectory))

// app.get('', (req,res) => {
//     res.send("Home Page")
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ali Alaeian'
    })
})

app.get('/about', (req, res) => {
        res.render('about', {
            title: 'About us',
            name: 'Ali Alaeian'
        })
    }
)

app.get('/Help', (req, res) => {
    res.render('help', {
        HelpText: 'This is some Help',
        title: 'Help',
        name: 'Ali Alaeian'
    })
})



app.get('/weather', (req, res) => {


    if (!req.query.address) {
        return res.send ({
            error: 'You should provide an address.'
        })
    }


    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(geoData.latitude, geoData.longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }
            res.send(
                {
                    location: geoData ,
                    foreCast: forecastData
                 })
        })
    });

    //
 })
app.get('/Help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        Error: 'We couldn\'t find the Help Page'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        Error: 'We couldn\'t find the Page'
    })
})

app.listen(3000, () => {
    console.log("Server started on port 3000!")
})
