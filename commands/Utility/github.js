module.exports = {

    name: 'github',
    aliases: ['gh', 'source'],
    description: "Displays the link for the bot's repository.",
    syntax: '!github',
    execute(client, message, args, Discord) {

        message.channel.send('https://github.com/Chandra-sekhar-pilla/The-Bot');
    }
}