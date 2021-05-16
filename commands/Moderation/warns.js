const mongo = require("../../mongo")
const schema = require("../../schema")

module.exports = {
    name: 'warns',
    description: 'replies with the previous warns done by the mentioned user',
    aliases: ['list-warns', 'lstwrns', 'lw'],
    async execute(client, message, args, Discord) {
        let infrCount = parseInt('0', 10);
        let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user

        if (!target && !args[0]) return message.reply("please mention the user")
        if (target) {
            Warns(target)
        } else if (args[0] && !isNaN(args[0])) {
            client.users.fetch(args[0]).then(ment => {
                Warns(ment)
            })
        } else {
            message.reply('cant find member')
        }


        async function Warns(target) {
            const guildId = message.guild.id
            const userId = message.member.id
            let reply = ' '

            await mongo().then(async mongoose => {
                try {
                    const results = await schema.findOne({
                        guildId
                    })

                    for (const warning of results.warnings) {
                        const { author, user, timestamp, reason, infrID } = warning
                        if (user == target.tag) {
                            infrCount++;
                            reply += `${author} warned ${user} on ${new Date(timestamp).toLocaleDateString()} for ${reason}.\n\nInfraction ID: ${infrID}\n\n`
                        }
                        console.log(`${infrCount}`)
                    }
                } finally {
                    mongoose.connection.close()
                }
                const embdmsg = new Discord.MessageEmbed()
                    .setTitle('Warns')
                    .setColor('#ff0000')
                    .setFooter(`Warns of the mentioned user and their infraction IDs respectively.`)
                    .addFields(
                        { name: 'Warnings of user:', value: `${target}` },
                        { name: 'Warnings:', value: `${reply}` },
                    )
                message.channel.send(embdmsg)
            })
        }
    }
}