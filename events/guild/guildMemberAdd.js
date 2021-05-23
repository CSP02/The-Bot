module.exports = (Discord, client, guildMember) => {
    const serverLogsChn = guildMember.guild.channels.cache.find(chn => chn.name === 'server-logs')
    const server = guildMember.guild

    let welcomeRole = guildMember.guild.roles.cache.find(
        role => role.name === 'member') || guildMember.guild.roles.cache.find(role => role.name === 'shrimp')
    const embedMsg = new Discord.MessageEmbed()
        .setColor('#00ff00')
        .setDescription(`hurray! ${guildMember} joined the server.`)
    serverLogsChn.send(embedMsg)
    guildMember.roles.add(welcomeRole);
}