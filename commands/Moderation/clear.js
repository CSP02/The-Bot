module.exports = {
    name: 'clear',
    async execute(client, message, args, Discord) {
        //check if the member that using this command has MANAGE_MESSAGE permissions 
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
            //check if the message of a particular memeber should be deleted
            const target = message.mentions.users.first();

            //check if there is a mention i.e the messages of someone
            if (target) {
                const messages = message.channel.messages.fetch();
                const userMessage = (await messages).filter((m) => m.author.id === target.id, { max: args[1] });
                await message.channel.bulkDelete(userMessage).then(console.log(`messages of ${target} were deleted`))
            } else {
                //executes if there is no mentions that means the messages will be deleted including your message
                //the amount is given in the args[1]
                if (!args[0]) return message.reply("please enter the number of messages you want to clear");

                //check if the given argument (args[1]) is an int or not
                if (isNaN(args[0])) return message.reply('please enter a real number');

                //check if the range is greater than you want to delete at a time
                if (args[0] > 100) return message.reply('you cannot');

                //check if the number is less than 0.(because its not possible to delete the negative messages(messages that doent exsist))
                if (args[0] < 1) return message.reply('you cant time travel');

                await message.channel.messages.fetch({ limit: args[0] }).then(messages => { //fetches the number of messages that we passed in args[1] 
                    message.channel.bulkDelete(messages); //deletes the messages 
                });
            }
        }
        else {
            //executes when the command user has no MANAGE_MESSAGES permission
            message.reply('you have no permission to use this command');
        }
    }
}