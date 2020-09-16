const router = require('express').Router();
const likes = require('./modules/Likes');
const usuario = require('./modules/Usuario');
const { body, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    var routes = [];
    res.send(router.stack.map((e) => {
        var method = e.route.stack[0].method;
        var path = e.route.path;
        return `${path} - ${method}`;
        
    }));
});

router.get('/likes', likes.get);
router.post('/likes', [
    body('id_dando').isInt(),
    body('id_recebendo').isInt()
], likes.post);


router.get('/usuario', usuario.get);
router.post('/usuario', [
    body('nome').isLength({ min: 5 }),
    body('idade').isInt(),
    body('id_genero').isInt(),
], usuario.post);

module.exports = router;