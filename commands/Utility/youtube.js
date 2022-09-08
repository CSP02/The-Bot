const { PermissionsBitField } = require('discord.js');
module.exports = {
  name: 'youtube',
  aliases: ['yt'],
  description: 'sends the youtube link.',
  syntax:'!youtube || !yt',
	permissions: [PermissionsBitField.Flags.ViewChannel],
  execute(client, message, args, Discord){
   message.channel.send("You can learn more by watching tutorials\n <https://www.youtube.com/> ")
  }
}