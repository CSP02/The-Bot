module.exports = (Discord, client, guild) => {
    let chn
    const everyoneRole = guild.roles.everyone
    everyoneRole.setPermissions('VIEW_CHANNEL')
    guild.channels.create('server-logs', {
        type: 'text',
        permissionOverwrites: [
            {
                id: everyoneRole.id,
                deny: ['VIEW_CHANNEL'],
            },
        ],
    }).catch(console.error)

    guild.roles.create({
        name: 'member',
        color: 'GREY',

    }).catch(console.error)
    guild.roles.create({
        name: 'Muted',
        color: 'GREY',
    }).catch(console.error)
}