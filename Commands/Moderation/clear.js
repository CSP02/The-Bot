const { SlashCommandBuilder, AnonymousGuild } = require("discord.js");
const { ANSI } = require("../../Generators/AnsiColors");

module.exports = {
    name: "clear",
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clears the messages specified. (defaulted to 10 latest messages)")
        .addUserOption(option => option.setName("user").setDescription("Message of this user will be deleted!"))
        .addIntegerOption(option => option.setName("amount").setDescription("Number of messages to delete from this channel (by the mentioned user if mentioned any)")),

    async execute(Discord, client, interaction) {
        try {
            const mentionedUser = interaction.options.getUser("user"); //? Get the mentioned user
            const amount = interaction.options.getInteger("amount") === null ? 10 : interaction.options.getInteger("amount"); //? Get amount. If not given in command it is set to 10 by default
            if (mentionedUser !== null) { //? If the staff mentioned user
                const messages = await interaction.channel.messages.fetch(); //? Get all messages in the channel 
                const messagesArray = Array.from(messages); //? Convert the messages map into array
                const messagesFiltered = [];

                messagesArray.forEach(messageMap => { //? Loop through every message entry
                    const message = messageMap[1]; //? Message collection will be in value field so messageMap[1]
                    if (message.author.id === mentionedUser.id); //? Check if the author of message is same as the mentioned user
                    messagesFiltered.push(message); //? Push the message into filtered message
                });

                return await interaction.channel.bulkDelete(messagesFiltered).then(messages => { //? Bulk delete the messages from the channel
                    interaction.reply(`Messages by ${mentionedUser} were deleted!\n-# Total number of messages sent by ${mentionedUser} from past two weeks is ${messages.size}.`)
                        .catch(() => {
                            console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                        });
                });
            }

            await interaction.channel.bulkDelete(amount).then(messages => { //? If user was not mentioned delete the specified number of messages/10 from a channel
                interaction.reply(`${messages.size} message(s) were deleted from this channel!`).catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}