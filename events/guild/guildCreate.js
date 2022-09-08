module.exports = (Discord, client, guild) => {
    let chn
    const everyoneRole = guild.roles.everyone
    everyoneRole.setPermissions('VIEW_CHANNEL')
    const embedMsg = new Discord.EmbedBuilder()
        .setTitle('An important notice to the owner of this server!')
        .setDescription('The-Bot contains a special muting system where members of the server can be muted by using ``!mute`` command if they broke any rule. This will add a new role to the mentioned member and they cannot speak in the server. So to make this possible the permissions of the roles are based on @everyone role so make sure you disabled all the permissions expect VIEW_CHANNEL permission. But this feature is still in development. This is so important. We are trying to make it automatically it might available from next update.\n\n Thank you')
        .setFooter('~The-Bot developer.')
    guild.fetchOwner().then(guildMem =>{
    	guildMem.send({embeds:[embedMsg]})
    })
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