const JWT = require('jsonwebtoken')

const secretKey = '$uperMan@123'

function createTokenForUser(user){
    const payload = {
        _id : user._id,
        email: user.email,
        profileImg : user.profileImg,
        role: user.role,
    }

    const token = JWT.sign(payload, secretKey)
    return token
}

const validateToken = (token) => {
    const payload = JWT.verify(token, secretKey)
    return payload
}


module.exports = {
    createTokenForUser,
    validateToken
}