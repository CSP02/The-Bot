module.exports = {
    name: 'kick',
    description: "kick command",
    execute(client, message, args, Discord) {

        const sLogsChannel = client.channels.cache.get('811997907473268788')

        if (message.member.hasPermission('KICK_MEMBERS')) {
            const target = message.mentions.users.first();
            if (target) {
                if (args[1]) {
                    const memberTarget = message.guild.members.cache.get(target.id);
                    if (memberTarget.hasPermission('KICK_MEMBERS')) { message.reply("You can't do that, but nice try though.") }
                    else {
                        memberTarget.kick();

                        const embedMsg = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Kicked:')
                            .setDescription(`<@${memberTarget.user.id}> has been kicked`)
                            .addFields(
                                { name: 'Reason:', value: `${args.slice(1).join(" ")}` }
                            )
                        message.channel.send(embedMsg);
                        memberTarget.send(`You were kicked from the server:\n**${message.guild.name}** Because:\n**${args.slice(2).join(" ")}**. Take care.`)

                        sLogsChannel.send(`${memberTarget} was kicked from the server.`)

                    }
                } else {
                    message.channel.send('Provide a good reason.')
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