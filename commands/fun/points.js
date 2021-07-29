const mongo = require('../../mongo')
const pointsSchema = require('../../pointsSchema')

module.exports = {
    name: 'points',
    slash: false,
    description: "gives points for the jam participants",
    permissions: ['KICK_MEMBERS', 'VIEW_CHANNEL'],
    syntax: 'For users:\n !points <user>\nFor staff: !points <number of points>\n',
    async execute(client, message, args, Discord) {
        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0]).user || message.member.user
        if (!args[0]) return message.channel.send("Specify user.")
        else if (!target) return message.reply("User not found")
        else if (!args[1]) {
            const guildId = message.guild.id
            const userId = target.id

            console.log(message.member.user)
            console.log(message.mentions.users.first())
            await mongo().then(async mongoose => {
                try {
                    const results = await pointsSchema.findOne({
                        guildId,
                        userId,
                    })
                    if (results == null) return message.channel.send(`**0 points.** Seems like not participated in jams.`)
                    let reply = `Total points of ${args[0]}:\n`
                    var totalPoints = parseInt('0', 10);
                    var author = ''
                    var i;
                    for (i = 0; i < results.points.length; i++) {
                        totalPoints += parseInt(results.points[i].points, 10);
                    }
                    const embdMsg = new Discord.MessageEmbed()
                        .setColor('#00ff00')
                        .setTitle('Total points:')
                        .setThumbnail(`${target.displayAvatarURL()}`)
                        .setFooter('keep participating for more points and a special role.')
                        .addFields(
                            { name: 'User', value: `${target}` },
                            { name: 'Total Points:', value: `${totalPoints} points` },

                        );
                    message.channel.send(embdMsg)
                    reply = null
                } finally {
                    mongoose.connection.close()
                }
            })
        }
        else if (target.bot) return message.channel.send("You cannot give points to a bot.")
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
                        userId
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
                .setTitle('Points:')
                .setThumbnail(`${target.displayAvatarURL()}`)
                .setFooter('keep participating for more points and a special role.')
                .addFields({ name: 'points:', value: `${target} has got ${points} points.` });
            message.channel.send(embedMsg)
        }
    }
}