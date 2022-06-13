const fs = require('fs');
const Discord = require("discord.js");

module.exports = {
    name: '어록',
    description: '사람들이 어떤 말을 했나 적어둡니다',
    run: async (client, message, args) => {
        const subcommand = args.shift();

        for (const file of fs.readdirSync(__dirname)) {
            let scmd = null;
            if (subcommand == file) {
                scmd = require(`./${file}/${file}`);
                scmd.run(client, message, args)
                console.log(scmd.name);
            }
        }
    }
}