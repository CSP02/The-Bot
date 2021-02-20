module.exports = {
    name: 'ban',
    description: "ban command",
    execute(client, message, args, Discord) {

        const sLogsChannel = client.channels.cache.get('811997907473268788')
        const taLogsChannel = client.channels.cache.get('810141713205035019')
        const server = message.guild


        if (message.member.hasPermission('BAN_MEMBERS')) {
            const target = message.mentions.users.first();
            message.channel.send(target);
            if (target) {
                const memberTarget = message.guild.members.cache.get(target.id);
                if (memberTarget.hasPermission("BAN_MEMBERS")) {
                    message.channel.send("Be a good mod");
                } else {
                    if (!args[1]) {
                        message.channel.send("Provide a good reason to ban a member.")
                    } else {
                        memberTarget.ban();

                        const embedMsg = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Banned:')
                            .setDescription(`<@${memberTarget.user.id}> has been banned`)
                            .addFields(
                                { name: 'Reason:', value: `${args.slice(2).join(" ")}` }

                            )
                        message.channel.send(embedMsg);
                        memberTarget.send(`You were banned from the server:\n**${message.guild.name}**.\n Because:\n **${args.slice(2).join(" ")}**. Take care.`)

                        if (server.id === '801451603860258861') {

                            sLogsChannel.send(`${memberTarget} has been muted.`)
                        } else if (server.id === '795133444610457640') {
                            taLogsChannel.send(`${memberTarget} has been  muted.`)
                        }
                    }
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
