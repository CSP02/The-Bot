const ms = require('ms');
module.exports = {
  name: 'mute',
  description: 'This is ping command',
  execute(client, message, args, Discord) {
    const modOrAdmin = message.member.hasPermission('KICK_MEMBERS');
    const sLogsChannel = message.guild.channels.cache.find(chn => chn.name === 'server-logs')
    const server = message.guild

    if (modOrAdmin) {
      const target = message.mentions.users.first()
      if (target) {
        let mainRole = message.guild.roles.cache.find(role => role.name === 'member') || message.guild.roles.cache.find(role => role.name === 'shrimp');
        let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        memberTarget = message.guild.members.cache.get(target.id)
        if (memberTarget.hasPermission('MUTE_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
          message.channel.send('Be a good mod.');
        }
        else {
          if (!args[1] || !isNaN(args[1])) {
            message.reply('Specify the time')
          } else if (!args[2]) {
            message.reply('specify the reason to mute')
          }
          else {
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(mutedRole.id);


            setTimeout(function () {
              memberTarget.roles.remove(mutedRole.id);
              memberTarget.roles.add(mainRole.id);
              const embdMsg = new Discord.MessageEmbed()
                .setDescription(`Time to unmute ${memberTarget}. And unmuted.`)
                .setColor('#00ff00')
              sLogsChannel.send(embdMsg)
            }, ms(args[1]));

            const embedMsg = new Discord.MessageEmbed()
              .setColor('#ff0000')
              .setTitle('Muted:')
              .setThumbnail(`${target.displayAvatarURL()}`)
              .setDescription(`<@${memberTarget.user.id}> has been muted`)
              .addFields({ name: 'Reason:', value: `${args.slice(2).join(" ")}` }, { name: 'Muted period:', value: `${args[1]}` });

            message.channel.send(embedMsg);
            sLogsChannel.send(embedMsg)
            memberTarget.send(`You were muted in the server:\n**${message.guild.name}** Because:\n**${args.slice(2).join(" ")}**. Take care.`)
          }
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