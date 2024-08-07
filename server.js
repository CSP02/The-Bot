//? Configuring server using express js
const express = require("express");
const server = express();
const { ANSI } = require("./Generators/AnsiColors.js")

//? function that listens to port 3000
function keepalive() {
    server.listen("3000", (req, res) => {
        console.log(ANSI.foreground.Blue + "Server is turned on!" + ANSI.Reset)
    })
}

//? export keepalive function to use this in index.js file
module.exports = { keepalive }