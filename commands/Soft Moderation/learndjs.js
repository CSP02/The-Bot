
module.exports = {

    name: 'discordjs',
    description: "Displays the link for learning discord.js ",
    aliases: ['discordjs', 'learndjs','djs'],
    execute(client, message, args, Discord) {

        const embedMsg = new Discord.MessageEmbed()

            .setColor('#9C27B0')

            .setTitle('__Discord.js tutorial links__')

            .addFields(      
              { name: ' Official Discord.js Guide : ', value: 'https://discordjs.guide'},
                 
              { name: ' Guide by Codelyon : ', value: 'https://anidiots.guide/getting-started/getting-started-long-version '},
              
              { name: ' Tutorial series by Codelyon :  ', value: 'https://youtube.com/playlist?list=PLbbLC0BLaGjpyzN1rg-gK4dUqbn8eJQq4 '},
              
              { name: ' Tutorial series by Worn off keys : ', value: 'https://youtube.com/playlist?list=PLaxxQQak6D_fxb9_-YsmRwxfw5PH9xALe '}
            
              )
            
            .setThumbnail("https://i.ibb.co/7th2xwt/images.png")

            .setFooter('Enjoy learning Discord-js and make your own custom Discord bot 😃 .')

        message.channel.send(embedMsg);
    }
}
