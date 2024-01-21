module.exports = {
    activeEnv: 'STAGING',
    cloudSql: {
        host: 'localhost',
        database: 'talkshop',
    },
    postAnalysisRedis: {
        host: 'localhost',
        port: 6379
    },
    DB_FAILURE_RETRY_COUNT: {
        POST_ANALYSIS: 5,
    },
    rateLimiter: {
        default: {
            windowMs: 2*60 * 1000,
            max: 4,
            message: 'default: Too many requests from this IP, please try again after 2 min.',
        },
        createPost: {
            windowMs: 60 * 1000,
            max: 5,
            message: 'createPost: Too many requests from this IP, please try again after 1 min.',
        },
        getPostAnalysis: {
            windowMs: 60 * 1000,
            max: 10,
            message: 'getPostAnalysis: Too many requests from this IP, please try again after 1 min.',
        }
    }
};
