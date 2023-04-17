module.exports = {
    Module: 'Moderation',
    Description: 'Module which contains moderation commands that can be used by the staff.',
    Commands: [
        {
            Name: 'ban',
            Description: 'Bans the mentioned user.',
            Syntax: '/ban <*user> <!reason>',
            Permission: 'Admin',
        },
        {
            Name: 'kick',
            Description: 'Kicks the mentioned user.',
            Syntax: '/kick <*user> <!reason>',
            Permission: 'Staff',
        },
        {
            Name: 'mute',
            Description: 'Mutes the mentioned user.',
            Syntax: '/mute <*user> <!reason> <!time> <!time_units>',
            Permission: 'Staff',
        },
        {
            Name: 'unmute',
            Description: 'Unmutes the mentioned user.',
            Syntax: '/unmute <*user>',
            Permission: 'Staff',
        },
        {
            Name: 'warn',
            Description: 'Warns the mentioned user.',
            Syntax: '/warn <*user> <!reason>',
            Permission: 'Staff',
        },
        {
            Name: 'clear',
            Description: 'Clears the specified amount of messages or amount of messages by a mentioned user.',
            Syntax: '/clear <*amount> <!user>',
            Permission: 'Staff',
        },
        {
            Name: 'lock',
            Description: 'Locks the channel.',
            Syntax: '/lock',
            Permission: 'Staff',
        },
        {
            Name: 'unlock',
            Description: 'Unlocks the channel.',
            Syntax: '/unlock',
            Permission: 'Staff',
        },
        {
            Name: 'infraction',
            Description: 'Sends the infraction of the mentioned user.',
            Syntax: '/infraction <*user>',
            Permission: 'Staff',
        },
        {
            Name: 'delete infraction',
            Description: 'Deletes the infraction of the mentioned user.',
            Syntax: '/deleteinfr <*infraction_id>',
            Permission: 'Staff',
        },
        {
            Name: 'unban',
            Description: 'Unbans the mentioned user.',
            Syntax: '/unban <*user>',
            Permission: 'Admin',
        }
    ]
}