const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    price: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Price', priceSchema);