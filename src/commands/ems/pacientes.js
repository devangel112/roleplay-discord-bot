const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever, ems_guild_id, dev_guild_id } = require('../../../config/config.json');
var config = require('../../bdd.js');
var conexion = config.connection;

module.exports.run = async (client, message, args) => {
    if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
        const options = {
            year: 'numeric', month: 'numeric', day: 'numeric',
        };
        conexion.query(`SELECT * FROM paciente`, function (error, results, fields) {
            if (error)
                throw error;
            message.reply(`Aquí la lista de pacientes registrados.`)
            mensaje = `\`\`\`ID\tNombre\t\tTelefono\tFecha de Nacimiento\tGrupo sanguíneo\n`
            results.forEach(result => {
                fechaNacimiento = new Intl.DateTimeFormat('es-MX', options).format(result.fechaNacimiento);
                mensaje += `${result.idpaciente}\t${result.nombre}\t${result.telefono}\t${fechaNacimiento}\t\t\t${result.grupoSanguineo}\n`
            })
            mensaje += `\`\`\``
            message.channel.send(mensaje);
        })
    }
}