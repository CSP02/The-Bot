module.exports = {
	name: 'crypace',
	aliases: ['crypace', 'game'],

	execute (client, message, args, Discord){
		const embedMsg = new Discord.EmbedBuilder()
		.setTitle('Found an easter egg 😁:')
		.setDescription('Crypace is a sci-fi game being developed by some people in Atelier server.\nAnd those people has created dreamspace games.\n')
		.setColor('#3d86fc')
	message.channel.send({embeds: [embedMsg]})
	}
}