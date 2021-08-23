const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_server, ems_guild_id, dev_guild_id } = require('../../../config/config.json');
var config = require('../../bdd.js');
var conexion = config.connection;

module.exports.run = async (client, message, args) => {
    try {
        if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
            const options = {
                year: 'numeric', month: 'numeric', day: 'numeric',
            };
            let i = 0;
            message.reply("Ingresa el nombre del paciente que desees revisar... Ej.: Juan Pérez")
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 30000
            }).then(msg => {
                let nombrePaciente = msg.first();
                conexion.query(`SELECT * FROM paciente p JOIN ficha f ON p.idpaciente = f.paciente_idpaciente WHERE nombre = "${nombrePaciente}"`, function (error, results, fields) {
                    if (error)
                        throw error;
                    if (results.length === 0) {
                        conexion.query(`SELECT * FROM paciente p WHERE nombre = "${nombrePaciente}"`, function (error, results, fields) {
                            if (error)
                                throw error;
                            if (results.length === 0) {
                                message.reply('¡El paciente no ha sido registrado!').then(msg => {
                                    msg.delete({ timeout: 20000 })
                                })
                            } else {
                                results.forEach(result => {
                                    idPaciente = result.idpaciente
                                    nombrePaciente = result.nombre;
                                    telefonoPaciente = result.telefono;
                                    grupoSanguineoPaciente = result.grupoSanguineo;
                                    fechaNacimientoPaciente = new Intl.DateTimeFormat('es-MX', options).format(result.fechaNacimiento);
                                });

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
                                        }
                                        ,
                                        {
                                            name: 'Fechas de ingreso',
                                            value: 'No ha ingresado a revisión médica',
                                            inline: true,
                                        }
                                    )
                                    .setColor("RED")
                                    .setFooter(embed_footer_server)
                                message.channel.send({ embed });
                            }
                        });
                    } else {
                        fechaIngreso = [results.length]
                        results.forEach(result => {
                            let date = result.fechaIngreso;
                            fechaIngreso[i] = new Intl.DateTimeFormat('es-MX', options).format(date);
                            i++;
                            idPaciente = result.idpaciente
                            nombrePaciente = result.nombre;
                            telefonoPaciente = result.telefono;
                            grupoSanguineoPaciente = result.grupoSanguineo;
                            fechaNacimientoPaciente = new Intl.DateTimeFormat('es-MX', options).format(result.fechaNacimiento);
                        });
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
                                }
                                ,
                                {
                                    name: 'Fechas de ingreso',
                                    value: fechaIngreso,
                                    inline: true,
                                }
                            )
                            .setColor("GREEN")
                            .setFooter(embed_footer_server)
                        message.channel.send({ embed });
                    }
                })
            })
        }
    } catch (error) {
        console.error(error);
    }
}