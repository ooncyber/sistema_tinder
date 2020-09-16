const db = require('./../db/schema');
const { validationResult } = require('express-validator');

module.exports = {
    get: (req, res) => {
        db.execSql('select * from usuario', (field) => {
            res.send(field);
        });
    },
    post: (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nome, idade, id_genero } = req.body;
        db.execSql('insert into usuario (nome, idade, id_genero) values (?,?,?)', [nome, idade, id_genero], Function());
        console.log('criado!');
    },
}

