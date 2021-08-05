const { MessageEmbed } = require('discord.js')
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
                    .setFooter(`Arcanus RP`)
                    .setTimestamp()
                    .setColor("RANDOM")
                message.channel.send(embedDelete)
                    .then(msg => msg.delete({ timeout: 10000 }))
            }).catch(error => console.log(error.stack))
        } else {
            let embedDelete = new MessageEmbed()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setDescription(`¡La cantidad de mensajes a eliminar debe ser menor o igual a **100**!`)
                .setFooter(`Arcanus RP`)
                .setTimestamp()
                .setColor("RANDOM")
            message.channel.send(embedDelete)
                .then(msg => msg.delete({ timeout: 10000 }))
        }
    }
}