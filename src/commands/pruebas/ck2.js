var config = require('../../bdd.js');
const { MessageEmbed } = require('discord.js');
var connection = config.connection
const disbut = require("discord-buttons");


module.exports.run = async (client, message, args) => {
    let embedCK = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(`Estás a punto de hacer CK a la hex **${args[0]}**`)
        .setFooter(`Arcanus RP - SQL System`)
        .setColor("RED")
        .setTimestamp()

    let urlButton = new disbut.MessageButton()
        .setLabel("Sí")
        .setStyle("orange")
        .setID("hacerCK")

    let urlButton2 = new disbut.MessageButton()
        .setLabel("No")
        .setStyle("red")
        .setID("cancelarCK")

    let botones = new disbut.MessageActionRow()
        .addComponents(urlButton, urlButton2)

    message.channel.send(embedCK, botones);
}