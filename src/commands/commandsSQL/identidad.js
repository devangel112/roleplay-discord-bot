var config = require('../../bdd.js');
const { embed_author_server, embed_footer_sever } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
var connection = config.connection

module.exports.run = async (client, message, args) => {
    const icon = message.guild.iconURL();
    const identEmbed = new MessageEmbed()
        .setFooter(embed_footer_sever)
        .setTimestamp()
    if (message.member.hasPermission("ADMINISTRATOR")) {
        let license = args[0]
        if (!license) return message.channel.send("¡Debes ingresar la licencia del usuario!")
        let buscar = "SELECT * FROM users WHERE identifier = ?"
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
            identEmbed.setColor("GREEN")
                .setAuthor(embed_author_server, icon)
                .setThumbnail(message.guild.iconURL())
                .setTitle(`Datos`)
                .addField(`🆔・Licencia`, user.identifier)
                .addField(`💻・Nombre IC`, `${user.firstname} ${user.lastname}`)
                .addField(`📆・Fecha de nacimiento`, `${user.dateofbirth}`)
                .addField(`👫・Género`, sex)
                .addField(`💼・Trabajo`, `${user.job}`)
                .addField(`💰・Billetera`, `${user.accounts}`)
                .addField(`📳・Telefóno`, `${user.phone_number}`)
                .addField(`📦・Inventario`, `${user.inventory}`)
                .addField(`🔪・Armas`, `${user.loadout}`)
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
}