module.exports = {
    name: 'ping',
    description: "sends the latency of the bot",
    syntax: '!ping',
    permissions: ['VIEW_CHANNEL'],
    execute(client, message, args, Discord) {
        message.channel.send(`Present heart beat of the bot is ${client.ws.ping}ms.`);
    }
}