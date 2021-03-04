module.exports = {

    name: 'help',

    description: "This command will display what this bot can do",

    execute(client, message, args, Discord) {

        const embedMsg = new Discord.MessageEmbed()

            .setColor('#00ff00')

            .setTitle('__Help__:')

            .addFields(

                { name: 'Roles(not the command):', value: 'cg artist\nGamers\nGame devs\nmember is the default role.' },

                { name: 'userinfo', value: 'Displays the userinfo of the messaged member' },

                { name: 'serverinfo', value: 'Displays the brief info of the server' },



                { name: 'Ping:', value: 'Shows the hearth beat of the bot.' },

                { name: 'kick:', value: 'kicks the mentioned member' },

                { name: 'mute:', value: 'mutes the mentioned member for specified amount of time' },

                { name: 'ban:', value: 'bans the mentioned member.' },

                { name: 'unmute', value: 'unmutes the mentioned member' },

                { name: 'warn', value: 'warns the mentioned member' },

                { name: 'warns', value: 'displays the warns of the mentioned member' },

                { name: 'list-warns-by', value: 'displays the list of warns made by the mentioned member(mod or admin)' }

            )

            .setFooter('Make sure to check the rules before messaging.\nAlso note that mute, ban, unmute, kick commands were only used by the moderator or the admins.');

        message.channel.send(embedMsg);

    }

}
