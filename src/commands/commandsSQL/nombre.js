var config = require('../../bdd.js');
const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever } = require('../../../config/config.json');
var connection = config.connection


module.exports.run = async (client, message, args) => {
    const icon = message.guild.iconURL();
    const nameEmbed = new MessageEmbed()
        .setFooter(embed_footer_sever)
    if (message.member.hasPermission("ADMINISTRATOR")) {
        let license = args[0]
        /*if (hex.startsWith("steam:") === false) {
            hex = `steam:${hex}`
        }*/
        let firstname = args[1]
        let lastname = args[2]
        if (!firstname || !lastname) return message.channel.send("¡Mal uso!\nEj: !nombre (licencia) (nombre) (apellido)")

        connection.query("SELECT * FROM users WHERE identifier = ?", license, (err, result) => {
            let user = result[0]
            let oldname = user.firstname
            let oldlastname = user.lastname
            if (!user) {
                nameEmbed.setColor("RED")
                    .setDescription(`No se encontró ningún usuario con la licencia ingresada.`)
                    .setAuthor(embed_author_server, icon)
                    .setTitle("¡Operación fallida!")
                message.channel.send(nameEmbed)
                return;
            }
            connection.query(`UPDATE users SET firstname = '${firstname}' WHERE firstname = '${user.firstname}' AND identifier = '${license}'`, (err, result) => { if (err) console.log(err) })
            connection.query(`UPDATE users SET lastname = '${lastname}' WHERE lastname = '${user.lastname}' AND identifier = '${license}'`, (err, result) => { if (err) console.log(err) })
            nameEmbed.setColor("GREEN")
                .setDescription(`¡El nombre del personaje del usuario con la licencia \'${license}\' ha sido cambiado de \`${oldname} ${oldlastname}\` a \`${firstname} ${lastname}\` exitosamente!.`)
                .setAuthor(embed_author_server, icon)
                .setTitle("¡El cambio fue realizado con exito!")
            message.channel.send(nameEmbed)
        })

    } else {
        nameEmbed.setColor("RED")
            .setAuthor(embed_author_server, icon)
            .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
            .setTitle("¡Operación fallida!")
        message.channel.send(nameEmbed)
        return;
    }
}


