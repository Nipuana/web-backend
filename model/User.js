const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require('../database/FarmHelp_database');

const User = sequelize.define('User',{

    id:{
       type: DataTypes.INTEGER,
       primaryKey: true, 
       autoIncrement: true,
    } ,
    username: {
        type:DataTypes.STRING,
     },
    password: {
        type:DataTypes.STRING,

    },
    // email:{
    //  type:DataTypes.STRING,   
    // },

})

module.exports = User;


