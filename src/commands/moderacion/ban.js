const { MessageEmbed } = require('discord.js')
const { embed_author_server, embed_footer_sever, main_guild_id } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    if (message.guild.id === main_guild_id) {
        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('¡No puedes hacer eso!')
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('¡No tienes los permisos necesarios!')

        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        const noUserEmbed = new MessageEmbed()
            .setAuthor(embed_author_server, message.guild.iconURL())
            .setDescription(`Ingresa a un usuario mencionándolo o con su id.`)
            .setFooter(embed_footer_sever)
            .setTimestamp()

        if (!args[0]) return message.channel.send(noUserEmbed);

        if (!member) return message.channel.send('¡No puedo encontrar a ese usuario!');

        const userNotBannable = new MessageEmbed()
            .setAuthor(embed_author_server, message.guild.iconURL())
            .setDescription(`Este usuario no puede ser baneado, probablemente tiene un rango mayor al tuyo o con permisos de administrador / moderador.`)
            .setFooter(embed_footer_sever)
            .setTimestamp()
        if (!member.bannable) return message.channel.send(userNotBannable);

        if (member.id === message.author.id) return message.channel.send('¡No puedes banearte a ti mismo!');

        let reason = args.slice(1).join(" ");

        if (!reason) reason = 'Sin razón';

        member.ban({ reason: reason }).catch(err => {
            message.channel.send('Algo ha ido mal')
            console.log(err)
        })

        const banembed = new MessageEmbed()
            .setTitle('Miembro baneado')
            .setThumbnail(member.user.displayAvatarURL())
            .addField('Usuario baneado', member)
            .addField('Hechado por', message.author)
            .addField('Razón', reason)
            .setFooter(embed_footer_sever)
            .setTimestamp()

        message.channel.send(banembed);
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