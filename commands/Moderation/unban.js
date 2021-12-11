module.exports = {
    name: 'unban',
    description: 'unbans the mentioned member from a guild',
    syntax: '!unban <user>',
    permissions: ['BAN_MEMBERS'],
    async execute(client, message, args, Discord) {
        try {
            const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
            const server = message.guild;
            message.guild.bans.fetch(args[0]).then(bannedUser => {
                message.guild.members.unban(bannedUser.user.id).catch(console.error)
                const embedMsg = new Discord.MessageEmbed()
                    .setColor('#00ff00')
                    .setDescription(`${bannedUser.user.tag} was unbanned.`)
                message.channel.send({ embeds: [embedMsg] })
                sLogsChannel.send({ embeds: [embedMsg] })
            })
        } catch (e) {
            const emd = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('command raised an error in the source code:')
                .setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
            message.channel.send({ embeds: [emd] })
        }
    }
}
