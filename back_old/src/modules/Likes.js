const { validationResult } = require('express-validator');
const db = require('./../db/schema');
module.exports = {
    get: (req, res) => {
        console.log('ok');
    },
    post: (req, res) => {
        if (!validationResult(req).isEmpty()) {
            return res.status(400).json({ errors: validationResult(req).array() });
        }
        const { id_dando, id_recebendo } = req.body;

        db.execSql('select count(*) as "match" from likes where id_dando=? and id_recebendo=?', [id_recebendo, id_dando], (resultado) => {
            var match = false;
            if (resultado[0].match > 0) {
                //match!
                console.log('match!');
                match = true;
            }
            db.execSql('select count(*) as "registro" from likes where id_dando=? and id_recebendo=?', [id_dando, id_recebendo], (resultado) => {
                if (resultado[0].registro == 0) {
                    db.execSql('insert into likes (id_dando,id_recebendo) values (?,?)', [id_dando, id_recebendo], Function());
                    console.log('inserido');
                }
                res.send({ match: match });
            });
        })

        //verificar se o recebendo deu like no dando
        // db.execSql('select count(*) as "match" from likes where id_dando=? and id_recebendo=?', [id_recebendo, id_dando], (resultado) => {
        //     if (resultado[0].match > 0) {
        //         console.log('match!');
        //         db.execSql('insert into likes (id_dando, id_recebendo) values (?,?)', [id_dando, id_recebendo], Function());
        //         console.log('inserido no banco');
        //         //deu match
        //         res.send({ match: true });
        //     }
        //     else {
        //         console.log('sem match');
        //         //se não, verificar se o dando ja deu like no recebendo
        //         db.execSql('select count(*) as "dando" from likes where id_dando=? and id_recebendo=?', [id_dando, id_recebendo], (resultado) => {
        //             if (resultado[0].dando == 0) {
        //                 //se não, inserir no banco
        //                 db.execSql('insert into likes (id_dando, id_recebendo) values (?,?)', [id_dando, id_recebendo], Function());
        //                 res.send({match:false});
        //                 console.log('inserido no banco');
        //             }
        //             else {
        //                 res.send({match:false});
        //                 console.log('ele ja deu like');
        //             }
        //         });
        //     }
        // })


    }
}