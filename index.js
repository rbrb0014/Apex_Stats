const Discord = require("discord.js");
const config = require("./config.json");
const request = require("request");

const prefix = "!!";

const client = new Discord.Client();

client.on("message", function (message) {
    //봇이 쓴거는 무시
    if (message.author.bot) return;
    //prefix가 안맞으면 무시
    if (!message.content.startsWith(prefix)) return;

    //prefix를 제외한 명령어 몸체부분
    const commandBody = message.content.slice(prefix.length);
    //args={명령어,인수1,인수2,  ...}
    const args = commandBody.split(' ');
    //명령어 소문자로 뽑아냄(명령어 일원화)
    const command = args.shift().toLowerCase();

    //실제 실행되는 명령어 부문
    switch (command) {
        case "ping":
            message.reply(`pong!`);
            break;
        case "sum":
            const numArgs = args.map(x => parseFloat(x));
            const sum = numArgs.reduce((counter, x) => counter += x);
            message.reply(`Sum result: ${sum}`);
            break;
        case "stats":
            const url = `https://public-api.tracker.gg/v2/apex/standard/profile`;
            const UserId = args.shift();
            const RequestUrl = `${url}/origin/${UserId}?TRN-Api-Key=${config.API_KEY}&Accept=application/json&Accept-Encoding=gzip`;
            
            request(RequestUrl,function(err,response,body){
                if(err) throw err;
                const UserData = JSON.parse(body);
                const UserRankScore = UserData.data.segments[0].stats.rankScore
                const UserRankName = UserRankScore.metadata.rankName;
                const UserRankValue = UserRankScore.value;
                message.reply(`${UserId}님은 ${UserRankName}입니다!\n상세 점수는 ${UserRankValue}점 입니다.`);
            })
            break;
        default:
            message.reply(`이 이건 모르는건데요?0?`);
            break;
    }
});



client.login(config.BOT_TOKEN);