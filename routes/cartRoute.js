const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

router.post('/create',auth,cartController.createCart)

router.get('/get',auth,cartController.getCart)

router.delete('/delete/:product_id',auth,cartController.deleteCartProduct)

module.exports=router;
