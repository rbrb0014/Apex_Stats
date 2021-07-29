const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let waitTime;
    switch (args[0]) {
        case '시작':
            waitTime = Date.now();
            message.channel.send(`지금부터 기다린다!`);
            break;
        case '시간':
            message.channel.send(`${millisToMinutesAndSeconds(Date.now() - waitTime)}동안 기다림 ㅋㅋ;`);
            break;
        case '끝':
            
            message.channel.send(`${millisToMinutesAndSeconds(Date.now() - waitTime)}만에 도착!`);
            break;
    }
};

//기다리기 명령어 위한 함수
var waitTime = new Date();
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

exports = {
    name: '기둘'
};
