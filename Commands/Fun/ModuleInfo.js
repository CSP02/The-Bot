module.exports = {
    Module: 'Fun',
    Description: 'Module which contains fun commands (some games probably) that can be used by the user.',
    Commands: [
        {
            Name: 'ask',
            Description: 'Answers to an yes/no question (I am really amazed of it\'s accuracy',
            Syntax: '/ask <question>',
            Permission: 'Everyone',
        },
        {
            Name: 'rockpaperscissor',
            Description: 'Play Rock, Paper and Scissor game with the bot',
            Syntax: '/rockpaperscissor <your_choice>',
            Permission: 'Everyone',
        },
        {
            Name: 'bonk',
            Description: 'Sends a bonk gif',
            Syntax: '/bonk',
            Permission: 'Everyone',
        },
    ]
}