const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const request = require("request");

const client = new Discord.Client();
const prefix = "!!";


client.commands = new Discord.Collection()

client.commands.load = dir => {
    for (const file of fs.readdirSync(dir)) {
        const cmd = require(`./commands/${file}`);
        client.commands.set(cmd.name, cmd);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
}

client.commands.load(__dirname + "/commands");
//해당 파일 위치 디렉터리에서 /commands 경로 추가

client.on('ready', () => console.log(`${client.user.tag} 에 로그인됨`));

client.on("message", message => {
    if (message.author.bot) return;//봇이 쓴거는 무시
    if (!message.content.startsWith(prefix)) return;//prefix가 안맞으면 무시

    //args={명령어,인수1,인수2,  ...}
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command);
    console.log(cmd);
    if (cmd) cmd.run(client, message, args);
});

client.login(config.BOT_TOKEN);