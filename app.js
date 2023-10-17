const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require("./src/config/config.js");
const CryptocurrencyModel = require("./src/models/cryptocurrency")
const { logger} = require("sequelize/lib/utils/logger");

const app = express()
const port = 3000

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const Cryptocurrency = CryptocurrencyModel(sequelize, DataTypes);

sequelize.authenticate()
    .then(_ => console.log('ok'))
    .catch(error =>  console.log('non'))
;

sequelize.sync({force: false})
    .then(_ => console.log('La BDD est synchronisée.'))
    .catch(error => console.log("ERREUR, NON SYNCHRONISATION"))

Cryptocurrency.create({
    name: 'Bitcoin',
    code: 'BTC',
    picture: 'https://static.vecteezy.com/system/resources/previews/008/505/801/original/bitcoin-logo-color-illustration-png.png'
}).then(r => console.log('Crypto bien ajoutée'));

app.get('/' , (req, res) => res.send('Express Ok '))

app.listen(port, () => console.log('Démarré'))