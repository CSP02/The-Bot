const fs = require('fs');

module.exports = {
  name: 'help',
  description: 'Lists the commands of the bot.',
  syntax: '!help <module>',
  permissions: ['VIEW_CHANNEL'],

  execute(client, message, args, Discord) {
    var embedMsg = new Discord.MessageEmbed()
      .setTitle('Help')
      .setColor('#00ff00');
    const command_files = fs
      .readdirSync('./commands/')
      .filter(file => file.endsWith(''));
    if (!args[0]) {
      var menu = new Discord.MessageSelectMenu()
        .setCustomId(`Help`)
        .setPlaceholder('Select Module')
    } else {
      var menu = null
    }
    for (const folder of command_files) {
      const description = require(`../../commands/${folder}/description.js`)
      if (!args[0]) {
        embedMsg
          .addFields({
            name: `${folder}`, value: `${description.description}`
          })

        menu.addOptions({ label: `${folder}`, value: `${folder}` })
      }
      const files = fs
        .readdirSync(`./commands/${folder}/`)
        .filter(fil => fil.endsWith('.js'));

      for (const file of files) {
        const command = require(`../../commands/${folder}/${file}`);
        if (command) {
          if (command.name) {
            if (args[0] === command.name) {
              embedMsg
                .addFields(
                  { name: `Command Name:`, value: `${command.name}` },
                  { name: `Description`, value: `${command.description}` },
                  { name: `Syntax`, value: `${command.syntax}` }
                )
            }
          } else {
            continue;
          }
        } else {
          message.channel.send('No     module or command found.');
        }
      }
    }
    if (menu) {
      const actionRow = new Discord.MessageActionRow()
        .addComponents(
          menu
        )
      return message.channel.send({ content: "use !help <command_name> to know about a certain command and select a module from the dropdown below", embeds: [embedMsg], components: [actionRow] });

    }
    else
      return message.channel.send({ embeds: [embedMsg] });

  }
};
