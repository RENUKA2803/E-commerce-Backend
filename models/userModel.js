const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
});
//Authentication
userSchema.pre("save",async function(next){   //for callback fun put => after (next) and remove function
    if(!this.isModified("password")){
        return next();
    }
    const salt=await bcrypt.genSalt(10);//10->complexity,if it is high the server gets loaded highly
    this.password=await bcrypt.hash(this.password,salt);
    next();

})

const User = mongoose.model('User', userSchema);
module.exports = User;

