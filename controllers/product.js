import { StatusCodes } from 'http-status-codes'
import { createProduct, editProduct, getProductById, getAllProducts, deleteProductById } from '../services/product.js'
import { errorHandler } from '../errors/errorHandler.js'

export const create = async (req, res) => {
    try {
        const product = await createProduct(req.body)
        res.status(StatusCodes.CREATED).json({
            status: StatusCodes.CREATED,
            success: true,
            data: product
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const edit = async (req, res) => {
    try {
        const product = await editProduct(req.params?.productId, req.body)

        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            data: product
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const getProduct = async (req, res) => {
    try {
        const product = await getProductById(req.params?.productId)
        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            data: product
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const getProducts = async (_req, res) => {
    try {
        const product = await getAllProducts()
        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            data: product
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}

export const deleteProduct = async (req, res) => {
    try {
        await deleteProductById(req.params.productId)
        res.status(StatusCodes.OK).json({
            success: true,
            status: StatusCodes.OK,
            message: 'Product deleted successfully'
        })
    }
    catch (error) {
        return errorHandler(res, error)
    }
}