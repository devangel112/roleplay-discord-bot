const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever } = require('../../../config/config.json');
let roles = ''

module.exports.run = async (client, message, args) => {
    if (message.author.hasPermission("ADMINISTRATOR")) {

        let rolesArray = message.guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(r => r);
        for (let i = 0; i < rolesArray.length; i++) {
            const rol = rolesArray[i];
            let miembros = message.guild.roles.resolve(rol.id).members.size
            roles += `${rol} - ${miembros} miembros\n`
        }
        if (!rolesArray) rolesArray = "No hay roles para mostrar.";
        const rolesEmbed = new MessageEmbed()
            .setAuthor(embed_author_server, message.guild.iconURL())
            .setThumbnail(message.guild.iconURL())
            .setTitle("Lista de roles")
            .setDescription(roles)
            .setColor("YELLOW")
            .setFooter(embed_footer_sever)
            .setTimestamp()
        message.channel.send(rolesEmbed)
    } else {

    }
}