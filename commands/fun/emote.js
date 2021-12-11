module.exports = {
    name: 'react',
    slash: false,
    description: 'reacts to the message you tagged or it will react to your message(using this command.)',
    syntax: '!react || !react <emoteName>(case sensitive)',
    permissions: ['VIEW_CHANNEL'],
    async execute(client, message, args, Discord) {
        try {
            if (!args[0]) {
                var messId = ' '
                var mssg = message.channel.messages
                await message.channel.send("Searching emojis in guild...").then(msg => {
                    messId = `${msg.author.lastMessageID}`
                })
                var i = parseInt('0', 10)
                var emojis = []
                mssg.channel.send("Searching for the emoji that suits...")
                message.client.emojis.cache.forEach(emoji => {
                    emojis[i] = emoji.name
                    i++
                })

                const ansIndex = Math.floor(Math.random() * emojis.length);
                message.channel.send(`${message.client.emojis.cache.find(emo => emo.name === `${emojis[ansIndex]}`)}`).catch(console.error)
            } else {
                let emote = await message.client.emojis.cache.find(emo => emo.name === `${args[0]}`)
                if (emote) {
                    message.channel.send(`${emote}`).catch(console.error)
                } else {
                    message.channel.send("Emote not found!")
                }
            }
        } catch (e) {
            const emd = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('command raised an error in the source code:')
                .setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
            message.channel.send({ embeds: [emd] })
        }
    }
}