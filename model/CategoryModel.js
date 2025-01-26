const { DataTypes } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");

const Categories = sequelize.define("Categories", {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   categoryName: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
   },
   categoryDescription: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
 

});

module.exports = Categories;

