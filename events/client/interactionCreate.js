const fs = require('fs')

module.exports = async (Discord, client, interaction) => {
    if (!interaction.isCommand()) {
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
    } else {
        const interactionFiles = fs
            .readdirSync('./SlashInteractions/').filter(file => file.endsWith('.js'))
        for (const file of interactionFiles) {
            const interactFile = require(`../../SlashInteractions/${file}`)
            if (interactFile.name.includes(interaction.commandName) || interactFile.aliases.includes(interaction.commandName)) {
                if (interaction.member.permissions.has(interactFile.permissions) || interactFile.permissions === null) {
                    return interactFile.execute(client, interaction, Discord)
                }
                else
                    return interaction.reply({ content: "You have no permission", ephemeral: true })
            }
            else continue
        }
    }
}