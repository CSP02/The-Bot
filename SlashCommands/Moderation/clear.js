const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'clear',
	data: new SlashCommandBuilder()
		.setName('clear')
		.setDescription('clears messages')
		.addIntegerOption(option =>
			option.setName('amount')
				.setDescription('amount of messages to clear')
				.setRequired(true)
		)
		.addUserOption(option =>
			option.setName('user')
				.setDescription('clear this user\'s messages')
				.setRequired(false)
		),
	async execute(client, interaction, Discord) {
		try {
			const amount = await interaction.options.getInteger('amount')

			await interaction.deferReply()
			await interaction.editReply("Cleared")
			if (interaction.options.getUser('user')) {
				const target = await interaction.guild.members.fetch(await interaction.options.getUser('user').id)
				const messagesMap = await interaction.channel.messages.fetch()
				const messages = Array.from(messagesMap);
				const userMessages = messages.filter(mess => mess[1].author.id === target.id).reverse()
				const userMessagesMap = new Map(userMessages.splice(userMessages.length - amount, userMessages.length - 1))
				userMessagesMap.forEach(userMsg => {
					userMsg.delete()
				})
				await interaction.editReply(`**${amount}** ${target}'s messages have been deleted!`)
			}
			else {
				if (!amount) return interaction.reply("please enter the number of messages you want to clear");
				if (amount > 100) return interaction.reply('Clear limit is 100');
				if (amount < 1) return interaction.reply('you can\'t time travel');

				await interaction.channel.messages.fetch({ limit: amount }).then(messages => {
					interaction.channel.bulkDelete(messages).catch(e => {
						interaction.channel.send(e.interaction)
					});
				});
				await wait(2000)
				await interaction.channel.send(`**${amount}** messages have been deleted!`)
			}
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}