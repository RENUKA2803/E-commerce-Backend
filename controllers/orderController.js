const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');


exports.createOrder = async (req, res) => {
    const { user_id, email } = req.user; // Destructure email from req.user
    try {
        const { name, address, phno } = req.body;

        const cart = await Cart.findOne({ user_id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart Not Found' });
        }

        // Generate a unique order_id
        const order_id = `ORD-${Date.now()}`;

        const order = new Order({
            order_id,
            name,
            address,
            phno,
            products: cart.products,
            order_date: new Date(),
            delivery_date: calculateDeliveryDate(),
            email:email
        });

        await order.save();
        await Cart.deleteOne({ user_id });

        res.status(201).json({ message: 'Order created successfully', order_id });
    } catch (err) {
        console.error('Error occurred while creating order:', err.message);
        res.status(500).json({ message: 'An error occurred while creating the order' });
    }
};

function calculateDeliveryDate() {
    const today = new Date();
    return new Date(today.setDate(today.getDate() + 7));
}

exports.getOrder = async (req, res) => {
    const { order_id } = req.params; // Extract order_id from request parameters

    try {
        const order = await Order.findOne({ order_id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (err) {
        console.error('Error occurred while fetching the order:', err.message);
        res.status(500).json({ message: 'An error occurred while fetching the order' });
    }
};
