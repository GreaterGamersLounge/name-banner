// Global objects
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config/config.json");

client.on("ready", () => {
  console.log("Booting complete!");
  console.log("Bot online!");
});

client.on('guildMemberAdd', member => {
  let bannableName = false;
  config.regexes.forEach(matcher => {
    const regex = new RegExp(matcher.match, matcher.flags);
    if (member.displayName.match(regex)) {
      console.log(`Matching regex: /${matcher.match}/${matcher.flags}`)
      bannableName = true;
    }
  });

  if (bannableName) {
    const reason = `The username "${member.displayName}" did not meet the standards of ${member.guild.name}.`

    console.log(reason);
    member.
      ban(reason).
      catch(console.error);
  }
});

console.log("Booting up...");
client.login(config.token);
