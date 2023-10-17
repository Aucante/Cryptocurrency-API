const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require("./src/config/config.js");
const CryptocurrencyModel = require("./src/models/cryptocurrency")
const {logger} = require("sequelize/lib/utils/logger");

const app = express()
const port = 3000

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

sequelize.authenticate()
    .then(_ => console.log('ok'))
    .catch(error =>  console.log('non'))
;

const Cryptocurrency = CryptocurrencyModel(sequelize, DataTypes);

sequelize.sync({force: true})
    .then(_ => console.log('La BDD est synchronisée.'))
    .catch(error => console.log("ERREUR, NON SYNCHRO"))

app.get('/', (req, res) => res.send('Express Ok '))

app.listen(port, () => console.log('Démarré'))