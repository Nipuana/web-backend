const { DataTypes } = require("sequelize");
const sequelize = require("../database/FarmHelp_database");

const Users = sequelize.define("Users", {
   id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false,
   },
   email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    
  },

});

module.exports = Users;

