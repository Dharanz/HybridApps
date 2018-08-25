var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('Server Connected');
});

module.exports = router;