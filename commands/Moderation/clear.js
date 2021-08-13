module.exports = {
    name: 'clear',
    description: 'Clears the number of messages mentioned or the messages of the mentinoed user in channel ',
    syntax: '!clear <number of messages>|<user>',
    permissions: ['KICK_MEMBERS'],
    async execute(client, message, args, Discord) {
        if (message.member.permissions.has('MANAGE_MESSAGES')) {
            const target = message.mentions.users.first();

            if (target) {
                const messages = await message.channel.messages.fetch();
                const filter = m => m.author.id === target.id;
                const userMessage = message.channel.awaitMessages({ filter, max: args[0] }).then(collected => console.log(collected.size))
                    .catch(collected => console.log(`After a minute, only ${collected.size} out of 4 voted.`));
                // const userMessage = messages.filter({m => m.author.id === target.id, max:args[0]})
                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('clearYesUser')
                            .setLabel("Yes")
                            .setStyle('DANGER'),

                        new Discord.MessageButton()
                            .setCustomId('clearNoUser')
                            .setLabel("No")
                            .setStyle('PRIMARY')
                    )
                await message.reply({ content: `Are you sure want to delete ${target}'s' messages?`, components: [row] })



            } else {
                if (!args[0]) return message.reply("please enter the number of messages you want to clear");

                if (isNaN(args[0])) return message.reply('please enter a real number');

                if (args[0] > 100) return message.reply('you cannot');
                if (args[0] < 1) return message.reply('you cant time travel');

                const row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageButton()
                            .setCustomId('clearYes')
                            .setLabel("Yes")
                            .setStyle('DANGER'),

                        new Discord.MessageButton()
                            .setCustomId('clearNo')
                            .setLabel("No")
                            .setStyle('PRIMARY')
                    )
                await message.reply({ content: `Are you sure want to delete ${args[0]} messages?`, components: [row] })
            }
        }
        else {
            message.reply('you have no permission to use this command');
        }
    }
}