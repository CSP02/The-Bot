module.exports = (Discord, client, message) => {
    const prefix = '!';

    const words = ["fuck",
        "bitch",
        "nigga",
        "nigger",
        "retarted",
        "Fuck",
        "Bitch",
        "Nigga",
        "Nigger",
        "Retarted"
    ]

    if (!message.content.startsWith(prefix) || message.author.bot) {
        for (const curseWords of words) {

            if (message.content.includes(curseWords)) {
                curseMsg = message.fetch(message.id)
                message.delete(curseMsg)
                message.channel.send("Message deleted")
                message.reply("Please don't use the curse words unless you want to get **muted** or **banned**");

                return;
            } else {
                continue;
            }
        }
        return
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.command.get(cmd) || client.command.find(a => a.aliases && a.aliases.includes(cmd));

    if (command) command.execute(client, message, args, Discord);
    else message.channel.send('No such command exists so far.');
}