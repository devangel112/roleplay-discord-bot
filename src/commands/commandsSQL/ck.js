var config = require('../../bdd.js');
const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');
var connection = config.connection


module.exports.run = async (client, message, args) => {
    try {
        const ckEmbed = new MessageEmbed()
            .setFooter(embed_footer_sever)
        if (message.guild.id === main_guild_id) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let license = args[0]
                if (!license) return message.channel.send("Debes ingresar una licencia.")
                /*if (license.startsWith("steam:") === false) {
                    license = `steam:${license}`
                }*/
                message.channel.send("¿Estás seguro? Si estás seguro de este mensaje \`si\` responda escribiendo. Tienes 10 segundos.")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 10000
                }).then(c => {
                    if (c.first().content.toLowerCase() === "si") {
                        connection.query("SELECT * FROM users WHERE identifier = ?", license, (err, result) => {
                            let user = result[0]
                            if (user) {
                                connection.query("DELETE FROM users WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM addon_account_data WHERE owner = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM characters WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM user_accounts WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM user_inventory WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM user_licenses WHERE owner = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM owned_vehicles WHERE owner = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM phone_users_contacts WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM loaf_bought_houses WHERE owner = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM loaf_housing WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM loaf_keys WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM loaf_last_login WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                connection.query("DELETE FROM billing WHERE identifier = ?", license, (err, results, fields) => {
                                })
                                /*
                                    NOTA: Hay algunas tablas que usan la licencia y otras que usan el steamHEX. POR ESO SE HIZO EL CAMBIO.
                                          Faltan algunas tablas que están vacías.
                                    SELECT * FROM hotels_rooms WHERE owner = "";
                                */
                                ckEmbed.setAuthor(embed_author_server, message.guild.iconURL())
                                    .setTitle(`¡Acción completada!`)
                                    .setColor("GREEN")
                                    .setDescription(`${license} ¡La petición de ck fue ejecutada con exito!`)
                                message.channel.send(ckEmbed)
                            } else {
                                ckEmbed.setAuthor(embed_author_server, message.guild.iconURL())
                                    .setTitle("¡Error!")
                                    .setColor("RED")
                                    .setDescription("¡No se encontró un usuario con el ID ingresado! Inténtalo de nuevo.")
                                message.channel.send(ckEmbed)
                                return;
                            }
                        })
                    }
                })
            } else {
                ckEmbed.setColor("RED")
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
                    .setTitle("¡Operación fallida!")
                message.channel.send(ckEmbed)
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