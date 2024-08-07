module.exports = {
    Module: 'Custom',
    Description: 'Module which contains utility commands that can be used by the user.',
    Commands: [
        {
            Name: 'buildtex',
            Description: 'Sends an image for the given tex input.',
            Syntax: '/buildtex <tex_input>',
            Permission: 'Everyone',
        }
    ]
}