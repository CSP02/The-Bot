const { ANSI } = require("../../Generators/AnsiColors.js");

module.exports = {
    name: "error", //? Name of the event

    run(Discord, client, error) { //? function to run when this event is triggered
        console.log(ANSI.foreground.BrightBlue + error + ANSI.Reset); //? Logging after the client logged in
    }
}