const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { InfractionTypes } = require("../../Types/InfractionTypes");
const Infraction = require("../../schemas/infractionSchema.js");
const { ANSI } = require("../../Generators/AnsiColors.js");

module.exports = {
    name: "kick",
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("kicks the mentioned user with a reason=.")
        .addUserOption(option => option.setName("user").setDescription("User to kick.").setRequired(true))
        .addStringOption(option => option.setName("reason").setDescription("Reason to kick this user.")),

    async execute(Discord, client, interaction) {
        try {
            const user = interaction.options.getUser("user"); //? Get the user from the command options
            //? Get the reason from the options. If it's null, set reason to "Unspecified"
            const reason = interaction.options.getString("reason") === null ? "Unspecified" : interaction.options.getString("reason");
            const guildId = interaction.guild.id; //? Get the guild/server id

            interaction.guild.members.cache.get(user.id).kick({ reason: reason }); //? Timeout the member upto spefied of period

            const infr = { //? Create the infr object to push it into the infractions array
                user: user.id,
                author: interaction.member.user.id,
                reason: reason,
                timestamp: Date.now(),
                infrType: InfractionTypes.Kick //? Set infraction type to "Kick"(3)
            }

            const infractionInDB = await Infraction.findOne({ guildId: guildId }); //? Get the infractions of this guild

            if (infractionInDB === null) {
                infr.infrID = 1 //? Set the infrID to 1 if there are no infractions for this guild/server
                const infrDoc = {
                    guildId: guildId,
                    infractions: [infr]
                }

                const infrSaved = new Infraction(infrDoc); //? Create a document with the fields
                await infrSaved.save(); //? Save the infraction into the database

                const embed = new EmbedBuilder()
                    .setTitle("Infraction:")
                    .setColor("#ff0000")
                    .addFields([
                        { name: "User", value: `<@${user.id}>` },
                        { name: "Author", value: `<@${interaction.member.user.id}>` },
                        { name: "Infraction type", value: "kick" },
                        { name: "Reason", value: reason },
                    ])
                    .setFooter({ text: `Infraction ID: ${infr.infrID}.` })
                    .setTimestamp()
                    .setThumbnail(interaction.guild.members.cache.get(user.id).displayAvatarURL());

                //? Send the a copy of this infraction to the user
                await interaction.guild.members.cache.get(user.id).send({ content: `You are kicked in ${interaction.guild.name}:`, embeds: [embed] })
                return await interaction.reply({ embeds: [embed] }).catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });;
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
                    { name: "Infraction type", value: "kick" },
                    { name: "Reason", value: reason },
                ])
                .setFooter({ text: `Infraction ID: ${infr.infrID}.` })
                .setThumbnail(interaction.guild.members.cache.get(user.id).displayAvatarURL())
                .setTimestamp();

            //? Send the a copy of this infraction to the user
            await interaction.guild.members.cache.get(user.id).send({ content: `You are kicked in ${interaction.guild.name}:`, embeds: [embed] })
            await interaction.reply({ embeds: [embed] }).catch(() => {
                console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
            });
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}