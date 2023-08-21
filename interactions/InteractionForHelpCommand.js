const { PermissionsBitField } = require("discord.js");
module.exports = {
	interactTo: ["Help", "help"],
	permissions: [PermissionsBitField.Flags.ViewChannel],
	async execute(client, interaction, Discord) {
		try {
			const embedMsg = new Discord.EmbedBuilder()
				.setTitle(`**Module ${interaction.values}**`)
				.setColor("#00ff00");
			const requestedModule = interaction.values[0];
			const {
				Commands,
			} = require(`../SlashCommands/${requestedModule}/ModuleInfo.js`);
			Commands.forEach((command) => {
				embedMsg.addFields([
					{ name: command.Name, value: command.Description },
				]);
			});
			interaction
				.update({ embeds: [embedMsg], ephemeral: true })
				.catch(console.error);
		} catch (e) {
			const emd = new Discord.EmbedBuilder()
				.setColor("#ff0000")
				.setTitle("command raised an error in the source code:")
				.setDescription(
					`\`\`\`${e}\`\`\`\n\nYou can create a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`
				);
			interaction.channel.send({ embeds: [emd] });
		}
	},
};
