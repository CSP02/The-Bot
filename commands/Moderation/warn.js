const mongo = require('../../mongo')
const warnShema = require('../../schema')

module.exports = {
    name: 'warn',
    description: "ban command",
    async execute(client, message, args, Discord) {
        let target = message.mentions.users.first()
        let mentioned = message.mentions.members.first();
        if (!target && !args[0]) return message.reply("please specfy the member to warn. and provide a good reason")
        if (target) {
            Warn(target)
        } else if (args[0] && !isNaN(args[0])) {
            client.users.fetch(args[0]).then(ment => {
                Warn(ment)
            })
        } else {
            message.reply('cant find member')
        }


        async function Warn(target) {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) message.reply('You have no permission.')
            else if (mentioned.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('ADMINISTRATOR')) return message.reply('You cannot, be a good mod.')
            else {
                memberTarget = message.guild.members.cache.get(target.id) || message.guild.members.cache.get(args[0]);
                args.shift();
                const guildId = message.guild.id;
                const userId = message.member.id;
                const reason = args.join(' ')

                const warning = {
                    author: message.member.user.tag,
                    user: target.tag,
                    timestamp: new Date().getTime(),
                    reason
                }

                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('warned user:')
                    .setThumbnail(`${target.displayAvatarURL()}`)
                    .setDescription(`<@${target.id}> has been warned`)
                    .addFields({ name: 'Reason:', value: `${reason}` });

                message.channel.send(embedMsg);
                memberTarget.send(embedMsg)

                await mongo().then(async mongoose => {
                    try {
                        await warnShema.findOneAndUpdate({
                            guildId,
                            userId,
                        }, {
                            guildId,
                            userId,
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
    }
}