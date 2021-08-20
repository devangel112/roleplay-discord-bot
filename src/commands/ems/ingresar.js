const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_server, ems_guild_id, dev_guild_id } = require('../../../config/config.json');
var config = require('../../bdd.js');
var conexion = config.connection;

module.exports.run = async (client, message, args) => {
    if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
        try {
            message.reply("Ingresa el nombre del paciente... Ej.: Juan Pérez")
            message.channel.awaitMessages(m => m.author.id === message.author.id, {
                max: 1,
                time: 30000
            }).then(msg => {
                let nombrePaciente = msg.first();
                message.reply("Ingresa el teléfono del paciente... Ej.: 1234567")
                message.channel.awaitMessages(m => m.author.id === message.author.id, {
                    max: 1,
                    time: 30000
                }).then(msg => {
                    let telefonoPaciente = msg.first();
                    message.reply("Ingresa el grupo sanguíneo del paciente... Ej.: A+, AB+")
                    message.channel.awaitMessages(m => m.author.id === message.author.id, {
                        max: 1,
                        time: 30000
                    }).then(msg => {
                        let grupoSanguineoPaciente = msg.first();
                        message.reply("Ingresa la fecha de nacimiento del paciente... Ej.: 2021/05/23")
                        message.channel.awaitMessages(m => m.author.id === message.author.id, {
                            max: 1,
                            time: 30000
                        }).then(msg => {
                            let fechaNacimientoPaciente = msg.first();
                            conexion.query(`INSERT INTO paciente(nombre, telefono, grupoSanguineo, fechaNacimiento) VALUES("${nombrePaciente}", "${telefonoPaciente}", "${grupoSanguineoPaciente}", "${fechaNacimientoPaciente}")`, function (error, results, fields) {
                                if (error)
                                    throw error;
                                message.reply(`Paciente agregado :smile: \n\`\`\`Nombre: ${nombrePaciente}\nTelefono: ${telefonoPaciente}\nGrupo sanguíneo: ${grupoSanguineoPaciente}\nFecha de Nacimiento: ${fechaNacimientoPaciente}\`\`\``)
                                conexion.query(`SELECT * FROM paciente p WHERE nombre = "${nombrePaciente}"`, function (error, results, fields) {
                                    if (error)
                                        throw error;
                                    results.forEach(result => {
                                        let idPaciente = result.idpaciente;
                                        nombrePaciente = result.nombre;
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
                                            )
                                            .setColor("GREEN")
                                            .setFooter(embed_footer_server)
                                        message.channel.send({ embed });
                                    })
                                });
                            })
                        })
                    })
                })
            })
        } catch (err) {
            console.log(err);
        }
    }
}