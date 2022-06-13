const fs = require('fs');

module.exports = {
    name: '추가',
    run: async (client, message, args) => {
        const id = args.shift().slice(1, -1); //유저 고유 아이디<>빼고
        if (!id.startsWith('@')) return;
        const filePath = `./data/users/${id}.json`;//유저 정보 저장 파일

        //파일 없으면 생성해야함
        !fs.existsSync(filePath) ? fs.writeFileSync(filePath, JSON.stringify({})) : null;

        //파일 읽어서 user에 저장
        const user = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        let saveUser = user;


        //여기에 변경할 사항 기록
        if (!saveUser.id) saveUser = { id: id, ment: { count: 0, list: [] } }
        saveUser.ment.list[saveUser.ment.count] = args.join(' ');//내용 리스트에 저장
        saveUser.ment.count++;
        fs.writeFileSync(filePath, JSON.stringify(saveUser));
    }
}