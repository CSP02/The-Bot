const mongo = require('../../schemas/mongo')
const pointsSchema = require('../../schemas/pointsSchema')

module.exports = {
  name: 'givepoints',
  aliases:['gp','give'],
  description: "gives points for the jam participants",
  syntax:'!give <user>',
	permissions:['BAN_MEMBERS'],
  async execute(client, message, args, Discord) {
    const guildId = message.guild.id
    const mem = message.mentions.users.first()
    console.log(message.author.id)
		const author = message.author.id
		var po = parseInt('0', 10)
		var changed = false
		
		await mongo().then(async mongoose =>{
    	try{
						const results = await pointsSchema.findOne({
              guildId
            })
					if(results !== null){
						for(const givenPoint of results.points){
							console.log('exist')
							const {author, user, point} = givenPoint
							if(user == mem.id){
								po += parseInt(`${point}`, 10)
								changed = true

								const points = {
								author: author,
								user: mem.id,
								point: point,
							}

						await mongo().then(async mongoose =>{
							try{
								await pointsSchema.findOneAndUpdate({
								guildId
							}, {
								guildId,
								$pull:{
									points:givenPoint
								}
							})
							}finally{
								mongoose.connection.close()
							}
						})
					}
						}
					}
					}
    	finally{
    		mongoose.connection.close()
    	}
    })
		if(changed){
		var point = po + parseInt(`${args[1]}`, 10)
}else{
	var point = parseInt(`${args[1]}`, 10)
}

		const points = {
			author: author,
			user: mem.id,
			point: point,
		}

		const embedMsg = new Discord.MessageEmbed()
		.setTitle('Points')
		.setFooter('Points were given')
		.setColor('#00ff00')
		.addFields(
			{name:'User:', value:`<@${mem.id}>`},
			{name:'Points:', value:`${args[1]}`},
			{name:'Total Points:', value:`${point}`}
		)
		.setThumbnail(mem.avatarURL(true))

    await mongo().then(async mongoose =>{
			console.log("connected")
    	try{
						await pointsSchema.findOneAndUpdate({
              guildId,
            }, {
                guildId,
                $push: {
                  points: points
                }
              }, {
                upsert: true
              })
    	}finally{
    		mongoose.connection.close()
    	}
    })
		message.channel.send({embeds:[embedMsg]})
	}
}