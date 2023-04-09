const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/user.model.js')

const signup = asyncHandler(async (request, response) => {
    const { body } = request

    const emailAlreadyExist = await User.findOne({
        email: body.email,
    }).select({ _id: 1 })

    // returned if user exist with the same email
    if (emailAlreadyExist) {
        return response.status(409).send({
            message: 'Email already exist.',
        })
    }

    if (body.password) {
        body.password = bcryptjs.hashSync(body.password, 10)
    }

    const user = await await User.create(body)
    return response.json({
        message: 'User has been created successfully.',
        user,
    })
})

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ username })
        .select('+password')
        .exec()

    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcryptjs.compare(password, foundUser.password)

    if (!match) {
        return res.status(401).json({ message: 'Unauthorised' })
    }

    const accessToken = jwt.sign(
        {
            UserInfo: {
                id: foundUser._id,
                username: foundUser.username,
                roles: foundUser.admin_roles,
            },
        },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '200m' }
    )

    const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    )

    // Create secure cookie with refresh token
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    console.log(res.cookie)
    foundUser.password = undefined
    // Send accessToken containing username and roles
    res.json({ accessToken, user: foundUser })
})

const refresh = (req, res) => {
    const cookies = req.cookies

    console.log(cookies)

    if (!cookies?.jwt)
        return res.status(401).json({ message: 'cookie nof found' })

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({
                username: decoded.username,
            }).exec()

            if (!foundUser)
                return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser.username,
                        roles: foundUser.admin_roles,
                    },
                },
                process.env.JWT_ACCESS_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ accessToken })
        })
    )
}

// user logout functionality
const logout = (req, res) => {
    const cookies = req.cookies

    console.log(cookies)
    if (!cookies?.jwt) return res.sendStatus(204) //No content

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie cleared' })
}
// const logout = (req, res) => {
//   res.clearCookie('jwt', '', { maxAge: 1 }).json({ message: "Cookie cleared" });

//   res.redirect('/');
// }

module.exports = {
    login,
    logout,
    refresh,
    signup,
}

//  const register = async (req, res, next) => {
//   if (!req.body.name || !req.body.email || !req.body.password) {
//     return next(
//       createError({
//         message: 'Name, Email & password are required',
//         statusCode: 400,
//       }),
//     );
//   }

//   try {
//     const salt = await bcryptjsjs.genSalt(10);
//     const hashedPassword = await bcryptjsjs.hash(req.body.password, salt);

//     const newUser = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword,
//     });

//     await newUser.save();
//     return res.status(201).json('New User Created');
//   } catch (err) {
//     return next(err);
//   }
// };

// route /logout

// route /login

//  const isLoggedIn = async (req, res) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.json(false);
//   }
//   return jwt.verify(token, process.env.JWT_SECRET, (err) => {
//     if (err) {
//       return res.json(false);
//     }
//     return res.json(true);
//   });
// };
