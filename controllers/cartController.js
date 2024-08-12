const Cart=require('../models/cartModel');
const Product = require('../models/productModel'); 
exports.createCart = async (req,res)=>{
    const {user_id}=req.user
    const {product_id,quantity}=req.body;
    let cart = await Cart.findOne({user_id});

    if(!cart){
        cart = new Cart({
            user_id,
            products:[
            {
            product_id,
            quantity
        }]});
        }
        else{
            const productIndex=cart.products.findIndex(
                (prod)=>prod.product_id===product_id
            );
            if(productIndex>-1){
                cart.products[productIndex].quantity=quantity;
        }
        else{
            cart.products.push({product_id,quantity});

        }
    }
        await cart.save();
        res.status(201).json("Cart Saved Successfully");
        
}

exports.getCart=async (req,res)=>{
    const {user_id}=req.user;
    const cart=await Cart.findOne({user_id});

    if(!cart){
         return res.status(404).json({message:'Cart not found'});
    }
    try{
        let subTotal=0;
        const cartItems=await Promise.all(
            cart.products.map(async (product)=>{
                const productDetails=await Product.findOne({id:product.product_id});
                subTotal+=productDetails.price*product.quantity;
                return {
                    product_id:product.product_id,
                    title:productDetails.title,
                    price:productDetails.price,
                    quantity:productDetails.quantity,
                    name:productDetails.name,
                    image:productDetails.image,
                    description:productDetails.description
                }
            })
        )
        res.status(200).json({cartItems:cartItems,subTotal});
    }
    catch(err){
        console.error('Error fetching cart:',err);
        res.status(500).json({error:"Failed to retrieve cart"})
    }
}

exports.deleteCartProduct = async (req, res) => {
    const { user_id } = req.user;
    const { product_id } = req.params;

    try {
        const cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found" });
        }

        const productToRemove = cart.products.find(
            (product) => product.product_id === product_id
        );

        if (!productToRemove) {
            console.log(`Product ID ${product_id} not found in cart`, cart.products);
            return res.status(404).json({ message: "Product not found in cart" });
        }
        
        cart.products = cart.products.filter(
            (product) => product.product_id !== product_id
        );
        if (cart.products.length === 0) {
            await Cart.deleteOne({ user_id });
            return res.status(200).json({ message: "Cart deleted successfully" });
        }

        await cart.save();
        res.status(200).json({ message: "Product removed from cart successfully" });
    } catch (err) {
        console.error('Error removing product from cart:', err);
        res.status(500).json({ error: 'Failed to remove product from cart' });
    }
};
