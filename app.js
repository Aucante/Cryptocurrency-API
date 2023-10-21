const express = require('express')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000

sequelize.init()

require('./src/routes/Cryptocurrency')(app)

app.use(({res}) => {
    const message = "Failed for finding requested ressource. Try another URL."
    res.status(404).json({message})
})

app.listen(port, () => console.log('Démarré'))