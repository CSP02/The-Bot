const { PermissionsBitField } = require('discord.js');
module.exports = {
  name:'giftslist',
  description:'shows the info the gifts you can send',
  syntax:'!gifts',
	aliases:['gifts', 'giftslist'],
	permissions:[PermissionsBitField.Flags.ViewChannel],
  
  execute(client, message, args, Discord){
    const embed = new Discord.EmbedBuilder()
		.setTitle('Gifts info')
		.setColor('#00ff00')
		.addFields([
			{name:'Cake', value:'23'},
			{name:'Toy car', value:'50'},
			{name:'Chess Board', value:'56'},
			{name:'Toy Train', value:'84'},
			{name:'Vibe check', value:'86'}
		])
		
		message.channel.send({embeds:[embed]})
  }
}