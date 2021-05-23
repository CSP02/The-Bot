module.exports = (Discord, client, guild) => {
    let chn
    const everyoneRole = guild.roles.everyone
    everyoneRole.setPermissions(0)
    guild.channels.create('server-logs', {
        type: 'text',
        permissionOverwrites: [
            {
                id: everyoneRole.id,
                deny: ['VIEW_CHANNEL'],
            },
        ],
    })

    guild.roles.create({
        data: {
            name: 'member',
            color: 'GREY',
        },
    })
    guild.roles.create({
        data: {
            name: 'Muted',
            color: 'GREY',
        },
    })
}