module.exports = {
    name: 'clear',
    description: 'clear command',
    async execute(client, message, args, Discord) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {

            const target = message.mentions.users.first();
            const messages = message.channel.messages.fetch({ limit: args[1] })
            
            if (target) {
                if (!args[1]) return message.reply("please enter the number of messages you want to clear");

                if (isNaN(args[1])) return message.reply('please enter a real number');

                if (args[1] > 100) return message.reply('you cannot');
                if (args[1] < 1) return message.reply('you cant time travel');

                const userMessage = (await messages).filter(m => m.author.id === message.author.id);
                await message.channel.bulkDelete(userMessage)

            } else {
                if (!args[0]) return message.reply("please enter the number of messages you want to clear");

                if (isNaN(args[0])) return message.reply('please enter a real number');

                if (args[0] > 100) return message.reply('you cannot');
                if (args[0] < 1) return message.reply('you cant time travel');

                await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages);
                });
            }
        }
        else {
            message.reply('you have no permission to use this command');
        }
    }
}