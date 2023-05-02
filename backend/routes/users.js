const User = require('../models/users.model');

const router = require('express').Router();

router.get('/me', (req, res) => {
    User.getMyInfo(req, res);
})

router.post('/', (req, res) => {
    const userData = req.body;
    User.createUser(userData, res);


})


module.exports = router;