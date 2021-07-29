const fs = require('fs');

module.exports = {
  name: 'help',
  description: 'Lists the commands of the bot.',
  syntax: '!help <module>',
  permissions: ['VIEW_CHANNEL'],
  execute(client, message, args, Discord) {
    if (!args[0]) {
      const embedMsg = new Discord.MessageEmbed()
        .setTitle('Help:')
        .setColor('#00ff00')

      const command_files = fs
        .readdirSync('./commands/')
      for (const folder of command_files) {
        const description = require(`../${folder}/description.js`)
        desc = description.description
        embedMsg.addFields(
          { name: folder, value: `${desc}` }
        )
      }
      message.channel.send(embedMsg)
    } else if (args) {
      var isMsgSent = false

      if (!(fs.existsSync(`./commands/${args[0].toLowerCase()}/`))) {
        const command_files = fs
          .readdirSync('./commands/')

        for (const folder of command_files) {
          const files = fs
            .readdirSync(`./commands/${folder}/`)
            .filter(file => file.endsWith('.js'))
          for (const file of files) {
            if (file) {
              const command = require(`../../commands/${folder}/${file}`);
              if (command.name) {
                if (command.name == `${args[0].toLowerCase()}`) {
                  isMsgSent = true
                  const embedMsg = new Discord.MessageEmbed()
                    .setTitle(`${command.name}`)
                    .setColor('#00ff00')


                    .addFields(
                      { name: `description`, value: `${command.description}` },
                      { name: `syntax`, value: `${command.syntax}` },
                      { name: `aliases`, value: `${command.aliases}` },
                      { name: `Other details:`, value: `${command.others}\n${command.footer}` }
                    )
                  message.channel.send(embedMsg)
                  break;
                }
              } else {
                continue
              }
            }
          }
          if (isMsgSent) {
            break
          } else {
            continue
          }
        }
        if (!isMsgSent) {
          message.channel.send('Command not found!')
        }
      } else {
        const embedMsg = new Discord.MessageEmbed()
          .setTitle('Help:')
          .setColor('#00ff00')
        const files = fs
          .readdirSync(`./commands/${args[0].toLowerCase()}/`)
          .filter(file => file.endsWith('.js'))
        for (const file of files) {
          if (file) {
            const command = require(`../../commands/${args[0].toLowerCase()}/${file}`);
            console.log(command.name)
            if (command.name) {
              embedMsg.addFields(
                { name: `${command.name}\n`, value: `${command.description}` }
              )
            } else {
              continue
            }
          } else {
            message.channel.send('Module not found')
          }
        }
        message.channel.send(embedMsg)
      }
    }
  }
}