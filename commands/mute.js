const ms = require('ms');
module.exports = {
  name: 'mute',
  description: 'This is ping command',
  execute(client, message, args, Discord) {
    const modOrAdmin = message.member.hasPermission('MUTE_MEMBERS');

    if (modOrAdmin) {
      const target = message.mentions.users.first();

      if (target) {
        let mainRole = message.guild.roles.cache.find(role => role.name === 'shrimp');
        let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        memberTarget = message.guild.members.cache.get(target.id);
        if (memberTarget.hasPermission('MUTE_MEMBERS')) { message.channel.send('Be a good mod.'); }
        else {
          if (!args[1]) {
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
            }, ms(args[1]));

            const embedMsg = new Discord.MessageEmbed()
              .setColor('#ff0000')
              .setTitle('Muted:')
              .setThumbnail(`${target.displayAvatarURL()}`)
              .setDescription(`<@${memberTarget.user.id}> has been muted`)
              .addFields({ name: 'Reason:', value: `${args.slice(2).join(" ")}` }, { name: 'Muted period:', value: `${args[1]}` });

            message.channel.send(embedMsg);
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