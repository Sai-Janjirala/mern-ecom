import Address from "../models/Address.js";

// Add a new address
export const addAddress = async (req, res) => {
  try {
    const { userId, address, city, state, pincode, phone, notes } = req.body;
    const newAddress = new Address({
      userId,
      address,
      city,
      state,
      pincode,
      phone,
      notes,
    });
    await newAddress.save();
    res.status(201).json({ message: "Address added successfully", address: newAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all addresses for a user
export const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;
    const addresses = await Address.find({ userId });
    res.status(200).json({ message: "Addresses fetched successfully", addresses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = await Address.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedAddress) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address updated successfully", address: updatedAddress });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Address.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};