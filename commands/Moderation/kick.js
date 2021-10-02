//KICK COMMAND

const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')

module.exports = {
    name: 'kick',
    description: "kicks a member from th guild",
    syntax: '!kick <user>',
    permissions: ['KICK_MEMBERS'],
    async execute(client, message, args, Discord) {

        const sLogsChannel = client.channels.cache.find(chn => chn.name === 'server-logs')
        const server = message.guild
        const infrType = 'Kick'
        const target = message.mentions.users.first();
        if (target) {
            if (args[1]) {
                const memberTarget = message.guild.members.cache.get(target.id);
                if (memberTarget.permissions.has('KICK_MEMBERS')) { message.reply("You can't do that, but nice try though.") }
                else {
                    memberTarget.kick();



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
                                        const { author, userID, timestamp, reason, infrType, infrID } = warning
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
                        .setTitle('Kicked:')
                        .setDescription(`<@${memberTarget.user.id}> has been kicked`)
                        .setFooter(`Infraction ID: ${infrID}`)
                        .addFields(
                            { name: 'Reason:', value: `${args.slice(1).join(" ")}` }
                        )
                    message.channel.send({ embeds: [embedMsg] });
                    memberTarget.send(`You were kicked from the server:\n**${message.guild.name}** Because:\n**${args.slice(2).join(" ")}**. Take care.`)
                    sLogsChannel.send({ embed: [embedMsg] })
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
            } else {
                message.channel.send('Provide a good reason.')
            }
        }
        else {
            message.channel.send('cant find that member');
        }
    }
}