var config = require('../../bdd.js');
const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');
var connection = config.connection


module.exports.run = async (client, message, args) => {
    try {
        const icon = message.guild.iconURL();
        const nameEmbed = new MessageEmbed()
            .setFooter(embed_footer_sever)
        if (message.guild.id === main_guild_id) {
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
                        .setDescription(`¡El nombre del personaje del usuario con la licencia \'${license}\' ha sido cambiado exitosamente!.`)
                        .addFields(
                            { name: "Nombre anterior", value: `${oldname} ${oldlastname}`, inline: true },
                            { name: "Nombre nuevo", value: `${firstname} ${lastname}`, inline: true }
                        )
                        .setTitle(`¡Acción completada!`)
                        .setAuthor(embed_author_server, icon)
                    message.channel.send(nameEmbed)
                })

            } else {
                nameEmbed.setColor("RED")
                    .setAuthor(embed_author_server, icon)
                    .setTitle("¡Operación fallida!")
                    .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
                message.channel.send(nameEmbed)
                return;
            }
        } else {
            let accessDeniedEmbed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setTitle("¡Operación fallida!")
                .setDescription(`¡No está permitido ese comando en este servidor!`)
                .setFooter(embed_footer_sever)
                .setColor("RED")
            message.channel.send(accessDeniedEmbed)
            return;
        }
    } catch (error) {
        console.log(error)
    }
}


