const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'server',
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Get all info about the server'),

	async execute(client, interaction, Discord) {
		try {
			serverRoles = ""
			serverTeams = ""

			server = interaction.guild
			const embedMsg = new Discord.EmbedBuilder()
				.setColor('#00ff00')
				.setTitle('Server Info:')

				.addFields([{ name: 'Server Name:', value: `${server.name}` }, { name: 'Member Count:', value: `${server.memberCount}` },
				{ name: "Owner:", value: `<@${server.ownerId}>` },
				{ name: "Created At:", value: `${server.createdAt}` },
				{ name: 'Channel Count:', value: `${interaction.guild.channels.channelCountWithoutThreads}` }]
				)
			interaction.reply({ embeds: [embedMsg] })
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}