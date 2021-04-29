const mongo = require('../../mongo')
const pointsSchema = require('../../pointsSchema')

module.exports = {
    name: 'points',
    description: "gives points for the jam participants",
    async execute(client, message, args, Discord) {
        const target = message.mentions.users.first();
        if (!target) return message.reply("please specfy the member to to give points. and say how many points to give")
        else if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('You have no permission.')
        else if (!args[1]) {
            const guildId = message.guild.id
            const userId = target.id

            await mongo().then(async mongoose => {
                try {
                    const results = await pointsSchema.findOne({
                        guildId,
                        userId,
                    })

                    let reply = `Recently added points of ${args[0]}:\n`

                    for (const point of results.points) {
                        const { author, points } = point
                        if (point.points === null) {
                            reply += '**Seems like you have no points participate a jam to get some points'
                        }
                        else {
                            reply += `**${points} points.**`
                        }

                        message.channel.send(reply).catch(error)
                    }
                    reply = null
                } finally {
                    mongoose.connection.close()
                }
            })
        }
        else if (target.bot) return message.channel.send("Bruh what...")
        else if (isNaN(args[1])) return message.reply('please enter a real number');
        else {
            memberTarget = message.guild.members.cache.get(target.id);
            args.shift();
            const guildId = message.guild.id;
            const userId = target.id;
            const points = args.join(' ');


            const pointsForJam = {
                author: message.member.user.tag,
                user: target.tag,
                points
            }


            await mongo().then(async mongoose => {
                try {
                    await pointsSchema.findOneAndUpdate({
                        guildId,
                        userId,
                    }, {
                        guildId,
                        userId,
                        $push: {
                            points: pointsForJam
                        }
                    }, {
                        upsert: true
                    })
                } finally {
                    mongoose.connection.close()
                }
            })
            const embedMsg = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('User won:')
                .setThumbnail(`${target.displayAvatarURL()}`)
                .setDescription('**keep participating for more points and a special role.**')
                .addFields({ name: 'points:', value: `${target} has got ${points} points.` });
            message.channel.send(embedMsg)
        }
    }
}