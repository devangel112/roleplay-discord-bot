const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_server, ems_guild_id, dev_guild_id } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    try {
        if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
            message.reply(`Ingresa el id del canal al que deseas enviar el mensaje`)
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 360000
            }).then(msg => {
                let idCanal = msg.first();
                message.reply(`Ingresa el mensaje a enviar`)
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 360000
                }).then(msg => {
                    let mensajeAEnviar = msg.first();
                    const channel = message.guild.channels.cache.find(ch => ch.id === `${idCanal}`);
                    channel.send(mensajeAEnviar);
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
}