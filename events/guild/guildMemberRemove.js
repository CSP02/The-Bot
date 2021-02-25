module.exports = (Discord, client, guildMember) => {

    const sLogsChannel = client.channels.cache.get('your log channel id goes here')
    sLogsChannel.send(`${guildMember} has left the server.`);
}