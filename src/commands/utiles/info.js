const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    try {
        const { region, memberCount } = message.guild;

        const info = new MessageEmbed()
            .setTitle('Informacion del servidor')
            .setThumbnail(message.guild.iconURL())
            .setAuthor(embed_author_server, message.guild.iconURL())
            .addFields(
                { name: 'Miembros', value: memberCount, inline: true },
                { name: 'Region del servidor', value: region, inline: true }
            )
            .setFooter(embed_footer_sever)
            .setTimestamp()
        message.channel.bulkDelete(1, true)
        message.channel.send(info)
    } catch (error) {
        console.log(error)
    }
}