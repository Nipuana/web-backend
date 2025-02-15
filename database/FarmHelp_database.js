
const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        port: process.env.DB_PORT,
        logging: false,
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('DB connection successful on ............. PORT', process.env.DB_PORT);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
module.exports = sequelize;
