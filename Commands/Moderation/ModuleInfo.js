module.exports = {
    Module: 'Mod',
    Description: 'Module which contains Moderation commands that can be used by the mods.',
    Commands: [
        {
            Name: 'clear',
            Description: 'Deletes messages in a channel. Can also delete messages by mentioned users. \nThe number of messages it can delete is set to 10 by default.\nIf a user is mentioned, all the messages sent by the mentioned user from past 2 weeks will be deleted!',
            Syntax: '/clear <user?> <number?>',
            Permission: 'Mods and higher',
        },
        {
            Name: 'lock',
            Description: 'locks a channel.',
            Syntax: '/lock',
            Permission: 'Mods and higher',
        },
        {
            Name: 'unlock',
            Description: 'unlocks a channel.',
            Syntax: '/unlock',
            Permission: 'Mods and higher',
        },
        {
            Name: 'warn',
            Description: 'Warns the mentioned user.',
            Syntax: '/warn <user> <reason?>',
            Permission: 'Mods and higher',
        },
        {
            Name: 'mute',
            Description: 'Mute the mentioned user.',
            Syntax: '/mute <user> <reason?>',
            Permission: 'Mods and higher',
        },
        {
            Name: 'kick',
            Description: 'Kick the mentioned user.',
            Syntax: '/kick <user> <reason?>',
            Permission: 'Mods and higher',
        },
        {
            Name: 'ban',
            Description: 'Ban the mentioned user.',
            Syntax: '/ban <user> <reason?>',
            Permission: 'Mods and higher',
        }
    ]
}