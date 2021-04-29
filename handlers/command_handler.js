const fs = require('fs');

module.exports = (client, Discord) => {
    const command_files = fs
        .readdirSync('./commands/').filter(file => file.endsWith(''))

    for (const folder of command_files) {
        const files = fs
            .readdirSync(`./commands/${folder}/`)
            .filter(file => file.endsWith('.js'))
        for (const file of files) {
            const command = require(`../commands/${folder}/${file}`);
            if (command) {
                if (command.name) {
                    client.command.set(command.name, command);
                } else {
                    continue;
                }
            } else {
                message.channel.send('No such command exist so far.');
            }
        }
    }
}