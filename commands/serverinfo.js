module.exports = {

    name: 'serverinfo',

    description: "This command will display the server info.",

    execute(client, message, args, Discord){

        server = message.guild

                 const embedMsg = new Discord.MessageEmbed()

          .setColor('#00ff00')

          .setTitle('Server Info:')

         

          .addFields({ name: 'Server Name:', value: `${server.name}` }, { name: 'Member Count:', value:`${server.memberCount}` },

          {name: "Owner:", value: `${server.owner}`},

          {name: "Created At:", value: `${server.createdAt}`},

          {name: "Region:", value: `${server.region}`}

          );

          message.channel.send(embedMsg)

    }

}
