module.exports = {
    name: 'ping',
    description: "Send the latency of the bot.",
    syntax: '!ping',

    execute(client, message, args, Discord) {
        message.channel.send(`Present heart beat of the bot is ${client.ws.ping}ms.`);
    }
}