const { MessageEmbed } = require('discord.js')
const { embed_author_server, embed_footer_sever, tunning_code_channel, main_guild_id } = require('../../../config/config.json');
let vips = ["Booster", "Gema", "Zafiro", "Esmeralda", "Diamante", "Rubí"]
let react = `\n\n¡Reacciona con 🎫 para marcar como canjeado!`
let benefits = [`Mejora nivel 2`, `Mejoras nivel 2`, `Mejoras nivel 3`, `Mejoras nivel 4 y cosméticos`, `Mejoras nivel 5 y cosméticos`, `Full tuning y cosméticos`]

module.exports.run = async (client, message, args) => {
    const shortid = require('shortid');
    const icon = message.guild.iconURL();
    const getMessage = message;
    if (message.guild.id === main_guild_id) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            const codeRandom = shortid.generate();
            if (args[0]) {
                message.channel.send(embedCode(getMessage, codeRandom, args, icon))
                client.channels.cache.get(tunning_code_channel).send(embedCodeVerificator(getMessage, codeRandom, args, icon)).then(m => {
                    m.react("🎫")
                })
            } else {
                const embed = new MessageEmbed()
                    .setAuthor(embed_author_server, icon)
                    .addField(`¡Ingresa alguno de los siguientes vips para generar el código!`, `${vips[0]}, ${vips[1]}, ${vips[2]}, ${vips[3]}`)
                    .setFooter(embed_footer_sever)
                    .setColor('RANDOM')
                    .setTimestamp()
                message.author.send(embed)
            }
        } else {
            let accessDeniedEmbed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setTitle("¡Operación fallida!")
                .setDescription(`¡No tienes la autorización necesaria para hacer esto!`)
                .setFooter(embed_footer_sever)
                .setColor("RED")
            message.channel.send(accessDeniedEmbed)
            return;
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


}


function embedCode(message, codeRandom, args, icon) {

    const code = new MessageEmbed()
        .setAuthor(embed_author_server, icon)
        .addField('Generado por:', `@${message.author.username}`)
        .setFooter(embed_footer_sever)
        .setColor('RANDOM')
        .setTimestamp()

    switch (args[0]) {
        case vips[0]:
        case "1":
            code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso y tiene los siguientes beneficios!\n**${benefits[0]}**\n\n¡Ve al taller mecánico para canjear tu código!`)
            return code
            break;
        case vips[1]:
        case "2":
            code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso y tiene los siguientes beneficios!\n**${benefits[1]}**\n\n¡Ve al taller mecánico para canjear tu código!`)
            return code
            break;
        case vips[2]:
        case "3":
            code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso y tiene los siguientes beneficios!\n**${benefits[2]}**\n\n¡Ve al taller mecánico para canjear tu código!`)
            return code
            break;
        case vips[3]:
        case "4":
            code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso y tiene los siguientes beneficios!\n**${benefits[3]}**\n\n¡Ve al taller mecánico para canjear tu código!`)
            return code
            break;
        case vips[4]:
        case "5":
            code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso y tiene los siguientes beneficios!\n**${benefits[4]}**\n\n¡Ve al taller mecánico para canjear tu código!`)
            return code
            break;
        case vips[5]:
        case "6":
            code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso y tiene los siguientes beneficios!\n**${benefits[5]}**\n\n¡Ve al taller mecánico para canjear tu código!`)
            return code
            break;
        default:
            break;
    }
}

function embedCodeVerificator(message, codeRandom, args, icon) {
    const code = new MessageEmbed()
        .setAuthor(embed_author_server, icon)
        .addField('Generado por:', `@${message.author.username}`)
        .setFooter(embed_footer_sever)
        .setColor('RANDOM')
        .setTimestamp()
    switch (args[0]) {
        case vips[0]:
        case "1":
            code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[0]}**${react}`)
            return code
            break;
        case vips[1]:
        case "2":
            code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[1]}**${react}`)
            return code
            break;
        case vips[2]:
        case "3":
            code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[2]}**${react}`)
            return code
            break;
        case vips[3]:
        case "4":
            code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[3]}**${react}`)
            return code
            break;
        case vips[4]:
        case "5":
            code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[4]}**${react}`)
            return code
            break;
        case vips[5]:
        case "6":
            code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[5]}**${react}`)
            return code
            break;
        default:
            break;
    }
}