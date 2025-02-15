const { DataTypes } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");
const Product = require("./ProductModel"); // Import Product model
const User = require("./UserModel"); // Import User model

const Order = sequelize.define("Orders", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 }
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { min: 0 }
  },
  order_Date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM("pending", "shipped", "delivered", "canceled"),
    defaultValue: "pending"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: "id" },
    onDelete: "CASCADE"
  }
});


// Define associations
Order.belongsTo(User, { foreignKey: "userId" });

module.exports = Order;
