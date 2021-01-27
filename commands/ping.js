module.exports = {
    name: 'ping',
    description: "This is ping command",
    execute(message, args){
        if(message.guild.roles.cache.find(role => role.name === 'king')){
            message.channel.send('pong!');
        } 
        else{
            message.channel.send('you have no permission to use this command');
        } 
    }
}