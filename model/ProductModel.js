const { DataTypes } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");
const Category = require("./CategoryModel"); // Import Category Model

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 } // Prevent negative prices
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 0 } // Prevent negative stock
    },
    productImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: "id"
        },
        onDelete: "CASCADE"
    },
});

// Define Association with Category
Product.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Product;
