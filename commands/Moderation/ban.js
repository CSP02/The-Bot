//BAN COMMAND

const mongo = require('../../mongo')
const warnShema = require('../../schema')

module.exports = {
    name: 'ban',
    description: 'bans the mentioned user.',
    permissions: ['BAN_MEMBERS'],
    syntax: '!ban <user>',
    async execute(client, message, args, Discord) {
        const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
        const server = message.guild;
        const infrType = 'Ban'

        const target = message.mentions.users.first();
        const memberTarget = message.guild.members.cache.get(target.id) || message.guild.members.cache.get(`${args[0]}`)
        if (target) {
            if (memberTarget.hasPermission('BAN_MEMBERS')) {
                console.log('2nd')
                message.channel.send('Be a good mod').catch(err => {
                    message.channel.send(`${err.message}`)
                });
            } else {
                if (!args[1]) {
                    console.log('3rd')
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
                    console.log('4th')
                    message.channel.send(embedMsg).catch(err => {
                        message.channel.send(`${err.message}`)
                    });
                    console.log('5th')
                    memberTarget.send(embedMsg).catch(err => {
                        message.channel.send(`${err.message}`)
                    });
                    console.log('6th')
                    sLogsChannel.send(embedMsg).catch(err => {
                        message.channel.send(`${err.message}`)
                    });
                    console.log('7th')
                    memberTarget.ban().catch(err => {
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
            console.log('8th')
            message.channel.send('cant find that member');
        }
    }
}
