module.exports = {
    name: 'ban',
    description: "ban command",
    execute(client, message, args, Discord) {
        //check the logs channel in a server so th at we can logs the message right when the member was banned
        const sLogsChannel = client.channels.cache.get('811997907473268788')

        //check if the messaged member that means one who uses the command 
        //has BAN_MEMBERS permission to make sure he / she is not a mod or an admin
        if (message.member.hasPermission('BAN_MEMBERS')) {
            //after confirmation we are assigning the mentioned user to the target
            const target = message.mentions.users.first();
            //check the member was mentioned if not mentioned the bot will ask to mention someone
            if (target) {
                //memberTarget was the actual member we have to ban
                const memberTarget = message.guild.members.cache.get(target.id);
                //check if the mentioned user has the BAN_MEMBERS permission to make sure he is not a mod or admin
                if (memberTarget.hasPermission("BAN_MEMBERS")) {
                    //sends the message to be a good mod
                    message.channel.send("Be a good mod");
                } else { //executes if the mentioned member has no BAN_MEMBERS permission
                    if (!args[1]) {
                        //if there is no reason provided the bot will ask for the reason
                        message.channel.send("Provide a good reason to ban a member.")
                    } else {
                        memberTarget.ban(); //bans the men=mber after confirming all the requirements

                        //embed constructor to send an embed message in DM and in channel
                        const embedMsg = new Discord.MessageEmbed()
                            .setColor('#ff0000')
                            .setTitle('Banned:')
                            .setDescription(`<@${memberTarget.user.id}> has been banned`)
                            .addFields(
                                { name: 'Reason:', value: `${args.slice(2).join(" ")}` }

                            )
                        message.channel.send(embedMsg); //send the embed message in the channel
                        memberTarget.send(`You were banned from the server:\n**${message.guild.name}**.\n Because:\n **${args.slice(2).join(" ")}**. Take care.`) //send the DM message about the banning

                        sLogsChannel.send(`${memberTarget} was banned from this server.`) // send a message in the logs channel after the member was banned
                    }
                }
            }
            else {
                //if the mentioned memeber was not found or not there in the server bot will reply with this message
                message.channel.send('cant find that member');
            }
        }
        else {
            // if the one who is using the command has no BAN_MEMBERS permission then the bot will reply this message.
            message.reply('you have no permission');
        }
    }
}
