const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
let commands = [];
require("dotenv").config();

module.exports = (client, Discord) => {
	const slashCommandFolders = fs.readdirSync("./SlashCommands/");
	for (const commandFolder of slashCommandFolders) {
		const slashCommandFiles = fs
			.readdirSync(`./SlashCommands/${commandFolder}/`)
			.filter((file) => file.endsWith(".js"));
		for (const commandFile of slashCommandFiles) {
			if (commandFile === "ModuleInfo.js") continue;
			const command = require(`../SlashCommands/${commandFolder}/${commandFile}`);
			commands.push(command.data.toJSON());
		}
	}
	const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

	try {
		rest
			.put(Routes.applicationCommands(process.env.CLIENTID), { body: commands })
			.then(() => {
				console.log("Successfully reloaded application (/) commands.");
			});
		/*|---------------------------|
		  |To reset the slash commands|
		  |---------------------------|*/
		// rest.put(
		// 	Routes.applicationCommands(process.env.CLIENTID),
		// 	{ body: [] },
		// ).then(() =>{
		// 	console.log('Successfully Deleted **all** application (/) commands.');
		// })
	} catch (error) {
		console.error(error);
	}
};
