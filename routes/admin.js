var express = require('express');
var router = express.Router();

var admin = require('../controller/admincontroller');

router.post('/',admin.admin_register);

router.get('/',admin.get_data);

router.post('/login',admin.admin_login);

router.get('/login_view',admin.view_login_data);

router.get('/logout',admin.admin_logout);

module.exports = router;