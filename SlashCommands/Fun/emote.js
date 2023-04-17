const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'react',
	data: new SlashCommandBuilder()
		.setName("react")
		.setDescription('reacts to the message you tagged or it will react to your interaction(using this command.)')
		.addStringOption(option => option.setName('emote').setDescription('emote to react with').setRequired(true))
		.addStringOption(option => option.setName('message').setDescription('message to react to').setRequired(false)),
	async execute(client, interaction, Discord) {
		try {
			const emoteReq = interaction.options.getString('emote')
			const replyMsg = interaction.options.getString('message');
			var i = parseInt('0', 10)
			var emojis = []
			interaction.client.emojis.cache.forEach(emoji => {
				emojis[i] = emoji.name
				i++
			})
			const ansIndex = Math.floor(Math.random() * emojis.length);
			if (!emoteReq && replyMsg === null) {
				interaction.reply(`${interaction.client.emojis.cache.find(emo => emo.name === `${emojis[ansIndex]}`)}`).catch(console.error)
			} else if (emoteReq && replyMsg !== null) {
				const msg = await interaction.channel.messages.fetch(replyMsg.split('/')[replyMsg.split('/').length - 1])
				const emoji = await interaction.client.emojis.cache.find(emo => emo.name === emoteReq)
				await msg.reply(`${emoji} sent by ${await interaction.user}`).catch(console.error)
				await interaction.reply({ content: "Reaction sent!", ephimeral: true }).catch(console.error)
			} else {
				let emote = await interaction.client.emojis.cache.find(emo => emo.name === emoteReq)
				if (emote) {
					interaction.reply(`${emote}`).catch(console.error)
				} else {
					interaction.reply("Emote not found!")
				}
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}