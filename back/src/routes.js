const router = require('express').Router();
const likes = require('./modules/likes');
const usuario = require('./modules/usuarios');
const { body, validationResult } = require('express-validator');


router.get('/', (req, res) => {
    

});

router.use(require('./modules/likes'));
router.use(require('./modules/usuarios'));
router.use(require("./modules/cred"));

module.exports = router;