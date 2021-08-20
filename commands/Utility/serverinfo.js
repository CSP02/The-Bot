module.exports = {
    name: 'serverinfo',
    aliases: ['serverinfo', 'si'],
    description: "sends the info of the server",
    syntax: '!serveringfo',
    permissions: ['VIEW_CHANNEL'],
    execute(client, message, args, Discord) {
        serverRoles = ""
        serverTeams = ""
        message.guild.roles.cache.forEach(roles => {
            if (roles.name === '@everyone' || roles.name === 'admin' || roles.name === 'Muted' || roles.name.includes('Bot') || roles.name === 'mod' || roles.name === 'Staff' || roles.name === 'ModMail' || roles.name.includes('Server Booster') || roles.name === 'event manager' || roles.name.includes('voted') || roles.name.includes('Dyno') || roles.name === 'Groovy' || roles.name.includes('manager') || roles.name.includes('bot') || roles.name.includes('Admin') || roles.name.includes('Denz')) {
                return
            }
            else if (roles.name.includes("Team")) {
                serverTeams += `${roles}\n`

            } else {
                serverRoles += `${roles}\n`
            }
        })
        if (serverTeams === "") {
            serverTeams += "Server has no Teams."
        }


        server = message.guild
        const embedMsg = new Discord.MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Server Info:')

            .addFields({ name: 'Server Name:', value: `${server.name}` }, { name: 'Member Count:', value: `${server.memberCount}` },
                { name: "Owner:", value: `<@${server.ownerId}>` },
                { name: "Created At:", value: `${server.createdAt}` },
                { name: 'Roles:', value: `${serverRoles}` },
                { name: 'Teams:', value: `${serverTeams}` }
            );
        message.channel.send({ embeds: [embedMsg] })
    }
}