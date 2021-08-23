var config = require('../../bdd.js');
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
var connection = config.connection


module.exports.run = async (client, message, args) => {
    try {
        const icon = message.guild.iconURL();
        const telEmbed = new MessageEmbed()
            .setFooter(embed_footer_sever)
        if (message.guild.id === main_guild_id) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let license = args[0]
                /*if (license.startsWith("steam:") === false) {
                    license = `steam:${license}`
                }*/
                let newPhoneNumber = args[1]

                connection.query("SELECT * FROM users WHERE identifier = ?", license, (err, result) => {
                    let user = result[0]
                    let oldPhoneNumber = user.phone_number
                    if (user) {
                        connection.query(`UPDATE users SET phone_number = ${newPhoneNumber} WHERE phone_number = ${user.phone_number}`, (err, result) => {
                            if (err) console.log(err)
                            telEmbed.setColor("GREEN")
                                .setTitle(`¡Acción completada!`)
                                .setAuthor(embed_author_server, icon)
                                .setDescription(`¡El número de teléfono de la licencia \`${license}\` ha sido cambiado exitosamente!`)
                                .addFields(
                                    { name: "Número viejo", value: oldPhoneNumber, inline: true },
                                    { name: "Número nuevo", value: newPhoneNumber, inline: true }
                                )
                            message.channel.send(telEmbed)
                        })
                    } else {
                        telEmbed.setColor("RED")
                            .setDescription(`No se encontró ningún usuario con el ID license ingresado.`)
                            .setTitle("¡Operación fallida!")
                            .setAuthor(embed_author_server, icon)
                        message.channel.send(telEmbed)
                        return;
                    }
                })
            } else {
                telEmbed.setColor("RED")
                    .setAuthor(embed_author_server, icon)
                    .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
                message.channel.send(telEmbed)
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
