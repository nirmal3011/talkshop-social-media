class PostAnalysisLogic {

    constructor(helper, logger, postAnalysisRepo, postAnalysisCacheRepo) {
        this.helper = helper;
        this.logger = logger;
        this.postAnalysisRepo = postAnalysisRepo;
        this.postAnalysisCacheRepo = postAnalysisCacheRepo;
    }

    async addPostAnalysis(postId, content) {
        // 1. Analyze the Text
        const analysis = this.helper.analyzeText(content);
        // 2. Put Result in post_analysis table
        let [err, resp] = await this.helper.invoker(this.postAnalysisRepo.put(postId, analysis));
        // 2.1 Throwing 500
        if (err) {
            this.logger.error('Error while putting data in postAnalysis repo',
                {
                    err: JSON.stringify(err, Object.getOwnPropertyNames(err)),
                    datetime: Date.now(),
                    postId: postId,
                    content: content,
                }
            );
            return Promise.reject('Internal Server Error');
        }
        // 3. Asynchronously Add Post Analysis In Cache
        this.addToCache(postId, analysis);
        return resp;
    }


    async getPostAnalysis(input) {
        const { postId } = input
        // 1. Find post analysis result from cache
        let [err, resp] = await this.helper.invoker(this.postAnalysisCacheRepo.get(postId));
        // 1.1 Logging The Error only and not making Redis SPOF
        if (err) {
            this.logger.error('Error while getting data from postAnalysisCache repo',
                {
                    err: JSON.stringify(err, Object.getOwnPropertyNames(err)),
                    datetime: Date.now(),
                    input
                }
            );
        // 1.2 Returning resp if found from redis
        } else if(resp) {
            this.logger.info('get data from cache: ', postId)
            return JSON.parse(resp);
        }
        // 2. Find post analysis result from DB
        [err, resp] = await this.helper.invoker(this.postAnalysisRepo.get(postId));
        // 2.1 Throwing 500
        if (err) {
            this.logger.error('Error while getting data in postAnalysis repo',
                {
                    err: JSON.stringify(err, Object.getOwnPropertyNames(err)),
                    datetime: Date.now(),
                    input
                }
            );
            return Promise.reject('Internal Server Error');
        }
        // 2.2 Asynchronously Add Post Analysis In Cache
        if(resp) {
            this.addToCache(postId, resp);
        } else {
            // TO-DO:
            // 1. Do Real Time Analysis which comes with drawbacks
            // Or
            // 2. Put this in high priority queue which is doing analysis
        }
        return resp;
    }

    async addToCache(postId, analysis) {
        // 1. Add Post Analysis In Cache
        let [err, _] = await this.helper.invoker(this.postAnalysisCacheRepo.add(postId, analysis));
        // 1.1 Logging the error
        if (err) {
            this.logger.error('Error while putting data in postAnalysisCache repo',
                {
                    err: JSON.stringify(err, Object.getOwnPropertyNames(err)),
                    datetime: Date.now(),
                    postId: postId,
                    analysis: analysis,
                }
            );
        }
        this.logger.info('add data in cache: ', postId);
    }
}

module.exports = PostAnalysisLogic