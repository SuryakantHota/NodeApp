const path = require("path");
const express = require("express");
const hbs = require("hbs");
const Utils = require("./utils");

const app = express();
const PORT = process.env.PORT || 4000;

// Define paths for Express config
const viewsPath = path.join(__dirname, "../templates/views");
const publicDirPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set app configs
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", ( req, res ) => {
    res.render("index", {
        title: "Weather app",
        message: "Created by Suryakant",
        name: "Suryakant"
    });
});

app.get("/about", ( req, res ) => {
    res.render("about", {
        title: "About me",
        message: "Created by Suryakant",
        name: "Suryakant"
    });
});

app.get("/help", ( req, res ) => {
    res.render("help", {
        title: "Help section",
        message: "I am here to help you",
        name: "Suryakant"
    });
});

app.get("/weather", ( req, res ) => {
    const address = req.query.address;
    if ( address ) {
        Utils.geoCodeAddress(address, ( error, data ) => {
            console.log("geoCodeAddress error", error);
            if ( !error ) {
                console.log("geoCodeAddress data", data);
                const {lat, lng, location} = data;
                Utils.getCurrentWeather(lat + "," + lng, ( error2, data2 ) => {
                    console.log("getCurrentWeather error2", error2);
                    console.log("getCurrentWeather data2", data2);
                    if ( !error2 ) {
                        return res.send({
                            "description": data2.description,
                            "temperature": data2.temperature,
                            "feelsLike": data2.feelsLike,
                            "location": location
                        });
                    } else {
                        return res.send({
                            "error": error2
                        });
                    }
                });
            } else {
                return res.send({
                    error
                });
            }
        });
    } else {
        return res.send({
            "error": "Please enter address to get the weather condition"
        });
    }
});

app.get("/help/*", ( req, res ) => {
    res.render("404NotFound", {
        title: "Page not Found",
        message: "The requested page is not available",
        name: "Suryakant",
        errorMessage: "Help article not found"
    });
});

app.get("*", ( req, res ) => {
    res.render("404NotFound", {
        title: "Page not Found",
        message: "The requested page is not available",
        name: "Suryakant",
        errorMessage: "Please try another page"
    });
});

app.listen(PORT, () => {
    console.log("Server is up on port", PORT);
});