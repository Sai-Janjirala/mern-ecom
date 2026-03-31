import express from 'express';
import { addAddress, getAddresses, updateAddress, deleteAddress } from '../controllers/addressController.js';

const router = express.Router();

// Add a new address
router.post('/add', addAddress);
// Get all addresses for a user
router.get('/:userId', getAddresses);
// Update an address
router.put('/:id', updateAddress);
// Delete an address
router.delete('/:id', deleteAddress);

export default router;