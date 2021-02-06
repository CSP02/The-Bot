const ms = require('ms');
module.exports = {
  name: 'mute',
  description: 'This is ping command',
  execute(client, message, args, Discord) {
    const mess_kingRole = message.member.roles.cache.some(r => r.name === 'admin');
    const mess_modRole = message.member.roles.cache.some(r => r.name === 'mod');
    let kingRole = message.guild.roles.cache.find(role => role.name === 'admin');
    let modRole = message.guild.roles.cache.find(role => role.name === 'mod');

    if (mess_kingRole || mess_modRole) {
      const target = message.mentions.users.first();
      const toMute = message.mentions.roles.first();
        
      if (target) {
        if(toMute === kingRole && toMute === modRole ) message.reply('Be a Good Mod.');
        else{
          let mainRole = message.guild.roles.cache.find(role => role.name === 'shrimp');
          let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

        memberTarget = message.guild.members.cache.get(target.id);
          if (!args[1]) {
          message.reply('Specify the time and reason to mute. If you want to mute him permanently you can use ban instead of mute')
        }
        else{
          memberTarget.roles.remove(mainRole.id);
          memberTarget.roles.add(mutedRole.id);
          setTimeout(function() {
          memberTarget.roles.remove(mutedRole.id);
          memberTarget.roles.add(mainRole.id);
        }, ms(args[1]));
        
        const embedMsg = new Discord.MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Muted:')
          .setThumbnail(`${message.mentions.users.first().displayAvatarURL()}`)
          .setDescription(`<@${memberTarget.user.id}> has been muted`)
          .addFields({ name: 'Reason:', value: `${args.slice(2).join(" ")}` }, { name: 'Muted period:', value: `${args[1]}` });

        message.channel.send(embedMsg);
        }
        }
        }else if(args[0]){
        message.channel.send('cant find that member');
      }else{
        message.channel.send('Mention the user you want to mute')
      }
    } else {
      message.reply('you have no permission');
    } 
  }
}
