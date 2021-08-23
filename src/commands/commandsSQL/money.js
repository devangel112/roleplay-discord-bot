var config = require('../../bdd.js');
const { embed_author_server, embed_footer_sever, prefix, main_guild_id } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
var connection = config.connection

module.exports.run = async (client, message, args) => {
    try {
        if (message.guild.id === main_guild_id) {
            if (message.member.hasPermission("ADMINISTRATOR")) {
                if (args[0] && args[1] && args[2]) {
                    let license = args[0];
                    let account = args[1].toLowerCase();
                    let newBalance = args[2];
                    connection.query("SELECT * FROM users WHERE identifier = ?", license, (err, result) => {
                        let user = result[0];
                        if (user) {
                            let cuentas = [user.accounts]
                            let json = JSON.parse(cuentas.join(' '))
                            let dinero = json.money
                            let dineroBanco = json.bank
                            let dineroNegro = json.black_money
                            switch (account) {
                                case "money":
                                    connection.query(`UPDATE users SET accounts = '{"money":${newBalance},"bank":${dineroBanco},"black_money":${dineroNegro}}' WHERE identifier = ?`, license, (err, result) => {
                                        const moneyChanged = new MessageEmbed()
                                            .setAuthor(embed_author_server, message.guild.iconURL())
                                            .setTitle(`¡Acción completada!`)
                                            .setDescription(`Dinero en mano modificado`)
                                            .addFields(
                                                { name: "Balance anterior", value: `$${dinero}`, inline: true },
                                                { name: "Balance nuevo", value: `$${newBalance}`, inline: true }
                                            )
                                            .setFooter(embed_footer_sever)
                                            .setTimestamp()
                                            .setColor("GREEN")
                                        message.channel.send(moneyChanged)
                                    })
                                    break;
                                case "bank":
                                    connection.query(`UPDATE users SET accounts = '{"money":${dinero},"bank":${newBalance},"black_money":${dineroNegro}}' WHERE identifier = ?`, license, (err, result) => {
                                        const bankChanged = new MessageEmbed()
                                            .setAuthor(embed_author_server, message.guild.iconURL())
                                            .setTitle(`¡Acción completada!`)
                                            .setDescription(`Cuenta bancaria modificada`)
                                            .addFields(
                                                { name: "Balance anterior", value: `$${dineroBanco}`, inline: true },
                                                { name: "Balance nuevo", value: `$${newBalance}`, inline: true }
                                            )
                                            .setFooter(embed_footer_sever)
                                            .setTimestamp()
                                            .setColor("GREEN")
                                        message.channel.send(bankChanged)
                                    })
                                    break;
                                case "black_money":
                                    connection.query(`UPDATE users SET accounts = '{"money":${dinero},"bank":${dineroBanco},"black_money":${newBalance}}' WHERE identifier = ?`, license, (err, result) => {
                                        const blackMoneyChanged = new MessageEmbed()
                                            .setAuthor(embed_author_server, message.guild.iconURL())
                                            .setTitle(`¡Acción completada!`)
                                            .setDescription(`Dinero negro modificado`)
                                            .addFields(
                                                { name: "Balance anterior", value: `$${dineroNegro}`, inline: true },
                                                { name: "Balance nuevo", value: `$${newBalance}`, inline: true }
                                            )
                                            .setFooter(embed_footer_sever)
                                            .setTimestamp()
                                            .setColor("GREEN")
                                        message.channel.send(blackMoneyChanged)
                                    })
                                    break;
                                default:
                                    const errorEmbed = new MessageEmbed()
                                        .setAuthor(embed_author_server, message.guild.iconURL())
                                        .setTitle(`¡Acción fallida!`)
                                        .setDescription(`No se ha podido encontrar la cuenta ${account}`)
                                        .setFooter(embed_footer_sever)
                                        .setTimestamp()
                                        .setColor("RED")
                                    message.channel.send(errorEmbed)
                                    break;
                            }
                        } else {
                            const errorEmbed = new MessageEmbed()
                                .setAuthor(embed_author_server, message.guild.iconURL())
                                .setTitle(`¡Acción fallida!`)
                                .setDescription(`No se ha podido encontrar al usuario **${license}**`)
                                .setFooter(embed_footer_sever)
                                .setTimestamp()
                                .setColor("RED")
                            message.channel.send(errorEmbed)
                        }
                    })
                } else {
                    const noArgs = new MessageEmbed()
                        .setAuthor(embed_author_server, message.guild.iconURL())
                        .setTitle(`¡Error!`)
                        .setDescription(`Uso correcto ${prefix}money (licencia) (cuenta) (nuevo balance)`)
                        .setFooter(embed_footer_sever)
                        .setTimestamp()
                        .setColor("RED")
                    message.channel.send(noArgs)
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