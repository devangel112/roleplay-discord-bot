var config = require('../../bdd.js');
const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever } = require('../../../config/config.json');
var connection = config.connection


module.exports.run = async (client, message, args) => {
    const ckEmbed = new MessageEmbed()
        .setFooter(embed_footer_sever)
    if (message.member.hasPermission("ADMINISTRATOR")) {
        let hex = args[0]
        if (!hex) return message.channel.send("Debes entrar en un hex.")
        if (hex.startsWith("steam:") === false) {
            hex = `steam:${hex}`
        }
        message.channel.send("¿Estás seguro? Si estás seguro de este mensaje \`si\` responda escribiendo. Tienes 10 segundos.")
        message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 10000
        }).then(c => {
            if (c.first().content.toLowerCase() === "si") {
                connection.query("SELECT * FROM users WHERE identifier = ?", hex, (err, result) => {
                    let user = result[0]
                    if (user) {
                        connection.query("DELETE FROM users WHERE identifier = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM addon_account_data WHERE owner = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM characters WHERE identifier = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM datastore_data WHERE owner = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM user_accounts WHERE identifier = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM user_inventory WHERE identifier = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM user_licenses WHERE owner = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM owned_vehicles WHERE owner = ?", hex, (err, results, fields) => {
                        })
                        connection.query("DELETE FROM phone_users_contacts WHERE identifier = ?", hex, (err, results, fields) => {
                        })
                        ckEmbed.setAuthor(embed_author_server, message.guild.iconURL())
                            .setTitle("¡La petición fue un exito!")
                            .setColor("GREEN")
                            .setDescription(`${hex} ¡La petición de ck fue ejecutada con exito!`)
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
            .setAuthor("ArcanusRP - SQL", icon)
            .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
            .setTitle("¡Operación fallida!")
        message.channel.send(ckEmbed)
        return;
    }
}