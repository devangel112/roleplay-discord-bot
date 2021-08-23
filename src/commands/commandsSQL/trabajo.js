var config = require('../../bdd.js');
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
var connection = config.connection

module.exports.run = async (client, message, args) => {
    try {
        const icon = message.guild.iconURL();
        const jobEmbed = new MessageEmbed()
            .setFooter(embed_footer_sever)
        if (message.guild.id === main_guild_id) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                let license = args[0]
                /*if (license.startsWith("steam:") === false) {
                    license = `steam:${license}`
                }*/
                let newJob = args[1]
                let newRank = parseInt(args[2])
                if (!license || !newJob || !newRank) return message.channel.send("Uso incorrecto ! \nEj:!trabajo 11000010aceb57a police 1")
                connection.query("SELECT * FROM users WHERE identifier = ?", license, (err, result) => {
                    let user = result[0]
                    let oldJob = user.job
                    let oldRank = user.job_grade
                    if (user) {
                        connection.query(`UPDATE users SET job = '${newJob}' WHERE job = '${user.job}' AND identifier = '${license}'`, (err, result) => {
                            if (err) console.log(err)
                        })
                        connection.query(`UPDATE users SET job_grade = ${newRank} WHERE job_grade = ${user.job_grade} AND identifier = '${license}'`, (err, result) => {
                            if (err) console.log(err)
                        })
                        jobEmbed.setColor("GREEN")
                            .setDescription(`El trabajo del usuario con la licencia \`${license}\` ha sido actualizado.`)
                            .addFields(
                                { name: "Trabajo anterior", value: `${oldJob} rango ${oldRank}`, inline: true },
                                { name: "Trabajo nuevo", value: `${newJob} rango ${newRank}`, inline: true }
                            )
                            .setTitle(`¡Acción completada!`)
                            .setAuthor(embed_author_server, icon)
                        message.channel.send(jobEmbed)
                    } else {
                        jobEmbed.setColor("RED")
                            .setDescription(`No se encontró ningún usuario con la licencia ingresada.`)
                            .setTitle("¡Operación fallida!")
                            .setAuthor(embed_author_server, icon)
                        message.channel.send(jobEmbed)
                        return;
                    }
                })
            } else {
                jobEmbed.setColor("RED")
                    .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
                    .setTitle("¡Operación fallida!")
                    .setAuthor(embed_author_server, icon)
                message.channel.send(jobEmbed)
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
