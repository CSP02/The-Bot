const fs = require('fs')

module.exports = {
    name: 'reload',
    description: 'Reloads the whole commands bot has',
    syntax: '!reload',
    permissions: ['VIEW_AUDIT_LOG'],
    execute(client, message, args, Discord) {
        try {
            const commandName = args[0].toLowerCase();
            const command = message.client.command.get(commandName)
                || message.client.command.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
            }

            const commandFolders = fs.readdirSync('./commands');
            for (folder in commandFolders) {
                const folderName = commandFolders.find(folder => fs.readdirSync(`./commands/${folder}`).includes(`${command.name}.js`));
                delete require.cache[require.resolve(`../${folderName}/${command.name}.js`)];

                try {
                    const newCommand = require(`../${folderName}/${command.name}.js`);
                    message.client.command.set(newCommand.name, newCommand);
                    return message.channel.send(`Command \`${newCommand.name}\` was reloaded!`);
                } catch (error) {
                    console.error(error);
                    return message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
                }
            }
        } catch (e) {
            const emd = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('command raised an error in the source code:')
                .setDescription(`\`\`\`${e}\`\`\`\n\nYou can crease a issue report here https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0`)
            message.channel.send({ embeds: [emd] })
        }
    }
}