const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const config = require('./../../config/config')

// POST /api/v1/posts
const createPostApiRL = config.rateLimiter.createPost
router.post('/posts', getRateLimiter(createPostApiRL), (req, res, next) => {
    req.container.resolve("createPostApi").handleRequest(req, res).catch(next);
});

// GET /api/v1/posts/:id/analysis
const getPostAnalysisApiRL = config.rateLimiter.getPostAnalysis
router.get('/posts/:id/analysis', getRateLimiter(getPostAnalysisApiRL), (req, res, next) => {
    req.container.resolve("getPostAnalysisApi").handleRequest(req, res).catch(next);
});

function getRateLimiter(rateLimitConfig) {
    return rateLimit({
        windowMs: rateLimitConfig.windowMs,
        max: rateLimitConfig.max,
        message: rateLimitConfig.message
    });
}

module.exports = router;