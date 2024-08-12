const User = require("../models/userModel");
const { v4: uuidv4 } = require('uuid');

exports.createUsers = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log('Request body:', req.body);

        // Validate input data
        // if (!username || !email || !password) {
        //     return res.status(400).json({ message: 'Missing required fields' });
        // }

        // Create new user
        const user = new User({
            username,
            email,
            password
        });

        await user.save();
        res.status(201).json({ message: 'User is created successfully' });

    } catch (err) {
        console.error('Error occurred while creating the user:', err.message);
        res.status(500).json({ message: 'An error occurred while creating the user', error: err.message });
    }
};



   