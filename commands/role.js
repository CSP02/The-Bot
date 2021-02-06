module.exports = {
	name: 'role',
	description: 'This command will give you the roles.',
	execute(client, message, args, Discord) {
		if (args[0]) {
				 if((args[0] ===  'mod' || args[0] ===  'admin') && message.member.roles.cache.some(r => r.name === 'admin')){				
				let myRole = message.guild.roles.cache.find(role => role.name === args[0]);
			
				message.member.roles.add(myRole).catch(console.error);
				message.channel.send('Role added');
        }else if(args[0] != 'Moderator' && args[0] != 'king' && args[0] != 'Muted'){
            let myRole = message.guild.roles.cache.find(role => role.name === args[0]);
          if(myRole){
            message.member.roles.add(myRole).catch(console.error);
				    message.channel.send('Role added');
          }
          else{
            message.channel.send('No such role is found. Check the spelling and roles are also case sensitive.');
          }
        }else{
          message.reply(`You have no permission to add the ${args[0]} role\nAsk any of the admin to assign you the role.`);
        }
		}else{
		  message.reply('Please specify the role you want.');
		}
	}
}
