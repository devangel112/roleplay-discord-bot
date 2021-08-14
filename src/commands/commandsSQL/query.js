var config = require('../../bdd.js');
const { embed_author_server, embed_footer_sever, prefix } = require('../../../config/config.json');
const { MessageEmbed } = require('discord.js');
var connection = config.connection

module.exports.run = async (client, message, args) => {
    if (message.author.hasPermission("ADMINISTRATOR")) {
        let query = args.join(' ');
        let items = ""
        connection.query(query, (err, result) => {
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                items += `${element} \n`
            }
            message.channel.send(`\`\`\`${items}\`\`\``)
        })
    }
}