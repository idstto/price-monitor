const path = require('path');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Comment ID
 *         type: string
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Product
 */
router.get('/:id', productController.getProductDetail);

/**
 * @swagger
 * /product:
 *   get:
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Product
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /product:
 *   post:
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: payload
 *         description: Payload
 *         schema:
 *           type: object
 *           required:
 *             - url
 *           properties:
 *             url:
 *               type: string
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Product
 */
router.post('/', productController.addProduct);

module.exports = router;