const { MessageEmbed } = require('discord.js');
const disbut = require("discord-buttons");


module.exports.run = async (client, message, args) => {
    let embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setDescription(``)
        .setFooter(`Arcanus RP - SQL System`)
        .setColor("RED")
        .setTimestamp()

    let button = new disbut.MessageButton()
        .setLabel("Sí")
        .setStyle("orange")
        .setID("example_id")

    let button2 = new disbut.MessageButton()
        .setLabel("No")
        .setStyle("red")
        .setID("example_id2")

    let botones = new disbut.MessageActionRow()
        .addComponents(button, button2)

    message.channel.send(embed, botones);
}