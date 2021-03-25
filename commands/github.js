module.exports = {

    name: 'github',

    description: "Displays the link for the bot's repository.",
    aliases: ['gh', 'source'],
    execute(client, message, args, Discord) {

        message.channel.send('https://github.com/Chandra-sekhar-pilla/The-Bot');
    }
}
