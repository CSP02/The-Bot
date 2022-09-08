const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
	interactTo: ['Help', 'help'],
	permissions: ['VIEW_CHANNEL'],
	async execute(client, interaction, args, Discord) {
		try {
			const embedMsg = new Discord.EmbedBuilder()
				.setTitle(`**Module ${interaction.values}**`)
				.setColor('#00ff00')
			const moduleCommands = fs.readdirSync(`./commands/${interaction.values}/`).filter(f => f.endsWith('.js'))
			for (commands of moduleCommands) {
				const cmd = require(`../commands/${interaction.values}/${commands}`)
				if (!cmd.name) continue
				else
					embedMsg
						.addFields(
							[{ name: `${cmd.name}`, value: `${cmd.description}` }]
						)
			}
			interaction.update({ embeds: [embedMsg] }).catch(console.error)
		} catch (e) {
			const emd = new Discord.EmbedBuilder()
				.setColor('#ff0000')
				.setTitle('command raised an error in the source code:')
				.setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
			interaction.channel.send({ embeds: [emd] })
		}
	}
}