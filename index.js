//? Gettings all the environment variables
require("dotenv").config();

//? Importing all the required packages
const { keepalive } = require("./server.js")
const Discord = require("discord.js");
const { GatewayIntentBits, Partials } = require("discord.js");
const mongoose = require("mongoose");
const { ANSI } = require("./Generators/AnsiColors.js") //? ANSI color coding for terminal output (just fancying the outputs)

//? Initialising client and server
try {
    const client = new Discord.Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages],
        partials: [Partials.GuildMember, Partials.Message, Partials.Channel, Partials.Reaction, Partials.User],
    });

    mongoose.connect(process.env.MONGOPATH); //? Connecting to mongoDB

    client.cooldowns = new Discord.Collection(); //? Initialising cooldowns for the commands
    client.command = new Discord.Collection(); //? Initialising commands
    client.events = new Discord.Collection(); //? Initialising events

    //? Looping through the handlers to handle triggered events (both commands and guild/client events)
    ["SlashCommandHandler", "EventHandler"].forEach(handler => {
        require(`./handlers/${handler}.js`)(Discord, client);
    })

    keepalive() //? function that starts the server

    client.login(process.env.TOKEN) //? Client login (Bot login)
} catch (e) {
    console.log(ANSI.foreground.Red + e + ANSI.Reset) //? Log the error if there are any (using ANSI color coding so that it looks a bit good :) )
}