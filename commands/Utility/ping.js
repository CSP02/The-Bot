module.exports = {

    name: 'ping',

    description: "This is ping command",

    execute(client, message, args, Discord){

        

            message.channel.send(`Present heartbeat of the bot is ${client.ws.ping}ms.`);

    }

}
