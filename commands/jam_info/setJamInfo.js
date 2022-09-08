const mongo = require('../../schemas/mongo')
const jamShema = require('../../schemas/jamSchema')
const { PermissionsBitField } = require('discord.js');

module.exports = {
	name: 'setjam',
	description: 'Sets the jam info with provided fields',
	aliases: ['sj', 'setjam'],
	syntax: '!setjam <time(date-month-year)> <hours:minutes:seconds> <topic> <otherinfo>',
	permissions: [PermissionsBitField.Flags.Administrator],

	async execute(client, message, args, Discord) {
		try {
			const guildId = message.guild.id
			if (!args[0]) {
				return message.channel.send('Provide time period.')
			}
			const timePeriod = `${args[0]}`;
			myDate = timePeriod.split("-");
			const time = `${args[1]}`;
			myTime = time.split(":");
			var newDate = new Date(myDate[2], myDate[1] - 1, myDate[0], myTime[0], myTime[1], myTime[2]);
			var datum = Date.parse(newDate)

			const jam = {
				topic: `${args[2]}`,
				timestamp: datum,
				other: `${args.splice(3).join(' ')}`
			}

			await mongo().then(async mongoose => {
				try {
					await jamShema.findOneAndUpdate({
						guildId,
					}, {
							guildId,
							$push: {
								jam: jam,
							}
						}, {
							upsert: true
						})
				} finally {
					mongoose.connection.close()
				}
			})

			const embedMsg = new Discord.EmbedBuilder()
				.setTitle('Jam registered Successfully:')
				.setColor('#00ff00')
				.addFields(
					[{ name: 'Topic:', value: `${jam.topic}` },
					{ name: 'Deadline:', value: `${new Date(jam.timestamp)}` },
					{ name: 'Other Details:', value: `${jam.other ? `${jam.other}` : 'no other challenges required'}` }]
				)

			message.channel.send({ embeds: [embedMsg] })
		} catch (e) {
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
		}
	}
}