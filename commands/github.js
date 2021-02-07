module.exports = {

    name: 'github',

    description: "Displays the link for the bot's repository.",
    execute(client, message, args, Discord) {

        message.send.channel('https://github.com/Chandra-sekhar-pilla/The-Bot');
    }
}
