const config = require('../config/config.js');
const Redis = require('ioredis');

// creating redis client
let postAnalysisRedisClient = new Redis(config.postAnalysisRedis);

module.exports = {
    postAnalysisRedisClient: postAnalysisRedisClient,
};
