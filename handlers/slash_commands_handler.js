const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
let commands = []
require('dotenv').config();

module.exports = (client, Discord) => {
	const slashCommandFiles = fs
		.readdirSync('./SlashCommands/').filter(file => file.endsWith('.js'))

	for (const commandFile of slashCommandFiles) {
		const command = require(`../SlashCommands/${commandFile}`);
		commands.push(command.data.toJSON())
	}
	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

	try {
		console.log('Started refreshing application (/) commands.');
		rest.put(
			Routes.applicationCommands(process.env.CLIENTID),
			{ body: commands },
		)
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
}
