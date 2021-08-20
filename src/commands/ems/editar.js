const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_server, ems_guild_id, dev_guild_id } = require('../../../config/config.json');
var config = require('../../bdd.js');
var conexion = config.connection;

module.exports.run = async (client, message, args) => {
    if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
        let opcion = args[0].toLowerCase();

        switch (opcion) {
            case "nombre":
                message.reply("Ingresa el número de paciente... Ej.: 10")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                }).then(msg => {
                    let idPaciente = msg.first();
                    conexion.query(`SELECT * FROM PACIENTE P WHERE P.IDPACIENTE = ${idPaciente}`, function (error, results, fields) {
                        if (error) {
                            throw error;
                        }
                        if (results.length === 1) {
                            results.forEach(result => {
                                message.reply(`Paciente seleccionado: ${result.nombre}\nIngresa el nuevo nombre del paciente... Ej.: Juan Perez`)
                            })
                            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                max: 1,
                                time: 30000
                            }).then(msg => {
                                let nuevoNombre = msg.first();
                                console.log("Nuevo nombre: " + nuevoNombre);
                                conexion.query(`UPDATE paciente SET nombre = "${nuevoNombre}" WHERE idpaciente = "${idPaciente}"`, function (error, results, fields) {
                                    if (error) {
                                        throw error;
                                    }
                                    message.reply("¡Hecho!");
                                });
                            })
                        } else {
                            message.reply("¡No se ha encontrado a el paciente en la base de datos!")
                        }
                    });

                })
                break;
            case "telefono":
                message.reply("Ingresa el número de paciente... Ej.: 10")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                }).then(msg => {
                    let idPaciente = msg.first();
                    conexion.query(`SELECT * FROM PACIENTE P WHERE P.IDPACIENTE = ${idPaciente}`, function (error, results, fields) {
                        if (error) {
                            throw error;
                        }
                        if (results.length === 1) {
                            results.forEach(result => {
                                message.reply(`Paciente seleccionado: ${result.nombre}\nNúmero: ${result.telefono}\nIngresa el nuevo número del paciente... Ej.: 1234567`)
                            })
                            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                max: 1,
                                time: 30000
                            }).then(msg => {
                                let nuevoNumero = msg.first();
                                console.log("Nuevo numero: " + nuevoNumero.content);
                                conexion.query(`UPDATE paciente SET telefono = "${nuevoNumero}" WHERE idpaciente = "${idPaciente}"`, function (error, results, fields) {
                                    if (error) {
                                        throw error;
                                    }
                                    message.reply("¡Hecho!");
                                });
                            })
                        } else {
                            message.reply("¡No se ha encontrado a el paciente en la base de datos!")
                        }
                    });

                })
                break;
            case "sangre":
                message.reply("Ingresa el número de paciente... Ej.: 10")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                }).then(msg => {
                    let idPaciente = msg.first();
                    conexion.query(`SELECT * FROM PACIENTE P WHERE P.IDPACIENTE = ${idPaciente}`, function (error, results, fields) {
                        if (error) {
                            throw error;
                        }
                        if (results.length === 1) {
                            results.forEach(result => {
                                message.reply(`Paciente seleccionado: ${result.nombre}\nGrupo sanguíneo: ${result.grupoSanguineo}\nIngresa el nuevo número del paciente... Ej.: 1234567`)
                            })
                            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                max: 1,
                                time: 30000
                            }).then(msg => {
                                let nuevoGrupoSanguineo = msg.first();
                                console.log("Nuevo grupo sanguíneo: " + nuevoGrupoSanguineo.content);
                                conexion.query(`UPDATE paciente SET grupoSanguineo = "${nuevoGrupoSanguineo}" WHERE idpaciente = "${idPaciente}"`, function (error, results, fields) {
                                    if (error) {
                                        throw error;
                                    }
                                    message.reply("¡Hecho!");
                                });
                            })
                        } else {
                            message.reply("¡No se ha encontrado a el paciente en la base de datos!")
                        }
                    });

                })
                break;
            case "nacimiento":
                message.reply("Ingresa el número de paciente... Ej.: 10")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                }).then(msg => {
                    let idPaciente = msg.first();
                    conexion.query(`SELECT * FROM PACIENTE P WHERE P.IDPACIENTE = ${idPaciente}`, function (error, results, fields) {
                        if (error) {
                            throw error;
                        }
                        if (results.length === 1) {
                            results.forEach(result => {
                                message.reply(`Paciente seleccionado: ${result.nombre}\nFecha de Nacimiento: ${result.fechaNacimiento}\nIngresa la nueva fecha de nacimiento del paciente... Ej.: 1234567`)
                            })
                            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                max: 1,
                                time: 30000
                            }).then(msg => {
                                let nuevaFechaNacimiento = msg.first();
                                console.log("Nueva fecha de nacimiento: " + nuevaFechaNacimiento.content);
                                conexion.query(`UPDATE paciente SET grupoSanguineo = "${nuevaFechaNacimiento}" WHERE idpaciente = "${idPaciente}"`, function (error, results, fields) {
                                    if (error) {
                                        throw error;
                                    }
                                    message.reply("¡Hecho!");
                                });
                            })
                        } else {
                            message.reply("¡No se ha encontrado a el paciente en la base de datos!")
                        }
                    });

                })
                break;
            case "descripcion":
                message.reply("Ingresa el número de paciente... Ej.: 10")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                }).then(msg => {
                    let idPaciente = msg.first();
                    conexion.query(`SELECT * FROM PACIENTE P WHERE P.IDPACIENTE = ${idPaciente}`, function (error, results, fields) {
                        if (error) {
                            throw error;
                        }
                        if (results.length === 1) {
                            results.forEach(result => {
                                message.reply(`Paciente seleccionado: ${result.nombre}\n Ingresa la fecha de la ficha a editar... Ej.: 2021/05/23`)
                            })
                            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                max: 1,
                                time: 30000
                            }).then(msg => {
                                let fechaParaEditar = msg.first();
                                console.log(`Fecha seleccionada: ${fechaParaEditar}`);
                                conexion.query(`SELECT * FROM PACIENTE P JOIN FICHA F ON P.IDPACIENTE = F.PACIENTE_IDPACIENTE WHERE P.IDPACIENTE = "${idPaciente}" AND FECHAINGRESO = "${fechaParaEditar}"`, function (error, results, fields) {
                                    if (error)
                                        throw error;
                                    if (results.length === 1) {
                                        results.forEach(result => {
                                            message.reply(`Ficha de ${result.nombre} para editar del día: ${fechaParaEditar}\nDescripción \`\`\` ${result.descripcion} \`\`\`\nIngresa la nueva descripcion... Escribe \`cancelar\` para cancelar el proceso.`)
                                        })
                                        message.channel.awaitMessages(m => m.author.id === message.author.id, {
                                            max: 1,
                                            time: 360000
                                        }).then(msg => {
                                            let nuevaDesc = msg.first();
                                            if (nuevaDesc != "cancelar") {
                                                conexion.query(`UPDATE paciente p JOIN ficha f ON p.idpaciente = f.paciente_idpaciente SET f.descripcion = "${nuevaDesc}" WHERE p.idpaciente = "${idPaciente}" AND fechaIngreso = "${fechaParaEditar}";`, function (error, results, fields) {
                                                    message.reply(`¡Editado! \n Nueva descripción \`\`\`${nuevaDesc}\`\`\``);
                                                })
                                            } else {
                                                message.reply(`¡Cancelado!`);
                                            }
                                        })
                                    } else {
                                        message.reply(`¡No se ha encontrado una ficha con la fecha ingresada!`);
                                    }
                                })
                            })
                        } else {
                            message.reply(`¡No se ha encontrado el paciente ingresado!`);
                        }
                    });
                })
                break;

            default:
                message.reply("Uso correcto: --editar (nombre, telefono, sangre, nacimiento, descripcion)").then(msg => {
                    msg.delete({ timeout: 30000 })
                })
                break;
        }
    }
}