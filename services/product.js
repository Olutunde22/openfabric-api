import { StatusCodes } from 'http-status-codes'
import { CustomAPIError, BadRequest, Unauthorized } from '../errors/index.js'
import Product from '../models/Product.js'

export const createProduct = async (productData) => {
    try {
        const { name, price, description, imageUrl, createdBy } = productData
        if (!name || !price || !description || !imageUrl || !createdBy) {
            throw new BadRequest('Please provide name, price, description, createdBy and imageUrl of the product')
        }
        const newProduct = await Product({ ...productData })
        return newProduct.save()
    } catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}

export const editProduct = async (productId, productData) => {
    try {
        const { name, price, description, imageUrl } = productData

        if (!productId) {
            throw new BadRequest('Please provide a productId ')
        }

        if (!name || !price || !description || !imageUrl) {
            throw new BadRequest('Please provide name, price, description and imageUrl of the product')
        }

        const productExists = await Product.findById(productId)

        if (!productExists) {
            throw new CustomAPIError('Product with this Id does not exists', 404)
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { ...productData, createdBy: productExists.createdBy },
            { returnOriginal: false }
        ).populate('createdBy', 'firstName email')

        return updatedProduct
    }
    catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}

export const getProductById = async (productId) => {
    try {
        if (!productId) {
            throw new BadRequest('Please provide a product ID')
        }

        const productExists = await Product.findById(productId).populate('createdBy', 'firstName email')

        if (!productExists) {
            throw new CustomAPIError('Product with this id does not exist', 404)
        }
        return productExists
    } catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}

export const getAllProducts = async () => {
    try {
        return Product.find().populate('createdBy', 'firstName email')
    } catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}

export const deleteProductById = async (productId) => {
    try {
        if (!productId) {
            throw new BadRequest('Please provide a product ID')
        }

        return Product.findByIdAndDelete(productId)
    } catch (err) {
        throw new CustomAPIError(err.message, StatusCodes.BAD_REQUEST)
    }
}