import mongoose from 'mongoose';

const { Schema } = mongoose;


const ProductSchema = new Schema ({
  productName: {
    type: String,
    required: true
  },
  productDescription: {
    type: String
  },
  productType: {
    type: Number, // 1 = Crop, 2 = Poultry
    enum: [1, 2],
    required: true
  },
  productQuantity: {
    type: Number,
    required: true
  },
  quantitySold: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  productImage: {
    type: String
  }
});

export default mongoose.model('Product', ProductSchema);