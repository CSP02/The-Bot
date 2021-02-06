module.exports = {
    name: 'userinfo',
    description: "This command will give the information about mentioned user",
    execute(client, message, args, Discord) {
      let mentioned = message.mentions.users.first();
      if(!mentioned){
        const embedMsg = new Discord.MessageEmbed()
            .setColor('#66ff66')
            .setTitle('User Info:')
            .setThumbnail(`${message.author.displayAvatarURL()}`)

            .addFields(
              {name: 'User Tag:', value: `${message.author.tag}`},
                { name: 'User ID:', value: `${message.author.id}`},
             
             
             { name: 'User Name:', value: `${message.author.username}` },
             
             { name: 'User Created:', value: `${message.author.createdAt}`}

            )
            message.channel.send(embedMsg);
      }else{
        const embedMsg = new Discord.MessageEmbed()

            .setColor('#66ff66')

            .setTitle('User Info:')
  
            .setThumbnail( `${mentioned.displayAvatarURL()}`)

            .addFields(
              {name: 'User Tag:' , value: `${mentioned.tag}`},
                { name: 'User ID:', value: `${mentioned.id}`},
             
             
             { name: 'User Name:', value: `${mentioned.username}` },
             
             { name: 'User Created:', value: `${mentioned.createdAt}`}
            )
            .setFooter('make sure to check the rules before messaging');
            
            message.channel.send(embedMsg);
      }

    }
}
