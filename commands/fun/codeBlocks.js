const { PermissionsBitField } = require('discord.js');
module.exports = {
	name:'codeblocks',
	description:'sends how you can represent something in a codeblocks',
	aliases:['cb', 'code', 'codeblock', 'stylingcode'],
	syntax:'!cb',
	permissions:[PermissionsBitField.Flags.ViewChannel],

	execute(client, message, args, Discord){
		message.channel.send("You can use 3 back ticks to represent something in a codeblocks. \nFor example:\n\\```\n // your code. \n\\```\n\n To send a code with syntax highlighting you can use language name after 3 back ticks\n\nFor Example:\n\n\\```js\n//yourcode\n\\```\n\nThese languages can be highlighted -")
	}
}