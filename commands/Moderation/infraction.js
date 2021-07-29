//INFRACTIONS COMMAND

const mongo = require('../../mongo')
const schema = require('../../schema')

module.exports = {
    name: 'infraction',
    description: 'sends infraction details by infraction ids',
    aliases: ['infr', 'wi'],
    syntax: '!infr <infraction ID> || <user>',
    permissions: ['VIEW_AUDIT_LOG'],

    async execute(client, message, args, Discord) {
        var messId = ''
        const msg = message.channel.messages
        const mentionedUser = message.mentions.users.first()
        message.channel.send('connecting to database.....').then(mess => {
            messId += mess.author.lastMessageID
        })


        await mongo().then(async mongoose => {
            try {
                const guildId = message.guild.id
                const results = await schema.findOne({
                    guildId
                })
                msg.resolve(messId).edit('Connection successfull!\nSearching the mentioned Infractions.\n')
                if (results === null) return msg.resolve(messId).edit("No warnings are found in this server.")
                else {
                    let resn = ' '
                    let athr = ' '
                    let target = ' '
                    let infrId = 'Infraction ID: '
                    let infrTp = ' '
                    let mem = message.guild.members.cache
                    let isInfrId = false
                    let isUserId = false

                    for (const warning of results.warnings) {
                        const { author, userID, timestamp, reason, infrType, infrID } = warning
                        if (args[0] && !isNaN(args[0])) {
                            if (infrID == args[0]) {
                                athr += `${mem.get(author)}`
                                resn += `${reason}`
                                target += `${mem.get(userID)}`
                                infrId += infrID
                                infrTp += `${infrType}`
                                isInfrId = true

                            } else if (mem.get(args[0])) {
                                if (userID == args[0]) {
                                    target = `${mem.get(userID)}`
                                    infrId += infrID + ', '
                                }
                                isUserId = true
                            }
                        } else if (message.mentions.users.first()) {
                            const mentUserId = message.mentions.users.first().id
                            if (userID == mentUserId) {
                                target = `${mem.get(userID)}`
                                infrId += infrID + ', '
                                isUserId = true
                            }
                        }
                    }
                    var memb = message.guild.members.cache.get(args[0])
                    if (!memb && !mentionedUser) {
                        isInfrId = true
                    }
                    if (isInfrId) {
                        if ((athr == ' ' || resn == ' ' || target == ' ')) {
                            msg.resolve(messId).edit(`There is no warning with infraction id ${args[0]}`)
                        } else {
                            const embdmsg = new Discord.MessageEmbed()
                                .setTitle('Infraction')
                                .setColor('#ff0000')
                                .setFooter(`Infraction ID: ${infrId}`)
                                .addFields(
                                    { name: "Author", value: `${athr}` },
                                    { name: 'User', value: `${target}` },
                                    { name: 'Infraction Type:', value: `${infrTp}` },
                                    { name: 'Reason', value: `${resn}` },
                                )
                            msg.resolve(messId).edit('Results Found:')
                            msg.resolve(messId).edit(embdmsg)
                        }
                        isInfrId = false
                    } else if (isUserId) {
                        if (infrId == ' ' || target == ' ') {
                            msg.resolve(messId).edit(`There are no infractions for mentioned user.`)
                        } else {
                            const embdmsg = new Discord.MessageEmbed()
                                .setTitle('Infraction')
                                .setColor('#ff0000')
                                .setFooter(`use !infr <infrID> to get more info about the infraction.`)
                                .addFields(
                                    { name: 'User', value: `${target}` },
                                    { name: 'Infraction IDs', value: `${infrId}` },
                                )
                            msg.resolve(messId).edit('Results Found:')
                            msg.resolve(messId).edit(embdmsg)
                        }
                        isUserId = false
                    }
                }

            } finally {
                messId = ''
                mongoose.connection.close()
            }
        })
    }
}