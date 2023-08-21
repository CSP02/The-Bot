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
        [
          {
            name: "Learning the syntax of C# definitely helps when using Unity. Here are some links to get you started!",
            value: "1. [Microsofts 'Getting Started' Guide on C#](https://docs.microsoft.com/en-us/dotnet/csharp/)\n2. [Teaches you the C# fundamentals](https://channel9.msdn.com/Series/CSharp-Fundamentals-for-Absolute-Beginners)\n3. [Not strictly C#, a general open-source education in Computer Science](https://github.com/ossu/computer-science)\n4. [Publicly available Computer Science courses from Stanford](https://www.classcentral.com/report/stanford-on-campus-courses)\n5. [Code Academy course on C#](https://codecademy.com/learn/learn-c-sharp)\n6. [Has great tutorials on using C# with Unity](https://learn.unity.com/)"
          }
        ]
      )
      .setFooter({ text: `Most programming problems come from not knowing how to use the language - if you haven’t programmed much or you’re not confident about the OOP concepts in your mind, it's useful to understand these before diving into the engine.` })
    interaction.reply({ embeds: [embedMsg] });
  }
}