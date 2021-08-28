const { MessageEmbed } = require('discord.js')
const { embed_author_server, embed_footer_sever, vip_info_channel, main_guild_id } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    try {
        const vipRanks = ["Booster", "Gema", "Zafiro", "Esmeralda", "Diamante", "Rubí"];
    const vipNames = ["VIP Gema", "VIP Zafiro", "VIP Esmeralda", "VIP Diamante", "VIP Rubí"];
    let vip = "";
    if (message.guild.id === main_guild_id) {
        if (args[0]) vip = args[0].toLowerCase();
        switch (vip) {
            case "booster":
                const embed1 = new MessageEmbed()
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setTitle(`Booster`)
                    .setDescription(`El VIP ${vipRanks[0]} tiene los siguientes beneficios.`)
                    .setColor("#FF5BD2")
                    .addFields(
                        { name: 'Dinero limpio', value: '$15.000 dólares', inline: true },
                        { name: 'Mejora de vehículo', value: 'Nivel 2 (Válido una vez)', inline: true },
                    )
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                message.channel.send(embed1)
                break;
            case "gema":
                const embed2 = new MessageEmbed()
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setTitle(vipNames[0])
                    .setDescription(`El VIP ${vipRanks[1]} tiene los siguientes beneficios.`)
                    .setColor("#FFC65B")
                    .addFields(
                        { name: 'Dinero limpio', value: '$25.000 dólares', inline: true },
                        { name: 'Casa', value: 'Gama baja', inline: true },
                        { name: 'Mejora de vehículo', value: 'Nivel 2 (Válido una vez)', inline: true },
                        { name: 'Cupón de descuento mejora de vehículo', value: '10% (Válido una vez)', inline: true },
                        { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                        { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true }
                    )
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                message.channel.send(embed2)
                break;
            case "zafiro":
                const embed3 = new MessageEmbed()
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setTitle(vipNames[1])
                    .setColor("#0B16FF")
                    .setDescription(`El VIP ${vipRanks[2]} tiene los siguientes beneficios.`)
                    .addFields(
                        { name: 'Dinero limpio', value: '$50.000 dólares', inline: true },
                        { name: 'Casa', value: 'Gama media', inline: true },
                        { name: 'Mejora de vehículo', value: 'Nivel 3 (Válido una vez)', inline: true },
                        { name: 'Cupón de descuento mejora de vehículo', value: '20% (Válido una vez)', inline: true },
                        { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                        { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true },
                        { name: 'Descuento en vehículo del consecionario VIP', value: '15% (Válido una vez)', inline: true }
                    )
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                message.channel.send(embed3)
                break;
            case "esmeralda":
                const embed4 = new MessageEmbed()
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setTitle(vipNames[2])
                    .setColor("#12FF0B")
                    .setDescription(`El VIP ${vipRanks[3]} tiene los siguientes beneficios.`)
                    .addFields(
                        { name: 'Dinero limpio', value: '$80.000 dólares', inline: true },
                        { name: 'Casa', value: 'Gama media', inline: true },
                        { name: 'Mejora de vehículo', value: 'Nivel 4 (Válido una vez)', inline: true },
                        { name: 'Cupón de descuento', value: '30% (Válido una vez)', inline: true },
                        { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                        { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true },
                        { name: 'Descuento en vehículo del consecionario VIP', value: '30% (Válido una vez)', inline: true }
                    )
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                message.channel.send(embed4)
                break;
            case "diamante":
                const embed5 = new MessageEmbed()
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setTitle(vipNames[3])
                    .setColor("#0BFFFB")
                    .setDescription(`El VIP ${vipRanks[4]} tiene los siguientes beneficios.`)
                    .addFields(
                        { name: 'Dinero limpio', value: '$100.000 dólares', inline: true },
                        { name: 'Casa', value: 'Gama alta', inline: true },
                        { name: 'Mejora de vehículo', value: 'Nivel 5 (Válido una vez)', inline: true },
                        { name: 'Mejora de cosméticos', value: ':white_check_mark: (Válido una vez)', inline: true },
                        { name: 'Cupón de descuento', value: '40% (Válido una vez)', inline: true },
                        { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                        { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true },
                        { name: 'Descuento en vehículo del consecionario VIP', value: '50% (Válido una vez)', inline: true }
                    )
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                message.channel.send(embed5)
                break;
            case "rubi":
            case "rubí":
                const embed6 = new MessageEmbed()
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setTitle(vipNames[4])
                    .setColor("#FF0B0B")
                    .setDescription(`El VIP ${vipRanks[5]} tiene los siguientes beneficios.`)
                    .addFields(
                        { name: 'Dinero limpio', value: '$150.000 dólares', inline: true },
                        { name: 'Casa', value: 'Gama alta', inline: true },
                        { name: 'Mejora de vehículo', value: 'Nivel máxmo (Válido una vez)', inline: true },
                        { name: 'Mejora de cosméticos', value: ':white_check_mark: (Válido una vez)', inline: true },
                        { name: 'Cupón de descuento', value: '50% (Válido una vez)', inline: true },
                        { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                        { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true },
                        { name: 'Un vehículo del consecionario VIP', value: ':white_check_mark:', inline: true },
                        { name: 'Opción de organizar un evento', value: ':white_check_mark: (Durante la duración del VIP)', inline: true },
                        { name: 'Ojo', value: 'Deberá enviar su idea mediante ticket en ayuda general, exponer en que consiste y que necesitará para el evento.' }
                    )
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                message.channel.send(embed6)
                break;
            default:
                const embed7 = new MessageEmbed()
                    .setAuthor(embed_author_server, message.guild.iconURL())
                    .setTitle(`¡VIP no encontrado!`)
                    .setDescription(`Estos son los VIP disponibles para pedir la información.\n**${vipRanks[0]}\n${vipRanks[1]}\n${vipRanks[2]}\n${vipRanks[3]}\n${vipRanks[4]}\n${vipRanks[5]}**`)
                    .setFooter(embed_footer_sever)
                    .setTimestamp()
                    .setColor("ORANGE")
                message.channel.send(embed7)
                break;
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