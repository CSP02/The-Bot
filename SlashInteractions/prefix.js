module.exports = {
	name: 'prefix',
	aliases: ['prefix'],
	async execute(client, interaction, Discord) {
		interaction.reply(`prefix of this bot is \`\`\`!\`\`\``);
	}
}