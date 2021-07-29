const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let sent = "";
    try {
        const count = args.shift().valueOf();
    } catch (error) {
        msg = await message.channel.send(`!!슈슉 [횟수]로 실행하는 명령어입니다.`);
        await msg.delete();
    }
    while (sent.length < count * 3) {
        const random1 = Math.random() * 10;
        const random2 = Math.random() * random1;

        if (random1 > 7.5) {
            if (random2 > 4.5) sent += "시.";
            if (random2 > 4.9) sent += "슉.";
            else if (random2 > 4.95) sent += "슈.";

            if (random2 > 4.1) {
                sent += "시발.";
                if (random2 > 0.3) {
                    sent += "럼.";
                    if (random2 > 0.2) sent += "슉.";
                    else if (random2 > 0.1) sent += "슈.";
                    sent += "아.";
                } else sent += "럼아.";
            }
            else sent += "시발럼아.";
        }
        else if (random1 > 5.5) sent += "슈슉.";
        else if (random1 > 2) sent += "슉.";
        else sent += "슈.";
    }

    message.channel.send(`${sent}`);
    message.delete();
};

exports = {
    name: '슈슉'
};