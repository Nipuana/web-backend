
// Initialization
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database/FarmHelp_database');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const orderRoute = require('./routes/orderRoute');
const reviewRoute = require('./routes/reviewRoute');
const categoryRoute = require('./routes/categoryRoute');
const orderProductRoutes = require("./routes/orderProductRoutes");

// Creating a Server
const app = express();

// Creating a port
const PORT = process.env.PORT || 5000;

// Creating Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.send("Welcome to the web page");
});

// Using Routes
app.use('/users', userRoute);
app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/reviews', reviewRoute);
app.use('/categories', categoryRoute);
app.use("/order-products", orderProductRoutes);

// 404 Not Found Handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Running Server
app.listen(PORT, () => {
    console.log(`Server Running on   ..................... PORT ${PORT}`);
});
