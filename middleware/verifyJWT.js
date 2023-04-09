/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.autorization || req.headers.Autorization
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorised' })
    }

    // spits the header and retrives the
    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET,
        // eslint-disable-next-line consistent-return
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = decoded.UserInfo
            req.roles = decoded.UserInfo.admin_roles
            next()
        }
    )
}

module.exports = verifyJWT
