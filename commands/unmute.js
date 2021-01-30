module.exports = {
    name: 'unmute',
    description: "This is ping command",
    execute(client, message, args){
        if(message.member.roles.cache.some(r => r.name === "king")){
            const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(mutedRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
        }
        else{
            message.channel.send('cant find that member');
        }
        }
        else{
            message.reply('you have no permission');
        }
    }
}