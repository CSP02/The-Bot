module.exports = (Discord, client, guildMember) => {

    const sLogsChannel = client.channels.cache.get('811997907473268788')
    const taLogsChannel = client.channels.cache.get('810141713205035019')

    const server = guildMember.guild

    let welcomeRole = guildMember.guild.roles.cache.find(
        role => role.name === 'member'
    );

    if (server.id === '801451603860258861') {
        sLogsChannel.send(`hurray! ${guildMember} has joined.`)
    } else if (server.id === '795133444610457640') {
        taLogsChannel.send(`hurray! ${guildMember} has joined.`)
    }
    guildMember.roles.add(welcomeRole);
}