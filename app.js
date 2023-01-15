const { response } = require("express");
const express = require("express");
const https = require("https");


const app = express();

app.get("/", (req, res) => {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=khatima&appid=1b38d87c372f30d0d3d58e02211d5a9c&units=metric";
    https.get(url, (response) => {
        console.log("StatusCode " + response.statusCode);
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temprature = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            res.write(`<h1>The temprature is in khatima ${temprature} degree celcius</h1>`);
            res.write(`<h2> The description is ${description} </h2>`);
            res.send();
        })
    })
})


app.listen("3000", () => {
    console.log("Server has started on port 3000");
})