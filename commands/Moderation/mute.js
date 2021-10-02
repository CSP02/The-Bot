//MUTE COMMAND

const mongo = require('../../schemas/mongo')
const warnShema = require('../../schemas/schema')

module.exports = {
  name: 'mute',
  description: 'mutes the mentioned user in a guild',
  syntax: '!mute <user>',
  permissions: ['VIEW_AUDIT_LOG'],
  async execute(client, message, args, Discord) {
    const modOrAdmin = message.member.permissions.has('KICK_MEMBERS');
    const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
    const server = message.guild
    const infrType = 'mute'

    if (modOrAdmin) {
      const target = message.mentions.users.first()
      if (target) {
        let mainRole = message.guild.roles.cache.find(role => role.name === 'member') || message.guild.roles.cache.find(role => role.name === 'shrimp');
        let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');


        memberTarget = message.guild.members.cache.get(target.id)
        if (memberTarget.permissions.has('MUTE_MEMBERS') && !message.member.permissions.has('ADMINISTRATOR')) {
          message.channel.send('Be a good mod.');
        }
        else if (!args[1]) {

        }
        else {
          memberTarget.roles.add(mutedRole.id)


          const guildId = message.guild.id;
          const userId = target.id;
          let reason = 'Undefined'
          if (args[1]) {
            reason = args.slice(1).join(' ')
          }
          var infrID = parseInt('1', 10);


          await mongo().then(async mongoose => {
            try {
              const results = await warnShema.findOne({
                guildId
              })
              if (results == null) {
                return
              } else {
                let reply = ' '
                var infr
                if (results.warnings.length != 0) {
                  for (const warning of results.warnings) {
                    const { author, userID, timestamp, reason, infrType, infrID } = warning
                    infr = parseInt(infrID, 10)
                  }
                  infrID += parseInt(infr, 10)
                }
              }
            } finally {
              mongoose.connection.close()
            }
          })

          const warning = {
            author: message.member.user.id,
            userID: userId,
            timestamp: new Date().getTime(),
            reason,
            infrType,
            infrID
          }


          const embedMsg = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Muted:')
            .setThumbnail(`${target.displayAvatarURL()}`)
            .setDescription(`<@${memberTarget.user.id}> has been muted`)
            .setFooter(`Infraction ID: ${infrID}`)
            .addFields({ name: 'Reason:', value: `${reason}` },)

          message.channel.send({ embeds: [embedMsg] });
          sLogsChannel.send({ embeds: [embedMsg] })
          memberTarget.send(`You were muted in the server:\n**${message.guild.name}** Because:\n**${reason}**. Take care.`)

          await mongo().then(async mongoose => {
            try {
              await warnShema.findOneAndUpdate({
                guildId,
              }, {
                guildId,
                $push: {
                  warnings: warning
                }
              }, {
                upsert: true
              })
            } finally {
              mongoose.connection.close()
            }
          })
        }
      } else if (args[0]) {
        message.channel.send('cant find that member');
      } else {
        message.channel.send('Mention the user you want to mute')
      }
    } else {
      message.reply('you have no permission');
    }
  }
}