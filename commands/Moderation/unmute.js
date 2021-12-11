module.exports = {
    name: 'unmute',
    description: "unmutes the mentioned member in a guild",
    syntax: '!unmute <user>',
    permissions: ['VIEW_AUDIT_LOG'],
    execute(client, message, args, Discord) {
        try {
            if (message.member.permissions.has('MUTE_MEMBERS')) {
                const target = message.mentions.users.first();
                const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
                if (target) {
                    let mainRole = message.guild.roles.cache.find(role => role.name === 'member') || message.guild.roles.cache.find(role => role.name === 'shrimp');
                    let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');
                    memberTarget = message.guild.members.cache.get(target.id);
                    if (memberTarget.roles.cache.has(`${mutedRole.id}`)) {
                        memberTarget.roles.remove(mutedRole.id);

                        const embdMsg = new Discord.MessageEmbed()
                            .setDescription(`${memberTarget}was unmuted.`)
                            .setColor('#00ff00')
                        sLogsChannel.send({ embeds: [embdMsg] })
                        message.channel.send({ embeds: [embdMsg] })
                        console.log("MUTED\n\n\n" + mutedRole)
                    } else {
                        message.channel.send("Mentioned user is not muted.")
                    }
                }
                else {
                    message.channel.send('cant find that member');
                }
            }
            else {
                message.reply('you have no permission');
            }
        } catch (e) {
            const emd = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('command raised an error in the source code:')
                .setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
            message.channel.send({ embeds: [emd] })
        }
    }
}