import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes';

export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' })
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token has expired' })
        }
        req.user = user
        next()
    })
}

export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRES })
}