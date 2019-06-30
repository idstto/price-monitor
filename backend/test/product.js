const expect = require('chai').expect;
const sinon = require('sinon');

const Product = require('../models/product');
const ProductController = require('../controllers/products');

describe('Product Controller', function() {
    it('should return product and count', function(done) {
        sinon.stub(Product, 'findOne');
        Product.findOne.throws();
        const req = {
        }
        ProductController.getAllProducts(req, {}, () => {})
        .then(result => {
            expect(result).to.have.property('product');
            expect(result).to.have.property('count');
            done();
        })
        .catch(e => console.log(e));
        Product.findOne.restore();
    })
})