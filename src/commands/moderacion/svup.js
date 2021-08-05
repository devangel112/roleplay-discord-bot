const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
    const { name } = message.guild;
    const icon = message.guild.iconURL();
    if (message.member.hasPermission('ADMINISTRATOR')) {
        message.channel.send('|| @everyone ||')
        const info = new MessageEmbed()
            .setTitle('Informacion del servidor')
            // .setURL('https://fivem://connect/l8xqrv')
            .setAuthor(name, icon)
            .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
            .setDescription('¡El servidor se encuentra actualmente ACTIVO! - :white_check_mark:')
            .addField('IP:', 'connect arcanus.ukader.net')
            .setImage('https://media.discordapp.net/attachments/823769093454692374/823769181538484264/314141342314123.gif?width=742&height=418')
            .setFooter('¡Disfruta del servidor!')
            .setTimestamp()
        message.channel.bulkDelete(1, true)
        message.channel.send(info)
        // console.log(name, region, memberCount, icon )
    }
}