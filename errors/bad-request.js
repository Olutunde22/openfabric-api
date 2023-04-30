import { CustomAPIError } from './index.js'
import { StatusCodes } from 'http-status-codes'

export default class BadRequest extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}
