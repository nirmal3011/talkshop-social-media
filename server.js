const express = require('express');
const bodyParser = require('body-parser');
const router = require('./api/router');

const server = (container) => {
    // Start Express app server
    return new Promise((resolve, reject) => {
        const app = express();

        // parse application/json
        app.use(bodyParser.json({
            limit: '10mb',
            strict: false
        }));

        app.use((req, res, next) => {
            req.container = container.createScope();
            next();
        });

        app.get('/', (req, res) => {
            return res.send('Hello from Analytics Service !');
        });

        app.use('/analytics-service', router);

        app.use((err, req, res, next) => {
            console.log(err);
            return res.status(500).send('Something went wrong!');
        });

        resolve(app);
    });
}

module.exports = server;
