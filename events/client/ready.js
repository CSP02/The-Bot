const { ActivityType } = require("discord.js");
const {ANSI} = require("../../Generators/AnsiColors.js")

module.exports = {
    name: "ready", //? Name of the event

    run(Discord, client) { //? function to run when this event is triggered
        client.user.setActivity( //? Settings client activity
            "Testing the bot",{
                type: ActivityType.Playing,
            }            
        );
        console.log(ANSI.foreground.BrightBlue + "client logged in!" + ANSI.Reset); //? Logging after the client logged in
    }
}