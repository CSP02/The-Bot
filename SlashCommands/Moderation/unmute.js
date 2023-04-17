const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'unmute',
	data: new SlashCommandBuilder()
		.setName('unmute')
		.setDescription('Unmutes a user.')
		.addUserOption(option => option.setName('user').setDescription('The user to unmute.').setRequired(true)),

	execute(client, interaction, Discord) {
		try {
			const target = interaction.options.getUser('user');
			const sLogsChannel = interaction.guild.channels.cache.find(chn => chn.name === 'server-logs')
			let mutedRole = interaction.guild.roles.cache.find(role => role.name === 'Muted');
			memberTarget = interaction.guild.members.cache.get(target.id);
			if (memberTarget.roles.cache.has(`${mutedRole.id}`)) {
				memberTarget.roles.remove(mutedRole.id);
				const embdMsg = new Discord.EmbedBuilder()
					.setDescription(`${memberTarget} was unmuted.`)
					.setColor('#00ff00')
				sLogsChannel.send({ embeds: [embdMsg] })
				interaction.reply({ embeds: [embdMsg] })
			} else {
				interaction.reply("Mentioned user is not muted. They might be Timed out.")
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}