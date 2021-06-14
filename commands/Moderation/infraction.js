//INFRACTIONS COMMAND

const mongo = require('../../mongo')
const schema = require('../../schema')

module.exports = {
    name: 'infraction',
    description: 'Send infraction details by infraction IDs.',
    aliases: ['infr', 'wi'],
    syntax: '!infr <infraction ID>',

    async execute(client, message, args, Discord) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) {
            message.channel.send(`Access denied`)
        } else {
            await mongo().then(async mongoose => {
                try {
                    const guildId = message.guild.id
                    const results = await schema.findOne({
                        guildId
                    })
                    if (results === null) return message.channel.send("No warnings are found in this server.")
                    else {
                        let resn = ' ';
                        let athr = ' ';
                        let target = ' ';
                        let infrId = 'Infraction ID: ';
                        let infrTp = ' ';
                        let mem = message.guild.members.cache;
                        let isInfrId = false;
                        let isUserId = false;

                        for (const warning of results.warnings) {
                            const { author, userID, timestamp, reason, infrType, infrID } = warning;
                            if (args[0] && !isNaN(args[0])) {
                                if (infrID == args[0]) {
                                    athr += `${mem.get(author)}`;
                                    resn += `${reason}`;
                                    target += `${mem.get(userID)}`;
                                    infrId += infrID;
                                    infrTp += `${infrType}`;
                                    isInfrId = true;

                                } else if (mem.get(args[0])) {
                                    if (userID == args[0]) {
                                        target = `${mem.get(userID)}`;
                                        infrId += infrID + ', ';
                                    }
                                    isUserId = true;
                                }
                            } else if (message.mentions.users.first()) {
                                ('MENTIONED working\n')
                                const mentUserId = message.mentions.users.first().id;
                                if (userID == mentUserId) {
                                    target = `${mem.get(userID)}`;
                                    infrId += infrID + ', ';
                                    isUserId = true;
                                }
                            }
                        }

                        if (isInfrId) {
                            if ((athr == ' ' || resn == ' ' || target == ' ')) {
                                message.channel.send(`There is no warning with infraction id ${args[0]}`);
                            } else {
                                const embdmsg = new Discord.MessageEmbed();
                                    .setTitle('Infractoin')
                                    .setColor('#ff0000')
                                    .setFooter(`${infrId}`)
                                    .addFields(
                                        { name: "Author", value: `${athr}` },
                                        { name: 'User', value: `${target}` },
                                        { name: 'Infraction Type:', value: `${infrTp}` },
                                        { name: 'Reason', value: `${resn}` },
                                    );

                                message.channel.send(embdmsg);
                            }
                            isInfrId = false;
                        } else if (isUserId) {
                            if (infrId == ' ' || target == ' ') {
                                message.channel.send(`There are no infractions for mentioned user.`);
                            } else {
                                const embdmsg = new Discord.MessageEmbed()
                                    .setTitle('Infraction')
                                    .setColor('#ff0000')
                                    .setFooter(`use !infr <infrID> to get more info about the infraction.`)
                                    .addFields(
                                        { name: 'User', value: `${target}` },
                                        { name: 'Infraction IDs', value: `${infrId}` },
                                    );

                                message.channel.send(embdmsg);
                            }
                            isUserId = false;
                        }
                    }

                } finally {
                    mongoose.connection.close();
                }
            })
        }
    }
}