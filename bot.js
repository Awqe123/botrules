const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', () => {
    console.log('[Bot2] Включен!');
});
client.on("messageReactionAdd", (reaction, user) => {
    if(user == client.user) return;
    let cont = reaction.message.content;
    const ussr = reaction.message.guild.members.cache.get(user.id);
    var role = reaction.message.guild.roles.cache.find(role => role.id === "806340728186732604");
    var role2 = reaction.message.guild.roles.cache.find(role => role.id === "806336844412878908");
    if(cont.includes('для получения полноценного доступа к каналам сервера гильдии')) {
        if(reaction.emoji.name === "✅"){
            ussr.roles.add(role2);
            ussr.send('Вы согласились с правилами гильдии, вам выдан доступ к каналам гильдии!');
        }
        else if(reaction.emoji.name === "❌"){
            ussr.roles.remove(role2);
            ussr.send('Вы отказались от правил гильдии, доступ к каналам гильдии ограничен!');
        }
    }
    if(cont.includes('для получения полноценного доступа к каналам авалона')) {
      if(reaction.emoji.name === "✅"){
        ussr.roles.add(role);
        ussr.send('Вы согласились с правилами авалона, вам выдан доступ к каналам!');
      }
      else if(reaction.emoji.name === "❌"){
        ussr.roles.remove(role);
        ussr.send('Вы отказались от правил авалона, доступ к каналам ограничен!');
      }
    }
});
client.on("messageReactionRemove", (reaction, user) => {
    if(user == client.user) return;
    let cont = reaction.message.content;
    const ussr = reaction.message.guild.members.cache.get(user.id);
    var role = reaction.message.guild.roles.cache.find(role => role.id === "806340728186732604");
    var role2 = reaction.message.guild.roles.cache.find(role => role.id === "806336844412878908");
    if(cont.includes('для получения полноценного доступа к каналам авалона')) {
      if(reaction.emoji.name === "✅"){
        ussr.roles.remove(role);
        ussr.send('Вы отказались от правил авалона, доступ к каналам ограничен!');
      }
    }
    if(cont.includes('для получения полноценного доступа к каналам сервера гильдии')) {
        if(reaction.emoji.name === "✅"){
            ussr.roles.remove(role2);
            ussr.send('Вы отказались от правил гильдии, доступ к каналам гильдии ограничен!');
        }
    }
});
client.login(process.env.token);
