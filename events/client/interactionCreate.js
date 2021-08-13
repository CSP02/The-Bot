const fs = require('fs')

module.exports = async (Discord, client, interaction) => {
    const customId = interaction.customId.toString()
    const args = interaction.message.content.slice(0).split(/ +/)
    const interactionFiles = fs
        .readdirSync('./interactions/').filter(file => file.endsWith('.js'))



    for (const file of interactionFiles) {
        const interactFile = require(`../../interactions/${file}`)
        if (interactFile.interactTo.includes(`${customId}`)) {
            if (interaction.member.permissions.has(interactFile.permissions) || interactFile.permissions === null) {
                return interactFile.execute(client, interaction, args, Discord)
            }
            else
                return interaction.reply({ content: "You have no permission", ephemeral: true })
        }
        else continue
    }
}