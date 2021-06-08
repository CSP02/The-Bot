module.exports = (Discord, client, guildMember) => {
    const serverLogsChn = guildMember.guild.channels.cache.find(chn => chn.name === 'server-logs')
    const server = guildMember.guild

    let welcomeRole = guildMember.guild.roles.cache.find(
        role => role.name === 'member') || guildMember.guild.roles.cache.find(role => role.name === 'shrimp')
    guildMember.roles.add(welcomeRole).catch(console.error);

    const embedMsg = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`hurray! ${guildMember.user.tag} joined the server.`)
        .setTitle(`Joined:`)
        .setThumbnail(`${guildMember.user.displayAvatarURL()}`)
        .addFields(
            { name: 'userID:', value: `${guildMember.user.id}` }
        )
    serverLogsChn.send(embedMsg).catch(console.error)
}