const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const { name, region, memberCount } = message.guild;
    const icon = message.guild.iconURL();

    const info = new MessageEmbed()
        .setTitle('Informacion del servidor')
        .setThumbnail(icon)
        .setAuthor(name, icon)
        .addFields(
            { name: 'Miembros', value: memberCount, inline: true },
            { name: 'Region del servidor', value: region, inline: true }
        )
        .setFooter(`Por ${message.author.tag}`)
        .setTimestamp()
    message.channel.bulkDelete(1, true)
    message.channel.send(info)

}