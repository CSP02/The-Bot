module.exports = {
  name: 'help',
  description: "Here is the list of help commands",
  execute(client, message, args, Discord) {

    let help_module = (args[0]);

    if (!help_module) {

      const embed = new Discord.MessageEmbed()

        .setColor('#89f1f5')
        .setTitle('**Command help ** ')
        .setDescription("Here is the list of module that you access . Type !help `module name` to see all the commands of that module. ")


        .addFields(

          { name: '**Utility**', value: 'Show Utility commands that are available in bot.' },

          { name: '**Soft-Moderation**', value: 'Provide Soft moderation command like rules.' },

          { name: '**Moderation**', value: 'Provide information about Moderation commands for staffs.' },

          { name: '**User**', value: 'Provide commands to customize user.' },

          { name: '**Custom-command**', value: 'Provide the list of custom commands.' }

        )
        .setFooter('-Atelier Bot');
      message.channel.send(embed);
    } else
      if (help_module) {

        const module = help_module.toLowerCase();

        if (module === "utility") {
          const embed = new Discord.MessageEmbed()

            .setColor('#89f1f5')
            .setTitle('**Utility** ')
            .setDescription("Here are some Utility commands that you can access. ")

            .addFields(
              { name: '!ping', value: 'Will show current latency of bot.' },

              { name: '!role', value: 'Will give list of all the roles that member can get.' },

              { name: '!serverinfo', value: 'It will give brief info about server. ' },

              { name: '!userinfo', value: 'It provide userinfo.' },

              { name: '!github', value: 'It will provide bot source code link from github.' },

              { name: '!team', value: 'Let you join a team if the server had any.' },

              { name: '!removerole', value: 'Removes the role mentioned.' },

              { name: '!leaveteam', value: 'leaves the team mentioned.' },

            )
            .setFooter('-Atelier bot');
          message.channel.send(embed);

        } else

          if (module === "soft-moderation") {
            const embed = new Discord.MessageEmbed()

              .setColor('#89f1f5')
              .setTitle('**Soft Moderation** ')
              .setDescription("Here are some Soft moderation commands that you can access to display rules. ")


              .addFields(
                { name: '!rule <number>', value: 'Display rules of server according to the number provided' }

              )
              .setFooter('-Atelier bot');
            message.channel.send(embed);

          } else


            if (module === "moderation") {
              const embed = new Discord.MessageEmbed()

                .setColor('#89f1f5')
                .setTitle('**Moderation** ')
                .setDescription("Moderation commands that are accessible by Staffs only.  ")


                .addFields(
                  { name: '!ban', value: 'Will ban the provided user. ' },

                  { name: '!kick', value: 'Will kick the provided user from server.  ' },

                  { name: '!mute', value: 'Will mute the provided user. ' },

                  { name: '!unmute', value: 'Will unmute the provided user. ' },

                  { name: '!clear <number>', value: 'Clear the provided number of messages.' },

                  { name: '!warn', value: 'Use this command to warn user.' }

                )
                .setFooter('-Atelier bot');
              message.channel.send(embed);

            } else

              if (module === "user") {
                const embed = new Discord.MessageEmbed()

                  .setColor('#89f1f5')
                  .setTitle('**User** ')
                  .setDescription("Here is the list of commands that user can use to customize itself. ")


                  .addFields(
                    { name: '!team ', value: 'It will provide list of all the teams.' },

                    { name: '!team <team>', value: 'Will let you to join team. ' },

                    { name: '!leaveteam <team>', value: 'Will let you to leave team. ' },

                    { name: '!role', value: 'It will provide list of roles that member can join.  ' },

                    { name: '!role <role>', value: 'Will let you to get roles.  ' },

                    { name: '!leave <role>', value: 'Will let you to remove roles from your profile. ' }

                  )
                  .setFooter('-Atelier bot');
                message.channel.send(embed);

              } else

                if (module === "custom-command") {
                  const embed = new Discord.MessageEmbed()

                    .setColor('#D9EC15')
                    .setTitle('**Custom commands** ')
                    .setDescription("Here is the list of all the custom commands.  ")


                    .addFields(
                      { name: '!C#', value: 'Display links to learn C#.' },

                      { name: '!djs', value: 'Display links to learn Discord.js.' },

                      { name: '!bam', value: 'Bam any user lol.' },

                      { name: '!points <@user>', value: 'View how much points has a user earn.' },

                      { name: '!ask', value: 'Try asking random question to bot it will answer you.' },

                    )
                    .setFooter('-Atelier bot');
                  message.channel.send(embed);

                }


                else {
                  const embed = new Discord.MessageEmbed()
                    .setColor('#de534b')
                    .setTitle('**Error 🚫** ')
                    .setDescription("Didn't find the module that you are trying to access !")
                    .setFooter('-Atelier bot')
                  message.channel.send(embed);
                }
      }
  }
}