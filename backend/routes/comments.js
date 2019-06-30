var express = require('express');
var router = express.Router();

const commentController = require('../controllers/comment');

/**
 * @swagger
 * /comment:
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
 *        - Comment
 */
router.get('/', commentController.getComments);

/**
 * @swagger
 * /comment:
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
 *             - product_id
 *             - user_name
 *             - email
 *             - comment
 *           properties:
 *             product_id:
 *               type: string
 *             user_name:
 *               type: string
 *             email:
 *               type: string
 *             comment:
 *               type: string
 *     responses:
 *       200:
 *         description: success
 *
 *     tags:
 *        - Comment
 */
router.post('/', commentController.addComment);

/**
 * @swagger
 * /comment/{id}/upvote:
 *   patch:
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
 *        - Comment
 */
router.patch('/:id/upvote', commentController.upVoteComment);

/**
 * @swagger
 * /comment/{id}/downvote:
 *   patch:
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
 *        - Comment
 */
router.patch('/:id/downvote', commentController.downVoteComment);

module.exports = router;