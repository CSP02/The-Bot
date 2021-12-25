module.exports = {
    name: 'ask',
    slash: false,
    description: "Ask a random question and bot will answer it.",
    aliases: ['asks', 'question'],
    permissions: ['VIEW_CHANNEL'],
    syntax: '!ask <question>',
    execute(client, message, args, Discord) {

        var i = parseInt('0', 10)
        var emojis = []

        message.guild.emojis.cache.forEach(emoji => {
            emojis[i] = emoji.name
            i++
        })

        const ansIndex = Math.floor(Math.random() * emojis.length);
        const emote = message.guild.emojis.cache.find(emo => emo.name === `${emojis[ansIndex]}`)


        let question = args[0];
        if (!question) return message.channel.send("Please enter the question ! ");
            let replies = ["Yes", "No", "Maybe", "Never", "Definitely !", "Ask again later", "Most likely", "Cannot predict now.", "indeed", "perhaps", `${emote}`]
            const answer = Math.floor(Math.random() * replies.length);
            const questions = args.join(" ");
            SendReply(replies, answer, questions)
        function SendReply(replies, answer, questions) {
            const embed = new Discord.MessageEmbed()
                .setColor('#e08aff')
                .setTitle('The magic 8 ball says:')
                .addFields(
                    { name: 'Question:', value: questions },
                    { name: 'Answer:', value: replies[answer] }
                )
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            message.channel.send({ embeds: [embed] });
        }
    }
}