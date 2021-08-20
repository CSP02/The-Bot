const Discord = require('discord.js');
const { Intents } = require('discord.js')
require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect('your mongo path here', { useNewUrlParser: true, useUnifiedTopology: true })
const keepAlive = require('./server.js');

const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES], partials: ['GUILD_MEMBERS', 'MESSAGE', 'CHANNEL', 'REACTION'] })
client.command = new Discord.Collection();
client.events = new Discord.Collection();



['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

keepAlive;
client.login('bot token here').catch(console.error);
