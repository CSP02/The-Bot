module.exports = {
    Module: 'Fun',
    Description: 'Module which contains fun commands that can be used by the user.',
    Commands: [
        {
            Name: 'ask',
            Description: 'Ask a question to the bot(like a magic 8 ball game).',
            Syntax: '/ask <*question>',
            Permission: 'Everyone',
        },
        {
            Name: 'bam',
            Description: 'Bam the mentioned user.',
            Syntax: '/bam <@user>',
            Permission: 'Everyone',
        },
        {
            Name: 'react',
            Description: 'React to the linked message with any reaction(even animated).',
            Syntax: '/react <*reaction> <!message_link>',
            Permission: 'Everyone',
        },
        {
            Name: 'kill',
            Description: 'Kill the mentioned user(a fun command it doesn\'t really kills someone).',
            Syntax: '/kill <@user>',
            Permission: 'Everyone',
        },
        {
            Name: 'leaderboard',
            Description: 'Sends the leaderboard of the server.',
            Syntax: '/leaderboard',
            Permission: 'Everyone',
        },
    ]
}