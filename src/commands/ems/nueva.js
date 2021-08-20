const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever, ems_guild_id, dev_guild_id } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
        message.reply("Ingresa el número de paciente... Ej.: 10")
        message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 30000
        }).then(msg => {
            let idPaciente = msg.first();
            conexion.query(`SELECT * FROM PACIENTE P WHERE P.IDPACIENTE = ${idPaciente}`, function (error, results, fields) {
                if (error)
                    throw error;
                if (results.length === 1) {
                    results.forEach(result => {
                        message.reply(`Paciente seleccionado: ${result.nombre}\n Ingresa la fecha para la nueva ficha... Ej.: 2021/05/23`)
                    })
                    message.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 30000
                    }).then(msg => {
                        let fechaFicha = msg.first();
                        message.reply(`Fecha para la nueva ficha: ${fechaFicha}\nIngresa la descripción para la ficha... Tienes 5 minutos`)
                        message.channel.awaitMessages(m => m.author.id === message.author.id, {
                            max: 1,
                            time: 360000
                        }).then(msg => {
                            let descripcion = msg.first();
                            conexion.query(`INSERT INTO ficha (fechaIngreso, descripcion, paciente_idpaciente) VALUES ("${fechaFicha}","${descripcion}","${idPaciente}")`, function (error, results, fields) {
                                if (error)
                                    throw error;
                                message.reply(`¡Ficha ingresada!\nFecha de la ficha: \`${fechaFicha}\`\nDescripción de la ficha \`\`\`${descripcion}\`\`\``);
                            })
                        })
                    })
                } else {
                    message.reply(`¡No se ha encontrado al paciente ${idPaciente}!`)
                }
            });
        })
    }
}