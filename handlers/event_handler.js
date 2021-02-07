const fs = require('fs');

module.exports = (client, Discord) => {
    const load_dir = dir => {
        const event_files = fs
            .readdirSync(`./events/${dir}`)
            .filter(file => file.endsWith('.js'));

        for (const file of event_files) {
            const event = require(`../events/${dir}/${file}`);
            const event_name = file.split('.')[0];
            client.on(event_name, event.bind(null, Discord, client));


            client.on('ready', () => {
                client.user.setActivity("Helping\n(!help)", {
                    type: "PLAYING",
                })
            });

            client.on('guildMemberAdd', guildMember => {
                let welcomeRole = guildMember.guild.roles.cache.find(
                    role => role.name === 'member'
                );

                guildMember.roles.add(welcomeRole);
            })
        }
    };

    ['client', 'guild'].forEach(e => load_dir(e));
}
