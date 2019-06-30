const path = require('path');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/products');

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
router.get('/', (req, res, next) => {
  res.send('OK');
});

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
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             price:
 *               type: number
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