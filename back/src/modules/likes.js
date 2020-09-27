const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const db = require('../db/schema');
const router = require("express").Router();

router.get('/likes', async (req, res) => {
    db.execSql('select * from likes',null, (field) => {
        console.log(field);
        res.send(field);
    });
});

router.post('/likes', [
    body('id_usuario_dando').isInt(),
    body('id_usuario_recebendo').isInt()
], (req, res) => {
    if (!validationResult(req).isEmpty()) {
        return res.status(400).json({ errors: validationResult(req).array() });
    }
    const { id_usuario_dando, id_usuario_recebendo } = req.body;

    db.execSql('select count(*) as "match" from likes where id_usuario_dando=? and id_usuario_recebendo=?', [id_usuario_recebendo, id_usuario_dando], (resultado) => {
        var match = false;
        if (resultado[0].match > 0) {
            //match!
            console.log('match!');
            match = true;
        }
        db.execSql('select count(*) as "registro" from likes where id_usuario_dando=? and id_usuario_recebendo=?', [id_usuario_dando, id_usuario_recebendo], (resultado) => {
            if (resultado[0].registro == 0) {
                db.execSql('insert into likes (id_usuario_dando,id_usuario_recebendo) values (?,?)', [id_usuario_dando, id_usuario_recebendo], Function());
                console.log('inserido');
            }
            res.send({ match: match });
        });
    })

});

module.exports = router;