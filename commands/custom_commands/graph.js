module.exports = {
    name: 'graph',
    description: 'sends the embed image containing the graph of given equation',
    aliases: ['showgraphically', 'sg', 'graphical', 'gr'],
    syntax: '!sg <equation>',
    permissions:['VIEW_CHANNEL'],
    others: "**Representation**:\n\naddition/plus -> '+';\nsubtraction/minus -> '-';\nmultiplication/into -> '*';\ndivision -> '/';\npower(square,cube etc) -> '^'",
    footer: "\n\nNote:\n\nnote that spaces may crash the API so don't use spaces while providing the equation to this command\n\nTrigonimetric terms can be passed as usual like sin(x) and angle inside brackets\n\nNote that BODMAS applies. If you don't know what BODMAS is kindly google it.",

    async execute(client, message, args, Discord) {
        var equation = encodeURIComponent(`${args.slice(0).join('&')}`)
        const embedMsg = new Discord.MessageEmbed()
        const img1 = `https://denzven.pythonanywhere.com/DenzGraphingApi/v1/flat_graph/test/plot?formula=${equation}`
        embedMsg
            .setURL(`${img1}`)
            .setColor("#00ff00")
            .setTitle("The graphical representation of " + "``" + `${args}` + "``")
            .setImage(img1)
            .setAuthor(message.author.username, message.author.displayAvatarURL())
        await message.channel.send(embedMsg).catch(console.error)
    }
}