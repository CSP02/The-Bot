const fs = require('fs');
const { PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Lists the commands of the bot.',
	syntax: '!help <module>',
	permissions: [PermissionsBitField.Flags.ViewChannel],

	execute(client, message, args, Discord) {
		try{
			var embedMsg = new Discord.EmbedBuilder()
				.setTitle('Help')
				.setColor('#00ff00');
			const command_files = fs
				.readdirSync('./commands/')
				.filter(file => file.endsWith('')).filter(file => file != 'EasterEggs');
			if (!args[0]) {
				var menu = new Discord.SelectMenuBuilder()
					.setCustomId(`Help`)
					.setPlaceholder('Select Module')
			} else if (command_files.includes(`${args[0]}`)) {
				const warnEmbed = new Discord.EmbedBuilder()
					.setTitle("**Info:**")
					.setColor('#ffc508')
					.setDescription("Use dropdown to select module. Use !help command to get module names and dropdown.")
				return message.channel.send({ embeds: [warnEmbed] })
			} else {
				var menu = null
			}
			for (const folder of command_files) {
				const description = require(`../../commands/${folder}/description.js`)
				if (!args[0]) {
					embedMsg
						.addFields([{
							name: `${folder}`, value: `${description.description}`
						}])

					menu.addOptions({ label: `${folder}`, value: `${folder}` })
				}
				const files = fs
					.readdirSync(`./commands/${folder}/`)
					.filter(fil => fil.endsWith('.js'));

				for (const file of files) {
					const command = require(`../../commands/${folder}/${file}`);
					if (command) {
						if (command.name) {
							if (args[0] === command.name) {
								embedMsg
									.addFields(
										[{ name: `Command Name:`, value: `${command.name}` },
										{ name: `Description`, value: `${command.description}` },
										{ name: `Syntax`, value: `${command.syntax}` },
										{ name: `Aliases`, value: `${command.aliases}` },
										{ name: `Other Details`, value: `${command.others ? `${command.others}` : 'undefined'}` },
										{ name: `Note:`, value: `${command.footer ? `${command.footer}` : 'undefined'}` }]
									)
							}
						} else {
							continue;
						}
					} else {
						message.channel.send('No module or command found.');
					}
				}
			}
			if (menu) {
				const actionRow = new Discord.ActionRowBuilder()
					.addComponents(
						menu
					)
				return message.channel.send({ content: "use !help <command_name> to know about a certain command and select a module from the dropdown below", embeds: [embedMsg], components: [actionRow] });

			}
			else
				return message.channel.send({ embeds: [embedMsg] });

		}catch(e){
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
		}
	}
}
