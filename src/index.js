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
    let cmd = client.commands.get(interaction.commandName);
    if(cmd){
        await cmd.execute(interaction);
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