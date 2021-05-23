module.exports = (Discord, client, guildMember) => {
    const serverLogsChn = guildMember.guild.channels.cache.find(chn => chn.name === 'server-logs')
    const embedMsg = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`${guildMember} left the server.`)
    serverLogsChn.send(embedMsg)
}