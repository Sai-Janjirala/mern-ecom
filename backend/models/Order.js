import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
  address : {
    fullName: String,
    phone: String,
    addressLine: String,
    city: String,
    state: String,
    pincode: String,
  },
  totalAmount : Number,
  paymentMethod : {
    type: String,
    default : 'COD'
  },
  status : {
    type: String,
    default: 'placed'
  }
},{
  timestamps: true,
})

export default mongoose.model("Order", OrderSchema);