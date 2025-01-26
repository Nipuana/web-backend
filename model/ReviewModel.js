const { DataTypes } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");

const Reviews = sequelize.define("Reviews", {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
   },
   Comment: {
        type: DataTypes.STRING,
        
  },
  ReviewDate: {
        type: DataTypes.INTEGER,
    
  },
  


});

module.exports = Products;

