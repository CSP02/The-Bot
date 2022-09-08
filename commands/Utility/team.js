const { PermissionsBitField } = require('discord.js');
module.exports = {
	name: 'team',
	aliases: ['join'],
	description: "Let's you join a team(if the guild has any)",
	syntax: '!team <team>',
	permissions: [PermissionsBitField.Flags.ViewChannel],
	execute(client, message, args, Discord) {
		try{
			serverTeams = ""
			message.guild.roles.cache.forEach(roles => {
				if (roles.name === '@everyone' || roles.name === 'admin' || roles.name === 'Muted' || roles.name.includes('Bot') || roles.name === 'mod' || roles.name === 'Staff' || roles.name === 'ModMail' || roles.name.includes('Server Booster') || roles.name === 'event manager' || roles.name.includes('voted') || roles.name.includes('Dyno') || roles.name === 'Groovy' || roles.name.includes('manager') || roles.name.includes('bot') || roles.name.includes('Admin') || roles.name.includes('Denz')) {
					return
				}
				else if (roles.name.includes("Team")) {
					serverTeams += `${roles.name}\n`

				} else {
					return
				}
			})
			if (serverTeams === "") {
				serverTeams += "Server has no Teams."
			}

			const cacheTeam = message.member.roles.cache
			if (args[0]) {
				if (args[0] != 'mod' && args[0] != 'admin' && args[0] != 'Muted') {
					let myRole = message.guild.roles.cache.find(role => role.name === `Team ${args[0].toLowerCase()}`);
					if (myRole) {
						cacheTeam.forEach(team => {
							if (team.name.includes('Team')) {
								message.member.roles.remove(team).catch(console.error);
							}
							else {
								return
							}
						})
						AddTeam(myRole)
						const embedMsg = new Discord.EmbedBuilder()
							.setColor('#C155FF')
							.setTitle('__Team__:')
							.addFields([{ name: 'you have successfully joined team', value: `${myRole}` }])
						message.channel.send({ embeds: [embedMsg] });
					}
					else {
						message.channel.send('No such team is found. Check the spelling and roles are also case sensitive.');
					}
				}
			} else {
				const embdMsg = new Discord.EmbedBuilder()
					.setTitle("Teams:")
					.setColor("#19fff0")
					.addFields
					({ name: "Teams in this server are:", value: `${serverTeams}` })
				message.channel.send({ embeds: [embdMsg] });
			}

			function AddTeam(myRole) {
				message.member.roles.add(myRole).catch(console.error);

			}
		}catch(e){
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)

		}
	}
}