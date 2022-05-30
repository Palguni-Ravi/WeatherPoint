const express = require('express');
const bodyParser = require('body-parser');
const https = require('https'); // https is a native node module
const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.listen(3000,function(){
    console.log("Server started on port 3000.");
});
app.get('/',function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const cit = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cit+"&appid=3232a53ac65f7503e0b67b2826c45b9f";
    https.get(url,function(response){
        // console.log(response.statusCode);
        // console.log(response.data);  // --undefined
        response.on("data",function(data)
        {
            // console.log(data);
            const weatherData = JSON.parse(data);
            // console.log(weatherData.weather[0].description);
            // console.log(weatherData.main.temp);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imglink = "http://openweathermap.org/img/wn/" +icon+ "@2x.png";
            res.write("<h1>The Temperature in "+cit+" is "+temp+"K.</h1>");
            res.write("<p>The Weather in "+cit+" currently is "+desc+".</p>");
            res.write("<img src="+imglink+">");
            res.send();
        });
    });
    // 0f448a0202
    // 2d19a5c981a249550462562b973ec7fa-us6
});

    
    // res.send("Server is running.");
