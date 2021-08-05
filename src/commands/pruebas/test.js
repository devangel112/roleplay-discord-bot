const discord = require('discord.js') //Define the discord.js module
const client = new discord.Client() //Creating discord.js client (constructor)
const messageEmbed = new discord.MessageEmbed()
const { prefix } = require('../../../config/config.json');

const disbut = require("discord-buttons")

module.exports.run = async (client, message, args) => {
    const canalAEnviar = message.mentions.channels.first()

    if (!canalAEnviar) {
        let embedError = new discord.MessageEmbed()
            .setAuthor(`Arcanus RP`, message.guild.iconURL())
            .setDescription(`¡Debes mencionar el canal al que deseas enviar el mensaje!`)
            .setFooter(`Arcanus RP - Bot`)
            .setTimestamp()
            .setColor("ORANGE")
        message.channel.send(embedError);
    } else {
        try {
            if (args[1]) {
                // Remueve la mención del canal.
                args.shift()
                // Obtiene los datos JSON.
                const json = JSON.parse(args.join(' '))
                const { author = '', footer = '', color = '' } = json

                console.log(json)

                let embed = new discord.MessageEmbed()
                .setAuthor(json.author)
                .setTitle(json.title)
                .setDescription(json.description)
                .setFooter(json.footer)
                .setTimestamp()
                .setColor(json.color)

                // Enviar el mensaje.
                canalAEnviar.send(embed)
            } else {
                let embedNoArgs = new discord.MessageEmbed()
                    .setAuthor(`Arcanus RP`, message.guild.iconURL())
                    .setDescription(`Uso correcto: ${prefix}embed (Canal a enviar) (JSON)\nEjemplo: ${prefix}embed <#822657705969451028> {"author": "Arcanus RP", "title": "Ejemplo", "description": "Lorem Ipsum", "footer": "Arcanus RP - Bot", "color": "RANDOM"}\nEl color debe estar en mayúsculas.`)
                    .setFooter(`Arcanus RP - Bot`)
                    .setTimestamp()
                    .setColor("ORANGE")

                message.channel.send(embedNoArgs)
            }
        } catch (error) {
            message.channel.send(`JSON no válido ${error.message}`)
        }
    }
}