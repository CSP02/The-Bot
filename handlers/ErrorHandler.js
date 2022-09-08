module.exports = async (client, message, Discord, error, commandName) => {
	const md = [
		'makefile',
		'yaml',
		'dsconfig',
		'properties',
		'isbl',
	]
	const randomIndex = Math.floor(Math.random() * md.length);

	const embd = new Discord.EmbedBuilder()
		.setColor('#ff0000')
		.setTitle('command raised an error in the source code:')
		.addFields(
			[{ name: 'Error:', value: `\`\`\`${md[Math.floor(Math.random() * md.length)]}\n${error}\`\`\`\n\n` },
			{ name: 'Error Message:', value: `\`\`\`${md[Math.floor(Math.random() * md.length)]}\n${error.message}\`\`\`\n\n` },
			{ name: 'Error code:', value: `\`\`\`${md[Math.floor(Math.random() * md.length)]}\n${error.code}\`\`\`\n\n` },
			{ name: 'Error in command:', value: `\`\`\`${md[Math.floor(Math.random() * md.length)]}\n${commandName}\`\`\`\n\n` },
			{ name: 'Error in channel:', value: `\`\`\`${md[Math.floor(Math.random() * md.length)]}\n${message.channel.name}\`\`\`\n\n` },
			{ name: 'Error in Guild:', value: `\`\`\`${md[Math.floor(Math.random() * md.length)]}\n${message.guild.name}\`\`\`\n\n` },
			{ name: 'Server Invite link', value: `\`\`\`${md[Math.floor(Math.random() * md.length)]}\n${message.guild.vanityURLCode}\`\`\`\n\n` }]
		)
		.setURL(message.url)
		.setDescription('Click on the embed to go the message.')
	const msgURL = message.url
	const emd = new Discord.EmbedBuilder()
		.setColor('#ff0000')
		.setTitle('command raised an error in the source code:')
		.setDescription(`Seems like this error is in source code I will let the developer know about this error or else you can report it in github. Click on the embed to go to the report page! If you want to know more about this error clikc the button.`)
		.setURL('https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0')

	const row = new Discord.ActionRowBuilder()
		.addComponents([
			new Discord.SelectMenuBuilder()
				.setCustomId('Error')
				.setPlaceholder('Further Details(select one)')
				.addOptions(
					{ label: 'Error Message', value: `${error.message}` },
					{ label: 'Error code', value: `${error.code}` },
					{ label: 'Error in command', value: `${commandName}` },
					{ label: 'Error in Guild/server', value: `${message.guild.name}` },
				),
		])
	message.channel.send({ embeds: [emd], components: [row] })

	await client.users.fetch('768737415061569596').then(owner => {
		owner.send({ embeds: [embd] })
	})
}