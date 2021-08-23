const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_server, ems_guild_id, dev_guild_id, prefix } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    try {
        if (message.guild.id === ems_guild_id || message.guild.id === dev_guild_id) {
            const comandos = [
                "ayuda",
                "editar",
                "historial",
                "ingresar",
                "mensajeems",
                "nueva",
                "pacientes",
                "revisar"
            ];
            const descripciones = [
                "Obtén la lista de comandos disponibles.",
                "Edita la información de un paciente que ya esté en el sistema.",
                "Revisa un historial de una ficha en específico.",
                "Ingresa a un paciente al sistema.",
                "Envía un mensaje por medio del bot a un canal especificado.",
                "Añade un historial médico a un paciente en una fecha determinada.",
                "Muestra la lista de pacientes registrados.",
                "Revisa la ficha del paciente."
            ]
            const embed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setFooter(embed_footer_server)
                .setTitle("Comandos disponibles")
                .setColor("GREEN")
                .setTimestamp();
            for (let i = 0; i < comandos.length; i++) {
                const comando = comandos[i];
                const descripcion = descripciones[i];
                embed.addField(`${prefix}${comando}`, descripcion);
            }
            message.channel.send(embed)
        }
    } catch (error) {
        console.log(error);
    }
}