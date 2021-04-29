module.exports = {
	name: 'role',
	aliases: ['giverole', 'role'],
	description: 'This is ping command',
	execute(client, message, args, Discord) {
		serverRoles = ""
		message.guild.roles.cache.forEach(roles => {
			if (roles.name === '@everyone' || roles.name === 'admin' || roles.name === 'Muted' || roles.name.includes('Bot') || roles.name === 'mod' || roles.name === 'Staff' || roles.name === 'ModMail' || roles.name.includes('Server Booster') || roles.name === 'event manager' || roles.name.includes('voted') || roles.name.includes('Dyno') || roles.name === 'Groovy' || roles.name.includes('manager') || roles.name.includes('bot') || roles.name.includes('Admin') || roles.name.includes('Denz')) {
				return
			}
			else if (roles.name.includes("Team")) {
				return

			} else {
				serverRoles += `${roles.name}\n`
			}
		})
		if (serverRoles === "") {
			serverRoles += "Server has no Roles."
		}


		if (args[0]) {
			if ((args[0] === 'mod' || args[0] === 'admin' || args[0] === 'Staff') && message.member.roles.cache.some(r => r.name === 'admin')) {
				let myRole = message.guild.roles.cache.find(role => role.name === args[0]);

				message.member.roles.add(myRole).catch(console.error);
				message.channel.send('Role added');
			} else if (args[0] != 'mod' && args[0] != 'admin' && args[0] != 'event-manager' && args[0] != 'Muted') {
				let myRole = message.guild.roles.cache.find(role => role.name === args.slice(0).join(' '));
				if (myRole) {
					message.member.roles.add(myRole).catch(console.error);
					message.channel.send('Role added');
				}
				else {
					message.channel.send('No such role is found. Check the spelling and roles are also case sensitive.');
				}
			} else {
				message.reply(`You have no permission to add the ${args[0]} role\nAsk any of the admin to assign you the role.`);
			}
		} else {
			const embdMsg = new Discord.MessageEmbed()
				.setTitle("Roles:")
				.setColor("#19fff0")
				.addFields
				({ name: "Roles in this server are:", value: `${serverRoles}` })
			message.channel.send(embdMsg);
		}
	}
}