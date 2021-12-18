const fs = require('fs')

module.exports = async (Discord, client, interaction) => {
    try {
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
                .readdirSync('./SlashCommands/').filter(file => file.endsWith('.js'))
            for (const file of interactionFiles) {
                const interactFile = require(`../../SlashCommands/${file}`)
                if (interactFile.name.includes(interaction.commandName)) {
                    if (interactFile.permissions === null || interactFile.permissions === undefined || interaction.member.permissions.has(interactFile.permissions)) {
                        return interactFile.execute(client, interaction, Discord)
                    }
                    else
                        return interaction.reply({ content: "You have no permission", ephemeral: true })
                }
                else continue
            }
        }
    } catch (e) {
        console.log(e)
        const emd = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('command raised an error in the source code:')
            .setDescription(`Seems like this error is in source code I will let the developer know about this error or else you can report it in github. Click on the embed to go to the report page! If you want to know more about this error clikc the button.`)
            .setURL('https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0')
        interaction.reply({ embeds: [emd] })

        const embd = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('command raised an error in the source code:')
            .addFields(
                { name: 'Error Message:', value: `\`\`\`md\n${e.message}\`\`\`\n\n` },
                { name: 'Error code:', value: `\`\`\`md\n${e.code}\`\`\`\n\n` },
                { name: 'Error in Guild', value: `\`\`\`md\n${interaction.guild.name}\`\`\`\n\n` },
            )
            .setURL(interaction.url)
            .setDescription('Click on the embed to go the message.')

        await client.users.fetch('768737415061569596').then(owner => {
            owner.send({ embeds: [embd] })
        })
    }
}