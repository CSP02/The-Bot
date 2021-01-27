module.exports = {
    name: 'role',
    description: "This is ping command",
    execute(message, args){
        if(message.member.roles.cache.some(r => r.name === "king")){
            message.channel.send('you already has the king role');
        } 
        else{
            message.member.roles.add('803500474937376778').catch(console.error);
            message.channel.send('Enjoy the king role');
        } 
    }
}