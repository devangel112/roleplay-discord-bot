const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
require('discord-buttons')(client);
const fs = require('fs').promises;
const { updatePlayerCount } = require('./commands/utiles/statusbot')
const path = require('path');
const { token, prefix } = require('../config.json');
const { firstLetterM } = require('./helper');
const botVersion = require('../package.json').version;
var config = require('./bdd.js');
var connection = config.connection

client.commands = new Map();

client.on('ready', () => {
  updatePlayerCount(client, 5)
  console.log(`╔═══════════════════════════════╗\n  » Arcanus Bot V${botVersion} activo «\n╚═══════════════════════════════╝`)
});

client.on('message', async (message) => {
  const write = message.content;
  if (message.author.bot) return;
  if (message.channel.id === "750399425184137377") {
    let writeEmbed = new MessageEmbed()
      .setAuthor('Arcanus Roleplay V2', 'https://cdn.discordapp.com/attachments/780970578319638528/822679629868695572/image.png')
      .setDescription(`** [:bulb:] Sugerencia enviada por:** <@${message.author.id}>\n- ${firstLetterM(write)}`)
      .setFooter("» Vota ✅ si apoyas la sugerencia o ❌ si estás en contra.")
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
      .setDescription(`\`${prefix}${cmdName}${argumentos}\``)
      .setFooter(`Arcanus RP`)
      .setColor("YELLOW")
      .setTimestamp()

    message.guild.channels.cache.get(`835906010974912583`).send(embedLog);

  } else {
    message.reply('¡El comando ingresado no existe!')
  }
});

(async function registerCommand(dir = 'commands') {
  let files = await fs.readdir(path.join(__dirname, dir)); // Creamos un arreglo llamado 'files' con todo lo que contiene la carpeta commands.
  // console.log(files)
  for (let file of files) { // Recorremos el arreglo files para encontrar mas carpetas con archivos.
    let stat = await fs.lstat(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      registerCommand(path.join(dir, file));
    } else {
      if (file.endsWith('.js')) {
        let cmdName = file.substring(0, file.indexOf('.js'))
        let cmdModule = require(path.join(__dirname, dir, file));
        client.commands.set(cmdName, cmdModule);
        // console.log(client.commands)
      }
    }
  }
})();

client.on('guildMemberAdd', member => {
  const welcomeEmbed = new MessageEmbed()
    .setColor('#5cf000')
    .setAuthor('Arcanus RP', `https://media.discordapp.net/attachments/780970578319638528/822684960670351370/Untitled.png?width=268&height=175`)
    .setTitle('[📥] Bienvenido/a **' + member.user.username + '** a Arcanus RP eres el ciudadano nº __' + member.guild.memberCount + '__')
    .setImage('https://cdn.mos.cms.futurecdn.net/93GAa4wm3z4HbenzLbxWeQ-650-80.jpg.webp')
    .setTimestamp()
  member.guild.channels.cache.get(`362387841982136320`).send(welcomeEmbed)
})

client.on('guildMemberRemove', member => {
  const goodbyeEmbed = new MessageEmbed()
    .setColor('#f00000')
    .setAuthor('Arcanus RP', `https://media.discordapp.net/attachments/780970578319638528/822684960670351370/Untitled.png?width=268&height=175`)
    .setTitle('[📤] Hasta Luego **' + member.user.username + '** esperamos que la hayas pasado bien en Arkanus RP')
    .setImage('https://gamewith-en.akamaized.net/article/thumbnail/rectangle/22183.png')
    .setTimestamp()
  member.guild.channels.cache.get(`362387841982136320`).send(goodbyeEmbed)
})

client.on('clickButton', async (button) => {
  console.log(button.id)
  switch (button.id) {
    case "enviarMensaje":
      await button.reply.send(`Ola`)
      break;
    case "suma":
      await button.reply.send(`${1 + 1}`)
      break;
    case "hacerCK":
      // TODO
      break;
    case "cancelarCK":
      // TODO
      break;
    default:
      await button.reply.send(`Función de botón no encontrada.`)
      break;
  }
});

client.login(token)

