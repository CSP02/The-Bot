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
        if (target && !target.bot) {
            Warns(target)
        } else if (target.bot) {
            message.channel.send("Invalid User.")
        } else if (args[0] && !isNaN(args[0])) {
            const ment = message.guild.members.cache.get(args[0])
            Warns(ment)
        }
        else {
            message.reply('cant find member')
        }


        async function Warns(target) {
            const guildId = message.guild.id
            const userId = target.id
            let reply = ' '

            await mongo().then(async mongoose => {
                try {
                    const results = await schema.findOne({
                        guildId
                    })

                    for (const warning of results.warnings) {
                        const { author, userID, timestamp, reason, infrID } = warning
                        if (userID == target.id) {
                            infrCount++;
                            reply += `${message.guild.members.cache.get(author)} warned ${message.guild.members.cache.get(userID)} on ${new Date(timestamp).toLocaleDateString()} because ${reason}.\n\nInfraction ID: ${infrID}\n\n`
                        }
                    }
                    if (reply == ' ') {
                        reply = 'The user has no Warnings.'
                    } else {
                        return
                    }
                } finally {
                    mongoose.connection.close()
                }
            })

            console.log(`${reply}`)
            const embdmsg = new Discord.MessageEmbed()
                .setTitle('Warns')
                .setColor('#ff0000')
                .setFooter(`Warns of the mentioned user and their infraction IDs respectively.`)
                .addFields(
                    { name: 'Warnings of user:', value: `${target}` },
                    { name: 'Warnings:', value: `${reply}` },
                )
            message.channel.send(embdmsg)
        }
    }
}