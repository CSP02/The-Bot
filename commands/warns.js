const mongo = require("../mongo")
const schema = require("../schema")

module.exports = {
    name: 'warns',
    description: 'replies with the previous warns done by the mentioned user',
    aliases: ['list-warns', 'lstwarns', 'lw'],
    async execute(client, message, args, Discord) {
        const target = message.mentions.users.first()
        if (!target) return message.reply("Please mention the user")

        const guildId = message.guild.id
        const userId = message.member.id

        await mongo().then(async mongoose => {
            try {
                const results = await schema.findOne({
                    guildId,
                    userId
                })

                let reply = `Warnings of user <@${target.id}>:\n\n`

                for (const warning of results.warnings) {
                    const { author, user, timestamp, reason } = warning
                    if (user == target.tag) {
                        reply += `${author} warned ${user} on ${new Date(timestamp).toLocaleDateString()} for ${reason}.\n\n`
                        message.channel.send(reply)
                    }
                }
            } finally {
                mongoose.connection.close()
            }
        })
    }
}