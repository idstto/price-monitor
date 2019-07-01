const { getProduct } = require('../utils/get_product');
const Price = require('../models/price');
const Product = require('../models/product');

exports.getProductDetail = async (req, res, next) => {
  const id = req.params.id;

  let product = await Product.findById(id).populate({ path: 'prices', select: 'price', model: 'Price' });

  res.send({ product });
}

exports.getAllProducts = async (req, res, next) => {
  let product = await Product.find()
  .populate({ path: 'prices', select: 'price', model: 'Price' })
  .populate({ path: 'comments', select: 'comment upVote downVote', model: 'Comment' });
  res.send({ product, count: product.length });
}

exports.addProduct = async (req, res, next) => {
  if (!req.body.url) return req.status(400).send(`URL cannot be empty.`);
  let { url, name, description, imageUrl, price } = await getProduct(req.body.url);
  const product = new Product({ url, name, description, imageUrl })
  await product.save();
  const p = new Price({ productId: product._id, price });
  await p.save();
  product.prices.push(p);
  await product.save();
  res.send({ message: 'OK', id: product._id });
}