var express = require('express'),
    router = express.Router(),
    readings = require('./readings'),
    sensors = require('./sensors'),
    login = require('./login'),
    logout = require('./logout'),
    register = require('./register'),
    images = require('./images'),
    admin = require('./admin');

router.use('/readings', readings);
router.use('/sensors', sensors);
router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/images', images);
router.use('/admin', admin);

module.exports = router;
