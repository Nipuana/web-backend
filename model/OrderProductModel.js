const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Order = require("./Order");
const Product = require("./Product");

const OrderProduct = sequelize.define("OrderProduct", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Order,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: "id"
        },
        onDelete: "CASCADE"
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
});

Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId" });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: "productId" });

module.exports = OrderProduct;
