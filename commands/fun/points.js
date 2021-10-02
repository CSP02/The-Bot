const mongo = require('../../schemas/mongo')
const pointsSchema = require('../../schemas/pointsSchema')

module.exports = {
  name: 'points',
  slash: false,
  description: "gives points for the jam participants",
  syntax:'For users:\n !points <user>\nFor staff: !points <number of points>\n',
  async execute(client, message, args, Discord) {
    const guildId = message.guild.id
    const mem = message.mentions.users.first()
		if(!args[0]) return message.channel.send('Mention a user!')
    console.log(message.author.id)
		const embedMsg = new Discord.MessageEmbed()
						.setTitle('Points')
		const author = message.author.id
    await mongo().then(async mongoose =>{
    	try{
    	  const results = await pointsSchema.findOne({
    	  	guildId,
    	  })
    	  if(results === null){
const embedMsg = new Discord.MessageEmbed()
						.setTitle('Points')
						.setColor('#ff0000')
						.setDescription('No events were hosted in this guild.')
						return message.channel.send({embeds:[embedMsg]})
    	  }
    	  for(const points of results.points){
					const {author, user, point} = points
					console.log(mem.id, user)
					if(user == mem.id){
						embedMsg
							.setDescription('Really amazed')
						.setFooter('Keep particaipatingin jams and events to get points')
						.setColor('#fcc603')
						.setThumbnail(mem.avatarURL(true))
						.addFields(
							{name:'User', value:`${mem}`},
							{name:'points', value:`${point}`}
						)
						return message.channel.send({embeds:[embedMsg]})
					}else{
						embedMsg
						.setColor('#fcc603')
						.setDescription('User not found in database. seems like not participated in jams/events till now')
					}
				}
				return message.channel.send({embeds:[embedMsg]})
    	}finally{
    		mongoose.connection.close()
    	}
    })
	}
}