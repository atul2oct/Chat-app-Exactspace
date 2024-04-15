const jwt = require('jsonwebtoken')

exports.generateToken = (user) => {
    const payload = {
        email:user.email,
        id:user._id
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:'30d'
    })
    return token
} 