module.exports = {

    name: 'discordjs',

    description: "Displays the link for learning discord.js ",
    aliases: ['discordjs', 'learndjs','djs'],
    execute(client, message, args, Discord) {

        message.send.channel('Here are some of the useful links from where you can start learning about how you can make your own discord bot using Discord js.  \n \n https://anidiots.guide/getting-started/getting-started-long-version \nhttps://discordjs.guide \nhttps://youtube.com/playlist?list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe
 ');
    }
}