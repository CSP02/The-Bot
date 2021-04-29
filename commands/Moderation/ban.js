module.exports = {
    name: 'ban',
    description: "ban command",
    execute(client, message, args, Discord) {
        //Check the logs channel of the server so that we can logs the message right when the member was banned
        const sLogsChannel = client.channels.cache.get('811997907473268788')

        //check if the person who uses the command has BAN_MEMBERS permission to make sure that S/he is a mod or an admin
        if (message.member.hasPermission('BAN_MEMBERS')) {
            //If the person has the ban members perms, then the bot will assign the mentioned user as the target
            const target = message.mentions.users.first();
            //Check if the member was mentioned. If no member has been mentioned, the bot will ask to mention someone
            if (target) {
                //memberTarget is the actual member we have to ban
                const memberTarget = message.guild.members.cache.get(target.id);
                //If the mentioned user also has the ban memmbers perms, then
                if (memberTarget.hasPermission("BAN_MEMBERS")) {
                    //The bot will send this message
                    message.channel.send("Be a good mod");
                } else { //If the mentioned user does not have the perms, then excute.
                    if (!args[1]) {
                        //If no reason has been provided, the bot will ask for a reason
                        message.channel.send("Provide a good reason to ban a member.")
                    } else {
                        memberTarget.ban(); //If all the requirments match, then the bot will ban the mentioned user.

                        //embed constructor to send an embed message in DM and in channel
                        const embedMsg = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Banned:')
                            .setDescription(`<@${memberTarget.user.id}> has been banned`)
                            .addFields(
                                { name: 'Reason:', value: `${args.slice(2).join(" ")}` }

                            )
                        message.channel.send(embedMsg); //send the embed message in the channel
                        //Send this message in the dms of the banned user
                        memberTarget.send(`You were banned from the server:\n**${message.guild.name}**.\n Because:\n **${args.slice(2).join(" ")}**. Take care.`) //send thi message about the banning

                        sLogsChannel.send(`${memberTarget} was banned from this server.`) // Send this message in the server logs after the user has been banned
                    }
                }
            }
            else {
                //If the mentioned user could not be found, the bot will reply with this message
                message.channel.send('cant find that member');
            }
        }
        else {
            //If the person who uses this command, does not have BAN_MEMBERS permission, then the bot will reply this message
            message.reply('you have no permission');
        }
    }
}
