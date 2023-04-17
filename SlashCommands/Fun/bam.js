const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	name: 'bam',
	data: new SlashCommandBuilder()
		.setName("bam")
		.setDescription('bam fun command')
		.addUserOption(option =>
			option.setName("user")
				.setDescription("Which user should I *Bam*")
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName("reason")
				.setDescription("Reason for *Bamming* that user.")
				.setRequired(true)
		),

	async execute(client, interaction, Discord) {
		try {
			target = interaction.options.getUser("user");
			if (!target) {
				await interaction.reply("mention a user bish.")
			} else if (!interaction.options.getUser("user")) {
				await interaction.reply("Provide a reason bish")
			} else {
				const embedMsg = new Discord.EmbedBuilder()
					.setColor('#ff0000')
					.setTitle('Banned:')
					.setDescription(`${target} has been banned`)
					.addFields([{
						name: 'Reason:',
						value: interaction.options.getString("reason")
					}]);
				await interaction.reply({ embeds: [embedMsg] });
			}
		} catch (e) {
			require(`../handlers/ErrorHandler.js`)(client, interaction, Discord, e, this.name)
		}
	}
}