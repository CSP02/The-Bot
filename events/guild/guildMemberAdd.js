module.exports = (Discord, client, guildMember) => {
    console.log("joined");

    const serverLogsChn = guildMember.guild.channels.cache.find(
        (chn) => chn.name === "server-logs"
    );
    const server = guildMember.guild;

    let welcomeRole =
        guildMember.guild.roles.cache.find((role) => role.name === "member") ||
        guildMember.guild.roles.cache.find((role) => role.name === "Member");
    guildMember.roles.add(welcomeRole).catch(console.error);

    const embedMsg = new Discord.EmbedBuilder()
        .setColor("#00ff00")
        .setDescription(`hurray! ${guildMember.user.tag} joined the server.`)
        .setTitle(`Joined:`)
        .setThumbnail(`${guildMember.user.displayAvatarURL()}`)
        .addFields([{ name: "userID:", value: `${guildMember.user.id}` }]);
    if (serverLogsChn) {
        serverLogsChn.send({ embeds: [embedMsg] }).catch(console.error);
    }
};
