var express = require('express');
var router = express.Router();

/* GET Main gmae page. */
router.get('/', function(req, res, next) {
    res.render('maingame', { title: 'Express' });
});

module.exports = router;
