module.exports = {
    Module: 'Custom Commands',
    Description: 'Module which contains custom commands that can be used by the user.',
    Commands: [
        {
            Name: 'debug',
            Description: 'Sends a tip to debug your code in unity.',
            Syntax: '/debug',
            Permission: 'Everyone',
        },
        {
            Name: 'info',
            Description: 'Sends the info about the bot.',
            Syntax: '/info',
            Permission: 'Everyone',
        },
        {
            Name: 'learndjs',
            Description: 'Sends few useful links to learn discord.js.',
            Syntax: '/learndjs',
            Permission: 'Everyone',
        },
        {
            Name: 'learnjs',
            Description: 'Sends few useful links to learn javascript.',
            Syntax: '/learnjs',
            Permission: 'Everyone',
        },
        {
            Name: 'learnunity',
            Description: 'Sends few useful links to learn unity.',
            Syntax: '/learnunity',
            Permission: 'Everyone',
        },
        {
            Name: 'longcode',
            Description: 'Sends the pastemyst link which is used to paste your code.',
            Syntax: '/longcode',
            Permission: 'Everyone',
        },
        {
            Name: 'togglerjs',
            Description: 'Send the cdn link of toggler.js.',
            Syntax: '/togglerjs',
            Permission: 'Everyone',
        }
    ]
}