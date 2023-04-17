const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    name: 'topic',
    data: new SlashCommandBuilder()
        .setName('topic')
        .setDescription('Set a topic for the channel.'),

    async execute(client, interaction, Discord) {
        const topics = [
            'Demon slayer',
            'Best Anime/manga',
            'Best books you ever read',
            'Best movies you ever watched',
            'Best games you ever played',
            'Black hole :hmmGe:',
            '<https://skribbl.io/>',
            '<https://ehmorris.com/lander/>',
            'GPUs are great aren\'t they?',
            'Minecraft is fun',
            'Burritos are tasty 😋',
            'Microprocessors and controllers',
            'Let\'s talk about your projects',
            'what\'s your device wallpaper?',
            'Raspberry Pi is cool',
        ]
        const randomIndex = Math.floor(Math.random() * topics.length);
        interaction.reply({ content: topics[randomIndex] })
    }
}