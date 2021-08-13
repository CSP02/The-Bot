module.exports = {
    name: 'graph',
    description: 'sends the embed image containing the graph of given equation',
    aliases: ['polargraphical', 'pgr'],
    permissions: ['VIEW_CHANNEL'],
    syntax: '!pgr <equation>',
    others: "**Representation**:\n\naddition/plus -> '+';\nsubtraction/minus -> '-';\nmultiplication/into -> '*';\ndivision -> '/';\npower(square,cube etc) -> '^'",
    footer: "\n\nNote:\n\nnote that spaces may crash the API so don't use spaces while providing the equation to this command\n\nTrigonimetric terms can be passed as usual like sin(x) and angle inside brackets\n\nNote that BODMAS applies. If you don't know what BODMAS is kindly google it.",

    async execute(client, message, args, Discord) {
        var i = 0
        var python_anywhere_beta_BASEURL = "http://denzven.pythonanywhere.com/DenzGraphingApi/v1/flat_graph/test/plot"
        for (e in args) {
            if (i == 0) {
                var equation = encodeURIComponent(`${args[e]}`)
                python_anywhere_beta_BASEURL = python_anywhere_beta_BASEURL + `?formula=${equation}`
                i += 1
            }
            else {
                python_anywhere_beta_BASEURL = python_anywhere_beta_BASEURL + `&${args[e]}`
            }

        }
        await message.channel.send(python_anywhere_beta_BASEURL);
    }
}