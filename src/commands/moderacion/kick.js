const { MessageEmbed } = require('discord.js');
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    try {
        if (message.guild.id === main_guild_id) {
            message.channel.send('Has Kickeado satisfactoriamente!')
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