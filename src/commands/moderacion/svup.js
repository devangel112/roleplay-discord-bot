const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const { name } = message.guild;
    const icon = message.guild.iconURL();
    if (message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send('|| @everyone ||')
        const info = new MessageEmbed()
            .setTitle('Informacion del servidor')
            .setAuthor(name, icon)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .setDescription('¡El servidor se encuentra actualmente ACTIVO! - :white_check_mark:')
            .addField('IP:', 'connect arcanus.ukader.net')
            .setImage('https://cdn.discordapp.com/attachments/831568080438034503/875979875243143178/LOGO.png')
            .setFooter('¡Disfruta del servidor!')
            .setTimestamp()
        message.channel.bulkDelete(1, true)
        message.channel.send(info)
    }
}