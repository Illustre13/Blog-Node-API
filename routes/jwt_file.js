const JWT = require('jsonwebtoken')
const secret = "Secret Key"

module.exports = {
    signAccessToken: (email, role) => {
        return new Promise((resolve, reject) => {
            const payload = {
                'email': email,
                'role': role
            }
            const options = {}
            JWT.sign(payload, secret, options, (err, token) => {
                if(err) reject(err)
                resolve({token})
            })
        })
    },
    verifyAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            JWT.verify(token, secret, (err, payload) => {
                if (err) {
                    const message = err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message
                    return reject(message)
                }
                resolve(payload)
            })
        })
    }
}