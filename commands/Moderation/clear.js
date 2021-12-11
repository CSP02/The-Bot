module.exports = {
    name: 'clear',
    description: 'Clears the number of messages mentioned or the messages of the mentinoed user in channel ',
    syntax: '!clear <number of messages>|<user>',
    permissions: ['KICK_MEMBERS'],
    async execute(client, message, args, Discord) {
        try {
            const target = message.mentions.users.first();

            if (target) {
                const filter = m => m.author.id === target.id
                const userMessage = await message.channel.messages.fetch(/*{limit:args[1]}*/)
                userMessage.forEach(mess => {
                    console.log(mess.author.id === target.id)
                    if (mess.author.id === target.id)
                        mess.delete()
                    console.log(mess.content)
                })
            } else {
                if (!args[0]) return message.reply("please enter the number of messages you want to clear");

                if (isNaN(args[0])) return message.reply('please enter a real number');

                if (args[0] > 100) return message.reply('you cannot');
                if (args[0] < 1) return message.reply('you cant time travel');

                await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages).catch(e => {
                        message.channel.send(e.message)
                    });
                });
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