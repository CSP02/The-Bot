const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
	interactTo: ['Error'],
	permissions: ['VIEW_CHANNEL'],
	async execute(client, interaction, args, Discord) {
		let label
		let url
		const md = ['makefile',
			'yaml',
			'dsconfig',
			'properties',
			'isbl',
		]
		const randomIndex = Math.floor(Math.random() * md.length);
		const embd = new Discord.EmbedBuilder()
		interaction.component.options.forEach(option => {
			if (option.value == interaction.values && option.label == 'Message URL') {
				label = option.label
				embd
					.setURL(option.value)
					.setDescription(`${interaction.values}`)
			}
			if (option.value == interaction.values && option.label != 'Message URL') {
				label = option.label
				embd
					.setDescription(`\`\`\`${md[randomIndex]}\n${interaction.values}\`\`\``)
			}
		})
		embd
			.setTitle(`${label}`)
			.setColor('#ff0000')
		interaction.update({ embeds: [embd], ephemeral: true })
	}
}