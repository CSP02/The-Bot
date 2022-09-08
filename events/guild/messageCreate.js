const prefix = '!';
require('dotenv').config();
const devPrefix = process.env.devPrefix

const words = [
	'nigg',
	'retard',
];

const easterEggReplies = [
	'I see, trying to find an easter egg?',
	'I am afraid that you might find the easter egg',
	'Do you know the-atelier team introduced easter eggs. Find all of them *if you can*.',
	'No such command exists so far'
]


const random = Math.floor(Math.random() * easterEggReplies.length);

const cooldowns = new Map()
module.exports = (Discord, client, message) => {
	for (const curseWords of words) {
		if (message.content.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/ /g, '').includes(curseWords)) {
			curseMsg = message.fetch(message.id);
			if (curseMsg) {
				message.delete(curseMsg);
				message.reply(
					"Message deleted,\nPlease don't use the those words unless you want to get **muted** or **banned**"
				);
			} else {
				return;
			}
		}
	}


	const checkDev = (message.content.startsWith(devPrefix) && message.channel.name === 'bot-test')

	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	if (message.channel.type === 'dm') {
		message.reply("Sorry! Iam not for dms.")
		return
	}
	const args = message.content.slice(prefix.length).split(/ +/);
	const cmd = args.shift().toLowerCase();
	const command =
		client.command.get(cmd) ||
		client.command.find(a => a.aliases && a.aliases.includes(cmd));

	if (command) {
		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Discord.Collection());
		}

		const current_time = Date.now();
		const time_stamps = cooldowns.get(command.name);
		const cooldown_amount = (command.cooldown) * 1000;

		//If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
		if (time_stamps.has(message.author.id)) {
			const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;
			if (current_time < expiration_time) {
				const time_left = (expiration_time - current_time) / 1000;

				return message.reply(`Please wait ${time_left.toFixed(1)} more seconds before using ${command.name}`);
			}
		}

		//If the author's id is not in time_stamps then add them with the current time.
		time_stamps.set(message.author.id, current_time);
		//Delete the user's id once the cooldown is over.
		setTimeout(() => {
			time_stamps.delete(message.author.id)
		}, cooldown_amount);
		if (command.permissions) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.channel.send('Access Denied!')
			} else if (message.content.startsWith(prefix)) {
				command.execute(client, message, args, Discord)
				return
			}
		} else {
			command.execute(client, message, args, Discord)
		}
	}
	else
		return message.channel.send(`${easterEggReplies[random]}`);
}