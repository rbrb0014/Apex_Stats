const fs = require('fs');
const checkUserId = require('../checkUserId');

module.exports = {
    name: 'add',
    description: 'ment을 추가합니다.',
    //!!ment add @[nicknameTag] [statements]
    run: async (client, message, args) => {
        const data = checkUserId.run(args);
        if (!id) return;//id 안줬으면 없는 닉네임
        const id = data.id, filePath = data.filePath;

        //파일 없으면 생성해야함
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

        //파일 읽어서 user에 저장
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        let saveUser = user;
        //파일 없으면 새로 만들고 리스트 끝에 새 멘트 추가
        if (!saveUser.id) saveUser = { id: id, ment: [] }
        saveUser.ment[saveUser.ment.length] = args.join(' ');//내용 리스트에 저장
        saveUser.ment.sort();//리스트 오름차순 정렬
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
    }
}