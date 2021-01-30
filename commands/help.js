module.exports = {
    name: 'help',
    description: "This is ping command",
    execute(client, message, args, Discord) {
        const embedMsg = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Help')
            .addFields(
                { name: 'Roles:', value: 'member' },
                { name: 'Ping:', value: 'Pong' },
                 )
            .setFooter('make sure to check the rules before messaging');
        message.channel.send(embedMsg);
    }
}