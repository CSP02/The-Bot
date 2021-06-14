module.exports = {
    name: 'graph',
    description: 'Sends the embed image containing the graph of given equation.',
    aliases: ['showgraphically', 'sg', 'graphical', 'gr'],
    syntax: '!sg <equation>',
    others: "**Representation**:\n\naddition/plus -> '+';\nsubtraction/minus -> '-';\nmultiplication/into -> '*';\ndivision -> '/';\npower(square,cube etc) -> '^'",
    footer: "\n\nNote:\n\nnote that spaces may crash the API so don't use spaces while providing the equation to this command\n\nTrigonimetric terms can be passed as usual like sin(x) and angle inside brackets\n\nNote that BODMAS applies. If you don't know what BODMAS is kindly google it.",

    execute(client, message, args, Discord) {
        const equation = `${args[0]}`.replace('+', '%2B').replace('^', '**').replace('√', '%E2%88%9A').replace('π', '%CF%80')
        const img1 = `http://denzven.pythonanywhere.com/graph?formula=${equation}`
        const embedMsg = new Discord.MessageEmbed()
            .setColor("#00ff00")
            .setTitle(`The graphical representation of ${args[0]}`)
            .setImage(img1)
        message.channel.send(embedMsg)
    }
}