const db = require('../db/schema');
const { body, validationResult } = require('express-validator');
const router = require("express").Router();
const bcrypt = require('bcrypt');

function validaErros(req, res) {
    if (!validationResult(req).isEmpty())
        return res.json({ errors: validationResult(req).array() });
};

router.post('/verificar', [body('senha').isString(), body('username').isString()], (req, res) => {
    if (validaErros(req, res))
        return;
    const { username, senha } = req.body;

    db.execSql(`select senha from cred where username=?`, [username], (results) => {
        if (results.length > 0) {
            var hash = results[0].senha;
            bcrypt.compare(senha, hash, (err, result) => {
                if (err)
                    console.log(err);

                if (result == true)
                    return res.status(202).json(true);
                else
                    return res.status(400).send({ message: "Credenciais inválidas" });
            });
        }
        else {
            return res.status(400).send({ message: "Credenciais inválidas" });
        }
    });
});


router.post('/cadastrar', [body('senha').isString(), body('username').isString()], (req, res) => {
    if (validaErros(req, res))
        return;
    const { username, senha } = req.body;

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.log('erro ao gerar salt');
            console.log(err);
            return res.status(400).send("erro, contate um adm");
        }


        var a = db.execSql(`insert into cred (senha,username) values (?,?)`, [hash, username], (results, err) => {
            if (err)
                if (err.errno == 1062)
                    return res.status(400).send({ message: "Usuario já existe" });
            if (results.affectedRows > 0)
                return res.send(true);
            else {
                return res.status(400).send({ message: "Credenciais inválidas" });
            }

        });

    });
});

module.exports = router;