module.exports = {

    name: 'longcode',

    description: "sends a link of pastemyst",
    aliases: ['Longcode', 'long', 'lc'],
    execute(client, message, args, Discord) {

        message.channel.send('Want to send a long code? use pastemyst here is the link\nhttps://paste.myst.rs');
    }
}