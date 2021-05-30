//BAN COMMAND

const mongo = require('../../mongo')
const warnShema = require('../../schema')

module.exports = {
    name: 'ban',
    description: 'ban command',
    async execute(client, message, args, Discord) {
        const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
        const server = message.guild;

        if (message.member.hasPermission('BAN_MEMBERS')) {
            const target = message.mentions.users.first();
            message.channel.send(target);
            if (target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                if (memberTarget.hasPermission('BAN_MEMBERS')) {
                    message.channel.send('Be a good mod');
                } else {
                    if (!args[1]) {
                        message.channel.send('Provide a good reason to ban a member.');
                    } else {
                        memberTarget.ban();



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
                            infrType,
                            infrID
                        }

                        const embedMsg = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Banned:')
                            .setDescription(`<@${memberTarget.user.id}> has been banned`)
                            .setFooter(`Infraction ID: ${infrID}`)
                            .addFields({
                                name: 'Reason:',
                                value: `${args.slice(1).join(' ')}`
                            });
                        message.channel.send(embedMsg);
                        memberTarget.send(embedMsg);
                        sLogsChannel.send(embedMsg);
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
        }
        else {
            message.reply('you have no permission');
        }
    }
}
