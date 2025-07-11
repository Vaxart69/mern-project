import mongoose from 'mongoose';

const { Schema } = mongoose;

// mongoose.Schema source:
// https://mongoosejs.com/docs/guide.html

// user schema
const User = new Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: { 
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
    }]
},);

export default mongoose.model('User', User);