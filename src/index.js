import { Client, Intents, Collection } from "discord.js";
import { registerCommands } from './data/deploy-commands.mjs';
import dotenv from "dotenv";//gitignore
import { readdirSync } from "fs";

dotenv.config({path: './data/.env'});
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

// Slash Command 추가
registerCommands(
    process.env.DISCORD_BOT_TOKEN,
    process.env.CLIENT_ID,
    process.env.TO_REGISTER_GUILD);

// 메시지를 받으면 호출되는 함수
client.on('interactionCreate', async interaction => {
    // Original: https://discordjs.guide/interactions/replying-to-slash-commands.html#receiving-interactions
    if (!interaction.isCommand()) return;

    if (interaction.commandName === '안녕하세요') {
        await interaction.reply('인사 잘한다~');
    }
});

client.login(process.env.DISCORD_BOT_TOKEN).then(console.log("LOGIN SUCCESS."));
client.once('ready', () => console.log(`logged in to ${client.user.tag}.`));

client.commands = new Collection();

client.commands.load = dir => {
    console.log(dir);
    for (const file of readdirSync(dir)) {
        const cmd = require(`./commands/${file}/${file}`);
        client.commands.set(cmd.name, cmd);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ' 명령어가 로드됨.');
}

client.commands.load(__dirname + "/commands");

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