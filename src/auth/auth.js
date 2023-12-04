const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {

    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) {
        const message = `Authentication token is not provided.`
        return res.status(401).json({ message })
    }

    const token = authorizationHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error) {
            const message = `This user is not allowed to access for this resource.`
            return res.status(401).json({ message, data: error })
        }
        const userId = decodedToken.userId

        if (req.query.userId && req.query.userId !== userId) {
            const message = `User identification is invalid.`
            res.status(401).json({ message })
        } else {
            next()
        }
    })
}