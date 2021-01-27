module.exports = {
    name: 'kick',
    description: "kick command",
    execute(message, args, Discord) {
        if (message.member.roles.cache.some(r => r.name === "king")) {
            const target = message.mentions.users.first();
            if (target) {
                target.users.kick();

                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Muted:')
                    .setDescription(`<@${memberTarget.user.id}> has been muted`)
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