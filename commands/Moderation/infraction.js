const mongo = require('../../mongo')
const schema = require('../../schema')

module.exports = {
    name: 'infraction',
    description: 'sends warning details by infraction ids',
    aliases: ['infr', 'wi'],

    async execute(client, message, args, Discord) {
        await mongo().then(async mongoose => {
            try {
                const guildId = message.guild.id
                const results = await schema.findOne({
                    guildId
                })
                if (results === null) return message.channel.send("No warnings are found in this server.")
                else {
                    let resn = ' '
                    let athr = ' '
                    let target = ' '
                    let infrId = 'Infraction ID: '
                    let mem = message.guild.members.cache

                    for (const warning of results.warnings) {
                        const { author, userID, timestamp, reason, infrID } = warning
                        if (infrID == args[0]) {
                            athr += `${mem.get(author)}`
                            resn += `${reason}`
                            target += `${mem.get(userID)}`
                            infrId += infrID
                        }
                    }
                    if (athr == ' ' || resn == ' ' || target == ' ') {
                        message.channel.send(`There is no warning with infraction id ${args[0]}`)
                    } else {
                        const embdmsg = new Discord.MessageEmbed()
                            .setTitle('Warning')
                            .setColor('#ff0000')
                            .setFooter(`${infrId}`)
                            .addFields(
                                { name: "Author", value: `${athr}` },
                                { name: 'User', value: `${target}` },
                                { name: 'Warning', value: `${resn}` },
                            )

                        message.channel.send(embdmsg)
                    }
                }

            } finally {
                mongoose.connection.close()
            }
        })
    }
}