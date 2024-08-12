const mongoose=require('mongoose');

const cartSchema=new mongoose.Schema({
    user_id:String,
    products:[   //if diffrent datatypes we have to give in array of objects
        {
            product_id:String,
            quantity:Number
        }
    ]
})

const Cart= mongoose.model('Cart',cartSchema);
module.exports=Cart;


