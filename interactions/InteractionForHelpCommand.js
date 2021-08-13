const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
	interactTo: ['Help', 'help'],
	permissions: ['VIEW_CHANNEL'],
	async execute(client, interaction, args, Discord) {
			const embedMsg = new Discord.MessageEmbed()
			.setTitle(`**Module ${interaction.values}**`)
			.setColor('#00ff00')
			const moduleCommands = fs.readdirSync(`./commands/${interaction.values}/`).filter(f => f.endsWith('.js'))
		for (commands of moduleCommands) {
			const cmd = require(`../commands/${interaction.values}/${commands}`)
			if (!cmd.name) continue
			else
				embedMsg
					.addFields(
						{ name: `${cmd.name}`, value: `${cmd.description}` }
					)
		}
		interaction.update({ embeds: [embedMsg] }).catch(console.error)
	}
}