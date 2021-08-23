const { MessageEmbed } = require('discord.js');
const disbut = require("discord-buttons");
const { developer, embed_author_server, embed_footer_sever } = require('../../../config/config.json');


module.exports.run = async (client, message, args) => {
    try {
        if (message.autor.id === developer) {
            let embed = new MessageEmbed()
                .setAuthor(embed_footer_sever, message.author.avatarURL())
                .setDescription(``)
                .setFooter(embed_footer_sever)
                .setColor("RED")
                .setTimestamp()

            let button = new disbut.MessageButton()
                .setLabel("Sí")
                .setStyle("blurple")
                .setID("example_id")

            let button2 = new disbut.MessageButton()
                .setLabel("No")
                .setStyle("red")
                .setID("example_id2")

            let botones = new disbut.MessageActionRow()
                .addComponents(button, button2)

            message.channel.send(embed, botones);
        } else {
            let embed = new MessageEmbed()
                .setAuthor(embed_author_server, message.guild.iconURL())
                .setDescription(``)
                .setFooter(embed_footer_sever)
                .setColor("RED")
                .setTimestamp()
            message.channel.send(embed);
        }
    } catch (error) {
        console.log(error)
    }
}