import { StatusCodes } from 'http-status-codes'
import { CustomAPIError, BadRequest, Unauthorized } from '../errors/index.js'
import User from '../models/User.js'
import { generateAccessToken } from '../utils/token.js'
import { hashPassword, verifyPassword } from '../utils/bcrypt.js'

export const register = async (userData) => {
    try {
        const { firstName, lastName, email, password } = userData
        if (!firstName || !lastName || !email || !password) {
            throw new BadRequest('Please provide firstname, lastname, email and password')
        }

        const userExists = await User.findOne({ email: email })
        if (userExists) {
            throw new Unauthorized('An account with this email already exists')
        }

        const hashed = await hashPassword(password)
        const newUser = await User({ ...userData })
        newUser.password = hashed.password
        newUser.salt = hashed.salt
        const savedUser = await newUser.save()

        const accessToken = generateAccessToken({
            _id: savedUser._id,
            firstName: savedUser.firstName
        })
        return accessToken

    } catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}

export const login = async (userLoginData) => {
    try {
        const { email, password } = userLoginData
        if (!email || !password) {
            throw new BadRequest('Please provide your email and password')
        }
        const userExists = await User.findOne({ email: email })
        if (!userExists) {
            throw new Unauthorized('Invalid email / password')
        }

        const passwordMatch = await verifyPassword(password, userExists.password)

        if (!passwordMatch) throw new Unauthorized('Invalid email / password')

        const accessToken = generateAccessToken({
            _id: userExists._id,
            firstName: userExists.firstName
        })
        return accessToken
    }
    catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}

export const getUserById = async (userId) => {
    try {
        if (!userId) {
            throw new BadRequest('Please provide a user ID')
        }

        const userExists = await User.findById(userId)

        if (!userExists) {
            throw new CustomAPIError('User with this id does not exist', 404)
        }
        return userExists
    } catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}

export const getAllUsers = async () => {
    try {
        return User.find()
    } catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}