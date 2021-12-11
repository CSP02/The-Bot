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
            const emd = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('command raised an error in the source code:')
                .setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
            message.channel.send({ embeds: [emd] })
        }
    }
}