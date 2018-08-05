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
      bannableName = true;
    }
  });

  if (bannableName) {
    const reason = `This user's name "${member.displayName}" did not meet the standards of this server.`

    member.
      ban(reason).
      catch(console.error);
  }
});

console.log("Booting up...");
client.login(config.token);
