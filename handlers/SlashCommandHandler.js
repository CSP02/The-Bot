const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ANSI } = require("../Generators/AnsiColors.js")
const commands = [];
require("dotenv").config();

module.exports = (client, Discord) => {
    try {
        const slashCommandFolders = fs.readdirSync("./Commands/"); //? Read the Commands Directory for modules
        for (const commandFolder of slashCommandFolders) {
            const slashCommandFiles = fs
                .readdirSync(`./Commands/${commandFolder}/`)
                .filter((file) => file.endsWith(".js")); //? Loop through every module
            for (const commandFile of slashCommandFiles) {
                if (commandFile === "ModuleInfo.js") continue; //? Skip the file if it's a module info file
                const command = require(`../Commands/${commandFolder}/${commandFile}`); //? Load command
                commands.push(command.data.toJSON()); //? Push command into commands after changing it to a JSON string
            }
        }
        
        const rest = new REST({ version: "9" }).setToken(process.env.TOKEN); //? Initialise rest

        //? Reload the slash commands
        rest.put(Routes.applicationCommands(process.env.CLIENTID), {
            body: commands
        }).then(() => {
            console.log(ANSI.foreground.Blue + "Reloaded slash commands." + ANSI.Reset);
        });

        //? Reset all slash commands
        // rest.put(Routes.applicationCommands(process.env.CLIENTID), {
        //     body: [] //? Setting body to an empty array will set the application commands of bot to empty
        // }).then(() => {
        //     console.log(ANSI.foreground.Red + 'Successfully Deleted all application (/) commands.' + ANSI.Reset);
        // })
    } catch (error) {
        console.log(ANSI.foreground.Red + error + ANSI.Reset);
    }
};