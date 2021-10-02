//INFRACTIONS COMMAND

const mongo = require('../../schemas/mongo')
const schema = require('../../schemas/schema')

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
                msg.channel.send('Connection successfull!\nSearching the mentioned Infractions.\n')
                if (results === null) return message.channel.send("No warnings are found in this server.")
                else {
                    let resn = ' '
                    let athr = ' '
                    let target = ' '
                    let infrId = 'Infraction ID: '
                    let infrTp = ' '
                    let isInfrId = false
                    let isUserId = false

                    for (const warning of results.warnings) {
                        const { author, userID, timestamp, reason, infrType, infrID } = warning

                        if (args[0] && !isNaN(args[0])) {
                            if (infrID == args[0]) {
                                athr += `<@${author}>`
                                resn += `${reason}`
                                target += `<@${userID}>`
                                infrId += infrID
                                infrTp += `${infrType}`
                                isInfrId = true

                            } else if (message.client.users.cache.get(args[0])) {
                                if (userID == args[0]) {
                                    target = `<@${userID}>`
                                    infrId += infrID + ', '
                                }
                                isUserId = true
                            }
                        } else if (message.mentions.users.first()) {
                            const mentUserId = message.mentions.users.first().id
                            if (userID == mentUserId) {
                                target = `<@${userID}>`
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
                            message.channel.send(`There is no warning with infraction id ${args[0]}`)
                        } else {
                            const embdmsg = new Discord.MessageEmbed()
                                .setTitle('Infraction')
                                .setColor('#ff0000')
                                .setFooter(`${infrId}`)
                                .addFields(
                                    { name: "Author", value: `${athr}` },
                                    { name: 'User', value: `${target}` },
                                    { name: 'Infraction Type:', value: `${infrTp}` },
                                    { name: 'Reason', value: `${resn}` },
                                )
                            message.channel.send({ content: 'Results Found:', embeds: [embdmsg] })
                            //msg.resolve(messId).edit(embdmsg)
                        }
                        isInfrId = false
                    } else if (isUserId) {
                        if (infrId == ' ' || target == ' ') {
                            message.channel.send(`There are no infractions for mentioned user.`)
                        } else {
                            const embdmsg = new Discord.MessageEmbed()
                                .setTitle('Infraction')
                                .setColor('#ff0000')
                                .setFooter(`use !infr <infrID> to get more info about the infraction.`)
                                .addFields(
                                    { name: 'User', value: `${target}` },
                                    { name: 'Infraction IDs', value: `${infrId}` },
                                )
                            message.channel.send({ content: 'Results Found:', embeds: [embdmsg] })
                            //	msg.resolve(messId).edit(embdmsg)
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