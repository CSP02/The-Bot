module.exports = {
    name: 'bam',
    slash: false,
    description: 'bam fun command',
    permissions: ['VIEW_CHANNEL'],
    syntax: '!bam <user>',
    execute(client, message, args, Discord) {
        try {
            target = message.mentions.users.first();
            if (!target) {
                message.reply("mention a user bish.")
            } else if (!args[1]) {
                message.reply("Provide a reason bish")
            } else {
                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#ff0000')
                    .setTitle('Banned:')
                    .setDescription(`${target} has been banned`)
                    .addFields({
                        name: 'Reason:',
                        value: `${args.slice(1).join(' ')}`
                    });
                message.channel.send({ embeds: [embedMsg] });
            }
        } catch (e) {
            require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
        }
    }
}