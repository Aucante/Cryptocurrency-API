const { User } = require('../db/sequelize')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        User.findOne({ where: { username: req.query.username } }).then(user => {

            if (!user) {
                const message = 'User not found.';
                return res.status(404).json({ message });
            }

            bcrypt.compare(req.query.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid) {
                    const message = `Password isn't correct.`;
                    return res.status(401).json({ message })
                }

                const token = jwt.sign(
                    { userId: user.id },
                    privateKey,
                    { expiresIn: '24h' }
                )

                const message = `User is logged successfully.`;
                return res.json({ message, data: user })
            })
            .catch(error => {
                const message = `Failed for checking password.`;
                return res.json({ message, data: error })
            })
        })
        .catch(error => {
            const message = `Login failed. Try it on again.`;
            return res.json({ message, data: error })
        })
    })
}