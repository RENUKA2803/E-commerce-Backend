const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth');

router.post('/',userController.createUsers);

module.exports = router;
    