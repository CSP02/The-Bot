const fs = require('fs');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	name: 'help',
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('sends detailed help about slashCommands you can use.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('View about this command.')
				.setRequired(false)
		),

	async execute(client, interaction, Discord) {
		try {
			const embedMsg = new Discord.EmbedBuilder()
				.setTitle('Help')
				.setColor('#00ff00');
			const commandFolders = fs
				.readdirSync('SlashCommands/')
				.filter(file => file.endsWith(''))
			const menu = new Discord.SelectMenuBuilder()
				.setCustomId(`Help`)
				.setPlaceholder('Select Module')
			const requestedCommand = interaction.options.getString('command')
			let commands = []
			for (const folder of commandFolders) {
				const { Module, Description, Commands } = require(`../../SlashCommands/${folder}/ModuleInfo.js`)
				embedMsg.addFields(
					[
						{ name: Module, value: Description },
					]
				)
				commands = Commands
				menu.addOptions({ label: `${Module}`, value: `${Module}` })
			}
			if (requestedCommand) {
				const commandInfo = commands.filter((command) => {
					if (command.Name === requestedCommand) return command
				})[0]

				const embedMsg = new Discord.EmbedBuilder()
					.setTitle("Help")
					.setColor('#00ff00')
					.addFields(
						[
							{ name: 'Command', value: commandInfo.Name },
							{ name: 'Description', value: commandInfo.Description },
							{ name: 'Syntax', value: commandInfo.Syntax },
							{ name: 'Permission', value: commandInfo.Permission },
						]
					)

				return interaction.reply({ embeds: [embedMsg], ephemeral: true })
			}
			if (menu) {
				const actionRow = new Discord.ActionRowBuilder()
					.addComponents(menu)
				return interaction.reply({ content: "use !help <command_name> or /help <command_name> to know about a certain command and select a Module from the dropdown below", embeds: [embedMsg], components: [actionRow], ephemeral: true });
			}
			else
				return interaction.reply({ embeds: [embedMsg], ephemeral: true });

		} catch (e) {
			require(`../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}
