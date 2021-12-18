//BAN COMMAND

const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')

module.exports = {
    name: 'ban',
    description: 'bans the mentioned user.',
    permissions: ['BAN_MEMBERS'],
    syntax: '!ban <user>',
    async execute(client, message, args, Discord) {
        try {
            const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
            const server = message.guild;
            const infrType = 'Ban'
            let target
            if (isNaN(args[0])) { target = message.mentions.members.first(); }
            else if (!isNaN(args[0])) { target = await message.guild.members.fetch(args[0]) }
            if (!target)
                return message.channel.send('User not found!')
            if (target) {
                if (target.permissions.BAN_MEMBERS) {
                    message.channel.send('Be a good mod').catch(err => {
                        message.channel.send(`${err.message}`)
                    });
                } else {
                    if (!args[1]) {
                        message.channel.send('Provide a good reason to ban a member.').catch(err => {
                            message.channel.send(`${err.message}`)
                        });
                    } else {
                        const guildId = message.guild.id;
                        const userId = target.id;
                        let reason = 'Undefined'
                        if (args[1]) {
                            reason = args.slice(1).join(' ')
                        }
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
                                    if (results.warnings.length != 0) {
                                        for (const warning of results.warnings) {
                                            const { author, userID, timestamp, reason, infrID } = warning
                                            infr = parseInt(infrID, 10)
                                        }
                                        infrID += parseInt(infr, 10)
                                    }
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
                            infrType,
                            infrID
                        }

                        const embedMsg = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Banned:')
                            .setFooter(`Infraction ID: ${infrID}`)
                            .addFields({
                                name: 'Reason:',
                                value: `${args.slice(1).join(' ')}`
                            });
                        message.channel.send({ embeds: [embedMsg] }).catch(err => {
                            message.channel.send(`${err.message}`)
                        });
                        target.send({ embeds: [embedMsg] }).catch(err => {
                            message.channel.send(`${err.message}`)
                        });
                        sLogsChannel.send({ embeds: [embedMsg] }).catch(err => {
                            message.channel.send(`${err.message}`)
                        });
                        target.ban().catch(err => {
                            message.channel.send(`${err.message}`)
                        });
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
            } else {
                message.channel.send('cant find that member');
            }
        } catch (e) {
            require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
        }
    }
}
