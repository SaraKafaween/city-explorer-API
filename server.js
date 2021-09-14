'use strict'

const express = require('express');
const server = express();

const weatherData = require('./data/weather.json');

require('dotenv').config();
const PORT = process.env.PORT

const cors = require('cors');
server.use(cors());

server.get('/',(req,res) =>{
    res.send('Hello from Backend')
})

class Forecast{
    constructor(value){
    this.description=`${value.weather.description}`,
    this.valid_date=`${value.valid_date}`
}}

server.get('/weather',(req,res)=>{
    try{
    let {lat,lon,searchQuery} = req.query;
    let cityInfo = weatherData.find(element=>
        element.city_name.toLowerCase() === searchQuery.toLowerCase() || 
        element.lon === lon || element.lat === lat);
let forecastArr = cityInfo.data.map(items=> new Forecast(items));
res.send(forecastArr);
    }
    catch(e) {
        res.status(500).send('No Data')
    }
    });

server.get("*", (req, res) => {
    res.status(404).send("page not found");
    });
      
server.listen(PORT, () => console.log(`listening on ${PORT}`));
