const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Infraction = require("../../schemas/infractionSchema.js");
const { ANSI } = require("../../Generators/AnsiColors");
const { InfractionTypes } = require("../../Types/InfractionTypes");

module.exports = {
    name: "warn",
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Warns a user with a specified reason.")
        .addUserOption(option => option.setName("user").setDescription("User you want to warn!").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Reason for the warning!")),

    async execute(Discord, client, interaction) {
        try {
            const user = interaction.options.getUser("user"); //? Get the mentioned user from the options
            //? Get the reason from options. If not specified set it to "Unspecified"
            const reason = interaction.options.getString("reason") === null ? "Unspecified" : interaction.options.getString("reason");
            const timestamp = Date.now(); //? Get the date
            const guildID = interaction.guild.id; //? Get id of the server which this command was sent
            const infr = { //? Infraction object which holds the details of infraction
                userID: user.id, //? User id
                author: interaction.member.user.id, //? Author i.e. the mod responsible for warning the user
                reason: reason, //? Reason for warning 
                timestamp: timestamp, //? The date and time when the user is warned
                infrType: InfractionTypes.Warn //? Infraction type (warn, mute, kick, ban)
            };

            const infractionInDB = await Infraction.findOne({ guildId: guildID }); //? Find if infractions of the server exists
            if (infractionInDB === null) { //? If there are no infractions in this server execute this block
                infr.infrID = 1; //? Start with infrID 1
                const infrDoc = { //? Set the guildId and infractions array
                    guildId: guildID, //? GuildID
                    infractions: [infr] //? Array of infractions of this guild. As this is the first infraction the infr object is directly pushed
                };

                const infrsave = new Infraction(infrDoc); //? Create the infraction document
                await infrsave.save(); //? Save the document in the database

                const embed = new EmbedBuilder()
                    .setTitle("Infraction:")
                    .setColor("#ff0000")
                    .addFields([
                        { name: "User", value: `<@${user.id}>` },
                        { name: "Author", value: `<@${interaction.member.user.id}>` },
                        { name: "Infraction type", value: "warn" },
                        { name: "Reason", value: reason },
                    ])
                    .setFooter({ text: `Infraction ID: ${infr.infrID}.` })
                    .setThumbnail(interaction.guild.members.cache.get(user.id).displayAvatarURL())
                    .setTimestamp();

                //? Send the a copy of this infraction to the user
                await interaction.guild.members.cache.get(user.id).send({ content: `You are warned in ${interaction.guild.name}:`, embeds: [embed] })
                return await interaction.reply({ embeds: [embed] });
            }

            const infractionsFromDB = infractionInDB.infractions; //? Get this guild's infractions from the database
            infr.infrID = infractionsFromDB.reverse()[0].infrID + 1; //? Get the latest infraction ID and add 1 to it
            infractionsFromDB.push(infr); //? Push the infraction into the "infraction" array in db

            await infractionInDB.save(); //? Save the infraction in database

            const embed = new EmbedBuilder()
                .setTitle("Infraction:")
                .setColor("#ff0000")
                .addFields([
                    { name: "User", value: `<@${user.id}>` },
                    { name: "Author", value: `<@${interaction.member.user.id}>` },
                    { name: "Infraction type", value: "warn" },
                    { name: "Reason", value: reason },
                ])
                .setFooter({ text: `Infraction ID: ${infr.infrID}.` })
                .setThumbnail(interaction.guild.members.cache.get(user.id).displayAvatarURL())
                .setTimestamp();

            //? Send the a copy of this infraction to the user
            await interaction.guild.members.cache.get(user.id).send({ content: `You are warned in ${interaction.guild.name}:`, embeds: [embed] })
            await interaction.reply({ embeds: [embed] }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}