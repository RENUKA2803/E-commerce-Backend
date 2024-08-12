const express=require ('express')
const router=express.Router();
const orderController=require('../controllers/orderController')
const auth=require('../middleware/auth')

router.post('/create',auth,orderController.createOrder)

router.get('/get:id',auth,orderController.getOrder)

module.exports=router