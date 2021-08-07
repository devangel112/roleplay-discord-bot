const { MessageEmbed } = require('discord.js')
const { embed_author_server, embed_footer_sever, vip_info_channel } = require('../../../config/config.json');

module.exports.run = async (client, message, args) => {
    const vipRanks = ["Booster", "Gema", "Zafiro", "Esmeralda", "Diamante", "Rubí"]
    const vipNames = ["VIP Gema $5.000", "VIP Zafiro $10.000", "VIP Esmeralda $15.000", "VIP Diamante $25.000", "VIP Rubí $40.000"]
    const vip = args[0].toLowerCase()
    switch (vip) {
        case "booster":
            const embed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setTitle(`Booster`)
                .setDescription(`Se te otorgará el rango VIP ${vipRanks[0]} y los siguientes beneficios.`)
                .setColor("#FF5BD2")
                .addFields(
                    { name: 'Dinero limpio', value: '$15.000 dólares', inline: true },
                    { name: 'Mejora de vehículo', value: 'Nivel 2', inline: true },
                )
                message.guild.channels.cache.get(vip_info_channel).send(embed)
            break;
        case "gema":
            const embed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setTitle(vipNames[0])
                .setDescription(`Se te otorgará el rango VIP ${vipRanks[1]} y los siguientes beneficios.`)
                .setColor("#FFC65B")
                .addFields(
                    { name: 'Dinero limpio', value: '$25.000 dólares', inline: true },
                    { name: 'Casa', value: 'Gama baja', inline: true },
                    { name: 'Mejora de vehículo', value: 'Nivel 2 (Válido una vez)', inline: true },
                    { name: 'Cupón de descuento mejora de vehículo', value: '10% (Válido una vez)', inline: true },
                    { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                    { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true }
                )
            break;
        case "zafiro":
            const embed = new MessageEmbed()
                .setTitle(vipNames[1])
                .setColor("#0B16FF")
                .setDescription(`Se te otorgará el rango VIP ${vipRanks[2]} y los siguientes beneficios.`)
                .addFields(
                    { name: 'Dinero limpio', value: '$50.000 dólares', inline: true },
                    { name: 'Casa', value: 'Gama media', inline: true },
                    { name: 'Mejora de vehículo', value: 'Nivel 3 (Válido una vez)', inline: true },
                    { name: 'Cupón de descuento mejora de vehículo', value: '20% (Válido una vez)', inline: true },
                    { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                    { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true },
                    { name: 'Descuento en vehículo del consecionario VIP', value: '15% (Válido una vez)', inline: true }
                )
            break;
        case "esmeralda":
            const embed = new MessageEmbed()
                .setTitle(vipNames[2])
                .setColor("#12FF0B")
                .setDescription(`Se te otorgará el rango VIP ${vipRanks[3]} y los siguientes beneficios.`)
                .addFields(
                    { name: 'Dinero limpio', value: '$80.000 dólares', inline: true },
                    { name: 'Casa', value: 'Gama media', inline: true },
                    { name: 'Mejora de vehículo', value: 'Nivel 4 (Válido una vez)', inline: true },
                    { name: 'Cupón de descuento', value: '30% (Válido una vez)', inline: true },
                    { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                    { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true },
                    { name: 'Descuento en vehículo del consecionario VIP', value: '30% (Válido una vez)', inline: true }
                )
            break;
        case "diamante":
            const embed = new MessageEmbed()
                .setTitle(vipNames[3])
                .setColor("#0BFFFB")
                .setDescription(`Se te otorgará el rango VIP ${vipRanks[4]} y los siguientes beneficios.`)
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
            break;
        case "rubi":
        case "rubí":
            const embed = new MessageEmbed()
                .setTitle(vipNames[4])
                .setColor("#FF0B0B")
                .setDescription(`Se te otorgará el rango VIP ${vipRanks[5]} y los siguientes beneficios.`)
                .addFields(
                    { name: 'Dinero limpio', value: '$150.000 dólares', inline: true },
                    { name: 'Casa', value: 'Gama baja', inline: true },
                    { name: 'Mejora de vehículo', value: 'Nivel máxmo (Válido una vez)', inline: true },
                    { name: 'Mejora de cosméticos', value: ':white_check_mark: (Válido una vez)', inline: true },
                    { name: 'Cupón de descuento', value: '50% (Válido una vez)', inline: true },
                    { name: 'Prioridad en cola de espera', value: ':white_check_mark:', inline: true },
                    { name: 'Acceso a compra de vehículos VIP', value: ':white_check_mark:', inline: true },
                    { name: 'Un vehículo del consecionario VIP', value: ':white_check_mark:', inline: true },
                    { name: 'Opción de organizar un evento', value: ':white_check_mark: (Durante la duración del VIP)', inline: true },
                    { name: 'Ojo', value: 'Deberá enviar su idea mediante ticket en ayuda general, exponer en que consiste y que necesitará para el evento.' }
                )
            break;
        default:
            break;
    }
}