const JWT = require('jsonwebtoken')
const createError = require('http-errors')

module.exports = {
    signAccessToken: (email) => {
        return new Promise((resolve, reject) => {
        const payload = {
            name : "Yours Truly"
        }
        const secret = "Secret Key"
        const options = {}
        JWT.sign(payload, secret, options, (err, token) => {
            if(err) reject(err)
            resolve(token)
        })
    })
    }
}
