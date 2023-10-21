const { Sequelize, DataTypes } = require('sequelize')
const CryptocurrencyModel = require("./../../src/models/cryptocurrency")
const dbConfig = require("../config/config");
const cryptocurrencies = require('./mock-cryptocurrency')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const Cryptocurrency = CryptocurrencyModel(sequelize, DataTypes);

const init = () => {
    return sequelize.sync({force: false})
        .then(_ => {
            console.log('Database initialized.')
        })
}

module.exports = {
    init, Cryptocurrency
}