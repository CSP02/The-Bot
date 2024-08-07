module.exports = {
    Module: 'Utility',
    Description: 'Module which contains utility commands that can be used by the user.',
    Commands: [
        {
            Name: 'ping',
            Description: 'Sends the ping of the bot.',
            Syntax: '/ping',
            Permission: 'Everyone',
        },
        {
            Name: 'about',
            Description: 'Sends the github link of the bot.',
            Syntax: '/about',
            Permission: 'Everyone',
        },
        {
            Name: 'serverinfo',
            Description: 'Sends the info about the server.',
            Syntax: '/serverinfo',
            Permission: 'Everyone',
        },
        {
            Name: 'userinfo',
            Description: 'Sends the info about the user.',
            Syntax: '/userinfo <@user>\n-# \t*(optional)*',
            Permission: 'Everyone',
        },
        {
            Name: 'help',
            Description: 'Sends the info about the commands you can use.',
            Syntax: '/help <command_name>',
            Permission: 'Everyone',
        },
        {
            Name: 'google',
            Description: 'Sends top 5 google search results for the given query.',
            Syntax: '/google <query>',
            Permission: 'Everyone',
        }
    ]
}