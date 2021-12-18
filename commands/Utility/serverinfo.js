module.exports = {
    name: 'serverinfo',
    aliases: ['serverinfo', 'si'],
    description: "sends the info of the server",
    syntax: '!serveringfo',
    permissions: ['VIEW_CHANNEL'],
    execute(client, message, args, Discord) {
        try {
            serverRoles = ""
            serverTeams = ""

            server = message.guild
            const embedMsg = new Discord.MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Server Info:')

                .addFields({ name: 'Server Name:', value: `${server.name}` }, { name: 'Member Count:', value: `${server.memberCount}` },
                    { name: "Owner:", value: `<@${server.ownerId}>` },
                    { name: "Created At:", value: `${server.createdAt}` },
                    { name: 'Channel Count:', value: `${message.guild.channels.channelCountWithoutThreads}` })
            message.channel.send({ embeds: [embedMsg] })
        } catch (e) {
            require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
        }
    }
}