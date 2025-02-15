const { DataTypes } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");
const Product = require("./ProductModel"); // Import Product Model

const Review = sequelize.define("Reviews", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5, 
        },
    },
    Comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ReviewDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: "id",
        },
        onDelete: "CASCADE",
    },
});

// Define association with Product
Review.belongsTo(Product, { foreignKey: "productId" });

module.exports = Review;
