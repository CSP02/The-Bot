module.exports = {
    name: 'unmute',
    description: "This is ping command",
    execute(client, message, args, Discord) {
        if (message.member.hasPermission('MUTE_MEMBERS')) {
            const target = message.mentions.users.first();
            const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
            if (target) {

                let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
                let mutedRole = message.member.roles.cache.find(role => role.name === 'Muted');
                if (message.member.roles.cache.has(`${mutedRole.id}`)) {

                    memberTarget = message.guild.members.cache.get(target.id);
                    memberTarget.roles.remove(mutedRole.id);
                    memberTarget.roles.add(mainRole.id);
                    const embdMsg = new Discord.MessageEmbed()
                        .setDescription(`${memberTarget}was unmuted.`)
                        .setColor('#00ff00')
                    sLogsChannel.send(embdMsg)
                    message.channel.send(embdMsg)
                } else {
                    message.channel.send("You are not muted.")
                }
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