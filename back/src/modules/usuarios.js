const db = require('../db/schema');
const { body, validationResult } = require('express-validator');
const router = require("express").Router();

router.get('/usuarios', async (req, res) => {
    db.execSql('select * from usuario', null, (field) => {
        console.log(field);
        res.send(field);
    });
});

router.post('/usuarios', [
    body('nome').isLength({ min: 5 }),
    body('idade').isInt(),
    body('genero').isString(),
    body('descricao').isString()],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { nome, idade, genero, descricao } = req.body;
        return await db.execSql('insert into usuario (nome, idade, genero,descricao) values (?,?,?,?)', [nome, idade, genero, descricao], (results) => {
            id = results.insertId;
            console.log('criado!');
            return res.json({ id, nome, idade, genero });
        });
    });
module.exports = router;

