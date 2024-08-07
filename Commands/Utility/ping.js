const { SlashCommandBuilder, EmbedBuilder, Embed } = require("discord.js");
const { ANSI } = require("../../Generators/AnsiColors.js");
const { GenerateColor } = require("../../Generators/RandomColorGenerator.js")

module.exports = {
    name: "ping", //? Slash command name
    data: new SlashCommandBuilder() //? Building slash command
        .setName("ping")
        .setDescription("Sends the bot's latency and uptime"),

    async execute(Discord, client, interaction) { //? Handler which executes when the command is used
        if (!interaction) return console.log(ANSI.foreground.Red + "Interaction is empty, can't handle!" + ANSI.Reset);
        const seconds = new Date(client.uptime) //? Convert seconds into days, hrs, mins and seconds
        const days = seconds.getUTCDate() - 1 + "d";
        const secs = seconds.getUTCSeconds() + "s";
        const mins = seconds.getUTCMinutes() + "m";
        const hrs = seconds.getUTCHours() + "h";
        const uptime = [days, hrs, mins, secs].join(":");

        const embed = new EmbedBuilder()
            .setTitle("Ping")
            .setColor(GenerateColor()) //? Generating random color (hex code)
            .addFields([
                { name: "Ping:", value: `Present heartbeat of bot is ${client.ws.ping}ms.` }, //? Bot latency
                { name: "Uptime", value: `Bot is awake for \`\`${uptime}\`\`` } //? Bot uptime
            ]);

        interaction.reply({ embeds: [embed] }).catch(() => {
            console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
        });
    }
}