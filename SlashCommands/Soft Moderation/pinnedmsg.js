const { SlashCommandBuilder } = require('discord.js')

module.exports = {
	name: "pinnedmsg",
	data: new SlashCommandBuilder()
		.setName("pinnedmsg")
		.setDescription("Get all pinned messages of this channel")
		.addIntegerOption(option => option.setName("message").setDescription("The message number you want to get").setRequired(false)),
	async execute(client, interaction, Discord) {
		try {
			let reply = []
			let i = parseInt('0', 10)
			const msgIndex = interaction.options.getInteger('message')
			let allReply = `__Pinned messages of this channel are__:\n`
			interaction.channel.messages.fetchPinned().then(msgs => {
				msgs.forEach(msg => {
					reply[parseInt(i, 10)] = `__Pinned messages of this channel are__:\n${msg.content}\n`
					i = parseInt(i, 10) + parseInt('1', 10)
					allReply += `${msg.content}\n`
				})
				if (msgIndex && reply[msgIndex] !== null) {
					interaction.reply(reply[msgIndex])
				} else if (!msgIndex) {
					interaction.reply(allReply)
				}
			})
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}