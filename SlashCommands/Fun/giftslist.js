const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'giftslist',
	data: new SlashCommandBuilder()
		.setName('giftslist')
		.setDescription('shows the info the gifts you can send'),

	async execute(client, interaction, Discord) {
		const embed = new Discord.EmbedBuilder()
			.setTitle('Gifts info')
			.setColor('#00ff00')
			.addFields([
				{ name: 'Cake', value: '23' },
				{ name: 'Toy car', value: '50' },
				{ name: 'Chess Board', value: '56' },
				{ name: 'Toy Train', value: '84' },
				{ name: 'Vibe check', value: '86' }
			])

		interaction.reply({ embeds: [embed] })
	}
}