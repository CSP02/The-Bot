const fs = require("fs");
const { InteractionType } = require("discord.js");
const { ANSI } = require("../../Generators/AnsiColors.js")

module.exports = {
    name: "interactionCreate", //? Event name

    run(Discord, client, interaction) { //? Event handler
        const { cooldowns } = client; //? Loadind the cooldown collection (initialised in index.js)

        try {
            if (interaction.type !== InteractionType.ApplicationCommand) { //? performs this block of code if the interaction type is not a slash command (i.e either a "button" or an "action row" interaction)
                const customId = interaction.customId.toString(); //? Get the custom ID of the command
                const interactFile = require(`../../interactions/${customId}.js`);

                //? Execute the code if user has the required permissions
                if (interaction.member.permissions.has(interactFile.permissions) || interactFile.permissions === null)
                    return interactFile.execute(client, interaction, Discord);

                return interaction.reply({
                    content: "You don't have required permissions to use this interaction!",
                    ephemeral: true,
                });
            } else { //? Block of code for slash commands
                const interactionsFolder = fs.readdirSync("./Commands/"); //? Get slash commands from Commands folder
                for (const folder of interactionsFolder) {
                    const interactionFiles = fs
                        .readdirSync(`./Commands/${folder}`)
                        .filter(file => file.endsWith(".js"));

                    for (const file of interactionFiles) {
                        const interactFile = require(`../../Commands/${folder}/${file}`);

                        if (file === "ModuleInfo.js") continue; //? Skip if the file is ModuleInfo.js
                        if (interactFile.name.includes(interaction.commandName)) {
                            if (!cooldowns.has(interaction.commandName)) { //? Check if the command is on cooldown
                                cooldowns.set(interaction.commandName, new Discord.Collection()); //? Start cooldown of the command
                            }

                            //? Handle the cooldown
                            const now = Date.now();
                            const timestamps = cooldowns.get(interaction.commandName);
                            const defaultCooldownDuration = 5;
                            const cooldownAmount = (interactFile.cooldown ?? defaultCooldownDuration) * 1000;

                            if (timestamps.has(interaction.user.id)) {
                                const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

                                if (now < expirationTime) {
                                    const expiredTimestamp = Math.round(expirationTime / 1000);
                                    return interaction.reply({ content: `Please wait, you are on a cooldown for \`${interaction.commandName}\`. You can use it again <t:${expiredTimestamp}:R>.`, ephemeral: true });
                                }
                            }

                            interactFile.execute(Discord, client, interaction); //? Execute the code if there is no cooldown or if the command is already cooled down
                            timestamps.set(interaction.user.id, now); //? Set the cooldown again after using the command

                            return setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount); //? Remove the cooldown after the cooldown amount is over
                        }
                    }
                }
            }
        } catch (e) {
            console.log(ANSI.foreground.Red + e.stack + ANSI.Reset)
        }
    }
}
