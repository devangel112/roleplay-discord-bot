const { MessageEmbed } = new require('discord.js')
const { prefix } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    const canalAEnviar = message.mentions.channels.first()

    if (!canalAEnviar) {
        let embedError = new MessageEmbed()
            .setAuthor(`Arcanus RP`, message.guild.iconURL())
            .setDescription(`¡Debes **mencionar el canal** al que deseas enviar el mensaje!\n**Uso correcto:** ${prefix}embed (Canal a enviar) (JSON)\n\n**Ejemplo:** ${prefix}embed <#822657705969451028> {"author": "(autor)", "title": "(titulo)", "description": "(descripcion)", "image": "(url de la imagen)" "footer": "(pie de mensaje)", "color": "(color))"}\n\n**El color debe estar en inglés.**\nAzul: blue, Rojo: red, Naranja: orange, Amarillo: yellow, etcétera.`)
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
                const { author = '', footer = '', color = '', image = ''} = json

                let embed = new MessageEmbed()
                .setAuthor(json.author)
                .setTitle(json.title)
                .setDescription(json.description)
                .setFooter(json.footer)
                .setImage(json.image)
                .setTimestamp()
                .setColor(json.color.toUpperCase())

                // Enviar el mensaje.
                canalAEnviar.send(embed)
            } else {
                let embedNoArgs = new MessageEmbed()
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