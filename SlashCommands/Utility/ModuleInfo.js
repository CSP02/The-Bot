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
            Name: 'github',
            Description: 'Sends the github link of the bot.',
            Syntax: '/github',
            Permission: 'Everyone',
        },
        {
            Name: 'google',
            Description: 'Sends the google link.',
            Syntax: '/google',
            Permission: 'Everyone',
        },
        {
            Name: 'remove',
            Description: 'Removes the mentioned role from a user.',
            Syntax: '/remove <*role>',
            Permission: 'Everyone',
        },
        {
            Name: 'role',
            Description: 'Gives the mentioned role to a user/sends the list of roles.',
            Syntax: '/role <!role>',
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
            Syntax: '/userinfo <@user>',
            Permission: 'Everyone',
        },
        {
            Name: 'youtube',
            Description: 'Sends the youtube link.',
            Syntax: '/youtube',
            Permission: 'Everyone',
        }
    ]
}