const config = require("../config.json");
const request = require("request");

exports.run = (client, message, args) => {
    const url = `https://public-api.tracker.gg/v2/apex/standard/profile`;
    const UserId = args.shift();
    const RequestUrl = `${url}/origin/${UserId}?TRN-Api-Key=${config.API_KEY}&Accept=application/json&Accept-Encoding=gzip`;

    request(RequestUrl, function (err, response, body) {
        if (err) throw err;
        const UserData = JSON.parse(body);
        const UserRankScore = UserData.data.segments[0].stats.rankScore
        const UserRankName = UserRankScore.metadata.rankName;
        const UserRankValue = UserRankScore.value;
        message.channel.send(`${UserId}님은 ${UserRankName}입니다!\n현재 점수는 ${UserRankValue}점 입니다.`);
    })
};

module.exports.name = 'rank';