const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const mongoose = require('mongoose');

const productsRouter = require('./routes/products');
const commentsRouter = require('./routes/comments');

const app = express();
app.use(cors());

const mongoHost = process.env.DB_HOST || 'localhost';
const mongoPort = process.env.DB_PORT || '27017';
const mongoDb = process.env.DB_NAME || 'test';
const mongoUser = process.env.DB_USER || 'user';
const mongoPassword = process.env.DB_PASSWORD || 'secret';

console.log(`mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}`);
const connectionString = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDb}`;

mongoose.connect(connectionString, { useNewUrlParser: true }, (error) => {
    if (error) console.log('MONGODB_CONNECTION_FAILED: ', error);
});

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
