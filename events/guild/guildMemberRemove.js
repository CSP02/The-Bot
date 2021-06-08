module.exports = (Discord, client, guildMember) => {
    const serverLogsChn = guildMember.guild.channels.cache.find(chn => chn.name === 'server-logs')
    const embedMsg = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setTitle('Left:')
        .setDescription(`${guildMember.user.tag} left the server.`)
        .setThumbnail(`${guildMember.user.displayAvatarURL()}`)
        .addFields(
            { name: 'userID:', value: `${guildMember.user.id}` }
        )
    serverLogsChn.send(embedMsg).catch(console.error)
}