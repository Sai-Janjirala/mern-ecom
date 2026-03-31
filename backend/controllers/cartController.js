import Cart from "../models/Cart.js";

//Add item to cart 
export const addToCart = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const item = cart.items.find(i => i.productId.toString() === productId);
      if (item) {
        item.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// remove item from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = cart.items.filter(i => i.productId.toString() !== productId);
    await cart.save();
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update item quantity in cart
export const updateQuantity = async (req, res) => {
  try{
    const { userId, productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(i => i.productId.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: "Item quantity updated in cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// get cart by userID 

export const getCart = async (req, res) => {
  
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId }).populate("items.productId", "title price image");
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" }); 
    }
    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};