const mongo = require("../../mongo")
const schema = require("../../schema")



module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'userinfo'],
  description: "This is ping command",
  async execute(client, message, args, Discord) {
    let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

    memberRoles = target._roles
    mentionedRoles = ""
    memberTeams = ""
    const guildId = message.guild.id

    memberRoles.forEach(roles => {
      if (message.guild.roles.cache.get(roles).name.includes("Team")) {
        memberTeams += `<@&${roles}>\n`
      } else {
        mentionedRoles += `<@&${roles}>\n`
      }
    })
    if (memberTeams === "") {
      memberTeams += "This user is not in any team"
    } if (mentionedRoles === "") {
      mentionedRoles += "This user has  no roles"
    }
    let reply = ' '
    let infrCount = parseInt("0", 10)

    await mongo().then(async mongoose => {
      try {
        const results = await schema.findOne({
          guildId
        })

        for (const warning of results.warnings) {
          const { author, user, timestamp, reason, infrID } = warning
          if (user == target.user.tag) {
            infrCount++;
          }
        }
      } finally {
        mongoose.connection.close()
      }
    })
    const embMsg = new Discord.MessageEmbed()
      .setColor('#66ff66')
      .setTitle('User Info:')
      .setThumbnail(`${target.user.displayAvatarURL()}`)

      .addFields(
        { name: 'User Tag:', value: `${target.user.tag}` },
        { name: 'User ID:', value: `${target.user.id}` },
        { name: 'User Name:', value: `${target.user.username}` },
        { name: 'User Created:', value: `${target.user.createdAt.toLocaleDateString("en-us")}, ${target.user.createdAt.toLocaleTimeString('en-US')}` },
        { name: 'User Joined:', value: `${target.joinedAt.toLocaleDateString("en-us")}, ${target.joinedAt.toLocaleTimeString('en-US')}` },
        { name: 'Roles:', value: `${mentionedRoles}` },
        { name: 'Team:', value: `${memberTeams}` },
        { name: 'Infractions:', value: `${infrCount}` }
      )
    message.channel.send(embMsg);
  }
}