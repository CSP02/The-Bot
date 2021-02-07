module.exports = {
    name: 'ban',
    description: "ban command",
    execute(client, message, args, Discord) {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const target = message.mentions.users.first();
            message.channel.send(target);
            if (target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                memberTarget.ban();

                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Banned:')
                    .setDescription(`<@${memberTarget.user.id}> has been banned`)
                    .addFields(
                        { name: 'Reason:', value: `${args[1]}` }

                    )
                message.channel.send(embedMsg);
            }
            else {
                message.channel.send('cant find that member');
            }
        }
        else {
            message.reply('you have no permission');
        }
    }
}
