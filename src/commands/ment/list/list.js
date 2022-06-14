const fs = require('fs');
const checkUserId = require('../checkUserId');

module.exports = {
    name: 'list',
    description: 'ment리스트를 10개씩 보여줍니다.',
    //!!ment list @[nicknameTag] [number]
    run: async (client, message, args) => {
        const data = checkUserId.run(args);
        if (!id) return;//id 안줬으면 없는 닉네임
        const id = data.id, filePath = data.filePath;
        const pageNum = args.shift();

        if (!fs.existsSync(filePath)) return; //없는 파일이면 명령어 무시
        if (pageNum <= 0) return; //num이 1부터만 가능함

        //파일 읽어서 user에 저장
        const ments = JSON.parse(fs.readFileSync(filePath, "utf-8")).ment;
        const pagesNum = (ments.length - 1) / 10 + 1;
        pagesNum < pageNum ? pageNum = pagesNum : null;
        const list = ments.splice((pageNum - 1) * 10, 10);
        let content = `<${id}>'s ments ${pageNum} of ${pagesNum}`;
        for (let i = 0; i < list.length; i++) {
            content += `\n${i + 1}. ${list[i]}`;
        }
        message.channel.send(content);
    }
};