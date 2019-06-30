const { getProduct } = require('../utils/get_product');
const Price = require('../models/price');
const Product = require('../models/product');

exports.getAllProducts = async (req, res, next) => {
    let product = await Product.find().populate({ path: 'prices', select: 'price', model: 'Price' });
    res.send({ product, count: product.length });
}

exports.addProduct = async (req, res, next) => {
    let { url, name, description, imageUrl, price } = await getProduct(req.body.url);
    const product = new Product({ url, name, description, imageUrl })
    await product.save();
    const p = new Price({ productId: product._id, price });
    p.save();
    res.send({ message: 'OK', id: product._id });
}