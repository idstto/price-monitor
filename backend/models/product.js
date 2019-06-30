const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    url: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: [String],
    prices: [{ type: Schema.Types.ObjectId, ref: 'Price' }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);