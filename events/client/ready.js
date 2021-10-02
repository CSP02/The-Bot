module.exports = (Discord, client) => {
    name: 'ready',
    console.log('The bot is online');
    client.user.setActivity("Helping\n(!help)", {
    type: "PLAYING",
    });
  }