const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    try {
        if (message.guild.id === main_guild_id) {
            if (message.member.hasPermission('ADMINISTRATOR')) {
                message.channel.send('|| @everyone ||')
                const info = new MessageEmbed()
                    .setTitle('Informacion del servidor')
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 512 }))
                    .setDescription('¡El servidor se encuentra actualmente ACTIVO! - :white_check_mark:')
                    .addField('IP:', 'connect cfx.re/join/ykdjk9')
                    .setImage('https://cdn.discordapp.com/attachments/831568080438034503/875979875243143178/LOGO.png')
                    .setFooter('¡Disfruta del servidor!')
                    .setTimestamp()
                message.channel.bulkDelete(1, true)
                message.channel.send(info)
            }
        } else {
            let accessDeniedEmbed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setTitle("¡Operación fallida!")
                .setDescription(`¡No está permitido ese comando en este servidor!`)
                .setFooter(embed_footer_sever)
                .setColor("RED")
            message.channel.send(accessDeniedEmbed)
            return;
        }
    } catch (error) {
        console.log(error)
    }
}