const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");

const Orders = sequelize.define("Orders", {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   orderQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
   },
   Price: {
        type: DataTypes.INTEGER,
        allowNull: false,
  },
  order_Date: {
        type: DataTypes.INTEGER,
    
  },
  address:{
    type: STRING
  },
  status: {
        type: DataTypes.STRING,
    
  },


});

module.exports = Orders;

