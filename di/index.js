const { createContainer, asValue, asClass, InjectionMode, Lifetime } = require('awilix');

/**
 *
 * @returns {Object} life time
 */
function getScope() {
    return { lifetime: Lifetime.SINGLETON };
}

// Driver, Config
const config = require('../config/config');
const serverConfig = require('../config/server-config');
const utils = require('../utils');
const middlewares = require('../driver')

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
    //------------------ CONFIG ------------------------
    config: asValue(config),
    serverConfig: asValue(serverConfig),

    //------------------ UTILITY -----------------------
    constants: asValue(utils.constants),
    helper: asClass(utils.helper),
    cloudSqlHelper: asClass(utils.CloudSqlHelper, getScope()),
    logger: asValue(utils.logger),

    //------------------ MIDDLEWARE --------------------
    mysqlPool: asValue(middlewares.mysql.mysqlPool),

    // cache
    postAnalysisRedisClient: asValue(middlewares.redis.postAnalysisRedisClient),
})


//------------------ Validator -----------------------------------------------------------------------
container.register("validator", asClass(require('./../api/v1/validator'), getScope()));

//------------------ API -----------------------------------------------------------------------

container.register("createPostApi", asClass(require('./../api/v1/create-post'), getScope()));
container.register("getPostAnalysisApi", asClass(require('./../api/v1/get-analysis'), getScope()));

//---------------------- REPO --------------------------
container.register('postRepo', asClass(require('../repository/data/postRepo'), getScope()));
container.register('postAnalysisRepo', asClass(require('../repository/data/postAnalysisRepo'), getScope()));

container.register('postAnalysisCacheRepo', asClass(require('../repository/cache/postAnalysisCacheRepo'), getScope()));


//---------------------- LOGIC --------------------------
container.register('postLogic', asClass(require('../logic/postLogic'), getScope()));
container.register('postAnalysisLogic', asClass(require('../logic/postAnalysisLogic'), getScope()));


// ---------------------------------------------------------------------------------------------
module.exports = container;