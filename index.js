//Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/FarmHelp_database');
const userRoute = require('./routes/userRoute')
const productRoute = require('./routes/productRoute')
const orderRoute = require('./routes/orderRoute')
const reviewRoute = require('./routes/reviewRoute')
const categoryRoute = require('./routes/categoryRoute')

//Creating a Server
const app = express();

//Creating a port
const PORT = 5000;

//Creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/login',(req, res)=>{
    res.send("Welcome to the web page")
})


app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders',orderRoute)
app.use('/reviews',reviewRoute)
app.use('/categories',categoryRoute)


//Running on PORT
app.listen(PORT, ()=>{
    console.log(`Server Running on........................ PORT ${PORT}`)
})


