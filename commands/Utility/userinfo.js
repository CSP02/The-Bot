const mongo = require("../../schemas/mongo")
const schema = require("../../schemas/schema")


module.exports = {
  name: 'userinfo',
  aliases: ['ui', 'userinfo'],
  description: "sends the info of the user.",
  syntax: '!userinfo <user>',
  permissions: ['VIEW_CHANNEL'],
  async execute(client, message, args, Discord) {
    try {
      let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
      if (!target) {
        target = message.member
      }
      memberRoles = target._roles
      mentionedRoles = ""
      memberTeams = ""
      const guildId = message.guild.id
      memberRoles.forEach(roles => {
        if (message.guild.roles.cache.get(roles).name.includes("Team")) {
          memberTeams += `<@&${roles}>\n`
        } else {
          mentionedRoles = `${target.roles.highest}\n`
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
          if (results !== null) {
            for (const warning of results.warnings) {
              const { author, userID, timestamp, reason, infrType, infrID } = warning
              if (userID == target.user.id) {
                infrCount++;
              }
            }
          } else {
            return
          }
        } finally {
          mongoose.connection.close()
        }
      }).catch(console.error)
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
          { name: 'Highest Role:', value: `${mentionedRoles}` },
          { name: 'Team:', value: `${memberTeams}` },
          { name: 'Infractions:', value: `${infrCount}` }
        )
      message.channel.send({ embeds: [embMsg] });
    } catch (e) {
      require(`../../handlers/ErrorHandler.js`)(client, message, Discord, e, this.name)
    }
  }
}