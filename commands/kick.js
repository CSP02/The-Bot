module.exports = {
    name: 'kick',
    description: "kick command",
    execute(message, args, Discord) {
        if (message.member.roles.cache.some(r => r.name === "king")) {
            const target = message.mentions.users.first();
            message.channel.send(target);
            if (target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                memberTarget.kick();

                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Kicked:')
                    .setDescription(`<@${memberTarget.user.id}> has been kicked`)
                    .addFields(
                        { name: 'Reason:', value: `${args[1]}` }

                    )
                message.channel.send(embedMsg);
                //message.channel.send(`<@${memberTarget.user.id}> has been muted`);
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