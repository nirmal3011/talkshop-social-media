const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
    return res.send('Analytics Service Is Up');
});

// V1 Router
const routerVersion1 = require('./v1/router.js');

router.use('/api/v1', (req, res, next ) => {
    next();
}, routerVersion1);

module.exports = router;