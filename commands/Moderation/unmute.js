module.exports = {
    name: 'unmute',
    description: "Unmute the mentioned member in a Guild.",
    syntax: '!unmute <user>',
    execute(client, message, args, Discord) {
        if (message.member.hasPermission('MUTE_MEMBERS')) {
            const target = message.mentions.users.first();
            const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs');
            if (target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'member') || message.guild.roles.cache.find(role => role.name === 'shrimp');
                let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                console.log(mutedRole);
                if (message.member.roles.cache.has(`${mutedRole.id}`)) {
                    memberTarget = message.guild.members.cache.get(target.id);
                    memberTarget.roles.remove(mutedRole.id);
                    memberTarget.roles.add(mainRole.id);
                    const embdMsg = new Discord.MessageEmbed()
                        .setDescription(`${memberTarget}was unmuted.`)
                        .setColor('#00ff00');
                    sLogsChannel.send(embdMsg);
                    message.channel.send(embdMsg);
                } else {
                    message.channel.send("the Mentioned user is not muted.")
                }
            }
            else {
                message.channel.send("Can't find the Mentioned user.");
            }
        }
        else {
            message.reply('You didn\'t have the permission to use this Command.');
        }
    }
}