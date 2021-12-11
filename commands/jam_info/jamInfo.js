const mongo = require('../../schemas/mongo')
const jamShema = require('../../schemas/jamSchema')

module.exports = {
	name: 'jaminfo',
	description: 'sends the time left for the jam',
	aliases: ['jam', 'infojam', 'ji'],
	syntax: '!jam',

	async execute(client, message, args, Discord) {
		try {
			const guildId = message.guild.id
			await mongo().then(async mongoose => {
				try {
					const jamInfo = await jamShema.findOne({
						guildId,
					})
					if (jamInfo === null || jamInfo === undefined || jamInfo.jam.length == 0) {
						return message.channel.send("No jams are registered right now!")
					}

					const deadline = new Date(jamInfo.jam[0].timestamp)
					const topic = jamInfo.jam[0].topic
					const otherDetails = jamInfo.jam[0].other

					var date1, date2;

					date1 = new Date(deadline);
					var date3 = new Date()

					date2 = new Date();

					var res = Math.abs(date1 - date2) / 1000;
					var days = Math.floor(res / 86400);
					var hours = Math.floor(res / 3600) % 24;
					var minutes = Math.floor(res / 60) % 60;
					var seconds = res % 60;
					const timeRem = `${days} days, ${hours} hrs, ${minutes} min, ${parseInt(seconds)} sec remaining`

					const embedMsg = new Discord.MessageEmbed()
						.setTitle('Jam info:')
						.setColor('#ddff00')
						.addFields(
							{ name: 'Topic', value: `${topic}` },
							{ name: 'Time Remaining:', value: timeRem },
							{ name: 'Other Details:', value: `${otherDetails}` })
					message.channel.send({ embeds: [embedMsg] })
				} finally {
					mongoose.connection.close()
				}
			})
		} catch (e) {
			const emd = new Discord.MessageEmbed()
				.setColor('#ff0000')
				.setTitle('command raised an error in the source code:')
				.setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
			message.channel.send({ embeds: [emd] })
		}
	}
}