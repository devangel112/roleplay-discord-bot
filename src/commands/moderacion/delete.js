const { MessageEmbed } = require('discord.js')
const { embed_author_server, embed_footer_sever } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        var amount = args[0]
        if (!args[0]) return message.channel.send('**Ingrese un valor para eliminar**')
            .then(msg => msg.delete({ timeout: 10000 }).catch(error => console.log(error.stack)))
        if (amount <= 100) {
            message.channel.bulkDelete(amount, true).then(() => {
                let embedDelete = new MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(`Se han eliminado **${amount}** mensajes.`)
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                    .setColor("GREEN")
                message.channel.send(embedDelete)
                    .then(msg => msg.delete({ timeout: 10000 }))
            }).catch(error => console.log(error.stack))
        } else {
            let embedDelete = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`¡La cantidad de mensajes a eliminar debe ser menor o igual a **100**!`)
                .setFooter(embed_footer_sever)
                .setTimestamp()
                .setColor("RED")
            message.channel.send(embedDelete)
                .then(msg => msg.delete({ timeout: 10000 }))
        }
    }
}