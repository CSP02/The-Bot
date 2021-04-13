module.exports = {

    name: 'discordjs',

    description: "Displays the link for learning discord.js ",
    aliases: ['discordjs', 'learndjs','djs'],
    execute(client, message, args, Discord) {

        const embedMsg = new Discord.MessageEmbed()

            .setColor('#9C27B0')

            .setTitle('**Here are some of the useful links from where you can start learning about how you can make your own discord bot using Discord js.  **')

            .setDescription('- https://anidiots.guide/getting-started/getting-started-long-version \n- https://discordjs.guide \n- https://youtube.com/playlist?list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe ')

            .setFooter('Enjoy learning Discord-js and make your own custom bot 😃 .')

        message.channel.send(embedMsg);
    }
}
