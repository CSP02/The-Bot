const { SlashCommandBuilder } = require("discord.js");
const cheerio = require("cheerio");
const { ANSI } = require("../../Generators/AnsiColors");

module.exports = {
    name: "google",
    cooldown: 60 * 60,
    data: new SlashCommandBuilder()
        .setName("google")
        .setDescription("Sends the top 5 google search results of the given query.")
        .addStringOption(option => option.setName("query").setDescription("Query you want to search (can be a word or a sentence).").setRequired(true)),

    async execute(Discord, client, interaction) {
        try {
            const query = interaction.options.getString("query"); //? Get the query from the options
            //? Make a fetch request to google with the specified query
            fetch(`https://www.google.com/search?q=${query}`, { mode: "cors", method: "GET" }).then(async response => {
                if (response.ok) return await response.text(); 
            }).then(response => {
                const reply = []
                const $ = cheerio.load(response); //? Load the html page using cheerio
                $(".egMi0").slice(0, 5).each((i, el) => { //? The results will be in a div element with the class name "egMi0"
                    const link = el.firstChild.attribs.href.replaceAll("/url?q=", ""); //? First child will be "a" tag with href tag set to the "/url?q=<the url of the page>". we only need the url so we can remove the "/url?q=" part
                    const title = $(el).find(".BNeawe").text(); //? h3 with class name "BNeawe" contains the title of the above url

                    reply.push(`${i + 1}. [${title}](<${link}>)`)
                })

                interaction.reply({ content: reply.join("\n") + "\n-# These are the top 5 google search results." }).catch(() => {
                    console.log(ANSI.foreground.Red + "Error occured" + ANSI.Reset);
                });
            })
        } catch (e) {
            console.log(ANSI.foreground.Red + e + ANSI.Reset);
        }
    }
}