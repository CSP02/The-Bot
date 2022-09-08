const { PermissionsBitField } = require('discord.js');
module.exports = {
	name: 'leaveTeam',
	aliases: ['leave', 'lt', 'leaveteam'],
	description: 'leaves a specified team',
	syntax: '!leaveteam <team>',
	permissions: [PermissionsBitField.Flags.ViewChannel],
	execute(client, message, args, Discord) {
		try{
			const cacheTeam = message.member.roles.cache
			if (args[0]) {
				if (args[0] != 'mod' && args[0] != 'admin' && args[0] != 'Muted') {
					let myRole = message.member.roles.cache.find(role => role.name === `Team ${args.slice(0).join(" ").toLowerCase()}`);
					if (myRole) {
						message.member.roles.remove(myRole).catch(console.error);
						const embedMsg = new Discord.EmbedBuilder()
							.setColor('#C155FF')
							.setTitle('__Team__:')
							.addFields([{ name: 'you have successfully left team', value: `${myRole}` }])
						message.channel.send({ embeds: [embedMsg] });
					}
					else if (message.guild.roles.cache.find(role => role.name === `Team ${args.slice(0).join(" ").toLowerCase()}`)) {
						message.channel.send("No such team found in this server.")
					}
					else {
						message.channel.send('You are not in that team.');
					}
				}
			} else {
				message.channel.send("Spedify a team to leave.")
			}
		}catch(e){
			require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)

		}
	}
}