const fs = require('fs');
const Discord = require("discord.js");

module.exports = {
    name: 'ment',
    description: '사람들이 한 말들을 적어둡니다',
    //!!ment [condition] @nicknameTag [args...]
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