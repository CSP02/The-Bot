const fs = require("fs");
const errorListJson = [];
module.exports = async (client, message, Discord, errors, commandName) => {
	let error = errors;
	const emd = new Discord.EmbedBuilder()
		.setColor("#ff0000")
		.setTitle("command raised an error in the source code:")
		.setDescription(
			`Seems like this error is in source code I will let the developer know about this error or else you can report it in github. Click on the embed to go to the report page! If you want to know more about this error clikc the button.`
		)
		.setURL("https://github.com/Chandra-sekhar-pilla/The-Bot-v2.0.0");

	const row = new Discord.ActionRowBuilder().addComponents([
		new Discord.StringSelectMenuBuilder()
			.setCustomId("Error")
			.setPlaceholder("Further Details(select one)")
			.addOptions(
				{ label: "Error Message", value: `${error.message}` },
				{ label: "Error in command", value: `${commandName}` },
				{ label: "Error in Guild/server", value: `${message.guild.name}` }
			),
	]);
	let replyMsgUrl = "";
	await message.reply({ embeds: [emd], components: [row] });
	await message.fetchReply().then((replyMsg) => {
		replyMsgUrl = replyMsg.url;
	});

	const theme = "```";

	const embd = new Discord.EmbedBuilder()
		.setColor("#ff0000")
		.setTitle("command raised an error in the source code:")
		.setURL(replyMsgUrl)
		.setDescription("Click on the embed to go the message.")
		.addFields([
			{
				name: "Error Message:",
				value: theme + "ansi\n[31m" + error.message + theme,
			},
			{
				name: "Error in command:",
				value: theme + "ansi\n[32m" + commandName + theme,
			},
			{
				name: "Error in channel:",
				value: theme + "ansi\n[33m" + message.channel.name + theme,
			},
			{
				name: "Error in Guild:",
				value: theme + "ansi\n[34m" + message.guild.name + theme,
			},
		]);
	const errorJson = {
		errorStack: error.stack,
		time: new Date(),
	};
	errorListJson.push(errorJson);
	fs.writeFileSync("./errors.json", JSON.stringify(errorListJson), (err) => {
		console.log(err);
	});

	await client.users.fetch("768737415061569596").then((owner) => {
		embd.addFields([{ name: "test", value: "test" }])
		let errorStringyfied = error.stack.toString().repeat(96)
		let errorForEmbed = []
		if (errorStringyfied.length >= 1024) {
			let i = 0;
			for (i; i < parseInt(errorStringyfied.length / 1024, 10); i++) {
				errorForEmbed.push(errorStringyfied.slice(i * 1024, (i + 1) * 1024))
			}
		}
		owner.send({ embeds: [embd] });
	});
};
