module.exports = {
    name: "pinnedmsg",
    description: "sends the pinned message of the channel.",
    aliases: ["pm", "pinned", "pinmsg"],
    syntax: '!pinmsg || !pinmsg <number>',
    permissions: ['VIEW_CHANNEL'],
    execute(client, message, args, Discord) {
        let reply = []
        let i = parseInt('0', 10)
        let allReply = `__Pinned messages of this channel are__:\n`
        message.channel.messages.fetchPinned().then(msgs => {
            msgs.forEach(msg => {
                reply[parseInt(i, 10)] = `__Pinned messages of this channel are__:\n${msg.content}\n`
                i = parseInt(i, 10) + parseInt('1', 10)
                allReply += `${msg.content}\n`
            })
            if (args[0] && reply[args[0]] !== null) {
                message.channel.send(reply[args[0]])
            } else if (!args[0]) {
                message.channel.send(allReply)
            }
        })
    }
}