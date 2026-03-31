import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/product.js";

const placeOrder = async (req,res) => {

  try{
    const {userId, address} = req.body

    // get Cart 
    const cart = await Cart.findOne({userId}).populate("items.productId");
    if(!cart || cart.items.length === 0){
      return res.status(400).json({msg:"Cart is empty"});
    }

    // prepare Order items
    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    }))

    //Calculate total amount
    const totalAmount = orderItems.reduce(
      (total, item) => total + (item.price * item.quantity) , 0
    )
    // deduct stock from products
    for(let item of cart.items){
      await Product.findByIdAndUpdate(item.productId._id, {
        $inc: {
          stock: -item.quantity,
        }
      })
    }
    //create Order
    const order = await Order.create({
      userId,
      items: orderItems,
      totalAmount,
      address
    })

    // clear cart 
    await Cart.findOneAndDelete({userId}, {items : []});

   res.status(201).json({ msg: "Order placed successfully", order });
  }catch (err) {
    res.status(500).json({ msg: " Internal Server error" });
  }

  return (
    <div>
      
    </div>
  )
}

export default orderController
