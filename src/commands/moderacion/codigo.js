const { MessageEmbed } = require('discord.js')
const { embed_author_server, embed_footer_sever, tunning_code_channel } = require('../../../config/config.json');
let vips = ["1", "2", "3", "4"]
let react = `\n\n¡Reacciona con 🎫 para marcar como canjeado!`
let benefits = [`mejoras nivel 1`, `mejoras nivel 2`, `mejoras nivel 3 mas cosméticos`, `full tuning mas cosméticos`]

module.exports.run = async (client, message, args) => {
    const shortid = require('shortid');
    const icon = message.guild.iconURL();
    if (message.member.hasPermission("ADMINISTRATOR")) {
        const codeRandom = shortid.generate();
        message.channel.send(embedCode(codeRandom, args, icon))
        client.channels.cache.get(tunning_code_channel).send(embedCodeVerificator(codeRandom, args, icon)).then(m => {
            m.react("🎫")
        })
    }

    function embedCode(codeRandom, args, icon) {

        const code = new MessageEmbed()
            .setAuthor(embed_author_server, icon)
            .addField('Generado por:', `@${message.author.username}`)
            .setFooter(embed_footer_sever)
            .setColor('RANDOM')
            .setTimestamp()

        switch (args[0]) {
            case "1":
                code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso!\n\n¡Ve al taller mecánico para canjear tu código!`)
                return code
                break;
            case "2":
                code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso!\n\n¡Ve al taller mecánico para canjear tu código!`)
                return code
                break;
            case "3":
                code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso!\n\n¡Ve al taller mecánico para canjear tu código!`)
                return code
                break;
            case "4":
                code.setDescription(`¡Su código para tunning es: **${codeRandom}**, es valido por solo **[1]** uso!\n\n¡Ve al taller mecánico para canjear tu código!`)
                return code
                break;
            default:
                break;
        }
    }

    function embedCodeVerificator(codeRandom, args, icon) {
        const code = new MessageEmbed()
            .setAuthor(embed_author_server, icon)
            .addField('Generado por:', `@${message.author.username}`)
            .setFooter(embed_footer_sever)
            .setColor('RANDOM')
            .setTimestamp()
        switch (args[0]) {
            case "1":
                code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[0]}**${react}`)
                return code
                break;
            case "2":
                code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[1]}**${react}`)
                return code
                break;
            case "3":
                code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[2]}**${react}`)
                return code
                break;
            case "4":
                code.setDescription(`¡Se ha generado un código: **${codeRandom}**!\n\nContiene **${benefits[3]}**${react}`)
                return code
                break;
            default:
                const embed = new MessageEmbed()
                    .setAuthor(embed_author_server, icon)
                    .addField(`¡Ingresa alguno de los siguientes vips para generar el código!`, `${vips[0]}, ${vips[1]}, ${vips[2]}, ${vips[3]}`)
                    .setFooter(embed_footer_sever)
                    .setColor('RANDOM')
                    .setTimestamp()
                message.author.send(embed)
                break;
        }
    }
}