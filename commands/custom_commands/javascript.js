module.exports = {
    slash: false,
    name: 'learnjs',
    aliases: ['js', 'javascript'],
    permissions: ['VIEW_CHANNEL'],
    description: "Command made for showing JavaScript tutorial links. ",
    syntax: '!learnjs',
    execute(client, message, args, Discord) {

        const embed = new Discord.MessageEmbed()
            .setColor('#DDFF00')
            .setThumbnail("https://i.ibb.co/5sy5y5H/javascript-logo.png")
            .addFields(
                { name: '__**Documentation:**__', value: '\u200b' },

                { name: '•MDN Javascript: ', value: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript ' },

                { name: '•W3School (Javascript):  ', value: 'https://www.w3schools.com/js/ ' },

                { name: '•jQuery Documentation: ', value: 'http://contribute.jquery.org/documentation/  ' },

                { name: '•NodeJS: ', value: 'https://nodejs.org/en/docs/ ' },

                { name: '__**Tutorials:**__ ', value: '\u200b' },

                { name: '•Eloquent Javascript: ', value: ' http://eloquentjavascript.net/' },

                { name: "•You Don't Know JS: ", value: 'https://github.com/getify/You-Dont-Know-JS ' },

                { name: '•Modern Javascript: ', value: 'https://javascript.info/ ' },

                { name: '__**Interesting:**__', value: '\u200b' },

                { name: '•You might not need jQuery: ', value: 'http://youmightnotneedjquery.com/ ' },

                { name: '•CodingTrain (tutorials with examples using p5.js): ', value: ' https://www.youtube.com/user/shiffman' }

            )
            .setFooter("This list does not contain every resource out there because the internet is huge and listing everything down is impossible.")

        message.channel.send({ embeds: [embed] });

    }
}