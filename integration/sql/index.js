const { Sequelize } = require('sequelize');
const config = require('../../config/database.json')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port
});

let connection = null

async function connect(argument) {

    try {
        await sequelize.authenticate();
        connection = sequelize
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        return false
    }

    return true

}

function getDatabaseInstance() {
    return sequelize
}

module.exports = {
    connect: connect,
    getDatabaseInstance: getDatabaseInstance
}