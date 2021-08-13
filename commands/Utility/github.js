module.exports = {

    name: 'github',
    aliases: ['gh', 'source'],
    description: "Displays the link for the bot's repository.",
    syntax: '!github',
    permissions: ['VIEW_CHANNEL'],
    execute(client, message, args, Discord) {

        message.channel.send({content:'https://github.com/Chandra-sekhar-pilla/The-Bot'});
    }
}