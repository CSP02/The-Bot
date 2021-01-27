const Discord = require('discord.js');

const client = new Discord.Client();

const prefix = '!';

const fs = require('fs');
client.command = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.command.set(command.name, command);
}


client.once('ready', () => {
    console.log('The bot is online');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command == 'ping'){
        client.command.get('ping').execute(message, args);
    }

    else if(command == 'google'){
        message.channel.send('Something you have to search in google\nhttps://www.google.com/');
    }

    else if(command == 'role'){
        client.command.get('role').execute(message, args);
    }
    else if(command == 'embed'){
        client.command.get('embed').execute(message, args, Discord);
    }
    else if(command === 'clear'){
        client.command.get('clear').execute(message, args);
    }
    else if(command === 'mute'){
        client.command.get('mute').execute(message, args, Discord);
    }
    else if(command === 'unmute'){
        client.command.get('unmute').execute(message, args);
    }
    else if(command === 'kick'){
        client.command.get('kick').execute(message, args, Discord);
    }
    else{
        message.channel.send('No such command exist till now');
    }
});
client.login('ODAzNDkwMTM3MDIyNzkxNjgw.YA-igA.FhKJZG6Rp08cpPxa__r6BwQ9PKo');