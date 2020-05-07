const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')

const geocode = require('./geocode')
const forecast = require('./forecast')

//console.log(__dirname)

const app = express()
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,'../templates/views')
const partialpath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewspath)
app.use(express.static(publicdirectorypath))

// const {expressCspHeader, INLINE, NONE, SELF} = require('express-csp-header')
// app.use(expressCspHeader({
//     directives: {
//         'default-src': [SELF],
//         'img-src': ['data:', 'images.com'],
//     }
// }))

hbs.registerPartials(partialpath)

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name:'Vivek'
    })
    //console.log('Index page is visited')
})

app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        description: 'This page is to help the customers',
        name: 'Vivek'
    })
    console.log('Help page is visited')
})

app.get('/about',(req,res) => {
    // res.send([{
    //     name: 'Vivek',
    //     Contribution:'Headdeveloper' 
    // }, {
    //     name: 'Shivam',
    //     Contribution: 'assistance'
    // }])
    res.render('about',{
        title:'About page',
        name: 'Vivek',
        contribution: 'Creator'
    })
    console.log('About page is visited')
})
app.get('/Weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must enter a city!'
        })
    }
    geocode(req.query.address,(error,data = {} )=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(data.latitude,data.longitude,(error,dat) =>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                Location:data.location,
                Latitude:data.latitude,
                Longitude:data.longitude,
                Temperature: dat.temp+' degrees',
                Humidty: dat.humidity+'%',
                Forecast:'It is '+dat.temp+' degrees outside and humidity is '+dat.humidity+'%.'
            })

        })


    })
    console.log('Weather page is visited')
})

app.get('/help/*',(req,res) =>{
    res.render('notfound',{
        title:'Help article not found',
        desc: 'The article you are trying to find doesnt exist or is being deleted from the creator',
        name: 'Vivek'
    })
})

app.get('*',(req,res)=>{
    res.render('notfound',{
        title:'404 not found',
        desc: 'This page doesnt exist, trying modifying the url',
        name:'Vivek'
    })
})


app.listen(3000, () => {
    console.log('Server is up on localhost:3000')
})