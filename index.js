const express= require("express")
const app = express()
const productRoutes=require("./routes/productRoute")
const userRoutes=require("./routes/userRoute")
const loginRoute=require('./routes/loginRoute')
const cartRoute=require('./routes/cartRoute')
const orderRoute=require('./routes/orderRoute')
const mongoose=require("mongoose")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
    'mongodb+srv://renukak2022cce:Pa9hq0fZb16OGGdl@cluster0.wbmktcz.mongodb.net/e_commerce'
).then(()=>{
    console.log("connected to database")
}).catch((err) => {
    console.error('Failed to connect to MongoDB Atlas:', err);
});
app.use('/users',userRoutes)
app.use('/products',productRoutes)
app.use('/login',loginRoute)
app.use('/cart',cartRoute)
app.delete('/cart',cartRoute)
app.use('/order',orderRoute)



app.listen(3002,()=>{
    console.log("server is running on port 3001")
})    


