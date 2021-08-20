const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever, ems_guild_id, dev_guild_id } = require('../../../config/config.json');
var config = require('../../bdd.js');
var conexion = config.connection;

module.exports.run = async (client, message, args) => {
    if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
        try {
            let nombrePaciente, telefonoPaciente, grupoSanguineoPaciente, fechaNacimientoPaciente, idPaciente, descripcionFicha;
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
            };
            message.reply("Ingresa el número del paciente... Ej.: 10")
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 30000
            }).then(msg => {
                idPaciente = msg.first();
                conexion.query(`SELECT * FROM PACIENTE P WHERE P.IDPACIENTE = ${idPaciente}`, function (error, results, fields) {
                    if (error)
                        throw error;
                    if (results.length === 0) {
                        message.reply(`¡El paciente no se encuentra en la base de datos!`)
                    } else {
                        results.forEach(result => {
                            nombrePaciente = result.nombre;
                        })
                        message.reply(`Paciente seleccionado: **${nombrePaciente}**\nIngresa la fecha a consultar... Ej.: 2021/05/23`)
                        message.channel.awaitMessages(m => m.author.id === message.author.id, {
                            max: 1,
                            time: 30000
                        }).then(msg => {
                            let fechaAConsultar = msg.first();
                            conexion.query(`SELECT P.idpaciente, P.nombre, P.telefono, P.grupoSanguineo, P.fechaNacimiento, F.fechaIngreso, F.descripcion FROM PACIENTE P JOIN FICHA F ON P.idpaciente = F.paciente_idpaciente WHERE P.idpaciente = "${idPaciente}" AND F.fechaIngreso = "${fechaAConsultar}"`, function (error, results, fields) {
                                if (error)
                                    throw error;
                                if (results.length === 0) {
                                    console.log(`Fecha a consultar: ${fechaAConsultar}`)
                                    message.reply(`¡La fecha ingresada para la revisión no existe en la base de datos!`)
                                } else {
                                    results.forEach(result => {
                                        idPaciente = result.idpaciente;
                                        nombrePaciente = result.nombre;
                                        telefonoPaciente = result.telefono;
                                        grupoSanguineoPaciente = result.grupoSanguineo;
                                        descripcionFicha = result.descripcion;
                                        fechaNacimientoPaciente = new Intl.DateTimeFormat('es-MX', options).format(result.fechaNacimiento);
                                        const embed = new MessageEmbed()
                                            .setAuthor("Identificador: " + idPaciente + " Paciente: " + nombrePaciente)
                                            .addFields(
                                                {
                                                    name: 'Número de teléfono',
                                                    value: telefonoPaciente,
                                                    inline: true,
                                                },
                                                {
                                                    name: 'Tipo sanguíneo',
                                                    value: grupoSanguineoPaciente,
                                                    inline: true,
                                                },
                                                {
                                                    name: 'Fecha de nacimiento',
                                                    value: fechaNacimientoPaciente,
                                                    inline: true,
                                                },
                                                {
                                                    name: 'Fecha consultada',
                                                    value: fechaAConsultar,
                                                    inline: true,
                                                },
                                                {
                                                    name: 'Historial médico',
                                                    value: descripcionFicha,
                                                    inline: false,
                                                }
                                            )
                                            .setColor("GREEN")
                                            .setFooter(embed_footer_server)
                                        message.channel.send({ embed });
                                    })
                                }
                            });
                        })
                    }
                })
            })
        } catch (err) {
            console.error(err);
        }
    }
}