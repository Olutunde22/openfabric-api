import { StatusCodes } from 'http-status-codes'
import { register, login, getUserById, getAllUsers } from '../services/user.js'
import { errorHandler } from '../errors/errorHandler.js'
import { setCookies } from '../utils/token.js'

export const createUser = async (req, res) => {
    try {
        const token = await register(req.body)
        setCookies(res, token)
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            success: true,
            message: 'user created successfully'
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const token = await login(req.body)
        setCookies(res, token)
        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            message: 'login successfully'
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const getUsers = async (_req, res) => {
    try {
        const user = await getAllUsers()
        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            data: user
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.params?.userId)
        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            data: user
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}