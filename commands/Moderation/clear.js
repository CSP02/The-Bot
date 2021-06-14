module.exports = {
    name: 'clear',
    description: 'Clears the number of messages mentioned or the messages of the mentinoed user in channel.',
    syntax: '!clear <number of messages>|<user>',
    async execute(client, message, args, Discord) {
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            const target = message.mentions.users.first();

            if (target) {
                const messages = message.channel.messages.fetch();
                const userMessage = (await messages).filter((m) => m.author.id === target.id, { max: args[1] });
                await message.channel.bulkDelete(userMessage).then(console.log(`messages of ${target} were deleted`));
            } else {
                if (!args[0]) return message.reply("Please enter the number of messages you want to clear.");

                if (isNaN(args[0])) return message.reply('Please enter a real number.');

                if (args[0] > 100) return message.reply('You cannot clear more than 100 messages.');
                if (args[0] < 1) return message.reply('You can\'t time travel.');

                await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                    message.channel.bulkDelete(messages);
                });
            }
        }
        else {
            message.reply('You didn\'t have the permission to use this command.');
        }
    }
}