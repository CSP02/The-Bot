//WARN COMMAND

const mongo = require('../../mongo');
const warnShema = require('../../schema');

module.exports = {
    name: 'warn',
    description: "Warns the Mentioned member in a Guild with an InfractionID.",
    syntax: '!warn <user>',
    async execute(client, message, args, Discord) {
        const infrType = 'warning';
        let mentioned = message.mentions.members.first();
        if (!mentioned && !args[0]) return message.reply("please specfy the member to warn. and provide a good reason")
        if (mentioned) {
            Warn(mentioned);
        } else if (args[0] && !isNaN(args[0])) {
            const ment = message.guild.members.cache.get(args[0]);
            Warn(ment);
        } else if (!args[0]) {
            message.channel.send('Specify the user.');
        } else {
            message.reply('Can\'t find the User mentioned.');
        }


        async function Warn(target) {
            if (!message.member.hasPermission('MANAGE_MESSAGES')) message.reply('You have no permission.')
            else if (target.hasPermission('ADMINISTRATOR') && !message.member.hasPermission('ADMINISTRATOR')) return message.reply('You cannot, be a good mod.')
            else {
                const guildId = message.guild.id;
                const userId = target.id;
                let reason = 'Undefined';
                if (args[1]) {
                    reason = args.slice(1).join(' ');
                }
                var infrID = parseInt('1', 10);


                await mongo().then(async mongoose => {
                    try {
                        const results = await warnShema.findOne({
                            guildId
                        });
                        if (results == null) {
                            return;
                        } else {
                            let reply = ' ';
                            var infr;
                            for (const warning of results.warnings) {
                                const { author, userID, timestamp, reason, infrType, infrID } = warning;
                                infr = parseInt(infrID, 10);
                            }
                            infrID += parseInt(infr, 10);
                        }
                    } finally {
                        mongoose.connection.close();
                    }
                })


                const warning = {
                    author: message.member.user.id,
                    userID: userId,
                    timestamp: new Date().getTime(),
                    reason,
                    infrType,
                    infrID
                };

                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('warned user:')
                    .setThumbnail(`${target.user.displayAvatarURL()}`)
                    .setDescription(`<@${target.id}> has been warned`)
                    .setFooter(`Infraction ID: ${infrID}`)
                    .addFields({ name: 'Reason:', value: `${reason}` });

                message.channel.send(embedMsg);
                target.send(embedMsg);

                await mongo().then(async mongoose => {
                    try {
                        await warnShema.findOneAndUpdate({
                            guildId,
                        }, {
                            guildId,
                            $push: {
                                warnings: warning
                            }
                        }, {
                            upsert: true
                        })
                    } finally {
                        mongoose.connection.close();
                    }
                })
            }
        }
    }
}