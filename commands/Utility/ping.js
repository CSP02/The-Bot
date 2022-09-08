const { PermissionsBitField } = require('discord.js');
module.exports = {
	name: 'ping',
	description: 'sends the latency of the bot',
	syntax: '!ping',
	permissions: [PermissionsBitField.Flags.ViewChannel],
	execute(client, message, args, Discord) {
		message.channel.send(
			`Present heart beat of the bot is ${client.ws.ping}ms.`
		);
	}
};