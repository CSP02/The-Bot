module.exports = {
    name: 'react',
    description: 'reacts to the message you tagged or it will react to your message(using this command.)',
    syntax: '!react',
    execute(client, message, args, Discord) {
        var i = parseInt('0', 10)
        var emojis = []
        message.guild.emojis.cache.forEach(emoji => {
            emojis[i] = emoji.name
            i++
        })
        const ansIndex = Math.floor(Math.random() * emojis.length);
        message.channel.send(`${message.guild.emojis.cache.find(emo => emo.name === `${emojis[ansIndex]}`)}`).catch(console.error)
    }
}