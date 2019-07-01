const Product = require('../models/product');
const Comment = require('../models/comment');

exports.getComments = async (req, res, next) => {
    const productId = req.query.product_id;
    let comment = await Comment.find({ productId });
    res.send({ comment, count: comment.length });
}

exports.addComment = async (req, res, next) => {
    const productId = req.body.product_id;
    const userName = req.body.user_name;
    const email = req.body.email;
    const userComment = req.body.comment;

    const product = await Product.findById(productId);
    if (! product) return res.status(404).send(`Product with id "${productId}" not found.`);
    const comment = new Comment({ productId, userName, email, comment: userComment });
    await comment.save();
    product.comments.push(comment);
    await product.save();
    res.send({ message: 'OK', id: comment._id });
}

exports.upVoteComment = async (req, res, next) => {
    const id = req.params.id;

    const comment = await Comment.findOneAndUpdate({ _id: id }, { $inc: { upVote: 1 } });
    await comment.save();
    res.send({ message: 'OK', id: comment._id });
}

exports.downVoteComment = async (req, res, next) => {
    const id = req.params.id;

    const comment = await Comment.findOneAndUpdate({ _id: id }, { $inc: { downVote: 1 } });
    await comment.save();
    res.send({ message: 'OK', id: comment._id });
}