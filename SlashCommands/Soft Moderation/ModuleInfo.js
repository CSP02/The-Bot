module.exports = {
    Module: 'Soft Moderation',
    Description: 'Module which contains soft moderation commands that can be used by the users.',
    Commands: [
        {
            Name: 'codeblocks',
            Description: 'Sends how to wrap text inside a codeblocks embed.',
            Syntax: '/codeblocks',
            Permission: 'Everyone',
        },
        {
            Name: 'pinnedMsg',
            Description: 'Sends the pinned message of the channel.',
            Syntax: '/pinnedMsg <!message_number>',
            Permission: 'Everyone',
        },
        {
            Name: 'rule',
            Description: 'Sends the rule of the server.',
            Syntax: '/rule <*rule_number>',
            Permission: 'Everyone',
        },
    ]
}