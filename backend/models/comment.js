const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    comment: { type: String, required: true },
    upVote: { type: Number, default: 0 },
    downVote: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);