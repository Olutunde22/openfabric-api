import { CustomAPIError } from './index.js'
import { StatusCodes } from 'http-status-codes'

export default class Unauthorized extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}
