const { Sequelize } = require('sequelize');
const sequelize = require('./index').getDatabaseInstance();



// Get Models
async function restartDB() {
    await sequelize.sync({ force: true });
    console.log("This creates the table, dropping it first if it already existed");
}

async function syncDB() {
    await sequelize.sync();
    console.log("creates the table if it doesn't exist (and does nothing if it already exists)")
}
async function deleteDB() {
    await sequelize.drop()
    console.log("deletes all tables")
}
async function alterDB() {
    await sequelize.sync({ alter: true });
    console.log("alter all tables")
}
module.exports = {
    restartDB,
    syncDB,
    deleteDB,
    alterDB
}