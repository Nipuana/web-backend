const { DataTypes } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");

const Products = sequelize.define("Products", {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   productname: {
        type: DataTypes.STRING,
        allowNull: false,
   },
   description: {
        type: DataTypes.STRING,
        allowNull: false,
  },
  price: {
        type: DataTypes.INTEGER,
    
  },
  quantity: {
        type: DataTypes.INTEGER,
    
  },


});

module.exports = Products;

