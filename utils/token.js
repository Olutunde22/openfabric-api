import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const headerPayload = authHeader && authHeader.split(' ')[1]
    const token = `${headerPayload}.${req.cookies.op_sig}`

    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.clearCookie('op_sig')
            res.clearCookie('op_hp')
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token has expired' })
        }
        req.user = user
        next()
    })
}

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
}

export const setCookies = (res, token) => {
    // Going with token splitting method
    res.cookie('op_hp', `${token.split('.')[0]}.${token.split('.')[1]}`, {
        path: '/',
        domain: process.env.DOMAIN,
        maxAge: 300000 // 5m
    })

    res.cookie('op_sig', token.split('.')[2], {
        maxAge: 300000,
        ...(process.env.NODE_ENV === 'production' && ({
            secure: true
        })),
        httpOnly: Boolean(process.env.HTTP_ONLY),
        domain: process.env.DOMAIN,
        sameSite: 'None',
        path: '/'
    })
}