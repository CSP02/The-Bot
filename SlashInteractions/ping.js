module.exports = {
	name: 'ping',
	aliases: ['ping'],
	async execute(client, interaction, Discord) {
		interaction.reply(`Present heart beat of the bot is ${client.ws.ping}ms.`);
	}
}