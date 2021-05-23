const mongo = require('../../mongo')
const warnShema = require('../../schema')

module.exports = {
    name: 'warn',
    description: "ban command",
    async execute(client, message, args, Discord) {
        let target = message.mentions.users.first()
        let mentioned = message.mentions.members.first();
        if (!target && !args[0]) return message.reply("please specfy the member to warn. and provide a good reason")
        if (target) {
            Warn(target)
        } else if (args[0] && !isNaN(args[0])) {
            const ment = message.guild.members.cache.get(args[0])
            Warn(ment)
        } else {
            message.reply('cant find member')
        }


        async function Warn(target) {
            console.log(target)
            if (!message.member.hasPermission('MANAGE_MESSAGES')) message.reply('You have no permission.')
            else if (target.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('ADMINISTRATOR')) return message.reply('You cannot, be a good mod.')
            else {
                console.log(target.id)
                const guildId = message.guild.id;
                const userId = target.id;
                const reason = args.slice(1).join(' ')
                var infrID = parseInt('1', 10);


                await mongo().then(async mongoose => {
                    try {
                        const results = await warnShema.findOne({
                            guildId
                        })
                        if (results == null) {
                            return
                        } else {
                            let reply = ' '
                            var infr
                            for (const warning of results.warnings) {
                                const { author, userID, timestamp, reason, infrID } = warning
                                infr = parseInt(infrID, 10)
                            }
                            infrID += parseInt(infr, 10)
                        }
                    } finally {
                        mongoose.connection.close()
                    }
                })


                const warning = {
                    author: message.member.user.id,
                    userID: userId,
                    timestamp: new Date().getTime(),
                    reason,
                    infrID
                }


                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('warned user:')
                    .setThumbnail(`${target.user.displayAvatarURL()}`)
                    .setDescription(`<@${target.id}> has been warned`)
                    .setFooter(`Infraction ID: ${infrID}`)
                    .addFields({ name: 'Reason:', value: `${reason}` });

                message.channel.send(embedMsg);
                target.send(embedMsg)

                await mongo().then(async mongoose => {
                    try {
                        await warnShema.findOneAndUpdate({
                            guildId,
                        }, {
                            guildId,
                            $push: {
                                warnings: warning
                            }
                        }, {
                            upsert: true
                        })
                    } finally {
                        mongoose.connection.close()
                    }
                })
            }
        }
    }
}