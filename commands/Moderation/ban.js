module.exports = {
    name: 'ban',
    description: 'ban command',
    execute(client, message, args, Discord) {
        const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
        const server = message.guild;

        if (message.member.hasPermission('BAN_MEMBERS')) {
            const target = message.mentions.users.first();
            message.channel.send(target);
            if (target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                if (memberTarget.hasPermission('BAN_MEMBERS')) {
                    message.channel.send('Be a good mod');
                } else {
                    if (!args[1]) {
                        message.channel.send('Provide a good reason to ban a member.');
                    } else {
                        memberTarget.ban();

                        const embedMsg = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Banned:')
                            .setDescription(`<@${memberTarget.user.id}> has been banned`)
                            .addFields({
                                name: 'Reason:',
                                value: `${args.slice(1).join(' ')}`
                            });
                        message.channel.send(embedMsg);
                        memberTarget.send(embedMsg);
                        sLogsChannel.send(embedMsg);
                    }
                }
            } else {
                message.channel.send('cant find that member');
            }
        }
        else {
            message.reply('you have no permission');
        }
    }
}
