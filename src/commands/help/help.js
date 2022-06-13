module.exports = {
    name: 'help',
    description: '명령어 설명을 봅니다',
    run: (client, message, args) => {
        /*
        if (!message.author.dmChannel) message.author.createDM();
        message.author.dmChannel.send("rank 명령어로 티어와 점수를 볼 수 있습니다.");
        */
        message.channel.send(`모든 명령어는 DM으로 보내드렸습니다.\n:arrow_right:이 봇의 접두명령어는 \`!!\`입니다!`)
    }
}