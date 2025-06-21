import mongoose from 'mongoose';

// mongoose.Schema source:
// https://mongoosejs.com/docs/guide.html

const orderSchema = new mongoose.Schema({
    // source:
    // https://medium.com/@kishantashok/the-mystery-behind-mongoose-types-objectid-vs-schema-types-objectid-a-typescript-adventure-089e7c5af27f
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    orderQuantity: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: Number, // 0 = Pending, 1 = Completed, 2 = Canceled
        enum: [0, 1, 2],
        default: 0
    },
    email: {
        type: String,
        required: true
    },
    dateOrdered: {
        type: Date,
        default: Date.now
    },
    time: {
        type: String,
        default: function () {
            const now = new Date();
            return now.toLocaleTimeString(); // Returns time as a string like "11:30:45 AM"
            // src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
        }
    }
});


export default mongoose.model('Order', orderSchema, "orders");