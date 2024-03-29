module.exports = (Discord, client, guildMember) => {
    console.log("left");
    const serverLogsChn = guildMember.guild.channels.cache.find(
        (chn) => chn.name === "server-logs"
    );
    const embedMsg = new Discord.EmbedBuilder()
        .setColor("#ff0000")
        .setTitle("Left:")
        .setDescription(`${guildMember.user.tag} left the server.`)
        .setThumbnail(`${guildMember.user.displayAvatarURL()}`)
        .addFields([{ name: "userID:", value: `${guildMember.user.id}` }]);
    if (serverLogsChn) {
        serverLogsChn.send({ embeds: [embedMsg] }).catch(console.error);
    }
};
