const Discord = require('discord.js');
const bot = new Discord.Client();
bot.on('ready', () => {
    console.log('[Bot2] Включен!');
});


const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};


bot.on('raw', async (event) => {
  try {
      if (!events.hasOwnProperty(event.t)) return
      const {d: data} = event
      const user = await bot.users.fetch(data.user_id);
      const channel = bot.channels.cache.get(data.channel_id) || (await user.createDM())
      if (channel.messages.cache.has(data.message_id)) return
      const message = await bot.channels.cache.get(data.channel_id).messages.fetch(data.message_id);
      const emoji = data.emoji.name;
      const reaction = message.reactions.cache.get(emoji);
      bot.emit(events[event.t], reaction, user)
  } catch (err) {
      console.error(err)
  }
})


bot.on('messageReactionAdd', (reaction, user) => {
  if(user == bot.user) return;
  const ussr = reaction.message.guild.members.cache.get(user.id);
  var role = reaction.message.guild.roles.cache.find(role => role.id === "806340728186732604");
  var role2 = reaction.message.guild.roles.cache.find(role => role.id === "806336844412878908");
  if (reaction.message.id == "808773205652144158") {
      if (reaction.emoji.name == "✅") {
        user.send('Вы согласились с правилами авалона, вам выдан доступ к каналам!');
        ussr.roles.add(role);
      }
  }
  if (reaction.message.id == "808773269196374066" ) {
    if (reaction.emoji.name == "✅") {
      user.send("Вы согласились с правилами гильдии, вам выдан доступ к каналам гильдии!");
      ussr.roles.add(role2);
    }
  }
});


bot.on('messageReactionRemove', (reaction, user) => {
  if(user == bot.user) return;
  const ussr = reaction.message.guild.members.cache.get(user.id);
  var role = reaction.message.guild.roles.cache.find(role => role.id === "806340728186732604");
  var role2 = reaction.message.guild.roles.cache.find(role => role.id === "806336844412878908");
  if (reaction.message.id == "808773205652144158" ) {
    if (reaction.emoji.name == "✅") {
      user.send("Вы отказались от правил авалона, доступ к каналам ограничен!");
      ussr.roles.remove(role);
    }
  }
  if (reaction.message.id == "808773269196374066" ) {
    if (reaction.emoji.name == "✅") {
      user.send("Вы отказались от правил гильдии, доступ к каналам гильдии ограничен!");
      ussr.roles.remove(role2);
    }
  }
});
bot.login(process.env.token);
