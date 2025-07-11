import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: Number, // 0 = Pending, 1 = Approved, 2 = Completed, 3 = Canceled
        enum: [0, 1, 2, 3],
        default: 0
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: function () {
            const now = new Date();
            return now.toLocaleTimeString();
        }
    }
});


export default mongoose.model('Order', orderSchema, "orders");