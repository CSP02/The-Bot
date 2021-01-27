module.exports = {
    name: 'embed',
    description: "This is ping command",
    execute(message, args, Discord) {
        const embedMsg = new Discord.MessageEmbed()
            .setColor('#66ff66')
            .setTitle('rules')
            .setDescription('this is the embed to this bot')
            .addFields(
                { name: 'Name:', value: 'The bot' }

            )
            .setFooter('make sure to check the rules before messaging');
        message.channel.send(embedMsg);
    }
}