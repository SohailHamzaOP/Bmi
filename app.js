const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    const cityName = req.body.cityName;
    const appid = "1b38d87c372f30d0d3d58e02211d5a9c";
    const metric = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + appid + "&units=" + metric + "";
    https.get(url, (response) => {
        console.log("StatusCode " + response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temprature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write(`<h1>The temprature is in ${cityName} ${temprature} degree celcius</h1>`);
            res.write(`<h2> The description is ${description} </h2>`);
            res.write(`<img src="${imgUrl}">`);
            res.send();
        })
    })
})




app.listen("3000", () => {
    console.log("Server has started on port 3000");
})