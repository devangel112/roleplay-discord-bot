var config = require('../../bdd.js');
const { embed_author_server, embed_footer_sever } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
var connection = config.connection


module.exports.run = async(client, message, args) => {
    const icon = message.guild.iconURL();
    const telEmbed = new MessageEmbed()
    .setFooter(embed_footer_sever)
    if (message.member.hasPermission("ADMINISTRATOR")) {
        let hex = args[0]
        if (hex.startsWith("steam:") === false) {
            hex = `steam:${hex}`
        }
        let money = args[1]

        connection.query("SELECT * FROM users WHERE identifier = ?",hex,(err,result) => {
            let user = result[0]
            let accounts = user.accounts
            if (user) {
                connection.query(`UPDATE users SET money = '${money}' WHERE identifier = '${hex}`,(err,result) => { // Fixear aqui
                    if (err) console.log(err)
                    telEmbed.setColor("GREEN")
                    .setTitle("¡La transacción es exitosa!")
                    .setAuthor(embed_author_server, icon)
                    message.channel.send(telEmbed)
                })
            } else {
                telEmbed.setColor("RED")
                .setDescription(`No se encontró ningún usuario con el ID hex ingresado.`)
                .setTitle("¡operación fallida!")
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
}
