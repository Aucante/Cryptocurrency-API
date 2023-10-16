const express = require('express')
const { Sequelize } = require('sequelize')
const dbConfig = require("./src/config/config.js");

const app = express()
const port = 3000

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

    sequelize.authenticate()
        .then(_ => console.log('ok'))
        .catch(error =>  console.log('ok'))
    ;

app.get('/', (req, res) => res.send('Express Ok '))

app.listen(port, () => console.log('Démarré'))