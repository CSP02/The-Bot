const mongo = require('../mongo')
const warnShema = require('../schema')

module.exports = {
    name: 'warn',
    description: "warns the mentioned member",
    async execute(client, message, args, Discord) {
        const target = message.mentions.users.first();
        if (!target) return message.reply("please specfy the member to warn. and provide a good reason")
        else if (!message.member.hasPermission('MUTE_MEMBERS')) return message.reply('You have no permission.')
        else {
            if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You have no permission.')
            else {
                memberTarget = message.guild.members.cache.get(target.id) || message.guild.members.cache.get(args[0]);
                args.shift();
                const guildId = message.guild.id;
                const userId = message.member.id;
                const reason = args.join(' ')

                const warning = {
                    author: message.member.user.tag,
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
                const embedDmMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('warned user:')
                    .setThumbnail(`${target.displayAvatarURL()}`)
                    .setDescription(`<@${target.id}> has been warned`)
                    .addFields({ name: 'Reason:', value: `${reason}` });
                memberTarget.send(embedDmMsg)

                await mongo().then(async mongoose => {
                    try {
                        await warnShema.findOneAndUpdate({
                            guildId,
                            userId
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