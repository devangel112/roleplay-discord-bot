const Discord = require('discord.js');
const cheerio = require('cheerio');
const axios = require('axios');

module.exports.run = async (client, message, args) => {
    console.log("» Comando IP ejecutado.")
    const icon = message.guild.iconURL();
    axios.get('https://servers.fivem.net/servers/detail/l8xqrv')
        .then(res => {
            const $ = cheerio.load(res.data);
            console.log(`$: ${$}`);
            let text = ($(".players-count").text());
            console.log(`Texto: ${text}`);
            const resultado = parseInt(text.substring(15, 18)) || parseInt(text.substring(15, 17));
            // console.log(`══════════════════════════════════\n\n\t» Jugadores: ${resultado} / 135\n\n══════════════════════════════════`);
            if (resultado >= 0) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Lista de jugadores online")
                    .setAuthor('ArcanusRP', icon)
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
                    .addField('Jugadores online:', `${resultado} / 135`)
                    .addField('IP:', '**connect arcanus.ukader.net**')
                    .setColor("#000")
                    .setImage('https://media.discordapp.net/attachments/823769093454692374/823769181538484264/314141342314123.gif?width=742&height=418')
                    .setFooter(`Solicitado por: ${message.author.tag}`, message.author.avatarURL)
                    .setTimestamp()
                message.channel.bulkDelete(1, true)
                message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))

            } else if (resultado > 99) {
                const embed = new Discord.MessageEmbed()
                    .setTitle("Lista de jugadores online")
                    .setAuthor('ArcanusRP', icon)
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
                    .addField('Jugadores online:', `${resultado} / 135`) // 
                    .addField('IP:', '**connect arcanus.ukader.net**')
                    .setColor("#000")
                    .setImage('https://media.discordapp.net/attachments/823769093454692374/823769181538484264/314141342314123.gif?width=742&height=418')
                    .setFooter(`Solicitado por: ${message.author.tag}`, message.author.avatarURL)
                    .setTimestamp()
                message.channel.bulkDelete(1, true)
                message.channel.send(embed).then(msg => msg.delete({ timeout: 10000 }))

            }
        })
}



