const stageConfig = require('./stage-config');
// const prodConfig = require('./prod-config');

let activeEnv = process.env.ACTIVE_ENV === 'PRODUCTION' ? 'PRODUCTION' : 'STAGING';

console.log('ACTIVE_ENV', activeEnv);

let config;
if (activeEnv === 'PRODUCTION') {
    config = prodConfig;
} else {
    config = stageConfig;
}

module.exports = config;
