import express from 'express';
import { addToCart, getCart, removeFromCart, updateQuantity } from '../controllers/cartController.js';

const router = express.Router();

// Add item to cart
router.post('/add', addToCart);
// Get cart
router.get('/:userId', getCart);
// Remove item from cart
router.post('/remove', removeFromCart);
// Update item quantity in cart
router.post('/update', updateQuantity);

export default router;