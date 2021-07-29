module.exports = (Discord, client, message) => {
	const prefix = '!';

	const words = [
		//words you want to ban in your server nwords are default
	];


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

	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}

	if (message.channel.type === 'dm') return message.reply("Sorry! Iam not for dms.")
	else {
		const args = message.content.slice(prefix.length).split(/ +/);
		const cmd = args.shift().toLowerCase();
		const tempCmd = cmd.split()
		if (tempCmd[0] !== '' && tempCmd[0] !== '!') {
			const command =
				client.command.get(cmd) ||
				client.command.find(a => a.aliases && a.aliases.includes(cmd));
			if (command) {
				if (command.permissions) {
					const authorPerms = message.channel.permissionsFor(message.author);
					if (!authorPerms || !authorPerms.has(command.permissions)) {
						return message.channel.send('Access Denied!')
					} else {
						command.execute(client, message, args, Discord);
					}
				}
			}
			else
				return message.channel.send('No such command exists so far.');
		} else {
			return
		}
	}
}