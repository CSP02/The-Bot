const { SlashCommandBuilder } = require('discord.js');
module.exports = {
  name: 'learnunity',
  data: new SlashCommandBuilder()
    .setName("learnunity")
    .setDescription("Displays the link for learning discord.js "),

  async execute(client, interaction, Discord) {
    const embedMsg = new Discord.EmbedBuilder()
      .setColor('#9C27B0')
      .setTitle('**Learn C# basics before starting with Unity!**')
      .addFields(
        [{ name: "Learning the syntax of C# definitely helps when using Unity. Here are some links to get you started!", value: "https://docs.microsoft.com/en-us/dotnet/csharp/ (Microsofts 'Getting Started' Guide on C#)\nhttps://channel9.msdn.com/Series/CSharp-Fundamentals-for-Absolute-Beginners (Teaches you the C# fundamentals)\nhttps://github.com/ossu/computer-science (Not strictly C#, a general open-source education in Computer Science)\n https://www.classcentral.com/report/stanford-on-campus-courses (Publicly available Computer Science courses from Stanford)\n https://codecademy.com/learn/learn-c-sharp (Code Academy course on C#)\n https://learn.unity.com/ (Has great tutorials on using C# with Unity)" }])
      .setFooter({ text: `Most programming problems come from not knowing how to use the language - if you haven’t programmed much or you’re not confident about the OOP concepts in your mind, it's useful to understand these before diving into the engine.` })
    interaction.reply({ embeds: [embedMsg] });
  }
}