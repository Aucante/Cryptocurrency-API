const express = require('express')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

sequelize.init()

app.get('/' , (req, res) => res.send('Express Ok '))

app.listen(port, () => console.log('Démarré'))