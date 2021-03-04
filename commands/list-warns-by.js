const mongo = require("../mongo")
const schema = require("../schema")

module.exports = {
    name: 'list-warns-by',
    description: 'replies with the previous warns done by the mentioned user',
    aliases: ['lwby', 'lstwrnsby'],
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

                let reply = `warnings by <@${userId}>:\n\n`

                for (const warning of results.warnings) {
                    const { author, timestamp, reason } = warning

                    reply += `${author} warned on ${new Date(timestamp).toLocaleDateString()} for ${reason}.\n\n`
                    message.channel.send(reply)
                }
                reply = null
            } finally {
                mongoose.connection.close()
            }
        })
    }
}