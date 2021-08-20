const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
require('discord-buttons')(client);
const fs = require('fs').promises;
const { updatePlayerCount } = require('./commands/utiles/statusbot')
const path = require('path');
const { token, prefix, developer, embed_author_server, embed_footer_sever, log_channel, suggestion_channel, welcome_channel, bye_channel, main_guild_id } = require('../config/config.json');
const { firstLetterM } = require('./helper');
const botVersion = require('../package.json').version;

client.commands = new Map();

client.on('ready', () => {
  //updatePlayerCount(client, 5)
  console.log(`╔═══════════════════════════════╗\n  » Arcanus Bot V${botVersion} activo «\n╚═══════════════════════════════╝`)
});

client.on('message', async (message) => {
  const write = message.content;
  if (message.author.bot) return;
  if (message.channel.id === suggestion_channel) {
    let writeEmbed = new MessageEmbed()
      .setAuthor(embed_author_server, message.guild.iconURL())
      .setDescription(`[:bulb:] **Sugerencia enviada por:** <@${message.author.id}>\n- ${firstLetterM(write)}\n\n» Vota ✅ si apoyas la sugerencia o ❌ si estás en contra.`)
      .setFooter(embed_footer_sever)
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(writeEmbed).then((r) => {
      r.react("✅");
      r.react("❌");
    });

    message.channel.bulkDelete(1, true)
  }
})

client.on('message', async function (message) {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let cmdArgs = message.content.substring(message.content.indexOf(prefix) + 1).split(new RegExp(/\s+/))
  let cmdName = cmdArgs.shift();
  let argumentos = "";
  if (client.commands.get(cmdName)) {
    if (cmdArgs) {
      for (let i = 0; i < cmdArgs.length; i++) {
        argumentos += ` ${cmdArgs[i]}`
      }
    }
    client.commands.get(cmdName).run(client, message, cmdArgs)
    const embedLog = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle(`Ha ejecutado el comando:`)
      .setDescription(`\n\`${prefix}${cmdName}${argumentos}\`\n\nEn el canal <#${message.channel.id}>`)
      .setFooter(embed_footer_sever)
      .setColor("YELLOW")
      .setTimestamp()

    client.channels.cache.get(log_channel).send(embedLog);

  } else {
    const embedError = new MessageEmbed()
      .setAuthor(embed_author_server, message.guild.iconURL())
      .setDescription(`${message.author} ¡El comando ingresado no existe!`)
      .setFooter(embed_footer_sever)
      .setColor("RED")
      .setTimestamp()
    message.channel.send(embedError).then(m => {
      m.delete({ timeout: 10000 })
    })
  }
});

(async function registerCommand(dir = 'commands') {
  let files = await fs.readdir(path.join(__dirname, dir)); // Creamos un arreglo llamado 'files' con todo lo que contiene la carpeta commands.
  for (let file of files) { // Recorremos el arreglo files para encontrar mas carpetas con archivos.
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      registerCommand(path.join(dir, file));
    } else {
      if (file.endsWith('.js')) {
        let cmdName = file.substring(0, file.indexOf('.js'))
        let cmdModule = require(path.join(__dirname, dir, file));
        client.commands.set(cmdName, cmdModule);
        // console.log(cmdName)
      }
    }
  }
})();

client.on('guildMemberAdd', member => {
  if (member.guild.id === main_guild_id) {
    const welcomeEmbed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor(embed_author_server, member.guild.iconURL())
      // .setThumbnail(member.avatarURL())
      .setDescription('[📥] Bienvenido/a **' + member.user.username + '** a Arcanus RP eres el ciudadano número ' + member.guild.memberCount)
      .setImage('https://cdn.discordapp.com/attachments/849021063580090418/876586125941157918/entrada.jpg')
      .setTimestamp()
    client.channels.cache.get(welcome_channel).send(welcomeEmbed)
  }
})

client.on('guildMemberRemove', member => {
  if (member.guild.id === main_guild_id) {
    const goodbyeEmbed = new MessageEmbed()
      .setColor('RED')
      .setAuthor('Arcanus RP', member.guild.iconURL())
      // .setThumbnail(member.avatarURL())
      .setDescription('[📤] Hasta Luego **' + member.user.username + '** esperamos que la hayas pasado bien en Arcanus RP')
      .setImage('https://cdn.discordapp.com/attachments/831568080438034503/876678318722793582/salida.jpg')
      .setTimestamp()
    client.channels.cache.get(bye_channel).send(goodbyeEmbed)
  }
})

client.on('clickButton', async (button) => {
  switch (button.id) {
    default:
      const embed = new MessageEmbed()
        .setAuthor()
        .setTitle()
        .setDescription(`Función de botón no encontrada. Comunícate con el desarrollador. ${client.users.cache.find(user => user.id === developer).tag}`)
        .setFooter()
        .setTimestamp()
      await button.reply.send(embed)
      break;
  }
});

client.login(token)

