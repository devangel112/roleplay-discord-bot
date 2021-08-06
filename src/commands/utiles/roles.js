const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const { name } = message.guild;
    const icon = message.guild.iconURL();

    let rolesArray = message.guild.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join("\n");
    if (!rolesArray) rolesArray = "No hay roles para mostrar.";
    const roles = new MessageEmbed()
        .setAuthor(name, icon)
        .setThumbnail(icon)
        .setTitle("Lista de roles")
        .setDescription(rolemap)
        .setColor("YELLOW")
        .setFooter(`Por ${message.author.tag}`)
        .setTimestamp()
    message.channel.send(roles)
}