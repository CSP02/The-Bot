const mongo = require('../../mongo')
const jamShema = require('../../jamSchema')

module.exports = {
	name:'jaminfo',
	description:'sends the time left for the jam',
	aliases:['jam', 'infojam', 'ji'],
	syntax:'!jam',
	
	 async execute(client, message, args, Discord){
		 const guildId = message.guild.id
		 await mongo().then(async mongoose => {
          try {
            const jamInfo = await jamShema.findOne({
              guildId,
            })
            const deadline = new Date(jamInfo.jam[0].timestamp)
            const currentTime = new Date().getUTCSeconds()
					if(jamInfo === null){
						return message.channel.send("No jams are registered right now!")
					}


				 var date1, date2;  

         date1 = new Date(deadline);
				 var date3 = new Date()
         console.log(""+date1);

         date2 = new Date();
         console.log(""+date2);

         var res = Math.abs(date1 - date2) / 1000;
         var days = Math.floor(res / 86400); 
         var hours = Math.floor(res / 3600) % 24;         
         var minutes = Math.floor(res / 60) % 60;
         var seconds = res % 60; 

				 const embedMsg = new Discord.MessageEmbed()
				 .setTitle('Time remaining')
				 .setColor('#ddff00')
				 .setDescription(`${days} days, ${hours} hrs, ${minutes} min, ${parseInt(seconds)} sec remaining`)
				 message.channel.send({embeds:[embedMsg]})
          } finally {
            mongoose.connection.close()
          }
      })
  }
}