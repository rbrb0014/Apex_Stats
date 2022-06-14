const fs = require('fs');

module.exports = {
    name: 'checkUserId',
    description: '유저의 고유아이디 패턴이 맞는지 확인합니다.',
    run: async (args) => {
        let data = {
            id: null,
            filePath: null
        }

        data.id = args.shift().slice(1, -1); //유저 고유 아이디<>빼고
        if (data.id.startsWith('@')) data.filePath = `./data/users/${data.id}.json`;
        else data.id = null; //옳게된 유저아이디 패턴 아니면 null 반환
        return data;
    }
}