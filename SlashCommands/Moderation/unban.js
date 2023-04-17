const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'unban',
	data: new SlashCommandBuilder()
		.setName('unban')
		.setDescription('Unbans a user.')
		.addUserOption(option => option.setName('user').setDescription('The user to unban.')),

	async execute(client, interaction, Discord) {
		try {
			const sLogsChannel = interaction.guild.channels.cache.find(chn => chn.name === 'server-logs')
			const server = interaction.guild;
			const target = interaction.options.getUser('user')

			interaction.guild.bans.fetch(target).then(bannedUser => {
				interaction.guild.members.unban(bannedUser.user.id).catch(console.error)
				const embedMsg = new Discord.EmbedBuilder()
					.setColor('#00ff00')
					.setDescription(`${bannedUser.user.tag} was unbanned.`)
				interaction.reply({ embeds: [embedMsg] })
				sLogsChannel.send({ embeds: [embedMsg] })
			})
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}
