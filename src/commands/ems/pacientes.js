const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_server, ems_guild_id, dev_guild_id } = require('../../../config/config.json');
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
            const embed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setFooter(embed_footer_server)
                .setColor("GREEN")
            let id = ''
            let nombre = ''
            let telefono = ''
            let fechaNacimiento = ''
            let grupoSanguineo = ''
            let field1 = ''
            let field2 = ''
            let field3 = ''
            results.forEach(result => {
                fn = new Intl.DateTimeFormat('es-MX', options).format(result.fechaNacimiento);
                //mensaje += `${result.idpaciente}\t${result.nombre}\t${result.telefono}\t${fn}\t\t\t${result.grupoSanguineo}\n`
                field1 += `${result.idpaciente} | ${result.nombre}\n`
                field2 += `${result.telefono} | ${fn}\n`
                field3 += `${result.grupoSanguineo}\n`
            })
            embed.addField(`ID | Nombre`, field1, true)
            embed.addField(`Teléfono | Fecha de Nacimiento`, field2, true)
            embed.addField(`Grupo Sanguíneo`, field3, true)
            message.channel.send(embed);
        })
    }
}