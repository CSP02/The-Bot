const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { GenerateColor } = require("../../Generators/RandomColorGenerator.js");
const { ANSI } = require("../../Generators/AnsiColors.js");

module.exports = {
    name: "userinfo",
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Sends the info of mentioned user.")
        .addUserOption(option => option.setName("user").setDescription("Mention which user's info you want to know!")),

    async execute(Discord, client, interaction) {
        try {
            //? Get the user from the command's option or set the user to the one who used the command
            const user = interaction.options.getUser("user") === null ? await interaction.user : interaction.options.getUser("user");
            const member = await interaction.guild.members.cache.get(user.id); //? Get the member object
            const highestRole = await member.roles.highest; //? Get highest role
            const joinedAt = member.joinedAt; //? Get when the user joined the server
            const nickname = member.nickname === null ? "No Nickname" : nickname; //? Get the nickname of the user. Set it to null if there is no nickname

            const embed = new EmbedBuilder()
                .setTitle("User info:")
                .setColor(GenerateColor())
                .setThumbnail(member.displayAvatarURL())
                .addFields([
                    { name: "Username:", value: user.username },
                    { name: "Nickname:", value: nickname },
                    { name: "Highest Role:", value: highestRole.name.toString() },
                    { name: "Joined at:", value: new Date(joinedAt).toLocaleString() }
                ])
                .setFooter({ text: "This is the user's info only in this server." });

            interaction.reply({ embeds: [embed] }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e.stack + ANSI.Reset);
        }
    }
}