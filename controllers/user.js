import { StatusCodes } from 'http-status-codes'
import { register, login, getUserById, getAllUsers } from '../services/user.js'
import { errorHandler } from '../errors/errorHandler.js'

export const createUser = async (req, res) => {
    try {
        const token = await register(req.body)
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            success: true,
            data: token
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const token = await login(req.body)
        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            data: token
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