const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsRouter = require('./routes/products');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productsRouter);
app.use('/comment', commentsRouter);

const swaggerSpec = swaggerJSDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0'
        }
    }, apis: [
        path.resolve(__dirname + '/routes/*')
    ]
});

const showExplorer = false;
const options = {};
const customCss = '';
const customFavicon = '';
const swaggerUrl = '';

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(
        swaggerSpec,
        showExplorer,
        options,
        customCss,
        customFavicon,
        swaggerUrl,
        "API Documentation",
        (req, res, next) => {
            next();
        }
    )
);

app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = app;
