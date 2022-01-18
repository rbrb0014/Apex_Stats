module.exports.run = async (client, message, args) => {
    switch (args[0]) {
        case '시작':
            if (this.condition === '시작') message.channel.send(`이미 누구 기다리는중!`);
            else {
                this.condition = '시작';
                waitTime = Date.now();
                message.channel.send(`지금부터 기다린다!`);
            }
            break;
        case '시간':
            if (this.condition !== '시작') message.channel.send(`누굴 기다린적이 있어야죠...`);
            else message.channel.send(`${millisToMinutesAndSeconds(Date.now() - waitTime)}동안 기다림 ㅋㅋ;`);
            break;
        case '끝':
            if (this.condition !== '시작') message.channel.send(`누굴 기다린적이 있어야죠...`);
            else {
                this.condition = '끝';
                message.channel.send(`${millisToMinutesAndSeconds(Date.now() - waitTime)}만에 도착!`);
            }
            break;
        default:
            break;
    }
};

module.exports.name = '기둘';
module.exports.condition = '끝';
module.exports.waitTime = Date.now();

//기다리기 명령어 위한 함수
function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}