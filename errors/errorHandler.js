import { CustomAPIError } from "./index.js"

export const errorHandler = (res, err) => {
    let error = { ...err }
    error.message = err.message

    // Cash Error handler
    if (err.message.includes('CastError')) {
        err.message = `Resource not found`
    }

    //duplicate key handler
    if (err.message.includes('E11000')) {
        const message = 'Duplicate field entered';
        error = new CustomAPIError(message, 409)
    }


    res.status(error?.statusCode || 500).json({
        success: false,
        status: error?.statusCode,
        message: error.message || 'Server Error'
    })
}