const { MessageEmbed } = require('discord.js');
let roles = ''

module.exports.run = async (client, message, args) => {
    const { name } = message.guild;
    const icon = message.guild.iconURL();

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
        .setAuthor(name, icon)
        .setThumbnail(icon)
        .setTitle("Lista de roles")
        .setDescription(roles)
        .setColor("YELLOW")
        .setFooter(`Por ${message.author.tag}`)
        .setTimestamp()
    message.channel.send(rolesEmbed)
}