const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'kill',
	data: new SlashCommandBuilder()
		.setName('kill')
		.setDescription('kills the mentioned member')
		.addUserOption(option =>
			option.setName('target')
				.setDescription('mention a user to kill.')
				.setRequired(true)
		),

	async execute(client, interaction, Discord) {
		const weapons = ['AK47', 'M24', 'Chopper', 'knife', 'sword', 'hammer', 'crusher', 'ball', 'punch', 'joke', 'cringe face']
		const randomIndex = Math.floor(Math.random() * weapons.length);
		const user = interaction.options.getUser('target');
		const embedmsg = new Discord.MessageEmbed()
			.setTitle("**Killed**")
			.setDescription(`You killed ${user} with a ${weapons[randomIndex]}.`)
			.setColor('#fc03fc')
		interaction.reply({ embeds: [embedmsg] });
	}
}