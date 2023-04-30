import express from 'express';
import { getProduct, getProducts, create, edit, deleteProduct } from '../controllers/product.js';
import { authenticateToken } from '../utils/token.js';


const router = express.Router();


router.get('/', getProducts)
router.get('/:productId', getProduct)

router.post('/', authenticateToken, create)
router.put('/:productId', authenticateToken, edit)
router.delete('/:productId', authenticateToken, deleteProduct)

export default router
