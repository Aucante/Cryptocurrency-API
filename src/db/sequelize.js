const { Sequelize, DataTypes } = require('sequelize')
const dbConfig = require("../config/config");
const bcrypt = require('bcryptjs');
const UserModel = require('../models/user');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
});

const User = UserModel(sequelize, DataTypes);

const init = () => {
    return sequelize.sync({force: false})
        .then(_ => {

            // bcrypt.hash('password', 10)
            //     .then(hash => {
            //         User.create({
            //             username: 'username',
            //             password: hash
            //         }).then(user => console.log('User created.'))
            //     })
            //     .catch(error => console.log(error))
        })
}

module.exports = {
    init, User
}