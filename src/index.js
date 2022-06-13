const Discord = require("discord.js");
const fs = require("fs");
const { prefix, token } = require("./data/config.json"); //.gitignore로 깃허브에 올라가지 않음

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.commands.load = dir => {
    console.log(dir);
    for (const file of fs.readdirSync(dir)) {
        const cmd = require(`./commands/${file}/${file}`);
        client.commands.set(cmd.name, cmd);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
}

client.commands.load(__dirname + "/commands");
client.once('ready', () => console.log(`${client.user.tag} 에 로그인됨`));

client.on("message", message => {
    if (message.author.bot) return;//봇의 채팅 무시(무한반복 방지)
    if (message.author.id === client.user.id) return;//로그인한 봇으로 채팅 입력 방지
    if (!message.content.startsWith(prefix)) return;//prefix가 안맞으면 무시

    //args={명령어,인수1,인수2,  ...}
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command);
    if (cmd) {
        cmd.run(client, message, args);
        console.log(cmd.name);
    }
});

client.login(token);