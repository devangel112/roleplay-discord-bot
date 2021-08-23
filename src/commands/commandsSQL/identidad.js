var config = require('../../bdd.js');
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
var connection = config.connection

module.exports.run = async (client, message, args) => {
    try {
        let buscar = ""
        const icon = message.guild.iconURL();
        const identEmbed = new MessageEmbed()
            .setFooter(embed_footer_sever)
            .setTimestamp()
        if (message.guild.id === main_guild_id) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let license = args[0]
                if (!license) return message.channel.send(
                    new MessageEmbed()
                        .setColor("ORANGE")
                        .setDescription(`¡Debes ingresar la licencia del usuario!`)
                        .setTitle("¡Operación fallida!")
                        .setAuthor(embed_author_server, icon)
                )
                if (license.startsWith("steam:") === true) {
                    buscar = "SELECT * FROM users WHERE steamHex = ?"
                } else {
                    buscar = "SELECT * FROM users WHERE identifier = ?"
                }
                /*if (license.startsWith("steam:") === false) {
                    license = `steam:${license}`
                }*/

                connection.query(buscar, license, (err, result) => {
                    let user = result[0]
                    if (!user) {
                        identEmbed.setDescription("No se encontraron usuarios con la licencia ingresada.")
                            .setColor("RED")
                            .setTitle("¡Error!")
                            .setAuthor(embed_author_server, icon)
                        message.channel.send(identEmbed)
                        return;
                    }
                    let sex;
                    if (user.sex === "F") {
                        sex = "Femenino"
                    } else {
                        sex = "Masculino"
                    }
                    let cuentas = [user.accounts]
                    let json = JSON.parse(cuentas.join(' '))
                    let dinero = json.money
                    let dineroBanco = json.bank
                    let dineroNegro = json.black_money
                    let nombre = `${user.firstname} ${user.lastname}`
                    identEmbed.setColor("GREEN")
                        .setAuthor(embed_author_server, icon)
                        .setThumbnail(message.guild.iconURL())
                        .setTitle(`👥・Personaje`)
                        .addFields(
                            { name: `🆔・Licencia`, value: user.identifier },
                            { name: `🆔・Steam HEX`, value: user.steamHex },
                            { name: `💳・Nombre IC`, value: nombre, inline: true },
                            { name: `📆・Fecha de nacimiento`, value: user.dateofbirth, inline: true },
                            { name: `👫・Género`, value: sex, inline: true },
                            { name: `💵・Dinero`, value: `$ ${dinero}`, inline: true },
                            { name: `💰・Dinero Negro`, value: `$ ${dineroNegro}`, inline: true },
                            { name: `💳・Banco`, value: `$ ${dineroBanco}`, inline: true },
                            { name: `💼・Trabajo`, value: user.job, inline: true },
                            { name: `📱・Teléfono`, value: user.phone_number, inline: true },
                            { name: `📦・Inventario`, value: user.inventory },
                            { name: `🔪・Armas`, value: user.loadout }
                        )
                    message.channel.send(identEmbed)
                })
            } else {
                identEmbed.setColor("RED")
                    .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
                    .setTitle("¡Operación fallida!")
                    .setAuthor(embed_author_server, icon)
                message.channel.send(identEmbed)
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