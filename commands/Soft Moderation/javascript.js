module.exports = {
    name: 'javascript',
    aliases: ['js','learnjs'],
    description: "Command made for showing JavaScript tutorial links. ",
    execute(client ,message, args , Discord){
       
        const embed = new Discord.MessageEmbed()
        .setColor('#00FAF3')
        .setDescription("__**Documentation:**__ \n•MDN Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript \n•W3School (Javascript): https://www.w3schools.com/js/ \n•jQuery Documentation: http://contribute.jquery.org/documentation/ \n•NodeJS: https://nodejs.org/en/docs/ \n \n__**Tutorials:**__ \n•Eloquent Javascript: http://eloquentjavascript.net/ \n•You Don't Know JS: https://github.com/getify/You-Dont-Know-JS \n•MDN Tutorial: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps \n•Modern Javascript: https://javascript.info/ \n \n__**Interesting:**__ \n•You might not need jQuery: http://youmightnotneedjquery.com/ \n•CodingTrain (tutorials with examples using p5.js): https://www.youtube.com/user/shiffman \n \nThis list does not contain every resource out there because the internet is huge and listing everything down is impossible.")
        message.channel.send(embed);
        
    }
}