const fs = require('fs');
const checkUserId = require('../checkUserId');

module.exports = {
    name: 'delete',
    description: 'ment을 삭제합니다.',
    //!!ment delete @[nicknameTag] [listNumber]
    run: async (client, message, args) => {
        const data = checkUserId.run(args);
        if (!id) return;//id 안줬으면 없는 닉네임
        const id = data.id, filePath = data.filePath;

        const num = args.shift() - 1;
        if (!fs.existsSync(filePath)) return; //없는 파일이면 명령어 무시

        //파일 읽어서 user에 저장
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        let saveUser = user;
        //파일 내에 있는 해당 번호의 멘트 삭제
        if (saveUser.ment.length > num) {
            const deleted = saveUser.ment.splice(num, 1);
            fs.writeFileSync(filePath, JSON.stringify(saveUser));
            message.channel.send(`"${deleted}" 삭제됨`);
        }
    }
}