module.exports = {
    name: 'unmute',
    description: "This is ping command",
    execute(client, message, args, Discord) {
        if (message.member.hasPermission('MUTE_MEMBERS')) {
            
            const target = message.mentions.users.first();
            
            if (target) {
                let mainRole = message.guild.roles.cache.find(role => role.name === 'shrimp');
                let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

                memberTarget = message.guild.members.cache.get(target.id);

                memberTarget.roles.remove(mutedRole.id);
                memberTarget.roles.add(mainRole.id);
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