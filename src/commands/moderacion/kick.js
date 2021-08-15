module.exports.run = async (client, message, args) => {
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

}