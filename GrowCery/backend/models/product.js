import mongoose from 'mongoose';

// mongoose.Schema source:
// https://mongoosejs.com/docs/guide.html

const ProductSchema = new mongoose.Schema({
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