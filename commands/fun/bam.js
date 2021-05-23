module.exports = {
    name: 'bam',
    description: 'bam fun command',
    execute(client, message, args, Discord) {
        target = message.mentions.users.first();
        if (!target) {
            message.reply("mention a user bish.")
        } else if (!args[1]) {
            message.reply("Provide a reason bish")
        } else {
            const memberTarget = message.guild.members.cache.get(target.id);
            const embedMsg = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Banned:')
                .setDescription(`<@${memberTarget.user.id}> has been banned`)
                .addFields({
                    name: 'Reason:',
                    value: `${args.slice(1).join(' ')}`
                });
            message.channel.send(embedMsg);
        }
    }
}