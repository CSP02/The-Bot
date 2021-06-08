let isCurseMsg = false

module.exports = (Discord, client, guild, message) => {
    const words = [
        'nigg',
        'retard',
    ];


    message.edits.forEach(async msg => {
        await message.channel.messages.fetch(msg.id).then(mesg => {
            words.forEach(curseWord => {
                if (mesg.content.toLowerCase().replace(/[^a-zA-Z ]/g, '').replace(/ /g, '').includes(curseWord)) {
                    isCurseMsg = true
                    message.delete(mesg).catch(error => {
                        if (error.code !== 10008) {
                            console.error("Failed to delete the message", error)
                        } else {
                            message.reply("Message deleted,\nPlease don't use the those words unless you want to get **muted** or **banned**");
                        }
                    })
                    return
                } else {
                    return
                }
            })
        })
    })
}