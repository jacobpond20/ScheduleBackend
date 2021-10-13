const express = require('express');
const pug = require('pug');
const router = express.Router();

//Create home() pug function
var home = pug.compileFile('./templates/home.pug');

router.get('/', (req, res) => {
    res.send(home({
        title: 'Home Page',
        message: 'This is working?'
    }));
});

module.exports = router;